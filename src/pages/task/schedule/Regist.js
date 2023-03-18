import { Table, TableHead, Div, MainButton, SubButton, Input, FormatNumber } from '../../../components/ThemeColor'

import Modal from '../../../components/modal/Modal.js';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";

import EmpList from '../../../components/regist/EmpSelectList'

import { callScheduleRegistAPI } from '../../../apis/ScheduleAPICalls'

function ScheduleRegist() {

	const inputRef = useRef({});
 const dispatch = useDispatch();
	const navigate = useNavigate();

		/* 등록 핸들러 */
		const onClickScheduleRegistHandler = () => {
			console.log('[ScheduleRegist] onClickScheduleRegistHandler');
			const registForm = {
					scheduleStatus: "미확인",
					startDate: form.startDate,
					endDate: form.endDate,
					scheduleTitle: form.scheduleTitle,
					scheduleContent: form.scheduleContent,
					scheduleTime: form.scheduleTime,
					location: form.location,
					openScope: form.openScope,
					emp: {
							empCode: form.empCode
					}
			}
			dispatch(callScheduleRegistAPI({ form: registForm }));
			alert('일정 등록 완료');
			navigate('/task/schedule/list', {replace:true});
			window.location.reload();
	}
	


	const [form, setForm] = useState({
		scheduleStatus: '',
		startDate: '',
    endDate: '',
    scheduleTitle: '',
    scheduleContent: '',
    scheduleTime: '',
    location: '',
    openScope:  '',
    empCode: ''
	});

	const [empModalOpen, setEmpModalOpen] = useState(false)

	const selectEmp = (chosenEmpCode, chosenEmpName) => {
		setForm({...form, empCode : chosenEmpCode, empName : chosenEmpName});		// 그렇지 않으면 client, emp, storage가 동시에 선택되지 않음
		console.log("넘겨받은 사원코드: " + form.empCode)
	}


	/* 모달 여닫이 */
	const openEmpModal = () => {
		setEmpModalOpen(true, { replace: false });
	};

	const closeEmpModal = () => {
		setEmpModalOpen(false);
			console.log("사원 코드 출력 : " + form.empCode );
	};

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};


	return (
		<>
			<Modal open={empModalOpen} close={closeEmpModal} header=' 사원 선택' >
				<EmpList selectEmp={selectEmp} close={closeEmpModal} />
			</Modal>

			<div className='outlet'>
				<h4>일정등록</h4>
				<Div>

					<TableHead>
						<tbody>
							<tr></tr>
							<tr>
              <th>담당자명</th>
                <td>
									<Input size="1"
										type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
										value={ form.empCode }
									/>
									<MainButton onClick={openEmpModal}>조회</MainButton>
									<Input size="7" value={ form.empName }/>
								</td> 
								<th>일정상태</th>
								<td>
									<Input placeholder="미확인" readonly="true"/>
								</td>
							</tr>
							<tr></tr>

              <tr>
                <th>시작일자</th>
                <td>
                  <Input
                    name="startDate"
                    onChange={ onChangeHandler }
										value={form.startDate}
                    type="date"
                  />
                </td>
                <th>종료일자</th>
                <td>
                  <Input
                    name="endDate"
                    onChange={ onChangeHandler }
										value={form.endDate}
                    type="date"
                  />
                </td>
              </tr>
              <tr></tr>
							<tr>
								<th>장소</th>
								<td>
									<Input name="location"/>
								</td>
								<th>시간</th>
								<td>
									<Input type="time" name="scheduleTime"/>
								</td>
							</tr>
              <tr></tr>
						</tbody>
					</TableHead>
				</Div>

				<Table width="720px">
						<thead>
							<tr>
								<th>제목</th>
								<td colspan="3">
									<Input
                    type="text"
										name="scheduleTitle"
                    onChange={ onChangeHandler }
										value={form.scheduleTitle}
									/>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="4">
									<textarea style={{width: "98%", height: "35vh", border: "none", resize: "none"}}
										type="textArea" name="scheduleContent"
                    onChange={ onChangeHandler }
										value={form.scheduleContent}
									>
									</textarea>
								</td>
							</tr>
						</tbody>
					</Table>

				<MainButton	onClick={ onClickScheduleRegistHandler }>	등록 </MainButton>
				<SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	)
}

export default ScheduleRegist;