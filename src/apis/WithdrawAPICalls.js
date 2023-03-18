import {
  GET_WITHDRAW,
  GET_WITHDRAWS,
  POST_WITHDRAW,
  PUT_WITHDRAW
} from '../modules/WithdrawModule.js';


export const callWithdrawListAPI = ({currentPage}) => {
	
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/withdraws?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/withdraws`;
	}
	
	console.log('[WithdrawsAPICalls] requestURL : ', requestURL);

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
			console.log('[WithdrawsAPICalls] callWithdrawAPI RESULT : ', result);
			dispatch({ type: GET_WITHDRAWS,  payload: result.data });
		}
	};
}

export const callWithdrawSearchAPI = ({search}) => {
  console.log('[WithdrawAPICalls] callWithdrawSearchAPI Call')

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/withdraws/search?s=${search}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
				// "Authorization": "Bearer " + window.localWithdraw.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      }
    })
    .then(response => response.json());
    console.log('[WithdrawAPICalls] callWithdrawSearchAPI RESULT : ', result);
    dispatch({ type: GET_WITHDRAWS, payload: result.data });

  };
};

export const callWithdrawRegistAPI = ({form}) => {

	console.log('[WithdrawAPICalls] callWithdrawRegistAPI Call');
	console.log(form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/withdraws`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
				"Content-type": "application/json",
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localWithdraw.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      },
      body: JSON.stringify(form)
    })

		
    .then(response => response.json());
    console.log('[WithdrawAPICalls] callWithdrawRegistAPI RESULT : ', result);
		dispatch({ type: POST_WITHDRAW,  payload: result });
  }
};


export const callWithdrawUpdateAPI = ({form}) => {
	
	console.log('[WithdrawAPICalls] callWithdrawUpdateAPI Call');
	console.log(form);

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/withdraws`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localWithdraw.getItem("accessToken")
			},
			body: JSON.stringify(form)
		})
		.then(response => response.json());
		console.log('[WithdrawAPICalls] callWithdrawUpdateAPI RESULT : ', result);
		dispatch({ type: PUT_WITHDRAW,  payload: result });
		
	};    
};

export const callWithdrawDetailAPI = ({withdrawCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/withdraws/${withdrawCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localWithdraw.getItem("accessToken")
			}
		})
		.then(response => response.json());

		console.log('[WithdrawAPICalls] callWithdrawDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[WithdrawAPICalls] callWithdrawDeatilAPI SUCCESS');
			dispatch({ type: GET_WITHDRAW, payload: result.data });

		}
	};

}

