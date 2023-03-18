import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ORDER     = 'orders/GET_ORDER';
export const GET_ORDERS    = 'orders/GET_ORDERS';
export const POST_ORDER    = 'orders/POST_ORDER';
export const PUT_ORDER     = 'orders/PUT_ORDER';
export const DELETE_ORDER  = 'orders/DELETE_ORDER';
;

const actions = createActions({
  [GET_ORDER]: () => {},
  [GET_ORDERS]: () => {},
  [PUT_ORDER]: () => {},
  [POST_ORDER]: () => {},
  [DELETE_ORDER]: () => {}
});

const ordersReducer = handleActions(
  {
    [GET_ORDER]: (state, { payload }) => {
      return payload;
    },
    [GET_ORDERS]: (state, { payload }) => {
      return payload;
    },
    [PUT_ORDER]: (state, { payload }) => {
      return payload;
    },
    [POST_ORDER]: (state, { payload }) => {
      return payload;
    },
    [DELETE_ORDER]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default ordersReducer;

