import {
  GET_DEPOSIT,
  GET_DEPOSITS,
  POST_DEPOSIT,
  PUT_DEPOSIT
} from '../modules/DepositModule.js';


export const callDepositListAPI = ({currentPage}) => {
	
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deposits?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deposits`;
	}
	
	console.log('[DepositsAPICalls] requestURL : ', requestURL);

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
			console.log('[DepositsAPICalls] callDepositAPI RESULT : ', result);
			dispatch({ type: GET_DEPOSITS,  payload: result.data });
		}
	};
}

export const callDepositSearchAPI = ({search}) => {
  console.log('[DepositAPICalls] callDepositSearchAPI Call')

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deposits/search?s=${search}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
				// "Authorization": "Bearer " + window.localDeposit.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      }
    })
    .then(response => response.json());
    console.log('[DepositAPICalls] callDepositSearchAPI RESULT : ', result);
    dispatch({ type: GET_DEPOSITS, payload: result.data });

  };
};

export const callDepositRegistAPI = ({form}) => {

	console.log('[DepositAPICalls] callDepositRegistAPI Call');
	console.log(form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deposits`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
				"Content-type": "application/json",
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localDeposit.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      },
      body: JSON.stringify(form)
    })

		
    .then(response => response.json());
    console.log('[DepositAPICalls] callDepositRegistAPI RESULT : ', result);
		dispatch({ type: POST_DEPOSIT,  payload: result });
  }
};


export const callDepositUpdateAPI = ({form}) => {
	
	console.log('[DepositAPICalls] callDepositUpdateAPI Call');
	console.log(form);

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deposits`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localDeposit.getItem("accessToken")
			},
			body: JSON.stringify(form)
		})
		.then(response => response.json());
		console.log('[DepositAPICalls] callDepositUpdateAPI RESULT : ', result);
		dispatch({ type: PUT_DEPOSIT,  payload: result });
		
	};    
};

export const callDepositDetailAPI = ({depositCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/deposits/${depositCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localDeposit.getItem("accessToken")
			}
		})
		.then(response => response.json());

		console.log('[DepositAPICalls] callDepositDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[DepositAPICalls] callDepositDeatilAPI SUCCESS');
			dispatch({ type: GET_DEPOSIT, payload: result.data });

		}
	};

}

