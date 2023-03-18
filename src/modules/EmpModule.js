import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_EMPLOYEE     = 'emp/GET_EMPLOYEE';
export const GET_EMPLOYEES    = 'emp/GET_EMPLOYEES';
export const POST_EMPLOYEE    = 'emp/POST_EMPLOYEE';
export const PUT_EMPLOYEE     = 'emp/PUT_EMPLOYEE';
export const DELETE_EMPLOYEE  = 'emp/DELETE_EMPLOYEE';

const actions = createActions({
    [GET_EMPLOYEE]: () => {},
    [GET_EMPLOYEES]: () => {},
    [PUT_EMPLOYEE]: () => {},
    [POST_EMPLOYEE]: () => {},
    [DELETE_EMPLOYEE]: () => {}

});

/* 리듀서 */
const empReducer = handleActions(
    {
        [GET_EMPLOYEE]: (state, { payload }) => {
            return payload;
        },
        [GET_EMPLOYEES]: (state, { payload }) => {
            return payload;
        },
        [PUT_EMPLOYEE]: (state, { payload }) => {
            return payload;
        },
        [POST_EMPLOYEE]: (state, { payload }) => {
            return payload;
        },
        [DELETE_EMPLOYEE]: (state, { payload }) => {
            return payload;
        }

    },
    initialState
);

export default empReducer;
