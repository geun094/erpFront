import { createActions, handleActions } from "redux-actions";

const initialState = [];
export const GET_STORAGE     = 'storage/GET_STORAGE';
export const GET_DEPT        = 'dept/GET_DEPT';
export const GET_DEPTCODES   = 'dept/GET_DEPTCODES';
export const GET_WORK        = 'work/GET_WORK';
export const GET_FORWARDING        = 'forwarding/GET_FORWARDING';

const actions = createActions({
  [GET_STORAGE]: () => {},
  [GET_DEPT]: () => {},
  [GET_DEPTCODES]: () => {},
  [GET_WORK]: () => {},
  [GET_FORWARDING]: () => {}
});

const detailReducer = handleActions(
  { [GET_STORAGE]: (state, { payload }) => { 
    return payload; 
  },
  [GET_DEPT]: (state, { payload }) => {
    return payload;
  },
  [GET_DEPTCODES]: (state, { payload }) => {
    return payload;
  },
  [GET_FORWARDING]: (state, { payload }) => {
    return payload;
  },
  [GET_WORK]: (state, { payload }) => {
    return payload;
  }
}, initialState);

export default detailReducer;

