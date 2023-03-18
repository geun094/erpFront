import {
  GET_APPROVALS,
  GET_APPROVAL,
  POST_APPROVAL,
  DELETE_APPROVAL,
  DELETE_APPROVALS,
  PATCH_APPROVAL,
  PUT_APPROVAL
} from '../modules/ApprovalModule.js';

/* 결재 전체 조회(상태코드 4,9 제외) */
export const callApprovalListAPI = ({ currentPage }) => {
  console.log('[ApprovalAPICalls] callApprovalListAPI Call');
  let requestURL;
  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvalList?offset=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvalList`;
  }
  console.log('[ApprovalAPICalls] requestURL : ', requestURL);
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
      console.log('[ApprovalAPICalls] callApprovalListAPI RESULT : ', result);
      console.log('[ApprovalAPICalls] callApprovalListAPI RESULT : ', result.data);
      dispatch({ type: GET_APPROVALS, payload: result.data });
    }
  };
};

/* 내 결재 조회 */
export const callMyApprovalListAPI = ({ currentPage, empCode }) => {
  console.log('[ApprovalAPICalls] callMyApprovalListAPI Call');
  let requestURL;
  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvalList/${empCode}?offset=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvalList/${empCode}`;
  }
  console.log('[ApprovalAPICalls] requestURL : ', requestURL);
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
      console.log('[ApprovalAPICalls] callMyApprovalListAPI RESULT : ', result);
      console.log('[ApprovalAPICalls] callMyApprovalListAPI RESULT : ', result.data);
      dispatch({ type: GET_APPROVALS, payload: result.data });
    }
  };
};

/* 대기중인 결재 조회 */
export const callWaitingProcessListAPI = ({ empCode }) => {
  console.log('[ApprovalAPICalls] callMyProcessListAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/process/${empCode}`;
  console.log('[ApprovalAPICalls] requestURL : ', requestURL);
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
      console.log('[ApprovalAPICalls] callMyProcessListAPI RESULT : ', result);
      console.log('[ApprovalAPICalls] callMyProcessListAPI RESULT : ', result.data);
      dispatch({ type: GET_APPROVALS, payload: result.data });
    }
  };
};

/* 내가 결재 승인한 서류 조회 */
export const callDoneProcessListAPI = ({ currentPage, empCode }) => {
  console.log('[ApprovalAPICalls] callDoneProcessListAPI Call');
  let requestURL;
  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/doneProcess/${empCode}?offset=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/doneProcess/${empCode}`;
  }
  console.log('[ApprovalAPICalls] requestURL : ', requestURL);
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
      console.log('[ApprovalAPICalls] callDoneProcessListAPI RESULT : ', result);
      console.log('[ApprovalAPICalls] callDoneProcessListAPI RESULT : ', result.data);
      dispatch({ type: GET_APPROVALS, payload: result.data });
    }
  };
};

/* 결재 상세 내용 */
export const callApprovalDetailAPI = ({ approvalCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approval/${approvalCode}`;
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
    console.log('[ApprovalAPICalls] callApprovalDetailAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[ApprovalAPICalls] callApprovalDetailAPI SUCCESS');
      console.log('[ApprovalAPICalls] callApprovalDetailAPI RESULT : ', result.data);
      dispatch({ type: GET_APPROVAL, payload: result.data });
    }
  };
}

/* 신규 결재 등록 */
export const callApprovalRegistAPI = ({ form, approvalLineList }) => {
  console.log('[ApprovalAPICalls] callApprovalRegistAPI Call');
  console.log(form);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/registApproval/${approvalLineList}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        // "Content-type": "multipart/form-data",
        // "Content-type": "application/json",
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localEstimate.getItem("accessToken")
        "Access-Control-Allow-Origin": "*"
      },
      body: form
    })
      .then(response => response.json());
    console.log('[ApprovalAPICalls] callApprovalRegistAPI RESULT : ', result);
    dispatch({ type: POST_APPROVAL, payload: result });
  }
}

/* 제목으로 검색 */
export const callSearchApprovalAPI = ({ search }) => {
  console.log('[ApprovalAPICalls] callSearchApprovalAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approval/search?s=${search}`;
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
    console.log('[ApprovalAPICalls] callSearchDeptAPI RESULT : ', result);
    dispatch({ type: GET_APPROVALS, payload: result.data });
  };
};

/* 임시저장 등록 */
export const callApprovalDraftAPI = ({ form, approvalLineList }) => {
  console.log('[ApprovalAPICalls] callApprovalDraftAPI Call');
  console.log(form);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/draftApproval/${approvalLineList}`;
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
    console.log('[ApprovalAPICalls] callApprovalDraftAPI RESULT : ', result);
    dispatch({ type: POST_APPROVAL, payload: result });
  }
}

/* 내 임시저장 문서 */
export const callMyDraftListAPI = ({ currentPage, empCode }) => {
  console.log('[ApprovalAPICalls] callMyDraftListAPI Call');
  let requestURL;
  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/draftList/${empCode}?offset=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/draftList/${empCode}`;
  }
  console.log('[ApprovalAPICalls] requestURL : ', requestURL);
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
      console.log('[ApprovalAPICalls] callMyDraftListAPI RESULT : ', result);
      console.log('[ApprovalAPICalls] callMyDraftListAPI RESULT : ', result.data);
      dispatch({ type: GET_APPROVALS, payload: result.data });
    }
  };
};

/* 결재 하나 삭제 */
export const callApprovalDeleteAPI = ({ approvalCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approval/${approvalCode}`;
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
    console.log('[ApprovalAPICalls] callApprovalDeleteAPI RESULT : ', result);
    console.log('[ApprovalAPICalls] callApprovalDeleteAPI RESULT : ', result.data);
    if (result.status === 200) {
      console.log('[ApprovalAPICalls] callApprovalDeleteAPI SUCCESS: ');
      dispatch({ type: DELETE_APPROVAL, payload: result.data })
    }
  };
}

/* 결재 복수 삭제 */
export const callApprovalsDeleteAPI = ({ approvalCodes }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvalCodes`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(approvalCodes)
    })
      .then(response => response.json());
    console.log('[ApprovalAPICalls] callApprovalsDeleteAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[ApprovalAPICalls] callApprovalsDeleteAPI SUCCESS');
      dispatch({ type: DELETE_APPROVALS, payload: result.data })
    }
  };
}

/* 상태 코드 변경 (5:반려) */
export const callRejectApprovalAPI = ({ approvalCode }) => {
  console.log('[ApprovalAPICalls] callRejectApprovalAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/rejection/${approvalCode}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then(response => response.json());
    console.log('[ApprovalAPICalls] callRejectApprovalAPI RESULT : ', result);
    dispatch({ type: PATCH_APPROVAL, payload: result });
  };
}

/* 부서 수정 */
export const callApprovalModifyAPI = ({ form, approvalCode }) => {
  console.log('[ApprovalAPICalls] callApprovalModifyAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approval/${approvalCode}`;
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
    console.log('[ApprovalAPICalls] callApprovalModifyAPI RESULT : ', result);
    dispatch({ type: PUT_APPROVAL, payload: result });
  };
};
