import { action } from ".";
import { BitmexError } from "types";
import OrderFull from "entities/OrderFull";

export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const PLACE_ORDER = "PLACE_ORDER";
export const SUCCESS_PLACE_ORDER = "SUCCESS_PLACE_ORDER";
export const FAILURE_PLACE_ORDER = "FAILURE_PLACE_ORDER";

export const CANCEL_ORDER = "CANCEL_ORDER";
export const SUCCESS_CANCEL_ORDER = "SUCCESS_CANCEL_ORDER";
export const FAILURE_CANCEL_ORDER = "FAILURE_CANCEL_ORDER";
export const CLEAR_CANCELED_ORDER = "CLEAR_CANCELED_ORDER";

export const receiveOrder = (order: any, bitmexAction: string) =>
  action(RECEIVE_ORDER, { order, bitmexAction });

// ToDo: propper typing
export const successPlaceOrder = (response: any) =>
  action(SUCCESS_PLACE_ORDER, { order: response });

export const failurePlaceOrder = (error: BitmexError) => action(FAILURE_PLACE_ORDER, { error });

export const successCancelOrder = (order: OrderFull) => action(SUCCESS_CANCEL_ORDER, { order });

export const failureCancelOrder = (order: OrderFull, error: BitmexError) =>
  action(FAILURE_CANCEL_ORDER, { order, error });
