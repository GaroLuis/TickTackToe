import { RawData, WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import internal from 'stream';
import { GameState } from '@/app/components/Game';

type WebsocketWithId = WebSocket & { sessionId: string }
const wss: WebSocketServer = new WebSocketServer({noServer: true});

const games: { [key: string]: { state: GameState; players: number } } = {}

const checkEndState = (gameState: GameState) => {
  const {board, turn} = gameState;
  const chip = turn === 'X' ? 'O' : 'X'

  if (
    (board[0] === chip && board[1] === chip && board[2] === chip) ||
    (board[3] === chip && board[4] === chip && board[5] === chip) ||
    (board[6] === chip && board[7] === chip && board[8] === chip) ||
    (board[0] === chip && board[3] === chip && board[6] === chip) ||
    (board[1] === chip && board[4] === chip && board[7] === chip) ||
    (board[2] === chip && board[5] === chip && board[8] === chip) ||
    (board[0] === chip && board[4] === chip && board[8] === chip) ||
    (board[2] === chip && board[4] === chip && board[6] === chip)
  ) {
    return ({
      won: chip,
      end: true,
    })
  }

  if (!gameState.board.some((chip) => chip === null)) {
    return ({
      won: null,
      end: true,
    })
  }
}

wss.on('connection', function (client) {
  let id: string | null = null;
  let chip = 'X';

  for (const [key, value] of Object.entries(games)) {
    if (value.players < 2) {
      id = key;
      chip = 'O';
      games[key].players = 2;
      break;
    }
  }

  if (null == id) {
    id = Math.random().toString();

    games[id] = {
      state: {
        board: [
          null, null, null,
          null, null, null,
          null, null, null,
        ],
        turn: 'X',
      },
      players: 1,
    }
  }

  (client as unknown as WebsocketWithId).sessionId = id;
  console.log(games)
  setTimeout(() => {
    client.send(JSON.stringify({event: 'connectionR', detail: {id: id, chip: chip, state: games[id!].state}}));
  }, 1000);
});

export const startWebSocket = (
  req: IncomingMessage,
  socket: internal.Duplex,
  head: Buffer
) => {
  wss.handleUpgrade(req, socket, head, (client) => {
    wss.emit('connection', client, req)

    client
      .on('message', (data: RawData, isBinary: boolean) => {
        if (isBinary) {
          return;
        }

        try {
          const message = JSON.parse(data.toString('utf8')) as {
            id: string;
            event: string;
            detail: any;
          };

          switch (message.event) {
            case 'ping':
              client.send('{"event":"pong"}');
              break;
            case 'gameStateS':
              games[message.id].state = message.detail;
              const ended = checkEndState(message.detail)

              for (const wssClient of wss.clients) {
                if ((wssClient as unknown as WebsocketWithId).sessionId !== message.id) {
                  continue;
                }

                if (ended) {
                  wssClient.send(JSON.stringify({event: 'endStateR', detail: ended}))
                }
                wssClient.send(JSON.stringify({event: 'gameStateR', detail: message.detail}))
              }
          }
        } catch (e) {
          console.error(e);
        }
      })
      .on('close', () => {
        const sessionId = (client as unknown as WebsocketWithId).sessionId;
        delete games[sessionId]
      })
  });
};
