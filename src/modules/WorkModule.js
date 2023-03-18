import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_WORKS    = 'work/GET_EMPLOYEES';
export const POST_WORK    = 'work/POST_EMPLOYEE';
export const PUT_WORK     = 'work/PUT_EMPLOYEE';
export const DELETE_WORK  = 'work/DELETE_EMPLOYEE';

const actions = createActions({
    [GET_WORKS]: () => {},
    [POST_WORK]: () => {},
    [PUT_WORK]: () => {},
    [DELETE_WORK]: () => {},
});

/* 리듀서 */
const workReducer = handleActions(
    {
        [GET_WORKS]: (state, { payload }) => {
            return payload;
        },
        [POST_WORK]: (state, { payload }) => {
            return payload;
        },
        [PUT_WORK]: (state, { payload }) => {
            return payload;
        },
        [DELETE_WORK]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default workReducer;
