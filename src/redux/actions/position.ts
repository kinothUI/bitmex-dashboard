import { action } from "redux/actions";

export const RECEIVE_POSITION = "RECEIVE_POSITION";

export const receivePositionMessage = (position: any, bitmexAction: string) =>
  action(RECEIVE_POSITION, { position, bitmexAction });
