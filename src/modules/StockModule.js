import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_STOCK     = 'storage/GET_STOCK';
export const GET_STOCKS    = 'storage/GET_STOCKS';
export const POST_STOCK    = 'storage/POST_STOCK';
export const PUT_STOCK     = 'storage/PUT_STOCK';
export const DELETE_STOCK  = 'storage/DELETE_STOCK';
export const GET_STOCKLIST = 'storage/GET_STOCKLIST';
;

const actions = createActions({
  [GET_STOCK]: () => {},
  [GET_STOCKS]: () => {},
  [PUT_STOCK]: () => {},
  [POST_STOCK]: () => {},
  [DELETE_STOCK]: () => {},
  [GET_STOCKLIST]: () => {}
});

const storageReducer = handleActions(
  {
    [GET_STOCK]: (state, { payload }) => {
      return payload;
    },
    [GET_STOCKS]: (state, { payload }) => {
      return payload;
    },
    [PUT_STOCK]: (state, { payload }) => {
      return payload;
    },
    [POST_STOCK]: (state, { payload }) => {
      return payload;
    },
    [DELETE_STOCK]: (state, { payload }) => {
      return payload;
    },
    [GET_STOCKLIST]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default storageReducer;

