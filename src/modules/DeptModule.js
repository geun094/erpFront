import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_DEPTS    = 'dept/GET_DEPTS';
export const GET_DEPTLIST    = 'dept/GET_DEPTLIST';
export const POST_DEPT    = 'dept/POST_DEPT';
export const PUT_DEPT    = 'dept/PUT_DEPT';
export const DELETE_DEPTS    = 'dept/DELETE_DEPTS';
export const DELETE_DEPT    = 'dept/DELETE_DEPT';

const actions = createActions({
  [GET_DEPTS]: () => {},
  [GET_DEPTLIST]: () => {},
  [POST_DEPT]: () => {},
  [PUT_DEPT]: () => {},
  [DELETE_DEPTS]: () => {},
  [DELETE_DEPT]: () => {},
});

const deptReducer = handleActions(
  {
    [GET_DEPTS]: (state, { payload }) => {
      return payload;
    }, 
    [GET_DEPTLIST]: (state, { payload }) => {
      return payload;
    },
    [POST_DEPT]: (state, { payload }) => {
      return payload;
    },
    [PUT_DEPT]: (state, { payload }) => {
      return payload;
    },
    [DELETE_DEPTS]: (state, { payload }) => {
      return payload;
    },
    [DELETE_DEPT]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default deptReducer;

