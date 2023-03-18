import { Table, TableHead, Div, MainButton, SubButton, Input, FormatNumber } from '../../../components/ThemeColor'

import Modal from '../../../components/modal/Modal.js';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";

import ClientList from '../../../components/regist/ClientSelectList'
import EmpList from '../../../components/regist/EmpSelectList'
import PurchaseList from '../../../components/regist/PurchaseSelectList'

import { callWithdrawRegistAPI } from '../../../apis/WithdrawAPICalls'

function WithdrawRegist() {

  const inputRef = useRef({});
  const dispatch = useDispatch();
	const navigate = useNavigate();

  const [form, setForm] = useState({
		withdrawAmount: '',
    withdrawDate: '',
    withdrawNote: '',
		withdrawPayable: '',
		clientCode: '',
		empCode: '',
		purchaseCode: '',
    totalPrice: '',
    totalAmount: '',
	});

  /* 등록 핸들러 */
  const onClickWithdrawRegistHandler = () => {
    console.log('[WithdrawRegist] onClickWithdrawRegistHandler');
    const registForm = {
      withdrawAmount: form.withdrawAmount,
      withdrawDate: form.withdrawDate,
      withdrawNote: form.withdrawNote,
			withdrawPayable: withdrawPayable,
      client: {
        clientCode: form.clientCode
      },
      emp: {
        empCode: form.empCode
      },
      purchase: {purchaseCode: form.purchaseCode
      }
    }
    dispatch(callWithdrawRegistAPI({ form: registForm }));
    alert('출금 등록 완료');
    navigate('/account/withdraw/list', {replace:true});
    window.location.reload();
  }


	const [clientModalOpen, setClientModalOpen] = useState(false)
	const [empModalOpen, setEmpModalOpen] = useState(false)
	const [purchaseModalOpen, setPurchaseModalOpen] = useState(false)

	const selectClient = (chosenClientCode, chosenClientName) => {
 		setForm({...form, clientCode : chosenClientCode, clientName : chosenClientName}); 
 		console.log("넘겨받은 고객코드: " + form.clientCode)
	}

	const selectEmp = (chosenEmpCode, chosenEmpName) => {
		setForm({...form, empCode : chosenEmpCode, empName : chosenEmpName});		
		console.log("넘겨받은 사원코드: " + form.empCode)
	}

  const selectPurchase = (chosenPurchaseCode, chosenTotalAmount, chosenTotalPrice) => {
 		setForm({...form, purchaseCode : chosenPurchaseCode, totalAmount : chosenTotalAmount, totalPrice: chosenTotalPrice});
    console.log("넘겨받은 판매코드:" + form.purchaseCode);
 	}

	/* 모달 여닫이 */
	const openClientModal = () => {
		setClientModalOpen(true, { replace: false });
	};

	const closeClientModal = () => {
		setClientModalOpen(false);
			console.log("고객 코드 출력 : " + form.clientCode );
	};

	const openEmpModal = () => {
		setEmpModalOpen(true, { replace: false });
	};

	const closeEmpModal = () => {
		setEmpModalOpen(false);
			console.log("사원 코드 출력 : " + form.empCode );
	};

	const openPurchaseModal = () => {
		setPurchaseModalOpen(true, { replace: false });
	};

	const closePurchaseModal = () => {
		setPurchaseModalOpen(false);
	};

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const withdrawPayable = form.totalPrice - form.withdrawAmount;

	return (
		<>
			<Modal open={clientModalOpen} close={closeClientModal} header=' 거래처 선택' >
				<ClientList selectClient={selectClient} close={closeClientModal} />
			</Modal>
			<Modal open={empModalOpen} close={closeEmpModal} header=' 사원 선택' >
				<EmpList selectEmp={selectEmp} close={closeEmpModal} />
			</Modal>
			<Modal open={purchaseModalOpen} close={closePurchaseModal} header=' 판매 선택' >
				<PurchaseList selectPurchase={selectPurchase} close={closePurchaseModal} />
			</Modal>


			<div className='outlet'>
				<h4>출금등록</h4>
				<Div>

					<TableHead>
						<tbody>
              <tr></tr>
              <tr>
                <th>출금일자</th>
                <td>
                  <Input type="date" name="withdrawDate" onChange={onChangeHandler} value={form.withdrawDate} ref={inputRef}/>
                </td>
                <th>통화</th>
                <td>
                  <Input type="text" placeholder="내자" readonly="true"/>
                </td>
              </tr>
							<tr></tr>
							<tr>
								<th>거래처명</th>
								<td>
									<Input size="1" name="clientCode" onClick={openClientModal} placeholder={form.clientCode}/>
									<MainButton onClick={openClientModal}>조회</MainButton>
									<Input size="7" name="clinetName" onClick={openClientModal} placeholder={form.clientName}/>
								</td>
								<th>담당자명</th>
								<td>
									<Input size="1" name="empCode" onClick={openEmpModal} placeholder={form.empCode}/>
									<MainButton onClick={openEmpModal}>조회</MainButton>
									<Input size="7" name="empName" onClick={openEmpModal} placeholder={form.empName}/>
								</td>
							</tr>
							<tr></tr>
						</tbody>
					</TableHead>
				</Div>

				<Table>
					<thead>
						<tr>
							<th>판매코드</th>
							<th>품목명</th>
							<th>매출액</th>
							<th>출금액</th>
							<th>미지급액</th>
							<th>비고</th>
						</tr>
					</thead>
					<tbody>
            <tr>
              <td onChange={onChangeHandler} onClick={openPurchaseModal} value={form?.purchaseCode}>{form?.purchaseCode}</td>
              <td onClick={openPurchaseModal} value={form?.totalAmount}>{form?.totalAmount}</td>
              <td onClick={openPurchaseModal} value={form?.totalPrice}>{FormatNumber (form?.totalPrice)}</td>
              <td><input name="withdrawAmount" value={form?.withdrawAmount} onChange={onChangeHandler}/></td>
							<td><input name="withdrawPayable" value={withdrawPayable} onChange={onChangeHandler}/></td>
              <td><input name="withdrawNote" value={form?.withdrawNote} onChange={onChangeHandler}/></td>
            </tr>
					</tbody>
				</Table>
				<MainButton	onClick={ onClickWithdrawRegistHandler }>	등록 </MainButton>
				<SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	)
}

export default WithdrawRegist;