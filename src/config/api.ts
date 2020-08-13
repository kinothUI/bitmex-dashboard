const {
  REACT_APP_BITMEX_URL_TN,
  REACT_APP_BITMEX_URL_MN,
  REACT_APP_API_KEY_TN,
  REACT_APP_API_KEY_MN,
  REACT_APP_API_SECRET_MN,
  REACT_APP_API_SECRET_TN,
} = process.env;

const ENDPOINT = "/realtime";
const VERB = "GET";
const EXPIRES = Date.now() + 50;

export const getBitmexCredentials = (mainnet: boolean) =>
  mainnet
    ? {
        url: REACT_APP_BITMEX_URL_MN,
        endpoint: ENDPOINT,
        verb: VERB,
        key: REACT_APP_API_KEY_MN,
        secret: REACT_APP_API_SECRET_MN,
        expires: EXPIRES,
      }
    : {
        url: REACT_APP_BITMEX_URL_TN,
        endpoint: ENDPOINT,
        verb: VERB,
        key: REACT_APP_API_KEY_TN,
        secret: REACT_APP_API_SECRET_TN,
        expires: EXPIRES,
      };
