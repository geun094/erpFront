import {
    GET_PLACE,
    GET_PLACES,
    POST_PLACE,
    PUT_PLACE
  } from '../modules/PlaceModule.js';
  
  
  export const callPlaceListAPI = ({currentPage}) => {
      
      let requestURL;
  
      if(currentPage !== undefined || currentPage !== null){
          requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/places?offset=${currentPage}`;
      }else {
          requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/places`;
      }
      
      console.log('[PlaceAPICalls] requestURL : ', requestURL);
  
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
              console.log('[PlaceAPICalls] callPlaceAPI RESULT : ', result);
              dispatch({ type: GET_PLACES,  payload: result.data });
          }
      };
  }
  
  export const callPlaceSearchAPI = ({search}) => {
    console.log('[PlaceAPICalls] callPlaceSearchAPI Call')
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/places/search?s=${search}`;
  
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
      console.log('[PlaceAPICalls] callPlaceSearchAPI RESULT : ', result);
      dispatch({ type: GET_PLACES, payload: result.data });
  
    };
  };
  
  export const callPlaceRegistAPI = ({form}) => {
  
      console.log('[PlaceAPICalls] callPlaceRegistAPI Call');
      console.log(form);
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/places`;
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
      console.log('[PlaceAPICalls] callPlaceRegistAPI RESULT : ', result);
          dispatch({ type: POST_PLACE,  payload: result });
    }
  };
  
  
  export const callPlaceUpdateAPI = ({form}) => {
      
      console.log('[PlaceAPICalls] callPlaceUpdateAPI Call');
      console.log(form);
  
      const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/places`;
  
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
          console.log('[PlaceAPICalls] callPlaceUpdateAPI RESULT : ', result);
          dispatch({ type: PUT_PLACE,  payload: result });
          
      };    
  };
  
  export const callPlaceDetailAPI = ({placeCode}) => {
      const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/places/${placeCode}`;
  
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
  
          console.log('[PlaceAPICalls] callPlaceDetailAPI RESULT : ', result);
          if(result.status === 200){
              console.log('[PlaceAPICalls] callPlaceDeatilAPI SUCCESS');
              dispatch({ type: GET_PLACE, payload: result.data });
  
          }
      };
  
  }
  