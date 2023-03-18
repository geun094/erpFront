import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_APPROVALLINE = 'approvalLine/GET_APPROVALLINE';
export const PATCH_APPROVALLINE = 'approvalLine/PATCH_APPROVALLINE';

const actions = createActions({
  [GET_APPROVALLINE]: () => {},
  [PATCH_APPROVALLINE]: () => {}
});

const approvalLineReducer = handleActions(
  {
    [GET_APPROVALLINE]: (state, { payload }) => {
      return payload;
    },
    [PATCH_APPROVALLINE]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default approvalLineReducer;

