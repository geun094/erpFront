import {
  GET_STORAGE,
  GET_DEPT,
  GET_DEPTCODES,
  GET_FORWARDING,
  GET_WORK
} from '../modules/DetailModule.js'

export const callStorageDetailAPI = ({ storageCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages/${storageCode}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
        // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
      }
    })
      .then(response => response.json());
    console.log('[StorageAPICalls] callStorageDetailAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[StorageAPICalls] callStorageDeatilAPI SUCCESS');
      dispatch({ type: GET_STORAGE, payload: result.data });

    }
  };
}

/* 부서 상세 내용 */
export const callDeptDetailAPI = ({ deptCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/dept/${deptCode}`;
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
    console.log('[DeptAPICalls] callDeptDetailAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[DeptAPICalls] callDeptDetailAPI SUCCESS');
      console.log('[DeptAPICalls] callDeptDetailAPI RESULT : ', result.data);
      dispatch({ type: GET_DEPT, payload: result.data });
    }
  };
}

/* 부서 최근 코드 조회 */
export const callDeptCodesAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deptCodes`;
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
    console.log('[DeptAPICalls] callDeptCodesAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[DeptAPICalls] callDeptCodesAPI SUCCESS');
      console.log('[DeptAPICalls] callDeptCodesAPI RESULT : ', result.data);
      dispatch({ type: GET_DEPTCODES, payload: result.data });
    }
  };
}

// 출고 1개 조회
export const callForwardingDetailAPI = ({ forwardingCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/forwardings/${forwardingCode}`;
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
    console.log('[WorkAPICalls] callWorkAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[WorkAPICalls] callWorkAPI SUCCESS');
      dispatch({ type: GET_FORWARDING, payload: result.data });
    }
  };
}

// 작업 1개 조회
export const callWorkDetailAPI = ({ workCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/works/${workCode}`;
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
    console.log('[WorkAPICalls] callWorkAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[WorkAPICalls] callWorkAPI SUCCESS');
      dispatch({ type: GET_WORK, payload: result.data });
    }
  };
}