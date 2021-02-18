const WebSocket = require("ws");
const http = require("http");
const https = require("https");
const fs = require("fs");
const signMessage = require("./restProxy");
let {
  nodeProxyBindAddress,
  nodeSocketProxyBindPort,
  sslEnabled,
  url,
  key,
  secret,
} = require("./config");

console.log("NODE_ENV", process.env.NODE_ENV);

const endpoint = "/realtime";
const socketUrl = `wss://${url}`;

const server =
  sslEnabled === 1
    ? https.createServer({
        cert: fs.readFileSync(process.env.NODE_CERT, "utf-8"),
        key: fs.readFileSync(process.env.NODE_KEY, "utf-8"),
      })
    : http.createServer();
const clientSocket = new WebSocket.Server({
  host: nodeProxyBindAddress,
  port: nodeSocketProxyBindPort,
  server,
});

clientSocket.on("connection", (socketSelf, req) => {
  const bitmexSocket = new WebSocket(socketUrl + endpoint);

  bitmexSocket.onopen = () => {
    const { signature, expires } = signMessage({ url: endpoint, method: "GET" }, "", secret);
    const authMessage = JSON.stringify({ op: "authKeyExpires", args: [key, expires, signature] });
    bitmexSocket.send(authMessage);

    const subscribeMessage = JSON.stringify({
      op: "subscribe",
      args: ["position", "margin", "order"],
    });
    bitmexSocket.send(subscribeMessage);

    bitmexSocket.onmessage = (event) => {
      if (socketSelf.readyState === 1) {
        socketSelf.send(event.data, (err) => {
          if (err) console.log("some error happend", err);
        });
      }
    };
  };
});

console.log(`WebSocket Proxy Server started on ${nodeProxyBindAddress}:${nodeSocketProxyBindPort}`);
