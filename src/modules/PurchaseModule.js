import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PURCHASE     = 'storage/GET_PURCHASE';
export const GET_PURCHASES    = 'storage/GET_PURCHASES';
export const POST_PURCHASE    = 'storage/POST_PURCHASE';
export const PUT_PURCHASE     = 'storage/PUT_PURCHASE';
export const DELETE_PURCHASE = 'storage/DELETE_PURCHASE';
export const GET_PURCHASELIST = 'storage/GET_PURCHASELIST';
;

const actions = createActions({
  [GET_PURCHASE]: () => {},
  [GET_PURCHASES]: () => {},
  [PUT_PURCHASE]: () => {},
  [POST_PURCHASE]: () => {},
  [DELETE_PURCHASE]: () => {},
  [GET_PURCHASELIST]: () => {}
});

const storageReducer = handleActions(
  {
    [GET_PURCHASE]: (state, { payload }) => {
      return payload;
    },
    [GET_PURCHASES]: (state, { payload }) => {
      return payload;
    },
    [PUT_PURCHASE]: (state, { payload }) => {
      return payload;
    },
    [POST_PURCHASE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_PURCHASE]: (state, { payload }) => {
      return payload;
    },
    [GET_PURCHASELIST]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default storageReducer;

