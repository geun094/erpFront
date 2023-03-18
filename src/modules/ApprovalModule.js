import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_APPROVALS = 'approval/GET_APPROVALS';
export const GET_APPROVAL = 'approval/GET_APPROVAL';
export const POST_APPROVAL = 'approval/POST_APPROVAL';
export const DELETE_APPROVAL = 'approval/DELETE_APPROVAL';
export const DELETE_APPROVALS = 'approval/DELETE_APPROVALS';
export const PATCH_APPROVAL = 'approval/PATCH_APPROVAL';
export const PUT_APPROVAL = 'approval/PUT_APPROVAL';

const actions = createActions({
  [GET_APPROVALS]: () => {},
  [GET_APPROVAL]: () => {},
  [POST_APPROVAL]: () => {},
  [DELETE_APPROVAL]: () => {},
  [DELETE_APPROVALS]: () => {},
  [PATCH_APPROVAL]: () => {},
  [PUT_APPROVAL]: () => {}
});

const approvalReducer = handleActions(
  {
    [GET_APPROVALS]: (state, { payload }) => {
      return payload;
    },
    [GET_APPROVAL]: (state, { payload }) => {
      return payload;
    },
    [POST_APPROVAL]: (state, { payload }) => {
      return payload;
    },
    [DELETE_APPROVAL]: (state, { payload }) => {
      return payload;
    },
    [DELETE_APPROVALS]: (state, { payload }) => {
      return payload;
    },
    [PATCH_APPROVAL]: (state, { payload }) => {
      return payload;
    },
    [PUT_APPROVAL]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default approvalReducer;

