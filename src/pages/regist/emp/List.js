import { Table, MainButton, SubButton, Input, FormatDate } from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callEmpListAPI, callEmployeesDeleteAPI } from '../../../apis/EmpAPICalls';

function EmpList() {

	const dispatch = useDispatch();
	const employees = useSelector(state => state.empReducer);
	const employeeList = employees.data;

	console.log(employeeList);

	const navigate = useNavigate();
	const pageInfo = employees.pageInfo;

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');

	const [checkedList, setCheckedList] = useState([]);

	useEffect(
		() => {
			dispatch(callEmpListAPI({
				currentPage: currentPage
			}));
		}
		, [currentPage]
	);

	// 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
	const onCheckedElement = (checked, employee) => {
		if (checked) {
			setCheckedList([...checkedList, employee.empCode]);
		} else if (!checked) {
			setCheckedList(checkedList.filter(el => el !== employee.empCode));
		}
	};

	const pageNumber = [];
	if (pageInfo) {
		for (let i = 1; i <= pageInfo.pageEnd; i++) {
			pageNumber.push(i);
		}
	}

	const onSelectHandler = (e) => {
		const input = document.getElementsByTagName('input');
		// console.log(input.length);
		for (var i = input.length - 1; i >= 0; i--) {
			if (input[0].checked === true) {
				input[i].checked = true;
			} else {
				input[i].checked = false;
			}
		}
	}

	/* 삭제 핸들러 */
	const onClickDeleteHandler = () => {

		const employeeCodes = [] = [...checkedList]

		console.log(employeeCodes);

		console.log(employeeCodes);
		dispatch(callEmployeesDeleteAPI({
			empCodes: JSON.stringify(employeeCodes)
		}));
		alert('사원 복수 삭제 완료');
		navigate('/regist/emp/list', { reload: true });
		window.location.reload();
	}



	const onClickEmployeeRegist = () => {
		navigate('/regist/emp/regist', { replace: false })
	}

	const onClickTableTr = (employee) => {
		navigate(`/regist/emp/detail`, { replace: false, state: employee });
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);

			navigate(`/regist/employee/search?value=${search}`, { replace: false });

			window.location.reload();
		}
	}

	return (
		<>
			<div className='outlet'>
				<h4>사원조회</h4>
					<Input style={{ float:"left"}}
						type="text"
						value={search}
						onKeyUp={onEnterkeyHandler}
						onChange={onSearchChangeHandler}
					/>

				<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
					{Array.isArray(employeeList) &&
						<SubButton
							onClick={() => setCurrentPage(currentPage - 1)}
							disabled={currentPage === 1}
						>
							&lt;
						</SubButton>
					}

					{pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
              {currentPage === num ? (
                <MainButton>{num}</MainButton>
              ) : (
                <SubButton>{num}</SubButton>
              )}
            </li>
          ))}

					{Array.isArray(employeeList) &&
						<SubButton
							onClick={() => setCurrentPage(currentPage + 1)}
							disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
						>
							&gt;
						</SubButton>
					}
				</div>

				<Table style={{ borderColor: '#aaaaaa', borderSpacing: 0 }} border={1}>
					<thead style={{ backgroundColor: '#266666', color: '#ffffff' }}>
						<tr>
							<th style={{ width: 10 }}><input type='checkbox' onChange={onSelectHandler} /></th>
							<th >입사일자</th>
							<th >사원번호</th>
							<th >성명</th>
							<th >부서명</th>
							<th >직급</th>
							<th >Email</th>
							<th >계좌번호</th>
							<th >급여구분</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(employeeList) && employeeList.map((employee) => (
							<tr key={employee.employeeCode}>
								<td style={{width: 10}}><input type='checkbox' onChange={e => onCheckedElement(e.target.checked, employee)} /></td>
								<td onClick={() => onClickTableTr(employee)}>{FormatDate(employee.empEntdate)}</td>
								<td onClick={() => onClickTableTr(employee)}>{employee.empCode}</td>
								<td onClick={() => onClickTableTr(employee)}>{employee.empName}</td>
								<td onClick={() => onClickTableTr(employee)}>{employee.dept.deptName}</td>
								<td onClick={() => onClickTableTr(employee)}>{employee.position.positionName}</td>
								<td onClick={() => onClickTableTr(employee)}>{employee.empEmail}</td>
								<td onClick={() => onClickTableTr(employee)}>{employee.empAccount}</td>
								<td onClick={() => onClickTableTr(employee)}>{"고정급"}</td>
							</tr>
						))}
					</tbody>
				</Table>
					<MainButton className='mainButton' onClick={onClickEmployeeRegist}>신규</MainButton>
					<SubButton className='subButton' onClick={onClickDeleteHandler}>삭제</SubButton>
			</div>

		</>
	);
}

export default EmpList;





