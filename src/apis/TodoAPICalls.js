import {
	GET_TODO,
	GET_TODOS,
	POST_TODO,
	PUT_TODO,
	DELETE_TODO
	} from "../modules/TodoModule.js";
	
	/* 업무 조회 데이터 가져오기 */
	export const callTodoListAPI = ({currentPage, empCode}) => {
		 
		let requestURL;
	
		if(currentPage !== undefined || currentPage !== null){
			 requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/todos/${empCode}?offset=${currentPage}`;
		}else {
			 requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/todos/${empCode}`;
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
					console.log('[TodosAPICalls] callTodoAPI RESULT : ', result);
					dispatch({ type: GET_TODOS,  payload: result.data });
			 }
		};
	}
	
	/* 등록API */
	export const callTodoRegistAPI = ({form, empCode}) => {
	
		console.log('[TodosAPICalls] callTodoRegistAPI Call');
	
		const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/todos/${empCode}`;
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
	
			console.log('[TodosAPICalls] callTodoRegistAPI RESULT : ', result);
	
			dispatch({ type: POST_TODO,  payload: result });
		}
	};
	
	
	/* 상세 API */
	
	export const callTodoDetailAPI = ({todoCode}) => {
		const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/myTodos/${todoCode}`;
	
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
	
			console.log('[TodosAPICalls] callTodoDetailAPI RESULT : ', result);
			if(result.status === 200){
				console.log('[TodosAPICalls] callTodoDetailAPI SUCCESS');
				dispatch({ type: GET_TODO, payload: result.data });
			}
		};
	}
	
	
	
	
	/* 수정  */
	
	export const callTodoUpdateAPI = ({form,empCode}) => {
		console.log('[TodosAPICalls] callTodoUpdateAPI Call');
	
		const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/todos/${empCode}`;
	
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
	
			console.log('[TodosAPICalls] callTodoUpdateAPI RESULT : ', result);
	
			dispatch({ type: PUT_TODO,  payload: result });
			
		};    
	};


	
/* 검색 */
export const callTodoSearchAPI = ({ search }) => {
  console.log('[TodosAPICalls] callTodoSearchAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/todo/search?s=${search}`;
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
    console.log('[TodosAPICalls] callTodoSearchAPI RESULT : ', result);
    dispatch({ type: GET_TODOS, payload: result.data });
  };
	
};