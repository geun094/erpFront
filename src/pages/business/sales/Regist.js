import { Table, TableHead, Div, MainButton, SubButton, Input, FormatNumber } from '../../../components/ThemeColor'

import Modal from '../../../components/modal/Modal.js';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";

import ClientList from '../../../components/regist/ClientSelectList'
import EmpList from '../../../components/regist/EmpSelectList'
import StockList from '../../../components/stock/StockSelectList'

import { callSalesRegistAPI } from '../../../apis/SalesAPICalls'

function SalesRegist() {

	const inputRef = useRef({});
  
	const dispatch = useDispatch();
	const navigate = useNavigate();

		/* 등록 핸들러 */
		const onClickSalesRegistHandler = () => {
			console.log('[SalesRegist] onClickSalesRegistHandler');
			const registForm = {
				salesDate: form.salesDate,
				client: {
					clientCode: form.clientCode
				},
				emp: {
					empCode: form.empCode
				},
				salesDetail: form.salesDetails.map(detail => ({
					salesAmount: detail.salesAmount,
					salesNote: detail.salesNote,
					stock: {
						stockCode: detail.stockCode
					}
				}))
			}
			dispatch(callSalesRegistAPI({ form: registForm }));
			alert('판매 등록 완료');
			navigate('/business/sales/list', {replace:true});
			window.location.reload();
	}

	const [form, setForm] = useState({
		salesDate: '',
		clientCode: '',
		empCode: '',
		salesDetails: []
	});

		// detail 추가 버튼
		const addDetail = (salesAmount = '', salesNote = '', stockCode = '') => {
			setForm(prevForm => {
				const salesDetails = [...prevForm.salesDetails];
					salesDetails.unshift({salesAmount, salesNote, stockCode});
				return {...prevForm, salesDetails};
			});
		}
	
		// detail 삭제 버튼
		const removeDetail = (index) => {
			setForm({
					...form,
					salesDetails: form.salesDetails.filter((_, i) => i !== index),
			});
	}
 
	const [clientModalOpen, setClientModalOpen] = useState(false)
	const [empModalOpen, setEmpModalOpen] = useState(false)
	const [stockModalOpen, setStockModalOpen] = useState(false)

	const selectClient = (chosenClientCode, chosenClientName) => {
    setForm({...form, clientCode : chosenClientCode, clientName : chosenClientName});
    console.log("넘겨받은 고객코드: " + form.clientCode)
	}

	const selectEmp = (chosenEmpCode, chosenEmpName) => {
    setForm({...form, empCode : chosenEmpCode, empName : chosenEmpName});
    console.log("넘겨받은 사원코드: " + form.empCode)
	}

	const selectStock = (chosenStockCode, chosenStorageCode, chosenStorageName, chosenProductCode, chosenProductName, chosenProductFwdPriceA) => {
    setForm(prevForm => ({
      ...prevForm,
      salesDetails: [
        ...prevForm.salesDetails,
        {
         	stockCode: chosenStockCode,
					storageCode: chosenStorageCode,
					storageName: chosenStorageName,
					productCode: chosenProductCode,
          productName: chosenProductName,
          productFwdPriceA: chosenProductFwdPriceA,
        }
      ]
    }));
    console.log("넘겨받은 재고명: " + chosenProductName)
  }

	/* 모달 여닫이 */
	const openClientModal = () => {
		setClientModalOpen(true, { replace: false });
	};
	
	const closeClientModal = () => {
		setClientModalOpen(false);
				console.log("고객 코드 출력 : " + form.clientCode);
	};

	const openEmpModal = () => {
		setEmpModalOpen(true, { replace: false });
	};
	
	const closeEmpModal = () => {
		setEmpModalOpen(false);
				console.log("사원 코드 출력 : " + form.empCode);
	};

	const openStockModal = () => {
		setStockModalOpen(true, { replace: false });
	};
	
	const closeStockModal = () => {
		setStockModalOpen(false);
				console.log("재고 코드 출력 : " + form.stockCode);
	};

	const onChangeHandler = (e) => {
		setForm({
			...form, 
			[e.target.name]: e.target.value
		});
	};

	const handleChange = (e, index, key) => {
    setForm(prevState => {
			const salesDetails = [...prevState.salesDetails];
			salesDetails[index][key] = e.target.value;
			return { ...prevState, salesDetails };
    });
	}

	return (
		<>
			<Modal open={clientModalOpen} close={closeClientModal} header=' 거래처 선택' >
				<ClientList selectClient={selectClient} close={closeClientModal} />
			</Modal>
			<Modal open={empModalOpen} close={closeEmpModal} header=' 사원 선택' >
				<EmpList selectEmp={selectEmp} close={closeEmpModal} />
			</Modal>
			<Modal open={stockModalOpen} close={closeStockModal} header=' 재고 선택' >
				<StockList selectStock={selectStock} close={closeStockModal} />
			</Modal>

			<div className='outlet'>
				<h4>판매등록</h4>
				<Div>
				<TableHead>
					<tbody>
						<tr></tr>
						<tr>
							<th>거래처명</th>
							<td>
								<Input  size="1" type="text" name="clientCode" onChange={onChangeHandler} onClick={openClientModal} value={form.clientCode} ref={inputRef}/>
								<MainButton onClick={openClientModal}>조회</MainButton>
								<Input size="7" type="text" name="clinetName" onClick={openClientModal} placeholder={form.clientName}/>
							</td>

							<th>담당자명</th>
							<td>
								<Input size="1" name="empCode" onChange={onChangeHandler} onClick={openEmpModal} value={form.empCode} ref={inputRef}/>
								<MainButton onClick={openEmpModal}>조회</MainButton>
								<Input size="7" name="empName" onClick={openEmpModal} placeholder={form.empName}/>
							</td>
						</tr>

						<tr></tr>
						
						<tr>
							<th>주문상태</th>
							<td>
								<Input placeholder="미확인" readonly="true"/>
							</td>

							<th>납기일자</th>
							<td>
								<Input type="date" name="salesDelivery" onChange={onChangeHandler} value={form.salesDelivery} ref={inputRef}/>
							</td>
						</tr>

						<tr></tr>

					</tbody>
				</TableHead>
				</Div>

				<Table style={{minWidth:"700px"}}>
					<thead>
						<tr>
							<th>창고코드</th>
							<th>창고명</th>
							<th>품목코드</th>
							<th>품목명</th>
							<th>주문단가</th>
							<th>주문수량</th>
							<th>금액합계</th>
							<th>비고</th>
							<th onClick={() => addDetail()}> + </th>
						</tr>
					</thead>
					<tbody>
						{form.salesDetails.map((detail, index) => (
							<tr key={index}> 
								<td onClick={openStockModal}>{detail.storageCode}</td>
								<td onClick={openStockModal}>{detail.storageName}</td>
								<td onClick={openStockModal}>{detail.productCode}</td>
								<td onClick={openStockModal}>{detail.productName}</td>
								<td>{FormatNumber (detail.productFwdPriceA)}</td>
								<td><input type="number" value={detail.salesAmount} onChange={(e) => handleChange(e, index, 'salesAmount')}/></td>
								<td>{FormatNumber (detail.productFwdPriceA * detail.salesAmount)}</td>
								<td><input type="text" value={detail.salesNote} onChange={(e) => handleChange(e, index, 'salesNote')}/></td>
								<td onClick={() => removeDetail(index)}> - </td>
							</tr>
						))}
					</tbody>
				</Table>
				<MainButton	className='mainButton' onClick={ onClickSalesRegistHandler }>	등록 </MainButton>
				<SubButton className='subButton' onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	)
}

export default SalesRegist;