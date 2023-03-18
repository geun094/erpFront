import {
	GET_POSITION,
	GET_POSITIONS,
	POST_POSITION,
	PUT_POSITION,
	DELETE_POSITION
} from '../modules/PositionModule.js';


/* 직급 조회 데이터 가져오기 */
export const callPositionListAPI = ({currentPage}) => {
   
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		 requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/positions?offset=${currentPage}`;
	}else {
		 requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/positions`;
	}
	
	console.log('[PositionsAPICalls] requestURL : ', requestURL);

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
				console.log('[PositionsAPICalls] callPositionAPI RESULT : ', result);
				dispatch({ type: GET_POSITIONS,  payload: result.data });
		 }
	};
}





/* 직급 등록API */
export const callPositionRegistAPI = ({form}) => {

	console.log('[PositionAPICalls] callPositionRegistAPI Call');

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/positions`;
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

    console.log('[PositionAPICalls] callPositionRegistAPI RESULT : ', result);

		dispatch({ type: POST_POSITION,  payload: result });
  }
};


/* 수정  */

export const callPositionUpdateAPI = ({form}) => {
	console.log('[PositionAPICalls] callPositionUpdateAPI Call');

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/positions`;

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

		console.log('[PositionAPICalls] callPositionUpdateAPI RESULT : ', result);

		dispatch({ type: PUT_POSITION,  payload: result });
		
	};    
};

/* 삭제 */

export const callPositionDeleteAPI = ({positionCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/positions/${positionCode}`;

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

		console.log('[PositionAPICalls] callPositionDeleteAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[PositionAPICalls] callPositionDeleteAPI SUCCESS');
			dispatch({ type: DELETE_POSITION, payload: result.data })
		}
	};
}

export const callPositionsDeleteAPI = ({positionCodes}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/positions`;

	return async (dispatch, getState) => {
			const result = await fetch(requestURL, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "*/*",
						// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
						"Access-Control-Allow-Origin": "*"  
					},
					body: JSON.stringify(positionCodes)
			})
			.then(response => response.json());

			console.log('[PositionAPICalls] callPositionsDeleteAPI RESULT : ', result);
			if(result.status === 200){
					console.log('[PositionAPICalls] callPositionsDeleteAPI SUCCESS');
					dispatch({ type: DELETE_POSITION, payload: positionCodes })
			}
	};
}

/* 검색 */
export const callPositionSearchAPI = ({search}) => {
  console.log('[PositionAPICalls] callPositionSearchAPI Call');

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/positions/search?s=${search}`;

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

    console.log('[PositionAPICalls] callPositionSearchAPI RESULT : ', result);

    dispatch({ type: GET_POSITIONS, payload: result.data });

  };
};





/* callPositionDetailAPI */

export const callPositionDetailAPI = ({positionCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/positions/${positionCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
			}
		})
		.then(response => response.json());

		console.log('[PositionAPICalls] callPositionDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[PositionAPICalls] callPositionDetailAPI SUCCESS');
			dispatch({ type: GET_POSITION, payload: result.data });

		}
	};


	


	
}