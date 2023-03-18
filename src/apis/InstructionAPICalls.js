import {
    GET_INSTRUCTIONS,
	POST_INSTRUCTION,
	GET_INSTRUCTION,
	PUT_INSTRUCTION,
	DELETE_INSTRUCTION
  } from '../modules/InstructionModule.js';


  export const callInstructionListAPI = ({currentPage}) => {
	
	let requestURL;

	if(currentPage !== undefined || currentPage !== null){
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/instructions?offset=${currentPage}`;
	}else {
		requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/instructions`;
	}
	
	console.log('[InstructionsAPICalls] requestURL : ', requestURL);

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
			console.log('[InstructionAPICalls] callInstructionAPI RESULT : ', result);
			dispatch({ type: GET_INSTRUCTIONS,  payload: result.data });
		}
	};
};


export const callInstructionRegistAPI = ({form}) => {

	console.log('[InstructionAPICalls] callInstructionRegistAPI Call');
	console.log(form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/instructions`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
				"Content-type": "application/json",
        		"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"  
      },
      body: JSON.stringify(form)
    })

		
    .then(response => response.json());
    console.log('[InstructionAPICalls] callInstructionRegistAPI RESULT : ', result);
		dispatch({ type: POST_INSTRUCTION,  payload: result });
  }
};


export const callInstructionUpdateAPI = ({form}) => {
	
	console.log('[InstructionAPICalls] callInstructionUpdateAPI Call');
	console.log(form);

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/instructions`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localInstruction.getItem("accessToken")
			},
			body: JSON.stringify(form)
		})
		.then(response => response.json());
		console.log('[InstructionAPICalls] callInstructionUpdateAPI RESULT : ', result);
		dispatch({ type: PUT_INSTRUCTION,  payload: result });
		
	};    
};

export const callInstructionDetailAPI = ({instructionCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/instructions/${instructionCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localInstruction.getItem("accessToken")
			}
		})
		.then(response => response.json());

		console.log('[InstructionAPICalls] callInstructionDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[InstructionAPICalls] callInstructionDeatilAPI SUCCESS');
			dispatch({ type: GET_INSTRUCTION, payload: result.data });

		}
	};

}

