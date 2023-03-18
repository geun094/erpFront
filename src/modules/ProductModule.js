import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_PRODUCT     = 'product/GET_PRODUCT';
export const GET_PRODUCTS     = 'product/GET_PRODUCTS';
export const POST_PRODUCT     = 'product/POST_PRODUCT';
export const PUT_PRODUCT     = 'product/PUT_PRODUCT';
export const DELETE_PRODUCT     = 'product/DELETE_PRODUCT';
;

const actions = createActions({
  [GET_PRODUCT]: () => {},
  [GET_PRODUCTS]: () => {},
  [POST_PRODUCT]: () => {},
  [PUT_PRODUCT]: () => {},
  [DELETE_PRODUCT]: () => {}
});

const productReducer = handleActions(
  {
    [POST_PRODUCT]: (state, { payload }) => {
      return payload;
    },    
    [GET_PRODUCTS]: (state, { payload }) => {
      return payload;
    },
    [GET_PRODUCT]: (state, { payload }) => {
      return payload;
    },
    [PUT_PRODUCT]: (state, { payload }) => {
      return payload;
    },
    [DELETE_PRODUCT]: (state, { payload }) => {
      return payload;
    }
  },
  initialState
);

export default productReducer;

