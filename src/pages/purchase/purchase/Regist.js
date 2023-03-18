import { Table, TableHead, Div, MainButton, SubButton, Input, FormatNumber } from '../../../components/ThemeColor'


import Modal from '../../../components/modal/Modal.js';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";

import ClientList from '../../../components/regist/ClientSelectList'
import EmpList from '../../../components/regist/EmpSelectList'
import StockList from '../../../components/stock/StockSelectList'

import { callPurchaseRegistAPI } from '../../../apis/PurchaseAPICalls'

function PurchaseRegist() {

	const inputRef = useRef({});
  
	const dispatch = useDispatch();
	const navigate = useNavigate();

		/* 등록 핸들러 */
		const onClickPurchaseRegistHandler = () => {
			console.log('[PurchaseRegist] onClickPurchaseRegistHandler');
			const registForm = {
				
				purchaseDate: form.purchaseDate,
					client: {
						clientCode: form.clientCode
					},
					emp: {
						empCode: form.empCode
					},
					purchaseDetail: form.purchaseDetails.map(detail => ({	
						purchaseAmount: detail.purchaseAmount,
						purchaseNote: detail.purchaseNote,
						stock: {
							stockCode: detail.stockCode
						}
					}))
			}
			dispatch(callPurchaseRegistAPI({ form: registForm }));
			alert('구매 등록 완료');
			navigate('/purchase/purchase/list', {replace:true});
			window.location.reload();
	}

	const [form, setForm] = useState({
		purchaseDate: '',
		clientCode: '',
		empCode: '',
		purchaseDetails: [],		
	});

		// detail 추가 버튼
		const addDetail = (purchaseAmount = '', purchaseNote = '', stockCode = '') => {
			setForm(prevState => {
				const purchaseDetails = [...prevState.purchaseDetails];
					purchaseDetails.unshift({purchaseAmount, purchaseNote, stockCode});		
				return {...prevState, purchaseDetails};
			});
		}
	
		// detail 삭제 버튼
		const removeDetail = (index) => {
			setForm({
					...form,
					purchaseDetails: form.purchaseDetails.filter((_, i) => i !== index),
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
      purchaseDetails: [
        ...prevForm.purchaseDetails,
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
    const value = e.target.value;
    setForm(prevState => {
			const purchaseDetails = [...prevState.purchaseDetails];
			purchaseDetails[index][key] = value;
			purchaseDetails[index]["purchasePrice"] = purchaseDetails[index]["productFwdPriceA"] * purchaseDetails[index]["purchaseAmount"]
			return { ...prevState, purchaseDetails };
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
				<h4>구매등록</h4>
				<Div>
				<TableHead>
					<tbody>
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

						<tr>　</tr>
						
						<tr>
							<th>주문상태</th>
							<td>
								<Input placeholder="미확인" readonly="true"/>
							</td>

							<th>납기일자</th>
							<td>
								<Input type="date" name="purchaseDelivery" onChange={onChangeHandler} value={form.purchaseDelivery} ref={inputRef}/>
							</td>
						</tr>

						<tr>　</tr>

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
							<th>발주단가</th>
							<th>발주수량</th>
							<th>금액합계</th>
							<th>비고</th>
							<th onClick={() => addDetail()}> + </th>
						</tr>
					</thead>
					<tbody>
						{form.purchaseDetails.map((detail, index) => (
							<tr key={index}> 
								<td onClick={openStockModal}>{detail.storageCode}</td>
								<td onClick={openStockModal}>{detail.storageName}</td>
								<td onClick={openStockModal}>{detail.productCode}</td>
								<td onClick={openStockModal}>{detail.productName}</td>
								<td>{FormatNumber (detail.productFwdPriceA)}</td>
								<td><input type="number" value={detail.purchaseAmount} onChange={(e) => handleChange(e, index, 'purchaseAmount')}/></td>
								<td>{FormatNumber (detail.productFwdPriceA * detail.purchaseAmount) ? (detail.productFwdPriceA * detail.purchaseAmount) : null}</td>
								<td><input type="text" value={detail.purchaseNote} onChange={(e) => handleChange(e, index, 'purchaseNote')}/></td>
								<td onClick={() => removeDetail(index)}> - </td>
							</tr>
						))}
					</tbody>
				</Table>
				<MainButton	className='mainButton' onClick={ onClickPurchaseRegistHandler }>	등록 </MainButton>
				<SubButton className='subButton' onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	)
}

export default PurchaseRegist;