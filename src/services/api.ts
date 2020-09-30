import _ from "lodash";

const isProdEnv = process.env.NODE_ENV === "production";
const proxyHost = isProdEnv
  ? process.env.REACT_APP_DOMAIN
  : process.env.REACT_APP_PROXY_HOST || "localhost";
const proxyPort = process.env.REACT_APP_PROXY_PORT || 8181;

export interface RequestHeaders {
  [name: string]: string;
}

interface ApiResult {
  response?: any;
  error?: {
    message: string;
    name: string;
  };
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum Endpoint {
  instrument = "/api/v1/instrument",
  instrumentActive = "/api/v1/instrument/active",
  orderBookL2 = "/api/v1/orderBookL2",
  quote = "/api/v1/quote",
  trade = "/api/v1/trade",
  execution = "/api/v1/execution",
  margin = "/api/v1/margin",
  order = "/api/v1/order",
  position = "/api/v1/position",
}

const JSON_HEADERS: RequestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const callApi = (endpoint: Endpoint, method: HttpMethod, body?: any): Promise<ApiResult> => {
  if (!endpoint) throw new Error("missing Endpoint!");

  const url = isProdEnv
    ? `https://${proxyHost}${endpoint}`
    : `http://${proxyHost}:${proxyPort}${endpoint}`;

  console.log("%c url in fetchApi", "color: yellow;", url);

  if (body) body = JSON.stringify(body);
  console.log("%c body in fetchApi", "color: yellow;", body);

  const headers: RequestHeaders = _.assign({}, JSON_HEADERS);

  const init = { method, headers, body };
  console.log("%c init in fetchApi", "color: yellow;", init);

  return fetch(url, init)
    .then((response) => {
      if (response.ok) {
        console.log("%c response in callApi", "color: green", response);

        return response.json().then((json) => json);
      }

      // response not 200 means there was something wrong placing the order
      // bitmex sends the error message as json with http 4xx
      return response
        .json()
        .then(({ error }) =>
          Promise.reject({ error: { name: error.name, message: error.message } })
        );
    })
    .then(
      (response) => ({ response }),
      ({ error }) => {
        console.log("%c error in callApi", "color: red;", error);
        return { error: { name: error.name, message: error.message } };
      }
    );
};
