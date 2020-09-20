// borrowed shamelessly from https://github.com/nice-table/bitmex-scaled-orders/blob/master/backend/restProxy.js

const Express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const httpProxy = require("http-proxy");
require("dotenv").config();

const app = Express();
const proxy = httpProxy.createProxyServer({});

const HOST = process.env.NODE_PROXY_HOST || "localhost";
const PORT = process.env.NODE_PROXY_PORT || 8080;

const {
  REACT_APP_API_KEY_TN,
  REACT_APP_API_KEY_MN,
  REACT_APP_API_SECRET_MN,
  REACT_APP_API_SECRET_TN,
} = process.env;

const isProdEnv = process.env.NODE_ENV === "production";

const baseURL = `https://${isProdEnv ? "www" : "testnet"}.bitmex.com`;
const key = isProdEnv ? REACT_APP_API_KEY_MN : REACT_APP_API_KEY_TN;
const secret = isProdEnv ? REACT_APP_API_SECRET_MN : REACT_APP_API_SECRET_TN;

const signMessage = (req, body) => {
  const verb = req.method;
  const expires = Date.now() + 500;
  const url = req.url;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(verb + url + expires + body)
    .digest("hex");

  return { signature, expires };
};

proxy.on("proxyReq", (proxyReq, req, res, options) => {
  let bodyData = "";
  if (req.body) bodyData = JSON.stringify(req.body);

  const { signature, expires } = signMessage(req, bodyData);

  proxyReq.setHeader("api-expires", expires);
  proxyReq.setHeader("api-key", key);
  proxyReq.setHeader("api-signature", signature);
  proxyReq.setHeader("Content-Type", "application/json");
  proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

  proxyReq.write(bodyData);
});

app.use(bodyParser.json());
app.use((req, res) => {
  delete req.headers["origin"];
  delete req.headers["referer"];
  delete req.headers["host"];

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length,api-expires,api-key,api-signature"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");

  proxy.web(req, res, { target: baseURL });
});

app.listen(PORT, HOST, () => console.log(`Proxy running on ${HOST}:${PORT}`));
