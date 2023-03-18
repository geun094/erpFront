import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_FORWARDINGS    = 'work/GET_FORWARDINGS';
export const POST_FORWARDING    = 'work/POST_FORWARDING';
export const PUT_FORWARDING     = 'work/PUT_FORWARDING';
export const DELETE_FORWARDING  = 'work/DELETE_FORWARDING';

const actions = createActions({
    [GET_FORWARDINGS]: () => {},
    [POST_FORWARDING]: () => {},
    [PUT_FORWARDING]: () => {},
    [DELETE_FORWARDING]: () => {},
});

/* 리듀서 */
const forwardingReducer = handleActions(
    {
        [GET_FORWARDINGS]: (state, { payload }) => {
            return payload;
        },
        [POST_FORWARDING]: (state, { payload }) => {
            return payload;
        },
        [PUT_FORWARDING]: (state, { payload }) => {
            return payload;
        },
        [DELETE_FORWARDING]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default forwardingReducer;
