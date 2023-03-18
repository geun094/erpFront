import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_APPROVERS = 'approver/GET_APPROVERS';

const actions = createActions({
  [GET_APPROVERS]: () => {}
});

const approverReducer = handleActions(
  {
    [GET_APPROVERS]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default approverReducer;

