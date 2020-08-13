import InstrumentFull from "entities/InstrumentFull";
import { action } from ".";
import { BitmexError } from "types";

export const FETCH_INSTRUMENT = "FETCH_INSTRUMENT";
export const SUCCESS_FETCH_INSTRUMENT = "SUCCESS_FETCH_INSTRUMENT";
export const FAILURE_FETCH_INSTRUMENT = "FAILURE_FETCH_INSTRUMENT";

export const successFetchInstrument = (instrument: InstrumentFull) =>
  action(SUCCESS_FETCH_INSTRUMENT, { instrument });

export const failureFetchInstrument = (error: BitmexError) =>
  action(FAILURE_FETCH_INSTRUMENT, { error });
