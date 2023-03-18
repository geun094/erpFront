import {
	GET_APPROVERS
} from '../modules/ApproverModule.js';

/* 사원 전체조회 */
export const callApproverListAPI = ({ currentPage }) => {
	console.log('[ApproverAPICalls] callApproverListAPI Call');
	let requestURL;
	if (currentPage !== undefined || currentPage !== null) {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvers?offset=${currentPage}`;
	} else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvers`;
	}
	console.log('[ApproverAPICalls] requestURL : ', requestURL);
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
			console.log('[ApproverAPICalls] callApproverListAPI RESULT : ', result);
			console.log('[ApproverAPICalls] callApproverListAPI RESULT : ', result.data);
			dispatch({ type: GET_APPROVERS, payload: result.data });
		}
	};
};

/* 사원명으로 검색 */
export const callSearchApproverAPI = ({ search }) => {
	console.log('[ApproverAPICalls] callSearchApproverAPI Call');
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/approvers/search?s=${search}`;
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
	  console.log('[ApproverAPICalls] callSearchApproverAPI RESULT : ', result);
	  dispatch({ type: GET_APPROVERS, payload: result.data });
	};
  };
  