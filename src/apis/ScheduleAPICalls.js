import {
	GET_SCHEDULE,
  GET_SCHEDULES,
  POST_SCHEDULE,
  PUT_SCHEDULE
} from '../modules/ScheduleModule.js';


export const callScheduleListAPI = ({}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/schedules`;
	
	console.log('[SchedulesAPICalls] requestURL : ', requestURL)
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
			console.log('[SchedulesAPICalls] callScheduleAPI RESULT : ', result);
			dispatch({ type: GET_SCHEDULES,  payload: result.data });
			console.log('[ScheduleAPICalls] callScheduleListAPI SUCCESS');
		}
	};
}

export const callScheduleSearchAPI = ({search}) => {
  console.log('[ScheduleAPICalls] callScheduleSearchAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/schedules/search?s=${search}`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
				"Content-Type": "application/json",
        "Accept": "*/*",
				// "Authorization": "Bearer " + window.localSchedule.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      }
    })
    .then(response => response.json());
    console.log('[ScheduleAPICalls] callScheduleSearchAPI RESULT : ', result);
    dispatch({ type: GET_SCHEDULES, payload: result.data });

  };
};

export const callScheduleRegistAPI = ({form}) => {
	console.log('[ScheduleAPICalls] callScheduleRegistAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/schedules`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
				"Content-Type": "application/json",
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localSchedule.getItem("accessToken")
				"Access-Control-Allow-Origin": "*"  
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json());
    console.log('[ScheduleAPICalls] callScheduleRegistAPI RESULT : ', result);
		dispatch({ type: POST_SCHEDULE,  payload: result });
  }
};

export const callScheduleUpdateAPI = ({form}) => {
	console.log('[ScheduleAPICalls] callScheduleUpdateAPI Call');
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/schedules`;
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localSchedule.getItem("accessToken")
			},
      body: JSON.stringify(form)
		})
		.then(response => response.json());
		console.log('[ScheduleAPICalls] callScheduleUpdateAPI RESULT : ', result);
		dispatch({ type: PUT_SCHEDULE,  payload: result });
		
	};    
};

export const callScheduleDetailAPI = ({scheduleCode}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/schedule/${scheduleCode}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
				// "Authorization": "Bearer " + window.localSchedule.getItem("accessToken")
			}
		})
		.then(response => response.json());
		console.log('[ScheduleAPICalls] callScheduleDetailAPI RESULT : ', result);
		if(result.status === 200){
			console.log('[ScheduleAPICalls] callScheduleDeatilAPI SUCCESS');
			dispatch({ type: GET_SCHEDULE, payload: result.data });

		}
	};
};

