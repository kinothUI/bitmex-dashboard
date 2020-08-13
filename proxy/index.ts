const corsProxy = require("cors-anywhere");
require("dotenv").config();

console.log(process.env.NODE_PROXY_HOST);
console.log(process.env.NODE_PROXY_PORT);

const HOST = process.env.NODE_PROXY_HOST || "localhost";
const PORT = process.env.NODE_PROXY_PORT || 8080;

corsProxy
  .createServer({
    originWhiteList: [],
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie"],
  })
  .listen(PORT, HOST, () => {
    console.log(`running cors-proxy on ${HOST}:${PORT}`);
  });
