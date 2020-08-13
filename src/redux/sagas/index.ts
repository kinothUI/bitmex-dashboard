// import { Effect, call, all } from "redux-saga/effects";
import { all } from "redux-saga/effects";
import positionChannelWatcher from "redux/sagas/position";
import { placeOrderWatcher, cancelOrderWatcher } from "redux/sagas/order";
import { fetchInstrumentWatcher } from "redux/sagas/instrument";

function* rootSaga() {
  yield all([
    positionChannelWatcher(),
    placeOrderWatcher(),
    cancelOrderWatcher(),
    fetchInstrumentWatcher(),
  ]);
}

// function combineWatchers(): Effect[] {
//   const watchers: Effect[] = [];

//   watchers.push(call(positionChannelWatcher));

//   return watchers;
// }

export default rootSaga;
