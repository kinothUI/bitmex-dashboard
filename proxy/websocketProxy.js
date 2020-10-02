const WebSocket = require("ws");
const https = require("https");
const fs = require("fs");
const signMessage = require("./restProxy");
const { nodeProxyBindAddress, nodeSocketProxyBindPort, url, key, secret } = require("./config");

console.log("NODE ENV", process.env.NODE_ENV);

const endpoint = "/realtime";
const socketUrl = `wss://${url}`;

const isProdEnv = process.env.NODE_ENV === "production";

const cert = isProdEnv ? fs.readFileSync(process.env.NODE_CERT, "utf-8") : "";
const certKey = isProdEnv ? fs.readFileSync(process.env.NODE_KEY, "utf-8") : "";

const server = https.createServer({ cert, key: certKey });
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
      ws.send(event.data, (err) => console.log("some error happend", err));
  };
});

console.log(`WebSocket Proxy Server started on ${nodeProxyBindAddress}:${nodeSocketProxyBindPort}`);
