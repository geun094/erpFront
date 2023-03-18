import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_CLIENTS = 'client/GET_CLIENTS';
export const GET_CLIENT = 'client/GET_CLIENT';
export const POST_CLIENT = 'client/POST_CLIENT';
export const PUT_CLIENT = 'client/PUT_CLIENT';
export const DELETE_CLIENTS = 'client/DELETE_CLIENTS';
export const DELETE_CLIENT = 'client/DELETE_CLIENT';

const actions = createActions({
    [GET_CLIENTS]: () => {},
    [GET_CLIENT]: () => {},
    [POST_CLIENT]: () => {},
    [PUT_CLIENT]: () => {},
    [DELETE_CLIENTS]: () => {},
    [DELETE_CLIENT]: () => {}



});

const clientReducer = handleActions(
    {
      [GET_CLIENTS]: (state, { payload }) => {
        return payload;
      }, 
      [GET_CLIENT]: (state, { payload }) => {
        return payload;
      }, 
      [POST_CLIENT]: (state, { payload }) => {
        return payload;
      },
      [PUT_CLIENT]: (state, { payload }) => {
        return payload;
      },
      [DELETE_CLIENTS]: (state, { payload }) => {
        return payload;
      },
      [DELETE_CLIENT]: (state, { payload }) => {
        return payload;
      }

    },
    initialState
);

export default clientReducer;