import { callApi, Endpoint, HttpMethod } from "services/api";

export const fetchPlaceOrder = (body: any) => callApi(Endpoint.order, HttpMethod.POST, body);

export const fetchCancelOrder = (body: any) => callApi(Endpoint.order, HttpMethod.DELETE, body);
