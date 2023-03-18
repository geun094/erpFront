import {
  GET_EMPLOYEE,
  GET_EMPLOYEES,
  POST_EMPLOYEE,
  PUT_EMPLOYEE,
  DELETE_EMPLOYEE,

} from '../modules/EmpModule';


//사원 목록 조회
export const callEmpListAPI = ({ currentPage }) => {
  console.log("사원 목록 조회 API 시작")
  let requestURL;
  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/emps?offset=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/emps`;
  }

  console.log('[EmpListAPICalls] requestURL : ', requestURL);

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
    if (result.status === 200) {
      console.log('[EmpListAPICalls] callEmpListAPI RESULT : ', result);
			console.log('[EmpListAPICalls] callEmpListAPI RESULT : ', result.data);
      dispatch({ type: GET_EMPLOYEES, payload: result.data });
    }
  };
}

export const callEmpRegistAPI = ({ form }) => {

  console.log('[EmpAPICalls] callEmpRegistAPI Call');

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/emps`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: form
    })
      .then(response => response.json());

    console.log('[EmpAPICalls] callEmpRegistAPI RESULT : ', result);

    dispatch({ type: POST_EMPLOYEE, payload: result });
  }
};

export const callEmpModifyAPI = ({ form }) => {

  console.log('[EmpAPICalls] callEmpRegistAPI Call');
  console.log("api로 넘어온 form 출력" + form.empPw)

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/emps`;
  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Accept": "*/*",
        // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json());

    console.log('[EmpAPICalls] callEmpRegistAPI RESULT : ', result);

    dispatch({ type: PUT_EMPLOYEE, payload: result });
  }
};


export const callEmployeesDeleteAPI = ({empCodes}) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:7777/api/v1/emps`;

  console.log("empcode 출력 : " + empCodes);

	return async (dispatch, getState) => {
			const result = await fetch(requestURL, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "*/*",
						// "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
						"Access-Control-Allow-Origin": "*"  
					},
					body: empCodes
			})
			.then(response => response.json());

			console.log('[EmployeeAPICalls] callEmployeesDeleteAPI RESULT : ', result);
			if(result.status === 200){
					console.log('[EmployeeAPICalls] callEmployeesDeleteAPI SUCCESS');
					dispatch({ type: DELETE_EMPLOYEE, payload: result })
			}
	};
}
