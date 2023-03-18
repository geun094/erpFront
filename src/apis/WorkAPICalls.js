import { Navigate } from 'react-router-dom';
import {
  GET_WORKS,
  POST_WORK,
  PUT_WORK,
  DELETE_WORK,
} from '../modules/WorkModule';


//작업 목록 조회
export const callWorkListAPI = ({currentPage}) => {
  let requestURL;
  if(currentPage !== undefined || currentPage !== null){
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/works?offset=${currentPage}`;
  }else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/works`;
  }
  console.log('[WorkAPICalls] requestURL : ', requestURL)
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
      console.log('[WorkAPICalls] callWorkAPI RESULT : ', result);
      dispatch({ type: GET_WORKS,  payload: result.data });
      console.log('[WorkAPICalls] callWorkListAPI SUCCESS');
    }
  };
}

// 작업 등록
export const callWorkRegistAPI = ({ form }) => {

  console.log('[WorkAPICalls] callWorkRegistAPI Call');

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/works`;
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

    console.log('[WorkAPICalls] callEmpRegistAPI RESULT : ', result);

    dispatch({ type: POST_WORK, payload: result });
  }
};

// 작업 수정
export const callWorkUpdateAPI = ({ form }) => {

  console.log('[WorkAPICalls] callWorkRegistAPI Call');

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/works`;
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

    console.log('[WorkAPICalls] callWorkRegistAPI RESULT : ', result);

    dispatch({ type: PUT_WORK, payload: result });
  }
};

// 작업 삭제
export const callWorkDeleteAPI = ({workCodes}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/works`;

	return async (dispatch, getState) => {
			const result = await fetch(requestURL, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "*/*",
						// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
						"Access-Control-Allow-Origin": "*"  
					},
					body: workCodes
			})
			.then(response => response.json());

			console.log('[WorkAPICalls] callWorkDeleteAPI RESULT : ', result);
			if(result.status === 200){
					console.log('[WorkAPICalls] callWorkDeleteAPI SUCCESS');
					dispatch({ type: DELETE_WORK, payload: result })
			}
	};
}
