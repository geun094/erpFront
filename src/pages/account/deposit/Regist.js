import { Table, TableHead, Div, MainButton, SubButton, Input, FormatNumber } from '../../../components/ThemeColor'

import Modal from '../../../components/modal/Modal.js';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";

import ClientList from '../../../components/regist/ClientSelectList'
import EmpList from '../../../components/regist/EmpSelectList'
import SalesList from '../../../components/regist/SalesSelectList'

import { callDepositRegistAPI } from '../../../apis/DepositAPICalls'

function DepositRegist() {

  const inputRef = useRef({});
  const dispatch = useDispatch();
	const navigate = useNavigate();

  const [form, setForm] = useState({
		depositAmount: '',
    depositDate: '',
    depositNote: '',
		depositReceivable: '',
		clientCode: '',
		empCode: '',
		salesCode: '',
    totalPrice: '',
    totalAmount: '',
	});

  /* 등록 핸들러 */
  const onClickDepositRegistHandler = () => {
    console.log('[DepositRegist] onClickDepositRegistHandler');
    const registForm = {
      depositAmount: form.depositAmount,
      depositDate: form.depositDate,
      depositNote: form.depositNote,
			depositReceivable: depositReceivable,
      client: {
        clientCode: form.clientCode
      },
      emp: {
        empCode: form.empCode
      },
      sales: {salesCode: form.salesCode
      }
    }
    dispatch(callDepositRegistAPI({ form: registForm }));
    alert('입금 등록 완료');
    navigate('/account/deposit/list', {replace:true});
    window.location.reload();
  }

	const [clientModalOpen, setClientModalOpen] = useState(false)
	const [empModalOpen, setEmpModalOpen] = useState(false)
	const [salesModalOpen, setSalesModalOpen] = useState(false)

	const selectClient = (chosenClientCode, chosenClientName) => {
 		setForm({...form, clientCode : chosenClientCode, clientName : chosenClientName});
 		console.log("넘겨받은 고객코드: " + form.clientCode)
	}

	const selectEmp = (chosenEmpCode, chosenEmpName) => {
		setForm({...form, empCode : chosenEmpCode, empName : chosenEmpName});
		console.log("넘겨받은 사원코드: " + form.empCode)
	}

  const selectSales = (chosenSalesCode, chosenTotalAmount, chosenTotalPrice) => {
 		setForm({...form, salesCode : chosenSalesCode, totalAmount : chosenTotalAmount, totalPrice: chosenTotalPrice});
    console.log("넘겨받은 판매코드:" + form.salesCode);
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

	const openSalesModal = () => {
		setSalesModalOpen(true, { replace: false });
	};

	const closeSalesModal = () => {
		setSalesModalOpen(false);
	};

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const depositReceivable = form.totalPrice - form.depositAmount;

	return (
		<>
			<Modal open={clientModalOpen} close={closeClientModal} header=' 거래처 선택' >
				<ClientList selectClient={selectClient} close={closeClientModal} />
			</Modal>
			<Modal open={empModalOpen} close={closeEmpModal} header=' 사원 선택' >
				<EmpList selectEmp={selectEmp} close={closeEmpModal} />
			</Modal>
			<Modal open={salesModalOpen} close={closeSalesModal} header=' 판매 선택' >
				<SalesList selectSales={selectSales} close={closeSalesModal} />
			</Modal>

			<div className='outlet'>
				<h4>입금등록</h4>
				<Div>

					<TableHead>
						<tbody>
              <tr></tr>
              <tr>
                <th>입금일자</th>
                <td>
                  <Input type="date" name="depositDate" onChange={onChangeHandler} value={form.depositDate} ref={inputRef}/>
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
							<th>입금액</th>
							<th>미수금액</th>
							<th>비고</th>
						</tr>
					</thead>
					<tbody>
            <tr>
              <td onChange={onChangeHandler} onClick={openSalesModal} value={form?.salesCode}>{form?.salesCode}</td>
              <td onClick={openSalesModal} value={form?.totalAmount}>{form?.totalAmount}</td>
              <td onClick={openSalesModal} value={form?.totalPrice}>{FormatNumber (form?.totalPrice)}</td>
              <td><input name="depositAmount" value={form?.depositAmount} onChange={onChangeHandler}/></td>
							<td><input name="depositReceivable" value={depositReceivable} onChange={onChangeHandler}/></td>
              <td><input name="depositNote" value={form?.depositNote} onChange={onChangeHandler}/></td>
            </tr>
					</tbody>
				</Table>
				<MainButton	onClick={ onClickDepositRegistHandler }>	등록 </MainButton>
				<SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	)
}

export default DepositRegist;