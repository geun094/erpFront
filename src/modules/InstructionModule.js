import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_INSTRUCTIONS     = 'instruction/GET_INSTRUCTIONS ';
export const POST_INSTRUCTION      = 'instruction/POST_PRODUCT';
export const GET_INSTRUCTION      = 'instruction/GET_INSTRUCTION';
export const PUT_INSTRUCTION     = 'instruction/PUT_INSTRUCTION';
export const DELETE_INSTRUCTION   = 'instruction/DELETE_INSTRUCTION';
;

const actions = createActions({

  [GET_INSTRUCTIONS]: () => {},
  [POST_INSTRUCTION]: () => {},
  [GET_INSTRUCTION]: () => {},
  [PUT_INSTRUCTION]: () => {},
  [DELETE_INSTRUCTION]: () => {}
});

const instructionReducer = handleActions(
  {
    [GET_INSTRUCTIONS]: (state, { payload }) => {
      return payload;
    },
    [POST_INSTRUCTION]: (state, { payload }) => {
      return payload;
    },
    [GET_INSTRUCTION]: (state, { payload }) => {
      return payload;
    },
    [PUT_INSTRUCTION]: (state, { payload }) => {
      return payload;
    },
    [DELETE_INSTRUCTION]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default instructionReducer;

