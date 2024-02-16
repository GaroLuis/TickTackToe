import { RawData, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import internal from "stream";

const wss = new WebSocketServer({noServer: true});

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
            client.send(JSON.stringify({event: "gameStateR", detail: message.detail}))
        }
      } catch (e) {
        console.error(e);
      }
    });
  });
};
