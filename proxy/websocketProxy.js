const WebSocket = require("ws");
const http = require("http");
const https = require("https");
const fs = require("fs");
const signMessage = require("./restProxy");
const {
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

const isProdEnv = process.env.NODE_ENV === "production";

// const cert = isProdEnv ? fs.readFileSync(process.env.NODE_CERT, "utf-8") : "";
// const certKey = isProdEnv ? fs.readFileSync(process.env.NODE_KEY, "utf-8") : "";

const server =
  sslEnabled
    ? https.createServer({
        cert: fs.readFileSync(process.env.NODE_CERT, "utf-8"),
        key: fs.readFileSync(process.env.NODE_KEY, "utf-8"),
      })
    : http.createServer();
const wss = isProdEnv
  ? new WebSocket.Server({
      host: nodeProxyBindAddress,
      port: nodeSocketProxyBindPort,
      server,
    })
  : new WebSocket.Server({ host: nodeProxyBindAddress, port: nodeSocketProxyBindPort });

wss.on("connection", (ws, req) => {
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

    bitmexSocket.onmessage = (event) =>
      ws.send(event.data, (err) => {
        if (err) console.log("some error happend", err);
      });
  };
});

console.log(`WebSocket Proxy Server started on ${nodeProxyBindAddress}:${nodeSocketProxyBindPort}`);
