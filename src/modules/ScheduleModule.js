import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_SCHEDULE     = 'storage/GET_SCHEDULE';
export const GET_SCHEDULES    = 'storage/GET_SCHEDULES';
export const POST_SCHEDULE    = 'storage/POST_SCHEDULE';
export const PUT_SCHEDULE     = 'storage/PUT_SCHEDULE';
export const DELETE_SCHEDULE  = 'storage/DELETE_SCHEDULE';
export const GET_SCHEDULELIST = 'storage/GET_SCHEDULELIST';
;

const actions = createActions({
  [GET_SCHEDULE]: () => {},
  [GET_SCHEDULES]: () => {},
  [PUT_SCHEDULE]: () => {},
  [POST_SCHEDULE]: () => {},
  [DELETE_SCHEDULE]: () => {},
  [GET_SCHEDULELIST]: () => {}
});

const storageReducer = handleActions(
  {
    [GET_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [GET_SCHEDULES]: (state, { payload }) => {
      return payload;
    },
    [PUT_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [POST_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [GET_SCHEDULELIST]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default storageReducer;

