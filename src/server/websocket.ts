import { RawData, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import internal from "stream";
import { GameState } from '@/app/components/Game';

const wss = new WebSocketServer({noServer: true});

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
    return({
      won: null,
      end: true,
    })
  }
}

export const startWebSocket = (
  req: IncomingMessage,
  socket: internal.Duplex,
  head: Buffer
) => {
  wss.handleUpgrade(req, socket, head, (client) => {
    client.on("message", (data: RawData, b: boolean) => {
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

            if (ended) {
              client.send(JSON.stringify({event: "endStateR", detail: ended}))
            }
            client.send(JSON.stringify({event: "gameStateR", detail: message.detail}))
        }
      } catch (e) {
        console.error(e);
      }
    });
  });
};
