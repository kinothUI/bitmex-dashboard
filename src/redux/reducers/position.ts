import _ from "lodash";
import { AnyAction } from "redux";

import { SingleTableState } from "types";
import PositionFull from "entities/PositionFull";
import { singleTableDefaultState, updateSingleEntity } from "redux/reducers";
import { BITMEX_PARTIAL, BITMEX_UPDATE } from "redux/actions";
import { RECEIVE_POSITION } from "redux/actions/position";

function positionReducer(
  state: SingleTableState<PositionFull> = singleTableDefaultState(),
  action: AnyAction
): SingleTableState<PositionFull> {
  switch (action.type) {
    case RECEIVE_POSITION:
      switch (action.bitmexAction) {
        case BITMEX_PARTIAL:
          return { ...state, content: action.position, isLoading: false };

        case BITMEX_UPDATE:
          const update = action.position[0];
          // positions are unique by symbol
          const index = state.content.findIndex((item) => item.symbol === update.symbol);
          // when posting a new order for an symbol where no position was opened yet,
          // bitmex sends an initial position message what causes the app to crash.
          // therefore testing on -1 not to invoke updateSingleEntity() Function.
          // There might be a more elegant way to handle this behaviour but this works for now :-)
          if (index === -1) return _.assign({}, { ...state, isLoading: false });

          const positionToUpdate = state.content[index];
          const content = updateSingleEntity(positionToUpdate, update, index, state.content);

          return _.assign({}, { ...state, content, isLoading: false });
        default:
          return state;
      }
    default:
      return state;
  }
}

export default positionReducer;
