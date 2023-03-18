import {
	GET_STOCK,
  GET_STOCKS,
  POST_STOCK,
  PUT_STOCK
} from '../modules/StockModule.js';


export const callStockListAPI = ({currentPage}) => {
	let requestURL;
	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/stocks?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/stocks`;
	}
	console.log('[StocksAPICalls] requestURL : ', requestURL)
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
			console.log('[StocksAPICalls] callStockAPI RESULT : ', result);
			dispatch({ type: GET_STOCKS,  payload: result.data });
			console.log('[StockAPICalls] callStockListAPI SUCCESS');
		}
	};
}

export const callStockSearchAPI = ({search}) => {
  console.log('[StockAPICalls] callStockSearchAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/stocks/search?s=${search}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Accept": "*/*",
				// "Authorization": "Bearer " + window.localStock.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      }
    })
    .then(response => response.json());
    console.log('[StockAPICalls] callStockSearchAPI RESULT : ', result);
    dispatch({ type: GET_STOCKS, payload: result.data });

  };
};

export const callStockRegistAPI = ({form}) => {
	console.log('[StockAPICalls] callStockRegistAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/stocks`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localStock.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      },
      body: form
    })
    .then(response => response.json());
    console.log('[StockAPICalls] callStockRegistAPI RESULT : ', result);
		dispatch({ type: POST_STOCK,  payload: result });
  }
};

export const callStockUpdateAPI = ({form}) => {
	console.log('[StockAPICalls] callStockUpdateAPI Call');
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/stocks`;
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localStock.getItem("accessToken")
			},
			body: form
		})
		.then(response => response.json());
		console.log('[StockAPICalls] callStockUpdateAPI RESULT : ', result);
		dispatch({ type: PUT_STOCK,  payload: result });
		
	};    
};

export const callStockDetailAPI = ({stockCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/stock/${stockCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localStock.getItem("accessToken")
			}
		})
		.then(response => response.json());
		console.log('[StockAPICalls] callStockDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[StockAPICalls] callStockDeatilAPI SUCCESS');
			dispatch({ type: GET_STOCK, payload: result.data });

		}
	};
};

