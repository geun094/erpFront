import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_REQUEST     = 'request/GET_REQUEST';
export const GET_REQUESTS    = 'request/GET_REQUESTS';
export const POST_REQUEST    = 'request/POST_REQUEST';
export const PUT_REQUEST     = 'request/PUT_REQUEST';
export const DELETE_REQUEST  = 'request/DELETE_REQUEST';
;

const actions = createActions({
  [GET_REQUEST]: () => {},
  [GET_REQUESTS]: () => {},
  [PUT_REQUEST]: () => {},
  [POST_REQUEST]: () => {},
  [DELETE_REQUEST]: () => {}
});

const requestReducer = handleActions(
  {
    [GET_REQUEST]: (state, { payload }) => {
      return payload;
    },
    [GET_REQUESTS]: (state, { payload }) => {
      return payload;
    },
    [PUT_REQUEST]: (state, { payload }) => {
      return payload;
    },
    [POST_REQUEST]: (state, { payload }) => {
      return payload;
    },
    [DELETE_REQUEST]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default requestReducer;