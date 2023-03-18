import { Table, TableHead, Div, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Modal from '../../../components/modal/Modal.js';
import EmpList from '../../../components/regist/EmpSelectList'

import {
	callScheduleDetailAPI, callScheduleUpdateAPI
} from '../../../apis/ScheduleAPICalls';

function ScheduleDetail() {

	const dispatch = useDispatch();
	const params = useParams();
	const schedule = useSelector(state => state.scheduleReducer);
	const navigate =useNavigate();
	const [modifyMode, setModifyMode] = useState(false);

	const [form, setForm] = useState({
		scheduleDetails: []
	});

	useEffect(
		() => {
			console.log('[ScheduleDetail] scheduleCode : ', params.scheduleCode);
			dispatch(callScheduleDetailAPI({
				scheduleCode: params.scheduleCode
			}));
		}
	,[]);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		setModifyMode(true);
		setForm({
			scheduleCode: schedule.scheduleCode,
			empCode: schedule.emp?.empCode,
      scheduleStatus: schedule.scheduleStatus,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
			scheduleTitle: schedule.scheduleTitle,
      scheduleContent: schedule.scheduleContent,
      scheduleTime: schedule.scheduleTime,
      location: schedule.location,
      openScope: schedule.openScope
		});
	}

	/* form 데이터 세팅 */
	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	/* 수정 핸들러 */
	const onClickScheduleUpdateHandler = () => {
 		console.log('[ScheduleUpdate] onClickScheduleUpdateHandler');
 		const updateForm = {
			scheduleCode : form.scheduleCode,
			scheduleStatus : form.scheduleStatus,
			startDate : form.startDate,
			endDate : form.endDate,
			scheduleTitle : form.scheduleTitle,
			scheduleContent : form.scheduleContent,
			scheduleTime : form.scheduleTime,
			location : form.location,
			openScope : form.openScope,
			emp : {
				empCode : form.empCode
			}
		}

	dispatch(callScheduleUpdateAPI({
		form: updateForm }));
		alert('일정 수정 완료');
		navigate('/task/schedule/list', { replace: true});
		window.location.reload();
	}

	const [empModalOpen, setEmpModalOpen] = useState(false)

	const selectEmp = (chosenEmpCode, chosenEmpName) => {
		setForm({...form, empCode : chosenEmpCode, empName : chosenEmpName});
		console.log("사원 코드 수신: " + form.empCode)
	}

	const openEmpModal = () => {
		setEmpModalOpen(true, { replace: false });
	};

	const closeEmpModal = () => {
		setEmpModalOpen(false);
		console.log("사원 코드 출력 : " + form.empCode );
	};

 	return (
		<>
			<Modal open={empModalOpen} close={closeEmpModal} header=' 사원 선택' >
				<EmpList selectEmp={selectEmp} close={closeEmpModal} />
			</Modal>

			<div className='outlet'>
				<h4>일정수정</h4>
				{ schedule &&
				<Div>
					<TableHead>
						<tbody>
							<tr></tr>
							<tr>
								<th>일정코드</th>
								<td><Input value={ schedule.scheduleCode } readOnly={true}/></td>

								<th>일정상태</th>
								<td>
										<input
											type="radio" name="scheduleStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.scheduleStatus : schedule.scheduleStatus) == '미확인' ? true : false }
											value="미확인"
										/>
									미확인
										<input
											type="radio" name="scheduleStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.scheduleStatus : schedule.scheduleStatus) == '진행중' ? true : false }
											value="진행중"
										/>
										진행중
										<input
											type="radio" name="scheduleStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.scheduleStatus : schedule.scheduleStatus) == '완료' ? true : false }
											value="완료"
										/>
										완료
								</td>
							</tr>
							<tr></tr>
							<tr>
								<th>시작일자</th>
								<td>
									<Input
										name="startDate" onChange={ onChangeHandler }
										type={ (modifyMode ? "Date" : null)}
										value={ (modifyMode ? form.startDate : FormatDate(schedule.startDate))}
										readOnly={ modifyMode ? false : true }
									/>
								</td>
								<th>종료일자</th>
								<td>
									<Input
										name="endDate" onChange={ onChangeHandler }
										type={ (modifyMode ? "Date" : null)}
										value={ (modifyMode ? form.endDate : FormatDate(schedule.endDate))}
										readOnly={ modifyMode ? false : true }
									/>
								</td>
							</tr>
							<tr></tr>
							<tr>
								<th>담당자명</th>
								<td>
									<Input size="1"
										type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
										value={ (modifyMode ? form.empCode : schedule.emp?.empCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openEmpModal}>조회</MainButton>
									<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.empName :schedule.emp?.empName+' '+schedule.emp?.position?.positionName)}/>
								</td>
								<th>공유</th>
								<td>
									<Input name="openScope" readOnly/>
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
				}

				{schedule &&
					<Table width="720px">
						<thead>
							<tr>
								<th>제목</th>
								<td colspan="3">
									<Input
										type="text"
										name="scheduleTitle" onChange={ onChangeHandler }
										value={ (modifyMode ? form.scheduleTitle : schedule.scheduleTitle) }
										readOnly={ modifyMode ? false : true }
									/>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="4">
									<textarea style={{width: "98%", height: "35vh", border: "none", resize: "none"}}
										type="textArea" name="scheduleContent" onChange={ onChangeHandler }
										value={ (modifyMode ? form.scheduleContent : schedule.scheduleContent) }
										readOnly={ modifyMode ? false : true }
									>
									</textarea>
								</td>
							</tr>
						</tbody>
					</Table>
				}
				{!modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
				{ modifyMode && <SubButton onClick={ onClickScheduleUpdateHandler } > 저장 </SubButton> }

			</div>
		</>
	);
}

export default ScheduleDetail;













