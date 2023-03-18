import { Navigate } from 'react-router-dom';
import {
  GET_FORWARDINGS,
  POST_FORWARDING,
  PUT_FORWARDING,
  DELETE_FORWARDING,
} from '../modules/ForwardingModule';


//출고 목록 조회
export const callForwardingListAPI = ({currentPage}) => {
  let requestURL;
  if(currentPage !== undefined || currentPage !== null){
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/forwardings?offset=${currentPage}`;
  }else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/forwardings`;
  }
  console.log('[ForwardingAPICalls] requestURL : ', requestURL)
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
    if(result.status === 200){
      console.log('[ForwardingAPICalls] callForwardingAPI RESULT : ', result);
      dispatch({ type: GET_FORWARDINGS,  payload: result.data });
      console.log('[ForwardingAPICalls] callForwardingListAPI SUCCESS');
    }
  };
}

// 작업 등록
export const callForwardingRegistAPI = ({ form }) => {

  console.log('[ForwardingAPICalls] callForwardingRegistAPI Call');

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/forwardings`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: form
    })
      .then(response => response.json());

    console.log('[ForwardingAPICalls] callForwardingRegistAPI RESULT : ', result);

    dispatch({ type: POST_FORWARDING, payload: result });
  }
};

// 작업 수정
export const callForwardingUpdateAPI = ({ form }) => {

  console.log('[ForwardingAPICalls] callForwardingRegistAPI Call');

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/forwardings`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: form
    })
      .then(response => response.json());

    console.log('[ForwardingAPICalls] callForwardingRegistAPI RESULT : ', result);

    dispatch({ type: PUT_FORWARDING, payload: result });
  }
};

// 작업 삭제
export const callForwardingDeleteAPI = ({forwardingCodes}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/forwardings`;

	return async (dispatch, getState) => {
			const result = await fetch(requestURL, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "*/*",
						// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
						"Access-Control-Allow-Origin": "*"  
					},
					body: forwardingCodes
			})
			.then(response => response.json());

			console.log('[ForwardingAPICalls] callForwardingDeleteAPI RESULT : ', result);
			if(result.status === 200){
					console.log('[ForwardingAPICalls] callForwardingDeleteAPI SUCCESS');
					dispatch({ type: DELETE_FORWARDING, payload: result })
			}
	};
}
