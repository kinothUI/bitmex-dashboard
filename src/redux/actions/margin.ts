import { action } from "redux/actions";

export const RECEIVE_MARGIN = "RECEIVE_MARGIN";

export const receiveMargin = (margin: any, bitmexAction: string) =>
  action(RECEIVE_MARGIN, { margin, bitmexAction });
