import { combineReducers, Reducer } from "redux";

import { SingleTableState, WebsocketState, SingleEntity } from "types";
import websocketReducer from "redux/reducers/websocket";
import positionReducer from "redux/reducers/position";
import marginReducer from "redux/reducers/margin";
import instrumentReducer from "redux/reducers/instrument";
import orderReducer from "redux/reducers/order";
import MarginFull from "entities/MarginFull";
import PositionFull from "entities/PositionFull";
import OrderFull from "entities/OrderFull";

export const singleTableDefaultState = (): SingleTableState<any> => ({
  content: [],
  isLoading: true,
  error: {
    name: "",
    message: "",
  },
});

export const websocketDefaultState = (): WebsocketState => ({
  open: false,
});

/**
 * Updates a Position Object on each property received by dispatched action
 * @todo better typing
 */
export function updateSingleEntity(
  entityToUpdate: PositionFull,
  update: any,
  index: number,
  content: PositionFull[]
): PositionFull[];
export function updateSingleEntity(
  entityToUpdate: MarginFull,
  update: any,
  index: number,
  content: MarginFull[]
): MarginFull[];
export function updateSingleEntity(
  entityToUpdate: OrderFull,
  update: any,
  index: number,
  content: OrderFull[]
): OrderFull[];
export function updateSingleEntity(
  entityToUpdate: SingleEntity,
  update: any,
  index: number,
  content: SingleEntity[]
): SingleEntity[] {
  const mapPositionToUpdate = new Map(Object.entries(entityToUpdate));
  const mapUpdate = new Map(Object.entries(update));

  mapUpdate.forEach((value: any, key: string) => mapPositionToUpdate.set(key, value));
  const entity = Object.fromEntries(mapPositionToUpdate) as SingleEntity;
  content.splice(index, 1, entity);

  return content;
}

const rootReducer: Reducer<any> = combineReducers({
  websocket: websocketReducer,
  position: positionReducer,
  margin: marginReducer,
  order: orderReducer,
  instrument: instrumentReducer,
});

/**
 *
 * Return the combined App Reducer
 *
 * Can also handle RESET_STORE Action
 *
 */
// const rootReducer = (state: StoreState, action: AnyAction) => {
//   return appReducer(state, action);
// };

export default rootReducer;
