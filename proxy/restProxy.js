// borrowed shamelessly from https://github.com/nice-table/bitmex-scaled-orders/blob/master/backend/restProxy.js

const Express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const httpProxy = require("http-proxy");
const { url, key, secret, nodeProxyBindAddress, nodeRestProxyBindPort } = require("./config");

const app = Express();
const proxy = httpProxy.createProxyServer({});

const HOST = nodeProxyBindAddress || "0.0.0.0";
const PORT = nodeRestProxyBindPort || 8181;

const baseURL = `https://${url}`;

const signMessage = (req, body, sec) => {
  const verb = req.method;
  const expires = Date.now() + 500;
  const url = req.url;

  const signature = crypto
    .createHmac("sha256", sec)
    .update(verb + url + expires + body)
    .digest("hex");

  return { signature, expires };
};

proxy.on("proxyReq", (proxyReq, req, res, options) => {
  let bodyData = "";
  if (req.body) bodyData = JSON.stringify(req.body);

  if (req.method !== "OPTIONS") {
    const { signature, expires } = signMessage(req, bodyData, secret);

    proxyReq.setHeader("api-expires", expires);
    proxyReq.setHeader("api-key", key);
    proxyReq.setHeader("api-signature", signature);
  } else {
    res.send();
    res.end();
  }

  proxyReq.setHeader("Content-Type", "application/json");
  proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

  proxyReq.write(bodyData, (err) => {
    if (err) console.log(err);
  });
});

proxy.on("proxyRes", (proxyRes, req, res) => {
  console.log("proxy server received response from target");
});

app.use(bodyParser.json());
app.use((req, res) => {
  console.log("Proxy REQUEST from Client\n", req.method, req.url);

  delete req.headers["origin"];
  delete req.headers["referer"];
  delete req.headers["host"];

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length,api-expires,api-key,api-signature"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");

  proxy.web(req, res, { target: baseURL }, (err) => {
    if (err) console.log(err);
  });
});

app.listen(PORT, HOST, () =>
  console.log(`REST-Proxy Server started on ${nodeProxyBindAddress}:${nodeRestProxyBindPort}`)
);

module.exports = signMessage;
