import PositionFull from "entities/PositionFull";
import MarginFull from "entities/MarginFull";
import OrderFull from "entities/OrderFull";
import InstrumentFull from "entities/InstrumentFull";

/**
 * Redux Store State
 */
export interface StoreState {
  // execution: any;
  // instrument: any;
  // margin: any;
  // orderBook: any;
  // order: any;
  position: SingleTableState<PositionFull>;
  // quote: any;
  // trade: any;
  websocket: WebsocketState;
  margin: SingleTableState<MarginFull>;
  order: SingleTableState<OrderFull>;
  instrument: SingleTableState<InstrumentFull>;
}

export interface WebsocketState {
  open: boolean;
}

export interface BitmexError {
  name: string;
  message: string;
}

export interface SingleTableState<G> {
  content: G[];
  isLoading: boolean;
  error?: BitmexError;
}

export type SingleEntity = PositionFull | MarginFull | OrderFull;

export interface DataTableColumn {
  text: string | React.ReactNode;
}
