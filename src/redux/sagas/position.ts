import { take, race, call, put, delay, cancelled } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import { action } from "redux/actions";
import { receivePositionMessage } from "redux/actions/position";
import { CONNECT_WEBSOCKET, DISCONNECT_WEBSOCKET } from "redux/actions/websocket";
import { receiveMargin } from "redux/actions/margin";
import { receiveOrder } from "redux/actions/order";

const isProdEnv = process.env.NODE_ENV === "production";
const proxyHost = process.env.REACT_APP_DOMAIN || "localhost";
const proxyPort = process.env.REACT_APP_WEBSOCKET_PROXY_PORT || 8443;

let socket: WebSocket;
const socketUrl = isProdEnv ? `wss://${proxyHost}/ws` : `ws://${proxyHost}:${proxyPort}`;

const connectWebsocket = async () => {
  socket = new WebSocket(socketUrl);

  return new Promise((resolve) => {
    socket.onopen = () => resolve(socket);
  });
};

// const disconnectWebsocket = () => {};

const createSocketChannel = (socket: WebSocket) =>
  // @ts-ignore
  eventChannel((emitter: any) => {
    const messageHandler = (data: any) => emitter(data);

    socket.onmessage = (event: any) => {
      const { data, action, table } = JSON.parse(event.data);

      switch (table) {
        case "position":
          return messageHandler({ position: data, bitmexAction: action });

        case "margin":
          return messageHandler({ margin: data, bitmexAction: action });

        case "order":
          return messageHandler({ order: data, bitmexAction: action });

        default:
          return messageHandler({ default: data, bitmexAction: action });
      }
    };

    return () => socket.close();
  });

function* positionChannelWorker() {
  try {
    const { connected, timeout } = yield race({
      connected: call(connectWebsocket),
      timeout: delay(5000),
    });

    console.log("%c connected in positionChannelWorker()", "color: green;", connected);
    console.log("%c timeout in positionChannelWorker()", "color: red;", timeout);

    if (timeout) yield put(action(DISCONNECT_WEBSOCKET));

    const socket = yield call(connectWebsocket);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
      const { position, margin, bitmexAction, order } = yield take(socketChannel);

      if (position) yield put(receivePositionMessage(position, bitmexAction));
      else if (margin) yield put(receiveMargin(margin, bitmexAction));
      else if (order) yield put(receiveOrder(order, bitmexAction));
    }
  } catch (error) {
    console.log(error);
    // yield put(action(RECEIVE_POSITION_ERROR, { error }))
  } finally {
    console.log("%c canceled", "color: blue;", yield cancelled());
    if (yield cancelled()) {
      socket.close();
      yield put(action(DISCONNECT_WEBSOCKET));
    }
  }
}

function* positionChannelWatcher() {
  while (true) {
    yield take(CONNECT_WEBSOCKET);
    yield race({
      task: call(positionChannelWorker),
      cancel: take(DISCONNECT_WEBSOCKET),
    });
  }
}

export default positionChannelWatcher;
