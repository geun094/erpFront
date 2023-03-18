import EmployeeStyle from '../../../css/Emp.module.css';

import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal/Modal.js';
import DeptSelectList from '../../../components/regist/DeptSelectList';
import PositionSelectList from '../../../components/regist/PositionSelectList';

import { callEmpRegistAPI } from '../../../apis/EmpAPICalls';

function EmpRegist() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		// empCode: "",
		// empPw: "",
		// empName: "",
		// empRrn: "",
		// empEntdate: "",
		// empRetdate: "",
		// empPhone: "",
		// empMobile: "",
		// empEmail: "",
		// empAddress: "",
		// empImage: "",
		// empAccount: "",
		// empTheme: "",
		// empStamp: "",
		// deptCode: "",
		// deptName: "",
		// deptSalary: "",
		// positionCode: "",
		// positionName: "",
		// positionSalary: ""
	});
	const [deptModalOpen, setDeptModalOpen] = useState(false);
	const [positionModalOpen, setPositionModalOpen] = useState(false);

	// ----- 부서 선택 모달 관련 -----
	// 모달에서 부서를 클릭하면 해당 부서의 값이
	// 부모컴포넌트의 state에 저장되게 하는 함수
	const selectDept = (chosenDeptCode, chosenDeptName) => {
		console.log("selectedDept 함수 시작");

		setForm({...form,
				 deptCode : chosenDeptCode,
				 deptName : chosenDeptName});
	}

	// 부서 선택 모달을 여는 함수
	const openDeptModal = () => {
		setDeptModalOpen(true, { replace: false });
	};

	// 부서 선택 모달을 닫는 함수  
	const closeDeptModal = () => {
		setDeptModalOpen(false);
	};

	
	// ----- 직급 선택 모달 관련 -----
	// 모달에서 부서를 클릭하면 해당 부서의 값이
	// 부모컴포넌트의 state에 저장되게 하는 함수
	const selectPosition = (chosenPositionCode, chosenPositionName) => {
		console.log("selectedPosition 함수 시작");

		setForm({...form,
				 positionCode : chosenPositionCode,
				 positionName : chosenPositionName});
	}

	// 직급 선택 모달을 여는 함수
	const openPositionModal = () => {
		setPositionModalOpen(true, { replace: false });
	};

	// 직급 선택 모달을 닫는 함수  
	const closePositionModal = () => {
		setPositionModalOpen(false);
	};

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

		console.log("온체인지 핸들러 empPw 출력 : " + form.empPw);
    };

	/* 등록 버튼 핸들러 */
	const onClickEmployeeRegistHandler = () => {
		console.log('[EmployeeRegist] onClickEmployeeRegistHandler');

		let formData = new FormData();

		formData = {
			empPw: form.empPw,
			empName: form.empName,
			empRrn: form.empRrn,
			empEntdate: form.empEntdate,
			empRetdate: form.empRetdate,
			empPhone: form.empPhone,
			empMobile: form.empMobile,
			empEmail: form.empEmail,
			empAddress: form.empAddress,
			empImage: form.empImage,
			empAccount: form.empAccount,
			empTheme: form.empTheme,
			empStamp: form.empStamp,
			dept: {
				deptCode: form.deptCode,
				deptName: form.deptName,
			},
			position: {
				positionCode: form.positionCode,
				positionName: form.positionName,
			}

		}
		
		console.log("등록 버튼 눌렀을때 폼 출력 : " + formData.empPw)
		console.log("등록 버튼 눌렀을때 state 출력 : " + form.empPw)
		
		dispatch(callEmpRegistAPI({
			form: JSON.stringify(formData)
		}));
		alert('사원 등록 완료');
		//  navigate('/regist/emp/list', { replace: true });
		//  window.location.reload();
	}

	return (
		<>
			<Modal open={deptModalOpen} close={closeDeptModal} header='부서 선택' >
				<DeptSelectList selectDept={selectDept} close={closeDeptModal} />
			</Modal>
			<Modal open={positionModalOpen} close={closePositionModal} header='부서 선택' >
				<PositionSelectList selectPosition={selectPosition} close={closePositionModal} />
			</Modal>
			<div className={EmployeeStyle.outBox}>
				<h5>사원 수정</h5>
				<hr></hr>
				<div className={EmployeeStyle.container}>
					<div className={EmployeeStyle.side}>
						<div className={EmployeeStyle.pictureBox}>
							<label className={EmployeeStyle.empLabel} style={{ marginTop: '4vh' }}>사진</label>
							<div className={EmployeeStyle.empPicture}
								name="empImage" onChange={onChangeHandler}>
							</div><br />
						</div>
						<label className={EmployeeStyle.empLabel}>부서</label>
						<input type="text" name="deptName" className={EmployeeStyle.deptCodeInput} onChange={onChangeHandler} value={form.deptCode} />
						<button className={EmployeeStyle.deptSearch} onClick={openDeptModal}></button>
						<input type="text" name="deptCode" className={EmployeeStyle.deptNameInput} onChange={onChangeHandler} value={form.deptName} /><br />
						<label className={EmployeeStyle.empLabel}>주민등록번호</label>
						<input type="text" name="empRrn" onChange={onChangeHandler} value={form.empRrn} /><br />
						<label className={EmployeeStyle.empLabel}>전화</label>
						<input type="text" name="empPhone" onChange={onChangeHandler} value={form.empPhone} /><br />
						<label className={EmployeeStyle.empLabel}>이메일</label>
						<input type="text" name="empEmail" onChange={onChangeHandler} value={form.empEmail} /><br />
						<label className={EmployeeStyle.empLabel}>입사일자</label>
						<input type="text" name="empEntdate" onChange={onChangeHandler} value={form.empEntdate} /><br />
					</div>
					<div className={EmployeeStyle.side}>
						<label className={EmployeeStyle.empLabel}>성명</label>
						<input type="text" name="empName" onChange={onChangeHandler} value={form.empName} /><br />
						<label className={EmployeeStyle.empLabel}>비밀번호</label>
						<input type="text" name="empPw" onChange={onChangeHandler} value={form.empPw} /><br />
						<label className={EmployeeStyle.empLabel}>직위</label>

						
						<input type="text" name="positionCode" className={EmployeeStyle.deptCodeInput} onChange={onChangeHandler} value={form.positionCode} />
						<button className={EmployeeStyle.deptSearch} onClick={openPositionModal}></button>
						<input type="text" name="positionName" className={EmployeeStyle.deptNameInput} onChange={onChangeHandler} value={form.positionName} /><br />
						<label className={EmployeeStyle.empLabel}>계좌번호</label>
						<input type="text" name="empAccount" onChange={onChangeHandler} value={form.empAccount} /><br />
						<label className={EmployeeStyle.empLabel}>모바일</label>
						<input type="text" name="empMobile" onChange={onChangeHandler} value={form.empMobile} /><br />
						<label className={EmployeeStyle.empLabel}>주소</label>
						<input type="text" name="empAddress" onChange={onChangeHandler} value={form.empAddress} /><br />
						<label className={EmployeeStyle.empLabel}>퇴사일자</label>
						<input type="text" name="empRetdate" onChange={onChangeHandler} value={form.empRetdate} /><br />
					</div>
				</div>

				{/* 버튼 사이즈 못맞추겠어요 능력자분 찾습니다 ㅠㅠ */}
				<div className='buttonBox'>
					<button className='mainButton' onClick={onClickEmployeeRegistHandler}>	등록 </button>
					<button className='resetButton'>다시 작성</button>
					<button className='subButton' style={{ marginTop: '10px', height: '30px' }} onClick={() => navigate(-1)}> 취소 </button>
				</div>
			</div>
		</>
	)

}
export default EmpRegist;