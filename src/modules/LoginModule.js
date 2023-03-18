import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_LOGIN = 'login/POST_LOGIN';
export const GET_INFO = 'login/GET_INFO';
export const PATCH_THEME = 'emp/PATCH_THEME';
export const PATCH_STAMP = 'emp/PATCH_STAMP';
export const PATCH_IMG = 'emp/PATCH_STAMP';

const actions = createActions({
  [POST_LOGIN]: () => { },
  [GET_INFO]: () => { },
  [PATCH_THEME]: () => { },
  [PATCH_STAMP]: () => { },
  [PATCH_IMG]: () => { }
});

const loginReducer = handleActions(
  {
    [POST_LOGIN]: (state, { payload }) => {
      return payload;
    },
    [GET_INFO]: (state, { payload }) => {
      return payload;
    },
    [PATCH_THEME]: (state, { payload }) => {
      return payload;
    },
    [PATCH_STAMP]: (state, { payload }) => {
      return payload;
    },
    [PATCH_IMG]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default loginReducer;

