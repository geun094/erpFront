import {
    GET_CLIENTS,
    GET_CLIENT,
    POST_CLIENT,
    PUT_CLIENT,
    DELETE_CLIENT,
	DELETE_CLIENTS
}from'../modules/ClientModule.js';

export const callClientListAPI = ({currentPage}) => {
    console.log('[ClientAPICalls] callClientListAPI Call');
      let requestURL;
      if(currentPage !== undefined || currentPage !== null){
          requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/clients?offset=${currentPage}`;
      }else {
          requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/clients`;
      }

      console.log('[ClientsAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
  
      const result = await fetch(requestURL, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          "Accept": "*/*",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => response.json());
          if(result.status === 200){
              console.log('[ClientAPICalls] callClientAPI RESULT : ', result);
        	 dispatch({ type: GET_CLIENTS,  payload: result.data });
          }
    };
  };

//   export const callClientDetailAPI = ({clientCode}) => {
// 	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/clients/${clientCode}`;

// 	return async (dispatch, getState) => {

// 		const result = await fetch(requestURL, {
// 			method: "GET",
// 			headers: {
// 			//	"Content-Type": "application/json",
// 				"Accept": "*/*",
// 				"Access-Control-Allow-Origin": "*"
// 			}
// 		})
// 		.then(response => response.json());

// 		console.log('[ClientAPICalls] callClientDetailAPI RESULT : ', result);
// 		if(result.status === 200){
// 			console.log('[ClientAPICalls] callClientDetailAPI SUCCESS');
// 			dispatch({ type: GET_CLIENT, payload: result.data });
// 		}
// 	};
// }

export const callClientRegistAPI = ({form}) => {
    console.log('[ClientAPICalls] callClientRegistAPI Call');
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/clients`;
  
    return async (dispatch, getState) => {
  
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
              "Accept": "*/*",
              "Access-Control-Allow-Origin": "*"  
            },
            body: form
        })
        .then(response => response.json());
  
        console.log('[ClientAPICalls] callClientRegistAPI RESULT : ', result);
  
        dispatch({ type: POST_CLIENT,  payload: result });
        
    };   
  }

  export const callSearchClientAPI = ({search}) => {
	console.log('[ClientAPICalls] callSearchClientAPI Call');
  
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/clients/search?s=${search}`;
  
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
  
	  console.log('[ClientAPICalls] callSearchClientAPI RESULT : ', result);
  
	  dispatch({ type: GET_CLIENTS, payload: result.data });
  
	};
  };
  
  export const callClientModifyAPI = ({form}) => {
	console.log('[ClientAPICalls] callClientModifyAPI Call');

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/clients`;

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

		console.log('[ClientAPICalls] callClientUpdateAPI RESULT : ', result);

		dispatch({ type: PUT_CLIENT,  payload: result });
		
	};   
} ;


export const callClientDeleteAPI = ({clientCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/clients/${clientCode}`;

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

		console.log('[ClientAPICalls] callClientDeleteAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[ClientAPICalls] callClientDeleteAPI SUCCESS');
			dispatch({ type: DELETE_CLIENT, payload: result.data })
		}
	};
}


export const callClientsDeleteAPI = ({clientCodes}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/clients`;

	return async (dispatch, getState) => {
			const result = await fetch(requestURL, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "*/*",
						// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
						"Access-Control-Allow-Origin": "*"  
					},
					body: JSON.stringify(clientCodes)
			})
			.then(response => response.json());

			console.log('[ClientAPICalls] callClientsDeleteAPI RESULT : ', result);
			if(result.status === 200){
					console.log('[ClientAPICalls] callClientsDeleteAPI SUCCESS');
					dispatch({ type: DELETE_CLIENTS, payload: clientCodes })
			}
	};
}