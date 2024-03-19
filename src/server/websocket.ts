import { RawData, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import internal from "stream";
import { GameState } from '@/app/components/Game';

let wss: WebSocketServer | null = null;

const getWss = () => {
  if (null === wss) {
    wss = new WebSocketServer({noServer: true})
  }

  return wss
}

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

getWss().on('connection', function (ws, request) {
  console.log(getWss().clients.size)
});

export const startWebSocket = (
  req: IncomingMessage,
  socket: internal.Duplex,
  head: Buffer
) => {
  getWss().handleUpgrade(req, socket, head, (client) => {
    getWss().emit('connection', client, req)

    client
      .on("message", (data: RawData, b: boolean) => {
        if (b) {
          return;
        }

        try {
          const message = JSON.parse(data.toString("utf8")) as {
            event: string;
            detail: any;
          };

          switch (message.event) {
            case "ping":
              client.send(`{"event":"pong"}`);
              break;
            case "gameStateS":
              const ended = checkEndState(message.detail)

              for (const wsClient of getWss().clients) {
                if (ended) {
                  wsClient.send(JSON.stringify({event: "endStateR", detail: ended}))
                }
                wsClient.send(JSON.stringify({event: "gameStateR", detail: message.detail}))
              }
          }
        } catch (e) {
          console.error(e);
        }
      });
  });
};
