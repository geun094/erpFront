import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_WITHDRAW     = 'withdraw/GET_WITHDRAW';
export const GET_WITHDRAWS    = 'withdraw/GET_WITHDRAWS';
export const POST_WITHDRAW    = 'withdraw/POST_WITHDRAW';
export const PUT_WITHDRAW     = 'withdraw/PUT_WITHDRAW';
export const DELETE_WITHDRAW  = 'withdraw/DELETE_WITHDRAW';
;

const actions = createActions({
  [GET_WITHDRAW]: () => {},
  [GET_WITHDRAWS]: () => {},
  [PUT_WITHDRAW]: () => {},
  [POST_WITHDRAW]: () => {},
  [DELETE_WITHDRAW]: () => {}
});

const withdrawReducer = handleActions(
  {
    [GET_WITHDRAW]: (state, { payload }) => {
      return payload;
    },
    [GET_WITHDRAWS]: (state, { payload }) => {
      return payload;
    },
    [PUT_WITHDRAW]: (state, { payload }) => {
      return payload;
    },
    [POST_WITHDRAW]: (state, { payload }) => {
      return payload;
    },
    [DELETE_WITHDRAW]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default withdrawReducer;

