import { 
	GET_BOARD,
	GET_BOARDS,
	POST_BOARD,
	PUT_BOARD,
	DELETE_BOARD
 } from "../modules/BoardModule.js";




/* 게시판 조회 데이터 가져오기 */
export const callBoardListAPI = ({currentPage}) => {
   
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/boards?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/boards`;
	}
	
	console.log('[BoardsAPICalls] requestURL : ', requestURL);

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
				console.log('[BoardsAPICalls] callBoardAPI RESULT : ', result);
				dispatch({ type: GET_BOARDS,  payload: result.data });
		 }
	};
}

/* 제목으로 검색 */
export const callBoardSearchAPI = ({ search }) => {
  console.log('[BoardsAPICalls] callBoardSearchAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/board/search?s=${search}`;
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
    console.log('[BoardsAPICalls] callBoardSearchAPI RESULT : ', result);
    dispatch({ type: GET_BOARDS, payload: result.data });
  };
};

/* 게시판 등록API */
export const callBoardRegistAPI = ({form, empCode}) => {

	console.log('[BoardAPICalls] callBoardRegistAPI Call');

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/boards/${empCode}`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Accept": "*/*",
      //  "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
				"Access-Control-Allow-Origin": "*"  
      },
      body: form
    })
    .then(response => response.json());

    console.log('[BoardAPICalls] callBoardRegistAPI RESULT : ', result);

		dispatch({ type: POST_BOARD,  payload: result });
  }
};



/* callBoardDetailAPI */

export const callBoardDetailAPI = ({boardCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/boards/${boardCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
			}
		})
		.then(response => response.json());

		console.log('[BoardAPICalls] callBoardDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[BoardAPICalls] callBoardDetailAPI SUCCESS');
			dispatch({ type: GET_BOARD, payload: result.data });
		}
	};
}

/* 수정  */

export const callBoardUpdateAPI = ({form, empCode}) => {
	console.log('[BoardAPICalls] callBoardUpdateAPI Call');

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/boards/${empCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*",
				//  "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
			},
			body: form
		})
		.then(response => response.json());

		console.log('[BoardAPICalls] callBoardUpdateAPI RESULT : ', result);

		dispatch({ type: PUT_BOARD,  payload: result });
		
	};    
};



/* 내 게시판  조회 데이터 가져오기 */
export const callMyListAPI = ({currentPage, empCode}) => {
   
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		 requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/myBoards/${empCode}?offset=${currentPage}`;
	}else {
		 requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/myBoards/${empCode}`;
	}
	
	

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
				console.log('[BoardsAPICalls] callMyBoardListAPI RESULT : ', result);
				dispatch({ type: GET_BOARDS,  payload: result.data });
		 }
	};
	
}



// /* 삭제 */

// export const callBoardDeleteAPI = ({boardCode}) => {
// 	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/boards/${boardCode}`;

// 	return async (dispatch, getState) => {

// 		const result = await fetch(requestURL, {
// 			method: "DELETE",
// 			headers: {
// 				"Content-Type": "application/json",
//         "Accept": "*/*",
//         // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
// 				"Access-Control-Allow-Origin": "*"  
// 			}
// 		})
// 		.then(response => response.json());

// 		console.log('[BoardsAPICalls] callBoardDeleteAPI RESULT : ', result);
// 		if(result.status === 200){
// 			console.log('[BoardsAPICalls] callBoardDeleteAPI SUCCESS');
// 			dispatch({ type: DELETE_BOARD, payload: result.data })
// 		}
// 	};
// }

// export const callBoardsDeleteAPI = ({boardCodes}) => {
// 	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/boards`;

// 	return async (dispatch, getState) => {
// 			const result = await fetch(requestURL, {
// 					method: "DELETE",
// 					headers: {
// 						"Content-Type": "application/json",
// 						"Accept": "*/*",
// 						// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
// 						"Access-Control-Allow-Origin": "*"  
// 					},
// 					body: JSON.stringify(boardCodes)
// 			})
// 			.then(response => response.json());

// 			console.log('[PositionAPICalls] callPositionsDeleteAPI RESULT : ', result);
// 			if(result.status === 200){
// 					console.log('[PositionAPICalls] callPositionsDeleteAPI SUCCESS');
// 					dispatch({ type: DELETE_BOARD, payload: boardCodes })
// 			}
// 	};
// }