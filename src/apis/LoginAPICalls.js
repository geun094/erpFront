import {
  POST_LOGIN,
  GET_INFO,
  PATCH_THEME,
  PATCH_STAMP,
  PATCH_IMG
} from '../modules/LoginModule.js';

export const callLoginAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/auth/login`;
  console.log(form.empCode);
  console.log(form.empPw);
  return async (dispatch, getState) => {
    /* 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능 */
    /* 서버에서 cors 허용을 해주어야 함 */
    /* headers에 Access-Control-Allow-Origin을 *로 해서 모든 도메인에 대해 허용한다. */
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        empCode: form.empCode,
        empPw: form.empPw
      })
    })
      .then(response => response.json());
    console.log('[LoginAPICalls] callLoginAPI RESULT : ', result);
    if (result.status === 200) {
      window.localStorage.setItem('accessToken', result.data.accessToken);
    } else if (result.message === "잘못된 비밀번호입니다.") {
      alert("사번 또는 비밀번호가 잘못되었습니다.");
    } else if (result.message === "존재하지 않는 사원번호입니다.") {
      alert("사번 또는 비밀번호가 잘못되었습니다.");
    }
    dispatch({ type: POST_LOGIN, payload: result });
  };
}

/* 로그인 한 사원 정보 조회 */
export const callLoginInfoAPI = ({ empCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/select/${empCode}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
        // "Authorization": "Bearer " + window.localEstimate.getItem("accessToken")
      }
    })
      .then(response => response.json());
    console.log('[LoginAPICalls] callLoginInfoAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[LoginAPICalls] callLoginInfoAPI SUCCESS');
      dispatch({ type: GET_INFO, payload: result.data });
    }
  };
}

/* 테마 수정 */
export const callThemeModifyAPI = ({ empCode, color }) => {
  console.log('[LoginAPICalls] callThemeModifyAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/theme/${empCode}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: color
    })
      .then(response => response.json());
    console.log('[LoginAPICalls] callThemeModifyAPI RESULT : ', result);
    dispatch({ type: PATCH_THEME, payload: result });
  };
};

/* 도장 수정 */
export const callStampRegistAPI = ({ empCode, form }) => {
  console.log('[LoginAPICalls] callStampRegistAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/stamp/${empCode}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: form
    })
      .then(response => response.json());
    console.log('[LoginAPICalls] callStampRegistAPI RESULT : ', result);
    dispatch({ type: PATCH_STAMP, payload: result });
  };
}

/* 사원 이미지 수정 */
export const callEmpImgModifyAPI = ({ empCode, form }) => {
  console.log('[LoginAPICalls] callEmpImgModifyAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/changeImg/${empCode}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: form
    })
      .then(response => response.json());
    console.log('[LoginAPICalls] callEmpImgModifyAPI RESULT : ', result);
    dispatch({ type: PATCH_IMG, payload: result });
  };
}