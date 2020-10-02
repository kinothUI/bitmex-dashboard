require("dotenv").config();
const isProdEnv = process.env.NODE_ENV === "production" ? true : false;

const {
  NODE_PROXY_BIND_ADDRESS,
  NODE_REST_PROXY_BIND_PORT,
  NODE_WEBSOCKET_PROXY_BIND_PORT,
  NODE_BITMEX_URL_TN,
  NODE_BITMEX_URL_MN,
  NODE_API_KEY_TN,
  NODE_API_KEY_MN,
  NODE_API_SECRET_MN,
  NODE_API_SECRET_TN,
} = process.env;

module.exports = isProdEnv
  ? {
      url: NODE_BITMEX_URL_MN,
      key: NODE_API_KEY_MN,
      secret: NODE_API_SECRET_MN,
      nodeSocketProxyBindPort: NODE_WEBSOCKET_PROXY_BIND_PORT,
      nodeProxyBindAddress: NODE_PROXY_BIND_ADDRESS,
      nodeRestProxyBindPort: NODE_REST_PROXY_BIND_PORT,
    }
  : {
      url: NODE_BITMEX_URL_TN,
      key: NODE_API_KEY_TN,
      secret: NODE_API_SECRET_TN,
      nodeSocketProxyBindPort: NODE_WEBSOCKET_PROXY_BIND_PORT,
      nodeProxyBindAddress: NODE_PROXY_BIND_ADDRESS,
      nodeRestProxyBindPort: NODE_REST_PROXY_BIND_PORT,
    };
