import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = [
  { 
    cardColor: '',
    headerColor: ''
  }
];

/* 액션 타입 설정 */
export const CHANGE_THEME = 'main/CHANGE_THEME';

/* 테마 관련 액션 함수 */
const actions = createActions({
    [CHANGE_THEME]: () => {}
});

/* 리듀서 함수 */
const mainReducer = handleActions(
    {
        [CHANGE_THEME]: (state, { payload }) => {

            console.log('payload : ', payload);

            return payload;
        }
    },
    initialState
);

export default mainReducer;

