export const action = (type: string, payload?: any) => ({ type, ...payload });

// bitmex websocket actions
export const BITMEX_PARTIAL = "partial";
export const BITMEX_UPDATE = "update";
export const BITMEX_INSERT = "insert";
export const BITMEX_DELETE = "delete";
