import {
    GET_REQUEST,
    GET_REQUESTS,
    POST_REQUEST,
    PUT_REQUEST
  } from '../modules/RequestModule.js';
  
  
  export const callRequestListAPI = ({currentPage}) => {
      
      let requestURL;
  
      if(currentPage !== undefined || currentPage !== null){
          requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/requests?offset=${currentPage}`;
      }else {
          requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/requests`;
      }
      
      console.log('[RequestsAPICalls] requestURL : ', requestURL);
  
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
              console.log('[RequestsAPICalls] callRequestAPI RESULT : ', result);
              dispatch({ type: GET_REQUESTS,  payload: result.data });
          }
      };
  }
  
  export const callRequestSearchAPI = ({search}) => {
    console.log('[RequestAPICalls] callRequestSearchAPI Call')
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/requests/search?s=${search}`;
  
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
      console.log('[RequestAPICalls] callRequestSearchAPI RESULT : ', result);
      dispatch({ type: GET_REQUEST, payload: result.data });
  
    };
  };
  
  export const callRequestRegistAPI = ({form}) => {
  
      console.log('[RequestAPICalls] callRequestRegistAPI Call');
      console.log(form);
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/requests`;
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
      console.log('[RequestAPICalls] callRequestRegistAPI RESULT : ', result);
          dispatch({ type: POST_REQUEST,  payload: result });
    }
  };
  
  
  export const callRequestUpdateAPI = ({form}) => {
      
      console.log('[RequestAPICalls] callRequestUpdateAPI Call');
      console.log(form);
  
      const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/requests`;
  
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
          console.log('[RequestAPICalls] callRequestUpdateAPI RESULT : ', result);
          dispatch({ type: PUT_REQUEST,  payload: result });
          
      };    
  };
  
  export const callRequestDetailAPI = ({requestCode}) => {
      const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/requests/${requestCode}`;
  
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
  
          console.log('[RequestAPICalls] callRequestDetailAPI RESULT : ', result);
          if(result.status === 200){
              console.log('[RequestAPICalls] callRequestDeatilAPI SUCCESS');
              dispatch({ type: GET_REQUEST, payload: result.data });
  
          }
      };
  
  }
  