import ClientStyle from '../../../css/Emp.module.css';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/modal/Modal.js';
import EmpSelectList from '../../../components/regist/EmpSelectList';
import{
	callClientModifyAPI
	
} from '../../../apis/ClientAPICalls'


function ClientDetail () {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		// clientCode: state.clientCode,
		// clientRepresentative: state.clientRepresentative,
		// clientType: state.clientType,
		// clientPhone: state.clientPhone,
		// clientAddress: state.clientAddress,
		// clientFax: state.clientFax,
		// clientWeb: state.clientWeb,
		// clientName: state.clientName,
		// clientItem: state.clientItem,
		// clientMobile: state.clientMobile,
		// clientEmail: state.clientEmail,
		// clientAccount: state.clientAccount,
		// empCode: state.empCode,
		// empPw: state.empPw,
		// empName: state.empName,
		// empRrn: state.empRrn,
		// empEntdate: state.empEntdate,
		// empRetdate: state.empRetdate,
		// empPhone: state.empPhone,
		// empMobile: state.empMobile,
		// empEmail: state.empEmail,
		// empAddress: state.empAddress,
		// empImage: state.empImage,
		// empAccount: state.empAccount,
		// empTheme: state.empTheme,
		// empStamp: state.empStamp
	});

	const [empModalOpen, setEmpModalOpen] = useState(false);

	const selectEmp = (chosenEmpCode, chosenEmpName) => {
		console.log("selectedEmp 함수 시작");

		setForm({...form,
				 empCode : chosenEmpCode,
				 empName : chosenEmpName});
	}

	const openEmpModal = () => {
		setEmpModalOpen(true, { replace: false });
	};

	const closeEmpModal = () => {
		setEmpModalOpen(false);
	};

	/* form 데이터 세팅 */  
	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	/* 수정 핸들러 */
	const onClickClientModifyHandler = () => {
		console.log('[ClientModify] onClickClientModifyHandler');

		let formData = new FormData();

		formData = {
			clientCode: form.clientCode,
			clientRepresentative: form.clientRepresentative,
			clientType: form.clientType,
			clientPhone: form.clientPhone,
			clientAddress: form.clientAddress,
			clientFax: form.clientFax,
			clientWeb: form.clientWeb,
			clientName: form.clientName,
			clientItem: form.clientItem,
			clientMobile: form.clientMobile,
			clientEmail: form.clientEmail,
			clientAccount: form.clientAccount,
			emp: {
				empCode: form.empCode,
			}
		}

		console.log("수정 버튼 눌렀을때 폼 출력 : " + formData)

	
		dispatch(callClientModifyAPI({
			form: formData
		}));  

		alert('거래처 수정 완료');
		navigate('/regist/client/list', { replace: true});
		window.location.reload();
	}

	return (
		<>
			<Modal open={empModalOpen} close={closeEmpModal} header='부서 선택' >
				<EmpSelectList selectEmp={selectEmp} close={closeEmpModal} />
			</Modal>
			<div className={ClientStyle.outBox}>
				<h5>거래처 수정</h5>
				<hr></hr>
				<div className={ClientStyle.container}>
						<div className={ClientStyle.side}>
						<label className={ClientStyle.clientLabel}>거래처코드</label>
							<input type="text" name="clientCode" onChange={onChangeHandler} value={form.clientCode} /><br />
							<label className={ClientStyle.clientLabel}>대표자명</label>
							<input type="text" name="Representative" onChange={onChangeHandler} value={form.clientType} /><br />
							<label className={ClientStyle.clientLabel}>업태</label>
							<input type="text" name="clientType" onChange={onChangeHandler} value={form.clientType} /><br />
							<label className={ClientStyle.clientLabel}>전화번호</label>
							<input type="text" name="clientPhone" onChange={onChangeHandler} value={form.clientPhone} /><br />
							<label className={ClientStyle.clientLabel}>주소</label>
							<input type="text" name="clientAddress" onChange={onChangeHandler} value={form.clientAddress} /><br />
							<label className={ClientStyle.clientLabel}>팩스</label>
							<input type="text" name="clientFax" onChange={onChangeHandler} value={form.clientFax} /><br />
							<label className={ClientStyle.clientLabel}>홈페이지</label>
							<input type="text" name="clientWeb" onChange={onChangeHandler} value={form.clientWeb} /><br />
						</div>
				   
					<div className={ClientStyle.side}>
					<label className={ClientStyle.clientLabel}>거래처명</label>
						<input type="text" name="clientName" onChange={onChangeHandler} value={form.clientName} /><br />
						<label className={ClientStyle.clientLabel}>담당자명</label>
							<input type="text" name="empName" className={ClientStyle.empCodeInput} onChange={onChangeHandler} value={form.empCode} />
							<button className={ClientStyle.empSearch} onClick={openEmpModal}></button>
							<input type="text" name="empCode" className={ClientStyle.empNameInput} onChange={onChangeHandler} value={form.empName} /><br />
						<label className={ClientStyle.clientLabel}>종목</label>
						<input type="text" name="clientItem" onChange={onChangeHandler} value={form.clientItem} /><br />
						<label className={ClientStyle.clientLabel}>핸드폰번호</label>
						<input type="text" name="clientMobile" onChange={onChangeHandler} value={form.clientMobile} /><br />
						<label className={ClientStyle.clientLabel}>이메일</label>
							<input type="text" name="clientEmail" onChange={onChangeHandler} value={form.clientEmail} /><br />
							<label className={ClientStyle.clientLabel}>계좌번호</label>
							<input type="text" name="clientAccount" onChange={onChangeHandler} value={form.clientAccount} /><br />
						
					</div>
				</div>
	
			<div className='buttonBox'>
				<button	className='mainButton' onClick={ onClickClientModifyHandler }>	수정저장 </button>
				<button className='subButton' style={{height:'25px'}} onClick = { () => navigate(-1) }> 취소 </button>
			</div>
		</div>
	</>
	);

				}
 export default ClientDetail;