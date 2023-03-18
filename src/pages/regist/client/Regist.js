import ClientStyle from '../../../css/Emp.module.css';
import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal/Modal.js';
import EmpSelectList from '../../../components/regist/EmpSelectList';

import { callClientRegistAPI } from '../../../apis/ClientAPICalls'

function ClientRegist() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form, setForm] = useState({

        // clientCode: 0,
        // clientRepresentative: '',
        // clientType: '',
        // clientPhone: '',
        // clientAddress: '',
        // clientFax: '',
        // clientWeb: '',
        // clientName: '',
        // empName: '',
        // clientItem:'',
        // clientMobile:'',
        // clientEmail:'',
        // clientAccount:''

});

const [empModalOpen, setEmpModalOpen] = useState(false);
const selectEmp = (chosenEmpCode, chosenEmpName) => {
    console.log("selectedEmp 함수 시작");

    setForm({...form,
             empCode : chosenEmpCode,
             empName : chosenEmpName});
}

// 부서 선택 모달을 여는 함수
const openEmpModal = () => {
    setEmpModalOpen(true, { replace: false });
};

// 부서 선택 모달을 닫는 함수  
const closeEmpModal = () => {
    setEmpModalOpen(false);
};

const onChangeHandler = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
};

/* 등록 핸들러 */
const onClickClientRegistHandler = () => {
    console.log('[ClientRegist] onClickClientRegistHandler');

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
            empName: form.empName,
        }

    }
    
    dispatch(callClientRegistAPI({
        form: JSON.stringify(formData)
    }));
    alert('거래처 등록 완료');
     navigate('/regist/client/list', { replace: true });
     window.location.reload();
}


return (
    <>
    <Modal open={empModalOpen} close={closeEmpModal} header='부서 선택' >
				<EmpSelectList selectEmp={selectEmp} close={closeEmpModal} />
			</Modal>
        <div className={ClientStyle.outBox}>
            <h5>거래처 등록</h5>
            <hr></hr>
            <div className={ClientStyle.container}>
                    <div className={ClientStyle.side}>
                    <label className={ClientStyle.clientLabel}>거래처코드</label>
						<input type="text" name="clientCode" onChange={onChangeHandler} value={form.clientCode} /><br />
                        <label className={ClientStyle.clientLabel}>대표자명</label>
                        <input type="text" name="clientRepresentative" onChange={onChangeHandler} value={form.clientRepresentative} /><br />
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

        {/* 버튼 사이즈 못맞추겠어요 능력자분 찾습니다 ㅠㅠ */}
        <div className='buttonBox'>
            <button	className='mainButton' onClick={ onClickClientRegistHandler }>	등록 </button>
            <button className='subButton' style={{height:'25px'}} onClick = { () => navigate(-1) }> 취소 </button>
        </div>
    </div>
</>
)
}

export default ClientRegist;