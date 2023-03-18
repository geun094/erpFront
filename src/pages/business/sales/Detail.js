import { Table, TableHead, Div, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal.js';

import EmpList from '../../../components/regist/EmpSelectList'
import ClientList from '../../../components/regist/ClientSelectList'
import StockList from '../../../components/stock/StockSelectList'

import {
	callSalesDetailAPI,
	callSalesUpdateAPI
} from '../../../apis/SalesAPICalls';

function SalesDetail() {

	const dispatch = useDispatch();
	const params = useParams();
	const sales  = useSelector(state => state.salesReducer);

	const [modifyMode, setModifyMode] = useState(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		salesDetails: []
	});

	useEffect(        
		() => {
			console.log('[SalesDetail] salesCode : ', params.salesCode);
			dispatch(callSalesDetailAPI({	
				salesCode: params.salesCode
			}));
		}
	,[]);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		setModifyMode(true);
		setForm({
			salesCode: sales.salesCode,
			salesDate: sales.salesDate,
			clientCode: sales?.client?.clientCode,
			empCode: sales.emp?.empCode,
			salesDetails: [{
				salesAmount: sales.salesDetail?.salesAmount,
				salesNote: sales.salesDetail?.salesNote,
				stockCode: sales.salesDetail?.stock?.stockCode
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
	const onClickSalesUpdateHandler = () => {
    console.log('[SalesUpdate] onClickSalesUpdateHandler');
    const updateForm = {
			salesCode : form.salesCode,
			salesDate : form.salesDate,
			client : {
				clientCode : form.clientCode
			},
			emp : {
				empCode : form.empCode
			},
			salesDetail : form.salesDetails.map(detail => ({
				salesAmount : detail.salesAmount,
				salesNote : detail.salesNote,
				stock: {
					stockCode: detail.stockCode
				}
			}))
    }

	dispatch(callSalesUpdateAPI({
		form: updateForm }));         
	alert('주문 수정 완료');
	navigate('/business/sales/list', { replace: true});
	window.location.reload();
}

		// detail 추가 버튼
		const addDetail = (salesAmount = '', salesNote = '', stockCode = '') => {
			setForm(prevState => {
				const salesDetails = [...prevState.salesDetails];
				salesDetails.unshift({salesAmount, salesNote, stockCode});	
				return {...prevState, salesDetails};
			});
		}

		const handleChange = (e, index, key) => {
			setForm(prevState => {
				const salesDetails = [...prevState.salesDetails];
				salesDetails[index][key] = e.target.value;
				return { ...prevState, salesDetails };
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
    console.log("넘겨받은 품목코드: " + form.salesDetails.length)
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
			<h4>판매수정</h4>
			{ sales &&
			<Div>
				<TableHead>
					<tbody>
						<tr></tr>
						<tr>
							<th>판매코드</th>
							<td><Input value={ sales.salesCode } readOnly/></td>
							<th>판매일자</th>
							<td>
								<Input
									name="salesDate" onChange={ onChangeHandler }
									type={ (modifyMode ? "Date" : null)}
									value={ (modifyMode ? form.salesDate : FormatDate(sales.salesDate))}
									readOnly={ modifyMode ? false : true }
								/>
							</td>
						</tr>

						<tr></tr>

						<tr>
							<th>거래처명</th>
							<td>
								<Input size="1"
									type="text" name="clientCode" onChange={ onChangeHandler } onClick={ (openClientModal ) }
									value={ (modifyMode ? form.clientCode : sales.client?.clientCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openClientModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={(modifyMode ? form.clientName : sales.client?.clientName)}/>
							</td>
							<th>담당자명</th>
							<td>
								<Input size="1"
									type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
									value={ (modifyMode ? form.empCode : sales.emp?.empCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openEmpModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.empName : sales.emp?.empName)} />
							</td>
						</tr>
						
						<tr></tr>

					</tbody>
				</TableHead>
			</Div>
			}
			<hr/>

			{sales &&
			<Table style={{minWidth:"700px"}}>
				<thead>
					<tr>
						<th>재고코드</th>
						<th>창고코드</th>
						<th>창고명</th>
						<th>품목코드</th>
						<th>품목명</th>
						<th>판매단가</th>
						<th>판매수량</th>
						<th>금액합계</th>
						<th>비고</th>
						<th onClick = {addDetail}> + </th>
					</tr>
				</thead>
				<tbody>
					{modifyMode ? (
						form.salesDetails.map((detail, index) => (
							<tr key={index}>
								<td onClick={openStockModal} value={detail.stockCode} onChange={(e) => handleChange(e, index, 'stockCode')}>{detail.stockCode}</td>
								<td onClick={openStockModal} >{detail?.storageCode}</td>
								<td onClick={openStockModal} >{detail?.storageName}</td>
								<td onClick={openStockModal} >{detail?.productCode}</td>
								<td onClick={openStockModal} >{detail?.productName}</td>
								<td>{FormatNumber (detail.productFwdPriceA)}</td>
								<td><input type="number" value={detail.salesAmount} onChange={(e) => handleChange(e, index, 'salesAmount')}/></td>
								<td>{FormatNumber (detail?.productFwdPriceA * detail?.salesAmount)}</td>
								<td><input type="text" value={detail.salesNote} onChange={(e) => handleChange(e, index, 'salesNote')}/></td>
								<td onClick={() => removeDetail(index)}> - </td>
							</tr>
						))
					) : (
						sales?.salesDetail?.map((detail, index) => (
							<tr key={index}>
								<td>{detail?.stock?.stockCode}</td>
								<td>{detail?.stock?.storage?.storageCode}</td>
								<td>{detail?.stock?.storage?.storageName}</td>
								<td>{detail?.stock?.product?.productCode}</td>
								<td>{detail?.stock?.product?.productName}</td>
								<td>{FormatNumber (detail?.stock?.product?.productFwdPriceA)}</td>
								<td>{detail?.salesAmount}</td>
								<td>{FormatNumber (detail?.stock?.product?.productFwdPriceA*detail?.salesAmount)}</td>
								<td>{detail?.salesNote}</td>
								<td></td>
							</tr>
						))
					)}
				</tbody>
			</Table>
			}
				{ !modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
				{ modifyMode && <MainButton onClick={ onClickSalesUpdateHandler } > 저장 </MainButton> }
				<SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	);
}

export default SalesDetail;













