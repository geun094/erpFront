import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PLACE     = 'place/GET_PLACE';
export const GET_PLACES    = 'place/GET_PLACES';
export const POST_PLACE    = 'place/POST_PLACE';
export const PUT_PLACE     = 'place/PUT_PLACE';
export const DELETE_PLACE  = 'place/DELETE_PLACE';
;

const actions = createActions({
  [GET_PLACE]: () => {},
  [GET_PLACES]: () => {},
  [PUT_PLACE]: () => {},
  [POST_PLACE]: () => {},
  [DELETE_PLACE]: () => {}
});

const placeReducer = handleActions(
  {
    [GET_PLACE]: (state, { payload }) => {
      return payload;
    },
    [GET_PLACES]: (state, { payload }) => {
      return payload;
    },
    [PUT_PLACE]: (state, { payload }) => {
      return payload;
    },
    [POST_PLACE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_PLACE]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default placeReducer;