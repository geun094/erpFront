


import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_TODO    = 'toDo/GET_TODO';
export const GET_TODOS   = 'toDo/GET_TODOS';
export const POST_TODO   = 'toDo/POST_TODO';
export const PUT_TODO   = 'toDo/PUT_TODO';
export const DELETE_TODO  = 'toDo/DELETE_TODO';
;

const actions = createActions({
  [GET_TODO]: () => {},
  [GET_TODOS]: () => {},
  [PUT_TODO]: () => {},
  [POST_TODO]: () => {},
  [DELETE_TODO]: () => {}
});

const todoReducer = handleActions(
  {
    [GET_TODO]: (state, { payload }) => {
      return payload;
    },
    [GET_TODOS]: (state, { payload }) => {
      return payload;
    },
    [PUT_TODO]: (state, { payload }) => {
      return payload;
    },
    [POST_TODO]: (state, { payload }) => {
      return payload;
    },
    [DELETE_TODO]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default todoReducer;



