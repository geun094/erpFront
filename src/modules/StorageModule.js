import { createActions, handleActions } from "redux-actions";

const initialState = [];

// export const GET_STORAGE     = 'storage/GET_STORAGE';
export const GET_STORAGES    = 'storage/GET_STORAGES';
export const POST_STORAGE    = 'storage/POST_STORAGE';
export const PUT_STORAGE     = 'storage/PUT_STORAGE';
export const DELETE_STORAGE  = 'storage/DELETE_STORAGE';
export const GET_STORAGELIST = 'storage/GET_STORAGELIST';
;

const actions = createActions({
  // [GET_STORAGE]: () => {},
  [GET_STORAGES]: () => {},
  [PUT_STORAGE]: () => {},
  [POST_STORAGE]: () => {},
  [DELETE_STORAGE]: () => {},
  [GET_STORAGELIST]: () => {}
});

const storageReducer = handleActions(
  {
    // [GET_STORAGE]: (state, { payload }) => {
    //   return payload;
    // },
    [GET_STORAGES]: (state, { payload }) => {
      return payload;
    },
    [PUT_STORAGE]: (state, { payload }) => {
      return payload;
    },
    [POST_STORAGE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_STORAGE]: (state, { payload }) => {
      return payload;
    },
    [GET_STORAGELIST]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default storageReducer;

