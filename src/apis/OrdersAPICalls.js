import {
  GET_ORDER,
  GET_ORDERS,
  POST_ORDER,
  PUT_ORDER
} from '../modules/OrdersModule.js';


export const callOrdersListAPI = ({currentPage}) => {
	
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/orders?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/orders`;
	}
	
	console.log('[OrdersAPICalls] requestURL : ', requestURL);

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
			console.log('[OrdersAPICalls] callOrdersAPI RESULT : ', result);
			dispatch({ type: GET_ORDERS,  payload: result.data });
		}
	};
}

export const callOrdersSearchAPI = ({search}) => {
  console.log('[OrdersAPICalls] callOrdersSearchAPI Call')

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/orders/search?s=${search}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
				// "Authorization": "Bearer " + window.localOrders.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      }
    })
    .then(response => response.json());
    console.log('[OrdersAPICalls] callOrdersSearchAPI RESULT : ', result);
    dispatch({ type: GET_ORDERS, payload: result.data });

  };
};

export const callOrdersRegistAPI = ({form}) => {

	console.log('[OrdersAPICalls] callOrdersRegistAPI Call');
	console.log(form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/orders`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
				"Content-type": "application/json",
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localOrders.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json());
    console.log('[OrdersAPICalls] callOrdersRegistAPI RESULT : ', result);
		dispatch({ type: POST_ORDER,  payload: result });
  }
};


export const callOrdersUpdateAPI = ({form}) => {
	
	console.log('[OrdersAPICalls] callOrdersUpdateAPI Call');
	console.log(form);

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/orders`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localOrders.getItem("accessToken")
			},
			body: JSON.stringify(form)
		})
		.then(response => response.json());
		console.log('[OrdersAPICalls] callOrdersUpdateAPI RESULT : ', result);
		dispatch({ type: PUT_ORDER,  payload: result });
		
	};    
};

export const callOrdersDetailAPI = ({ordersCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/order/${ordersCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localOrders.getItem("accessToken")
			}
		})
		.then(response => response.json());

		console.log('[OrdersAPICalls] callOrdersDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[OrdersAPICalls] callOrdersDeatilAPI SUCCESS');
			dispatch({ type: GET_ORDER, payload: result.data });

		}
	};

}

