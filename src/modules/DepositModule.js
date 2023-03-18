import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_DEPOSIT     = 'deposit/GET_DEPOSIT';
export const GET_DEPOSITS    = 'deposit/GET_DEPOSITS';
export const POST_DEPOSIT    = 'deposit/POST_DEPOSIT';
export const PUT_DEPOSIT     = 'deposit/PUT_DEPOSIT';
export const DELETE_DEPOSIT  = 'deposit/DELETE_DEPOSIT';
;

const actions = createActions({
  [GET_DEPOSIT]: () => {},
  [GET_DEPOSITS]: () => {},
  [PUT_DEPOSIT]: () => {},
  [POST_DEPOSIT]: () => {},
  [DELETE_DEPOSIT]: () => {}
});

const depositReducer = handleActions(
  {
    [GET_DEPOSIT]: (state, { payload }) => {
      return payload;
    },
    [GET_DEPOSITS]: (state, { payload }) => {
      return payload;
    },
    [PUT_DEPOSIT]: (state, { payload }) => {
      return payload;
    },
    [POST_DEPOSIT]: (state, { payload }) => {
      return payload;
    },
    [DELETE_DEPOSIT]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default depositReducer;

