import {
  GET_DEPTS,
  GET_DEPTLIST,
  POST_DEPT,
  PUT_DEPT,
  DELETE_DEPTS,
  DELETE_DEPT,
} from '../modules/DeptModule.js';

/* 부서 전체조회 */
export const callDeptListAPI = ({ currentPage }) => {
  console.log('[DeptAPICalls] callDeptListAPI Call');
  let requestURL;
  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deptList?offset=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deptList`;
  }
  console.log('[DeptAPICalls] requestURL : ', requestURL);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json());
    if (result.status === 200) {
      console.log('[DeptAPICalls] callDeptListAPI RESULT : ', result);
      console.log('[DeptAPICalls] callDeptListAPI RESULT : ', result.data);
      dispatch({ type: GET_DEPTS, payload: result.data });
    }
  };
};

/* 전체 조회(페이징 없음) */
export const callDeptAllListAPI = () => {
  console.log('[DeptAPICalls] callDeptListAPI Call');
  let requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deptSelectList`;
  console.log('[DeptAPICalls] requestURL : ', requestURL);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json());
    if (result.status === 200) {
      console.log('[DeptAPICalls] callDeptListAPI RESULT : ', result);
      console.log('[DeptAPICalls] callDeptListAPI RESULT : ', result.data);
      dispatch({ type: GET_DEPTLIST, payload: result.data });
    }
  };
};

/* 신규 부서 등록 */
export const callDeptRegistAPI = ({ form }) => {
  console.log('[DeptAPICalls] callDeptRegistAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/registDept`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: form
    })
      .then(response => response.json());
    console.log('[DeptAPICalls] callDeptRegistAPI RESULT : ', result);
    dispatch({ type: POST_DEPT, payload: result });
  };
}

/* 부서 수정 */
export const callDeptModifyAPI = ({ form }) => {
  console.log('[DeptAPICalls] callDeptModifyAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/dept`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: form
    })
      .then(response => response.json());
    console.log('[DeptAPICalls] callDeptModifyAPI RESULT : ', result);
    dispatch({ type: PUT_DEPT, payload: result });
  };
};

/* 부서 복수 삭제 */
export const callDeptsDeleteAPI = ({ deptCodes }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deptCodes`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(deptCodes)
    })
      .then(response => response.json());
    console.log('[DeptAPICalls] callDeptsDeleteAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[DeptAPICalls] callDeptsDeleteAPI SUCCESS');
      dispatch({ type: DELETE_DEPTS, payload: result.data })
    } else {
      alert('삭제 불가능한 부서가 있습니다. \n이미 사용중인 부서는 수정만 가능합니다.')
    }
  };
}

/* 부서 하나 삭제 */
export const callDeptDeleteAPI = ({ deptCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/dept/${deptCode}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json());
    console.log('[DeptAPICalls] callDeptDeleteAPI RESULT : ', result);
    console.log('[DeptAPICalls] callDeptDeleteAPI RESULT : ', result.data);
    if (result.status === 200) {
      console.log('[DeptAPICalls] callDeptDeleteAPI SUCCESS: ');
      dispatch({ type: DELETE_DEPT, payload: result.data })
    } else {
      alert('부서 삭제를 실패하였습니다. 해당 부서는 수정만 가능합니다.')
    }
  };
}

/* 부서 검색 */
export const callSearchDeptAPI = ({ search }) => {
  console.log('[DeptAPICalls] callSearchDeptAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/dept/search?s=${search}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json());
    console.log('[DeptAPICalls] callSearchDeptAPI RESULT : ', result);
    dispatch({ type: GET_DEPTS, payload: result.data });
  };
};

