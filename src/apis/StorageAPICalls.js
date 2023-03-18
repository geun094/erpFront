import {
	GET_STORAGES,
	POST_STORAGE,
	PUT_STORAGE,
	DELETE_STORAGE,
  } from '../modules/StorageModule.js';
  
  
  export const callStorageListAPI = ({currentPage}) => {
	  let requestURL;
	  if(currentPage !== undefined || currentPage !== null){
		  requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages?offset=${currentPage}`;
	  }else {
		  requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages`;
	  }
	  console.log('[StoragesAPICalls] requestURL : ', requestURL)
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
			  console.log('[StoragesAPICalls] callStorageAPI RESULT : ', result);
			  dispatch({ type: GET_STORAGES,  payload: result.data });
			  console.log('[StorageAPICalls] callStorageListAPI SUCCESS');
		  }
	  };
  }
  
  export const callStorageSearchAPI = ({search}) => {
	console.log('[StorageAPICalls] callStorageSearchAPI Call');
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages/search?s=${search}`;
	return async (dispatch, getState) => {
	  const result = await fetch(requestURL, {
		method: 'GET',
		headers: {
		  "Content-type": "application/json",
		  "Accept": "*/*",
				  // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
				  "Access-Control-Allow-Origin": "*"  
		}
	  })
	  .then(response => response.json());
	  console.log('[StorageAPICalls] callStorageSearchAPI RESULT : ', result);
	  dispatch({ type: GET_STORAGES, payload: result.data });
  
	};
  };
  
  export const callStorageRegistAPI = ({form}) => {
	  console.log('[StorageAPICalls] callStorageRegistAPI Call');
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages`;
	return async (dispatch, getState) => {
	  const result = await fetch(requestURL, {
		method: "POST",
		headers: {
		  "Accept": "*/*",
		  // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
				  "Access-Control-Allow-Origin": "*"  
		},
		body: form
	  })
	  .then(response => response.json());
	  console.log('[StorageAPICalls] callStorageRegistAPI RESULT : ', result);
		  dispatch({ type: POST_STORAGE,  payload: result });
	}
  };
  
  export const callStorageUpdateAPI = ({form}) => {
	  console.log('[StorageAPICalls] callStorageUpdateAPI Call');
	  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages`;
	  return async (dispatch, getState) => {
		  const result = await fetch(requestURL, {
			  method: "PUT",
			  headers: {
				  "Accept": "*/*",
				  "Access-Control-Allow-Origin": "*"
				  // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
			  },
			  body: form
		  })
		  .then(response => response.json());
		  console.log('[StorageAPICalls] callStorageUpdateAPI RESULT : ', result);
		  dispatch({ type: PUT_STORAGE,  payload: result });
		  
	  };    
  };
  
  // export const callStorageDetailAPI = ({storageCode}) => {
  // 	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages/${storageCode}`;
  
  // 	return async (dispatch, getState) => {
  
  // 		const result = await fetch(requestURL, {
  // 			method: "GET",
  // 			headers: {
  // 				"Content-Type": "application/json",
  // 				"Accept": "*/*",
  // 				"Access-Control-Allow-Origin": "*"
  // 				// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
  // 			}
  // 		})
  // 		.then(response => response.json());
  // 		console.log('[StorageAPICalls] callStorageDetailAPI RESULT : ', result);
  // 		if(result.status === 200){
  // 			console.log('[StorageAPICalls] callStorageDeatilAPI SUCCESS');
  // 			dispatch({ type: GET_STORAGE, payload: result.data });
  
  // 		}
  // 	};
  // }
  
  export const callStorageDeleteAPI = ({storageCode}) => {
	  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages/${storageCode}`;
  
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
  
		  console.log('[StorageAPICalls] callStorageDeleteAPI RESULT : ', result);
		  if(result.status === 200){
			  console.log('[StorageAPICalls] callStorageDeleteAPI SUCCESS');
			  dispatch({ type: DELETE_STORAGE, payload: result.data })
		  }
	  };
  }
  
  export const callStoragesDeleteAPI = ({storageCodes}) => {
	  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/storages`;
  
	  return async (dispatch, getState) => {
			  const result = await fetch(requestURL, {
					  method: "DELETE",
					  headers: {
						  "Content-Type": "application/json",
						  "Accept": "*/*",
						  // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
						  "Access-Control-Allow-Origin": "*"  
					  },
					  body: JSON.stringify(storageCodes)
			  })
			  .then(response => response.json());
  
			  console.log('[StorageAPICalls] callStoragesDeleteAPI RESULT : ', result);
			  if(result.status === 200){
					  console.log('[StorageAPICalls] callStoragesDeleteAPI SUCCESS');
					  dispatch({ type: DELETE_STORAGE, payload: storageCodes })
			  }
	  };
  };
  
  