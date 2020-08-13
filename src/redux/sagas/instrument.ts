import { takeLatest, call, put } from "redux-saga/effects";
import {
  FETCH_INSTRUMENT,
  successFetchInstrument,
  failureFetchInstrument,
} from "redux/actions/instrument";
import { fetchInstrument } from "services/instrument";

function* fetchInstrumentWorker() {
  const { response, error } = yield call(fetchInstrument);

  if (error) yield put(failureFetchInstrument(error));
  else yield put(successFetchInstrument(response));
}

export function* fetchInstrumentWatcher() {
  yield takeLatest(FETCH_INSTRUMENT, fetchInstrumentWorker);
}
