import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_POSITION     = 'position/GET_POSITION';
export const GET_POSITIONS   = 'position/GET_POSITIONS';
export const POST_POSITION   = 'position/POST_POSITION';
export const PUT_POSITION    = 'position/PUT_POSITION';
export const DELETE_POSITION  = 'position/DELETE_POSITION';
;

const actions = createActions({
  [GET_POSITION]: () => {},
  [GET_POSITIONS]: () => {},
  [PUT_POSITION]: () => {},
  [POST_POSITION]: () => {},
  [DELETE_POSITION]: () => {}
});

const positionReducer = handleActions(
  {
    [GET_POSITION]: (state, { payload }) => {
      return payload;
    },
    [GET_POSITIONS]: (state, { payload }) => {
      return payload;
    },
    [PUT_POSITION]: (state, { payload }) => {
      return payload;
    },
    [POST_POSITION]: (state, { payload }) => {
      return payload;
    },
    [DELETE_POSITION]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default positionReducer;

