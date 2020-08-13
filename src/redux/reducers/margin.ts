import _ from "lodash";
import { AnyAction } from "redux";

import { SingleTableState } from "types";
import MarginFull from "entities/MarginFull";
import { singleTableDefaultState, updateSingleEntity } from "redux/reducers";
import { BITMEX_PARTIAL, BITMEX_UPDATE } from "redux/actions";
import { RECEIVE_MARGIN } from "redux/actions/margin";

function marginReducer(
  state: SingleTableState<MarginFull> = singleTableDefaultState(),
  action: AnyAction
): SingleTableState<MarginFull> {
  switch (action.type) {
    case RECEIVE_MARGIN:
      switch (action.bitmexAction) {
        case BITMEX_PARTIAL:
          return { ...state, content: action.margin, isLoading: false };

        case BITMEX_UPDATE:
          const update = action.margin[0];
          const content = updateSingleEntity(state.content[0], update, 0, state.content);

          return _.assign({}, { ...state, content, isLoading: false });
        default:
          return state;
      }

    default:
      return state;
  }
}

export default marginReducer;
