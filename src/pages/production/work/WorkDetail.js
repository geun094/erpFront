import WorkDetailStyle from '../../../css/WorkDetail.module.css';
import {FormatNumber} from '../../../components/ThemeColor'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../../../components/modal/Modal';

import { callWorkDetailAPI } from '../../../apis/DetailAPICalls';

function WorkDetail(props) {

	console.log("헤더 출력 : " + props.header)

	const dispatch = useDispatch();
	const work = useSelector(state => state.detailReducer);

	const navigate = useNavigate();
	const [isTrue, setIsTrue] = useState(false);
	const [form, setForm] = useState();

	useEffect(
		() => {
			dispatch(callWorkDetailAPI({
				workCode: props.selectedWorkCode
			}));

			setForm({
				workCode: work?.workCode,
				workDate: work?.workDate,
				empCode: work?.emp?.empCode,
				empName: work?.emp?.empName,
				storageCode: work?.storage?.storageCode,
				storageName: work?.storage?.storageName,
				productCode: work?.product?.productCode,
				productName: work?.product?.productName,
				productAmount: work?.productAmount,
				workDetailList: work?.workDetailList?.map(detail => ({
					productCode: detail?.stock?.product?.productCode,
					productName: detail?.stock?.product?.productName,
					consumptionPerIngredient: detail?.consumptionPerIngredient,
					workNote: detail?.workNote
				}))   
		
			});
		}
		, []
	);

	console.log("상세 워크코드 출력 : " + work.workCode)

	// ----- 부서 선택 모달 관련 -----
	// 모달에서 부서를 클릭하면 해당 부서의 값이
	// 부모컴포넌트의 state에 저장되게 하는 함수
	// const selectDept = (chosenDeptCode, chosenDeptName) => {
	// 	console.log("selectedDept 함수 시작");

	// 	setForm({...form,
	// 			 deptCode : chosenDeptCode,
	// 			 deptName : chosenDeptName});
	// }

	// 부서 선택 모달을 여는 함수
	// const openDeptModal = () => {
	// 	setDeptModalOpen(true, { replace: false });
	// };

	// 부서 선택 모달을 닫는 함수  
	// const closeDeptModal = () => {
	// 	setDeptModalOpen(false);
	// };


	// ----- 직급 선택 모달 관련 -----
	// 모달에서 부서를 클릭하면 해당 부서의 값이
	// 부모컴포넌트의 state에 저장되게 하는 함수
	// const selectPosition = (chosenPositionCode, chosenPositionName) => {
	// 	console.log("selectedPosition 함수 시작");

	// 	setForm({...form,
	// 			 positionCode : chosenPositionCode,
	// 			 positionName : chosenPositionName});
	// }

	// // 직급 선택 모달을 여는 함수
	// const openPositionModal = () => {
	// 	setPositionModalOpen(true, { replace: false });
	// };

	// // 직급 선택 모달을 닫는 함수  
	// const closePositionModal = () => {
	// 	setPositionModalOpen(false);
	// };

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const onClickTableTr = () => {
		console.log(work?.workDetailList[0].stock?.product?.productName);
	}

	/* 수정 버튼 핸들러 */
	// const onClickEmployeeModifyHandler = () => {
	// 	console.log('[EmployeeRegist] onClickEmployeeModifyHandler');

	// 	let formData = new FormData();

	// 	formData = {
	// 		empCode: form.empCode,
	// 		empPw: form.empPw,
	// 		empName: form.empName,
	// 		empRrn: form.empRrn,
	// 		empEntdate: form.empEntdate,
	// 		empRetdate: form.empRetdate,
	// 		empPhone: form.empPhone,
	// 		empMobile: form.empMobile,
	// 		empEmail: form.empEmail,
	// 		empAddress: form.empAddress,
	// 		empImage: form.empImage,
	// 		empAccount: form.empAccount,
	// 		dept: {
	// 			deptCode: form.deptCode,
	// 		},
	// 		position: {
	// 			positionCode: form.positionCode,
	// 		}
	// 	}

	// 	console.log("수정 버튼 눌렀을때 폼 출력 : " + formData)

	// 	dispatch(callEmpModifyAPI({
	// 		form: JSON.stringify(formData)
	// 	}));
	// 	alert('사원 수정 완료');
	// 	// navigate('/regist/emp/list', { replace: true });
	// 	// window.location.reload();
	// }

	const [checkedList, setCheckedList] = useState([]);
	// 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
	const onCheckedElement = (checked, employee) => {
		if (checked) {
			setCheckedList([...checkedList, employee.empCode]);
		} else if (!checked) {
			setCheckedList(checkedList.filter(el => el !== employee.empCode));
		}
	};

	const onSelectHandler = (e) => {
		setIsTrue(false);
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

	return (
		<>
			{/* <Modal open={detailModalOpen} close={closedetailModal} header='부서 선택' >
				<WorkDetail close={closeWorkDetail} />
			</Modal> */}
			<div className={WorkDetailStyle.outBox}>
				<h5>{props.header}</h5>
				<hr></hr>
				<div className={WorkDetailStyle.outContainer}>
					<div className={WorkDetailStyle.upperContainer}>
						<div className={WorkDetailStyle.LabelContainer}>
							<label>작업코드</label><br />
							<label>담당자</label><br />
							<label>생산품목</label>
						</div>
						<div className={WorkDetailStyle.inputContainer}>
							<input value={form?.workCode}></input>
							<input value={form?.empName}></input>
							<input value={form?.productName}></input>
						</div>
						<div className={WorkDetailStyle.LabelContainer}>
							<label>작업일자</label><br />
							<label>생산공장</label><br />
							<label>생산수량</label>
						</div>
						<div className={WorkDetailStyle.inputContainer}>
							<input value={form?.workDate}></input>
							<input value={form?.productName}></input>
							<input value={form?.productAmount}></input>
						</div>
					</div>

					<div className={WorkDetailStyle.underContainer}>
						<table style={{ borderColor: '#aaaaaa', borderSpacing: 0 }} border={1}>
							<thead style={{ backgroundColor: '#266666', color: '#ffffff' }}>
								<tr>
									<th style={{ width: 10 }}><input type='checkbox' onChange={onSelectHandler} /></th>
									<th >재료코드</th>
									<th >재료명</th>
									<th >품목당소모량</th>
									<th >총소모량</th>
									<th >비고</th>
								</tr>
							</thead>
							<tbody>
								{Array.isArray(form?.workDetailList) && form?.workDetailList?.map((detail) => (
									<tr key={detail?.workNo}>
										<td><input type='checkbox' onChange={e => onCheckedElement(e.target.checked,)} /></td>
										<td onClick={() => onClickTableTr()}>{detail?.productCode}</td>
										<td onClick={() => onClickTableTr()}>{detail?.productName}</td>
										<td onClick={() => onClickTableTr()}>{detail?.consumptionPerIngredient}</td>
										<td onClick={() => onClickTableTr()}>{FormatNumber(parseInt(detail?.consumptionPerIngredient) * parseInt(detail.productAmount))}</td>
										<td onClick={() => onClickTableTr()}>{detail?.workNote}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>


				{/* 버튼 사이즈 못맞추겠어요 능력자분 찾습니다 ㅠㅠ */}
				<div className='buttonBox'>
					<button className='mainButton'>	등록 </button>
					<button className='resetButton'>다시 작성</button>
					<button className='subButton' style={{ marginTop: '10px', height: '30px' }} onClick={() => navigate(-1)}> 취소 </button>
				</div>
			</div>
		</>
	)

}
export default WorkDetail;