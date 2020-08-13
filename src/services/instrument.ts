import { callApi, Endpoint, HttpMethod } from "services/api";

export const fetchInstrument = () => callApi(Endpoint.instrumentActive, HttpMethod.GET);
