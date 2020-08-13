import _ from "lodash";
import { AnyAction } from "redux";

import { SingleTableState } from "types";
import InstrumentFull from "entities/InstrumentFull";
import { singleTableDefaultState } from "redux/reducers";
import { SUCCESS_FETCH_INSTRUMENT, FAILURE_FETCH_INSTRUMENT } from "redux/actions/instrument";

function instrumentReducer(
  state: SingleTableState<InstrumentFull> = singleTableDefaultState(),
  action: AnyAction
): SingleTableState<InstrumentFull> {
  switch (action.type) {
    case SUCCESS_FETCH_INSTRUMENT:
      return _.assign({}, { ...state, content: action.instrument, isLoading: false });

    case FAILURE_FETCH_INSTRUMENT:
      return _.assign({}, { ...state, error: action.error, isLoading: false });
    default:
      return state;
  }
}

export default instrumentReducer;
