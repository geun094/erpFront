import {
  GET_ESTIMATE,
  GET_ESTIMATES,
  POST_ESTIMATE,
  PUT_ESTIMATE
} from '../modules/EstimateModule.js';


export const callEstimateListAPI = ({currentPage}) => {
	
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/estimates?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/estimates`;
	}
	
	console.log('[EstimatesAPICalls] requestURL : ', requestURL);

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
			console.log('[EstimatesAPICalls] callEstimateAPI RESULT : ', result);
			dispatch({ type: GET_ESTIMATES,  payload: result.data });
		}
	};
}

export const callEstimateSearchAPI = ({search}) => {
  console.log('[EstimateAPICalls] callEstimateSearchAPI Call')

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/estimates/search?s=${search}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
				// "Authorization": "Bearer " + window.localEstimate.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      }
    })
    .then(response => response.json());
    console.log('[EstimateAPICalls] callEstimateSearchAPI RESULT : ', result);
    dispatch({ type: GET_ESTIMATES, payload: result.data });

  };
};

export const callEstimateRegistAPI = ({form}) => {

	console.log('[EstimateAPICalls] callEstimateRegistAPI Call');
	console.log(form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/estimates`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
				"Content-type": "application/json",
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localEstimate.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      },
      body: JSON.stringify(form)
    })

		
    .then(response => response.json());
    console.log('[EstimateAPICalls] callEstimateRegistAPI RESULT : ', result);
		dispatch({ type: POST_ESTIMATE,  payload: result });
  }
};


export const callEstimateUpdateAPI = ({form}) => {
	
	console.log('[EstimateAPICalls] callEstimateUpdateAPI Call');
	console.log(form);

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/estimates`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localEstimate.getItem("accessToken")
			},
			body: JSON.stringify(form)
		})
		.then(response => response.json());
		console.log('[EstimateAPICalls] callEstimateUpdateAPI RESULT : ', result);
		dispatch({ type: PUT_ESTIMATE,  payload: result });
		
	};    
};

export const callEstimateDetailAPI = ({estimateCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/estimate/${estimateCode}`;

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

		console.log('[EstimateAPICalls] callEstimateDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[EstimateAPICalls] callEstimateDeatilAPI SUCCESS');
			dispatch({ type: GET_ESTIMATE, payload: result.data });

		}
	};

}

