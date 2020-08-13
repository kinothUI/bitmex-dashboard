import { takeLatest, call, put } from "redux-saga/effects";
import {
  PLACE_ORDER,
  CANCEL_ORDER,
  failurePlaceOrder,
  successPlaceOrder,
  successCancelOrder,
  failureCancelOrder,
} from "redux/actions/order";
import { AnyAction } from "redux";
import { fetchPlaceOrder, fetchCancelOrder } from "services/order";

function* placeOrderWorker(action: AnyAction) {
  const { response, error } = yield call(fetchPlaceOrder, action.order);

  if (error) yield put(failurePlaceOrder(error));
  else yield put(successPlaceOrder(response));
}

function* cancelOrderWorker(action: AnyAction) {
  const { response, error } = yield call(fetchCancelOrder, action.order);

  if (error) yield put(failureCancelOrder(response, error));
  else yield put(successCancelOrder(response));
}

export function* placeOrderWatcher() {
  yield takeLatest(PLACE_ORDER, placeOrderWorker);
}

export function* cancelOrderWatcher() {
  yield takeLatest(CANCEL_ORDER, cancelOrderWorker);
}
