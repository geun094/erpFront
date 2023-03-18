import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_SALE     = 'storage/GET_SALE';
export const GET_SALES    = 'storage/GET_SALES';
export const POST_SALE    = 'storage/POST_SALE';
export const PUT_SALE     = 'storage/PUT_SALE';
export const DELETE_SALE  = 'storage/DELETE_SALE';
export const GET_SALELIST = 'storage/GET_SALELIST';
;

const actions = createActions({
  [GET_SALE]: () => {},
  [GET_SALES]: () => {},
  [PUT_SALE]: () => {},
  [POST_SALE]: () => {},
  [DELETE_SALE]: () => {},
  [GET_SALELIST]: () => {}
});

const storageReducer = handleActions(
  {
    [GET_SALE]: (state, { payload }) => {
      return payload;
    },
    [GET_SALES]: (state, { payload }) => {
      return payload;
    },
    [PUT_SALE]: (state, { payload }) => {
      return payload;
    },
    [POST_SALE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_SALE]: (state, { payload }) => {
      return payload;
    },
    [GET_SALELIST]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default storageReducer;

