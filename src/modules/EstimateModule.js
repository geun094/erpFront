import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ESTIMATE     = 'estimate/GET_ESTIMATE';
export const GET_ESTIMATES    = 'estimate/GET_ESTIMATES';
export const POST_ESTIMATE    = 'estimate/POST_ESTIMATE';
export const PUT_ESTIMATE     = 'estimate/PUT_ESTIMATE';
export const DELETE_ESTIMATE  = 'estimate/DELETE_ESTIMATE';
;

const actions = createActions({
  [GET_ESTIMATE]: () => {},
  [GET_ESTIMATES]: () => {},
  [PUT_ESTIMATE]: () => {},
  [POST_ESTIMATE]: () => {},
  [DELETE_ESTIMATE]: () => {}
});

const estimateReducer = handleActions(
  {
    [GET_ESTIMATE]: (state, { payload }) => {
      return payload;
    },
    [GET_ESTIMATES]: (state, { payload }) => {
      return payload;
    },
    [PUT_ESTIMATE]: (state, { payload }) => {
      return payload;
    },
    [POST_ESTIMATE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_ESTIMATE]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default estimateReducer;

