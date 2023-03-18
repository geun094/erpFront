import {
  GET_PRODUCTS,
	POST_PRODUCT,
	GET_PRODUCT,
	PUT_PRODUCT,
	DELETE_PRODUCT
  } from '../modules/ProductModule.js';
  
  export const callProductListAPI = ({currentPage}) => {
	
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/products?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/products`;
	}
	
	console.log('[ProductsAPICalls] requestURL : ', requestURL);

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
			console.log('[ProductAPICalls] callProductAPI RESULT : ', result);
			dispatch({ type: GET_PRODUCTS,  payload: result.data });
		}
	};
};


export const callProductRegistAPI = ({form}) => {
    console.log('[ProduceAPICalls] callProductRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/products`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
				"Access-Control-Allow-Origin": "*",
            },
            body: form
			
        }) 
        .then(response => response.json());

        console.log('[ProduceAPICalls] callProductRegistAPI RESULT : ', result);

        dispatch({ type: POST_PRODUCT,  payload: result });
        
    };    
}


export const callProductDetailAPI = ({productCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/products/${productCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				// "Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
			}
		})
		.then(response => response.json());

		console.log('[ProductAPICalls] callProductDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[ProductAPICalls] callProductDeatilAPI SUCCESS');
			dispatch({ type: GET_PRODUCT, payload: result.data });

		}
	};

};

export const callProductUpdateAPI = ({form}) => {
	console.log('[ProductAPICalls] callProductUpdateAPI Call');

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/products`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
			},
			body: form
		})
		.then(response => response.json());

		console.log('[ProductAPICalls] callProductUpdateAPI RESULT : ', result);

		dispatch({ type: PUT_PRODUCT,  payload: result });
		
	};    
};

export const callProductDeleteAPI = ({productCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/products/${productCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
       			"Accept": "*/*",
        // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
			}
		})
		.then(response => response.json());

		console.log('[ProductAPICalls] callProductDeleteAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[ProductAPICalls] callProductDeleteAPI SUCCESS');
			dispatch({ type: DELETE_PRODUCT, payload: result.data })
		}
	};
};


export const callSearchProductAPI = ({search}) => {
    console.log('[ProduceAPICalls] callSearchProductAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/products/search?s=${search}`;
    
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

        console.log('[ProduceAPICalls] callSearchProductAPI RESULT : ', result);

        dispatch({ type: GET_PRODUCTS,  payload: result.data });
        
    };    
};