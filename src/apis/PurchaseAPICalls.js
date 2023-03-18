import {
    GET_PURCHASE,
    GET_PURCHASES,
    POST_PURCHASE,
    PUT_PURCHASE
  } from '../modules/PurchaseModule.js';
  
  
  export const callPurchaseListAPI = ({currentPage}) => {
	
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/purchases?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/purchases`;
	}
	
	console.log('[PurchaseAPICalls] requestURL : ', requestURL);

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
			console.log('[PurchaseAPICalls] callPurchaseAPI RESULT : ', result);
			dispatch({ type: GET_PURCHASES,  payload: result.data });
		}
	};
}
  
  export const callPurchaseSearchAPI = ({search}) => {
    console.log('[PurchaseAPICalls] callPurchaseSearchAPI Call')
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/purchases/search?s=${search}`;
  
    return async (dispatch, getState) => {
  
      const result = await fetch(requestURL, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          "Accept": "*/*",
                  // "Authorization": "Bearer " + window.localPurchases.getItem("accessToken")
                  "Access-Control-Allow-Origin": "*"  
        }
      })
      .then(response => response.json());
      console.log('[PurchaseAPICalls] callPurchaseSearchAPI RESULT : ', result);
      dispatch({ type: GET_PURCHASES, payload: result.data });
  
    };
  };
  
  export const callPurchaseRegistAPI = ({form}) => {
  
      console.log('[PurchaseAPICalls] callPurchaseRegistAPI Call');
      console.log(form);
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/purchases`;
    return async (dispatch, getState) => {
  
      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
                  "Content-type": "application/json",
          "Accept": "*/*",
          // "Authorization": "Bearer " + window.localPurchase.getItem("accessToken")
                  "Access-Control-Allow-Origin": "*"  
        },
        body: JSON.stringify(form)
      })
      .then(response => response.json());
      console.log('[PurchaseAPICalls] callPurchaseRegistAPI RESULT : ', result);
          dispatch({ type: POST_PURCHASE,  payload: result });
    }
  };
  
  
  export const callPurchaseUpdateAPI = ({form}) => {
      
      console.log('[PurchaseAPICalls] callPurchaseUpdateAPI Call');
      console.log(form);
  
      const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/purchases`;
  
      return async (dispatch, getState) => {
  
          const result = await fetch(requestURL, {
              method: "PUT",
              headers: {
                  "Content-type": "application/json",
                  "Accept": "*/*",
                  "Access-Control-Allow-Origin": "*"
                  // "Authorization": "Bearer " + window.localPurchase.getItem("accessToken")
              },
              body: JSON.stringify(form)
          })
          .then(response => response.json());
          console.log('[PurchaseAPICalls] callPurchaseUpdateAPI RESULT : ', result);
          dispatch({ type: PUT_PURCHASE,  payload: result });
          
      };    
  };
  
  export const callPurchaseDetailAPI = ({purchaseCode}) => {
      const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/purchases/${purchaseCode}`;
  
      return async (dispatch, getState) => {
  
          const result = await fetch(requestURL, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "*/*",
                  "Access-Control-Allow-Origin": "*"
                  // "Authorization": "Bearer " + window.localPurchase.getItem("accessToken")
              }
          })
          .then(response => response.json());
  
          console.log('[PurchaseAPICalls] callPurchaseDetailAPI RESULT : ', result);
          if(result.status === 200){
              console.log('[PurchaseAPICalls] callPurchaseDeatilAPI SUCCESS');
              dispatch({ type: GET_PURCHASE, payload: result.data });
  
          }
      };
  
  }
  
  