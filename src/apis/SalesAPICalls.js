import {
  GET_SALE,
  GET_SALES,
  POST_SALE,
  PUT_SALE
} from '../modules/SalesModule.js';


export const callSalesListAPI = ({currentPage}) => {
	
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/sales?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/sales`;
	}
	
	console.log('[SalesAPICalls] requestURL : ', requestURL);

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
			console.log('[SalesAPICalls] callSalesAPI RESULT : ', result);
			dispatch({ type: GET_SALES,  payload: result.data });
		}
	};
}

export const callSalesSearchAPI = ({search}) => {
  console.log('[SalesAPICalls] callSalesSearchAPI Call')

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/sales/search?s=${search}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
				// "Authorization": "Bearer " + window.localSales.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      }
    })
    .then(response => response.json());
    console.log('[SalesAPICalls] callSalesSearchAPI RESULT : ', result);
    dispatch({ type: GET_SALES, payload: result.data });

  };
};

export const callSalesRegistAPI = ({form}) => {

	console.log('[SalesAPICalls] callSalesRegistAPI Call');
	console.log(form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/sales`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
				"Content-type": "application/json",
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localSales.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json());
    console.log('[SalesAPICalls] callSalesRegistAPI RESULT : ', result);
		dispatch({ type: POST_SALE,  payload: result });
  }
};


export const callSalesUpdateAPI = ({form}) => {
	
	console.log('[SalesAPICalls] callSalesUpdateAPI Call');
	console.log(form);

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/sales`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localSales.getItem("accessToken")
			},
			body: JSON.stringify(form)
		})
		.then(response => response.json());
		console.log('[SalesAPICalls] callSalesUpdateAPI RESULT : ', result);
		dispatch({ type: PUT_SALE,  payload: result });
		
	};    
};

export const callSalesDetailAPI = ({salesCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/sale/${salesCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localSales.getItem("accessToken")
			}
		})
		.then(response => response.json());

		console.log('[SalesAPICalls] callSalesDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[SalesAPICalls] callSalesDeatilAPI SUCCESS');
			dispatch({ type: GET_SALE, payload: result.data });

		}
	};

}

