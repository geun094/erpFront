import { Table, TableHead, Div, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal.js';

import EmpList from '../../../components/regist/EmpSelectList'
import ClientList from '../../../components/regist/ClientSelectList'
import StockList from '../../../components/stock/StockSelectList'

import {
	callPurchaseDetailAPI,
	callPurchaseUpdateAPI
} from '../../../apis/PurchaseAPICalls';

function PurchaseDetail() {

	const dispatch = useDispatch();
	const params = useParams();
	const purchase  = useSelector(state => state.purchaseReducer);

	const [modifyMode, setModifyMode] = useState(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		purchaseDetails: []
	});

	useEffect(        
		() => {
			console.log('[PurchaseDetail] purchaseCode : ', params.purchaseCode);
			dispatch(callPurchaseDetailAPI({	
				purchaseCode: params.purchaseCode
			}));
		}
	,[]);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		setModifyMode(true);
		setForm({
			purchaseCode: purchase.purchaseCode,
			purchaseDate: purchase.purchaseDate,
			clientCode: purchase?.client?.clientCode,
			empCode: purchase.emp?.empCode,
			purchaseDetails: [{
				purchaseAmount: purchase.purchaseDetail?.purchaseAmount,
				purchaseNote: purchase.purchaseDetail?.purchaseNote,
				stockCode: purchase.purchaseDetail?.stock?.stockCode
			}]
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
	const onClickPurchaseUpdateHandler = () => {
		console.log('[PurchaseUpdate] onClickPurchaseUpdateHandler');
		const updateForm = {
				purchaseCode : form.purchaseCode,
				purchaseDate : form.purchaseDate,
				client : {
					clientCode : form.clientCode
				},
				emp : {
					empCode : form.empCode
				},
				purchaseDetail : form.purchaseDetails.map(detail => ({
					purchaseAmount : detail.purchaseAmount,
					purchaseNote : detail.purchaseNote,
					stock: {
						stockCode: detail.stockCode
					}
				}))
		}

	dispatch(callPurchaseUpdateAPI({
		form: updateForm }));         
	alert('주문 수정 완료');
	navigate('/purchase/purchase/list', { replace: true});
	window.location.reload();
}

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
    console.log("넘겨받은 품목코드: " + form.purchaseDetails.length)
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

	const openStockModal = () => {
		setStockModalOpen(true, { replace: false });
	};
	
	const closeStockModal = () => {
		setStockModalOpen(false);
				console.log("재고 코드 출력 : " + form.stockCode );
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
			<h4>구매수정</h4>
			{ purchase &&
			<Div>
				<TableHead>
					<tbody>
						<tr>　</tr>
						<tr>
							<th>구매코드</th>
							<td><Input value={ purchase.purchaseCode } readOnly/></td>
							<th>구매일자</th>
							<td>
								<Input
									name="purchaseDate" onChange={ onChangeHandler }
									type={ (modifyMode ? "Date" : null)}
									value={ (modifyMode ? form.purchaseDate : FormatDate(purchase.purchaseDate))}
									readOnly={ modifyMode ? false : true }
								/>
							</td>
						</tr>

						<tr>　</tr>

						<tr>
							<td>거래처명</td>
							<td>
								<Input size="1"
									type="text" name="clientCode" onChange={ onChangeHandler } onClick={ (openClientModal ) }
									value={ (modifyMode ? form.clientCode : purchase.client?.clientCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openClientModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={(modifyMode ? form.clientName : purchase.client?.clientName)}/>
							</td>
							<th>담당자명</th>
							<td>
								<Input size="1"
									type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
									value={ (modifyMode ? form.empCode : purchase.emp?.empCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openEmpModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.empName : purchase.emp?.empName)} />
							</td>
						</tr>
					</tbody>
					</TableHead>
			</Div>
			}
			<hr/>

			{purchase &&
			<Table style={{minWidth:"700px"}}>
				<thead>
					<tr>
						<th>재고코드</th>
						<th>창고코드</th>
						<th>창고명</th>
						<th>품목코드</th>
						<th>품목명</th>
						<th>구매단가</th>
						<th>구매수량</th>
						<th>금액합계</th>
						<th>비고</th>
						<th onClick = {addDetail}> + </th>
					</tr>
				</thead>
				<tbody>
					{modifyMode ? (
						form.purchaseDetails.map((detail, index) => (
							<tr key={index}>
								<td onClick={openStockModal} value={detail.stockCode}>{detail.stockCode}</td>
								<td onClick={openStockModal} >{detail?.storageCode}</td>
								<td onClick={openStockModal} >{detail?.storageName}</td>
								<td onClick={openStockModal} >{detail?.productCode}</td>
								<td onClick={openStockModal} >{detail?.productName}</td>
								<td>{FormatNumber (detail.productFwdPriceA)}</td>
								<td><input type="number" value={detail.purchaseAmount} onChange={(e) => handleChange(e, index, 'purchaseAmount')}/></td>
								<td>{FormatNumber (detail?.productFwdPriceA * detail?.purchaseAmount)}</td>
								<td><input type="text" value={detail.purchaseNote} onChange={(e) => handleChange(e, index, 'purchaseNote')}/></td>
								<td onClick={() => removeDetail(index)}> - </td>
							</tr>
						))
					) : (
						purchase?.purchaseDetail?.map((detail, index) => (
							<tr key={index}>
								<td>{detail?.stock?.stockCode}</td>
								<td>{detail?.stock?.storage?.storageCode}</td>
								<td>{detail?.stock?.storage?.storageName}</td>
								<td>{detail?.stock?.product?.productCode}</td>
								<td>{detail?.stock?.product?.productName}</td>
								<td>{FormatNumber (detail?.stock?.product?.productFwdPriceA)}</td>
								<td>{detail?.purchaseAmount}</td>
								<td>{FormatNumber (detail?.stock?.product?.productFwdPriceA*detail?.purchaseAmount)}</td>
								<td>{detail?.purchaseNote}</td>
								<td></td>
							</tr>
						))
					)}
				</tbody>
			</Table>
			}
				{ !modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
				{ modifyMode && <MainButton onClick={ onClickPurchaseUpdateHandler } > 저장 </MainButton> }
				<SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	);
}

export default PurchaseDetail;













