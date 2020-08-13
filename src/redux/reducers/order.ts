import _ from "lodash";
import { AnyAction } from "redux";

import { SingleTableState } from "types";
import OrderFull from "entities/OrderFull";
import { singleTableDefaultState, updateSingleEntity } from "redux/reducers";
import { BITMEX_PARTIAL, BITMEX_UPDATE, BITMEX_INSERT } from "redux/actions";
import {
  RECEIVE_ORDER,
  SUCCESS_PLACE_ORDER,
  FAILURE_PLACE_ORDER,
  CLEAR_CANCELED_ORDER,
} from "redux/actions/order";

function orderReducer(
  state: SingleTableState<OrderFull> = singleTableDefaultState(),
  action: AnyAction
): SingleTableState<OrderFull> {
  switch (action.type) {
    case RECEIVE_ORDER:
      switch (action.bitmexAction) {
        case BITMEX_PARTIAL:
          return { ...state, content: action.order, isLoading: false };

        case BITMEX_INSERT:
          const newContent = state.content.concat(action.order);
          return _.assign({}, { ...state, content: newContent, isLoading: false });

        case BITMEX_UPDATE:
          const update = action.order[0];
          const index = state.content.findIndex((order) => {
            return order.orderID === update.orderID;
          });
          const positionToUpdate = state.content[index];

          // existing order ammended
          const content = updateSingleEntity(positionToUpdate, update, index, state.content);

          return _.assign({}, { ...state, content, isLoading: false });

        case SUCCESS_PLACE_ORDER:
          return _.assign(
            {},
            { ...state, content: state.content.concat(action.order), isLoading: false }
          );

        default:
          return state;
      }

    case FAILURE_PLACE_ORDER:
      return _.assign({}, { ...state, error: action.error });

    case CLEAR_CANCELED_ORDER:
      return _.assign(
        {},
        {
          ...state,
          content: state.content.filter(({ orderID }) => orderID !== action.order.orderID),
        }
      );

    default:
      return state;
  }
}

export default orderReducer;
