import { AnyAction } from "redux";

import { WebsocketState } from "types";
import { websocketDefaultState } from "redux/reducers";
import { CONNECT_WEBSOCKET, DISCONNECT_WEBSOCKET } from "redux/actions/websocket";

function websocketReducer(state: WebsocketState = websocketDefaultState(), action: AnyAction) {
  switch (action.type) {
    case CONNECT_WEBSOCKET:
      return { ...state, open: true };

    case DISCONNECT_WEBSOCKET:
      return { ...state, open: false };

    default:
      return state;
  }
}

export default websocketReducer;
