import {
  GET_APPROVALLINE,
  PATCH_APPROVALLINE
} from '../modules/ApprovalLineModule.js';

/* 결재  */
export const callApprovalLineAPI = ({ approvalCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvalLine/${approvalCode}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then(response => response.json());

    console.log('[ApprovalLineAPICalls] callApprovalLineAPI RESULT : ', result);
    if (result.status === 200) {
      console.log('[ApprovalLineAPICalls] callApprovalLineAPI SUCCESS');
      console.log('[ApprovalLineAPICalls] callApprovalLineAPI RESULT : ', result.data);
      dispatch({ type: GET_APPROVALLINE, payload: result.data });
    }
  };
}

/* 승인여부 변경(N->Y) */
export const callUpdateAprroveYnAPI = ({ approvalCode, empCode }) => {
  console.log('[ApprovalLineAPICalls] callUpdateAprroveYnAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/signoff/${empCode}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(approvalCode)
    })
      .then(response => response.json());
    console.log('[ApprovalLineAPICalls] callUpdateAprroveYnAPI RESULT : ', result);
    dispatch({ type: PATCH_APPROVALLINE, payload: result });
  };
}
