import { Table, TableHead, Div, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal.js';

import EmpList from '../../../components/regist/EmpSelectList'
import ClientList from '../../../components/regist/ClientSelectList'
import StorageList from '../../../components/regist/StorageSelectList'
import ProductList from '../../../components/regist/ProductSelectList'

import {
	callOrdersDetailAPI,
	callOrdersUpdateAPI
} from '../../../apis/OrdersAPICalls';

function OrdersDetail() {

	const dispatch = useDispatch();
	const params = useParams();
	const orders = useSelector(state => state.ordersReducer);

	const [modifyMode, setModifyMode] = useState(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		ordersDetails: []
	});

	useEffect(
		() => {
			console.log('[OrdersDetail] ordersCode : ', params.ordersCode);
			dispatch(callOrdersDetailAPI({
				ordersCode: params.ordersCode
			}));
		}
	,[]);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		console.log("확인" + orders.ordersDetail.product?.productCode);
		setModifyMode(true);
		setForm({
			ordersCode: orders.ordersCode,
			ordersDate: orders.ordersDate,
			ordersDelivery: orders.Delivery,
			ordersStatus: orders.ordersStatus,
			clientCode: orders?.client?.clientCode,
			empCode: orders.emp?.empCode,
			storageCode: orders.storage?.storageCode,
			ordersDetails: [{
				ordersAmount: orders.ordersDetail?.ordersAmount,
				ordersNote: orders.ordersDetail?.ordersNote,
				productCode: orders.ordersDetail?.product?.productCode
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

	/* 배열 데이터 세팅 */
	const handleChange = (e, index, key) => {
		setForm(prevState => {
			const ordersDetails = [...prevState.ordersDetails];
			ordersDetails[index][key] = e.target.value;
			return { ...prevState, ordersDetails };
		});
	}

	/* 수정 핸들러 */
	const onClickOrdersUpdateHandler = () => {
		console.log('[OrdersUpdate] onClickOrdersUpdateHandler');
 		const updateForm = {
			ordersCode : form.ordersCode,
			ordersDelivery : form.ordersDelivery,
			ordersStatus : form.ordersStatus,
			client : {
				clientCode : form.clientCode
			},
			emp : {
				empCode : form.empCode
			},
			storage : {
				storageCode : form.storageCode
			},
			ordersDetail : form.ordersDetails.map(detail => ({
				ordersAmount : detail.ordersAmount,
				ordersNote : detail.ordersNote,
				product: {
					productCode: detail.productCode
				}
			}))
		}

	dispatch(callOrdersUpdateAPI({
		form: updateForm }));
		alert('주문 수정 완료');
		navigate('/business/orders/list', { replace: true});
		window.location.reload();
	}

	// detail 추가 버튼
	const addDetail = (ordersAmount = '', ordersNote = '', productCode = '') => {
		setForm(prevState => {
			const ordersDetails = [...prevState.ordersDetails];
				ordersDetails.unshift({ordersAmount, ordersNote, productCode});
			return {...prevState, ordersDetails};
		});
	}

	// detail 삭제 버튼
	const removeDetail = (index) => {
		setForm({
			...form,
			ordersDetails: form.ordersDetails.filter((_, i) => i !== index),
		});
	}

	const [clientModalOpen, setClientModalOpen] = useState(false)
	const [empModalOpen, setEmpModalOpen] = useState(false)
	const [storageModalOpen, setStorageModalOpen] = useState(false)
	const [productModalOpen, setProductModalOpen] = useState(false)

	const selectClient = (chosenClientCode, chosenClientName) => {
		setForm({...form, clientCode : chosenClientCode, clientName : chosenClientName});
		console.log("넘겨받은 고객코드: " + form.clientCode)
	}

	const selectEmp = (chosenEmpCode, chosenEmpName) => {
		setForm({...form, empCode : chosenEmpCode, empName : chosenEmpName});
		console.log("넘겨받은 사원코드: " + form.empCode)
	}

	const selectStorage = (chosenStorageCode, chosenStorageName) => {
		setForm({...form, storageCode : chosenStorageCode, storageName : chosenStorageName});
		console.log("넘겨받은 창고코드: " + form.storageCode)
	}

	const selectProduct = (chosenProductCode, chosenProductName, chosenProductFwdPriceA) => {
 		setForm(prevForm => ({
 			...prevForm,
 			ordersDetails: [
				...prevForm.ordersDetails, {
					productCode: chosenProductCode,
					productName: chosenProductName,
					productFwdPriceA: chosenProductFwdPriceA,
				}
			]
 		}));
 		console.log("넘겨받은 품목코드: " + form.ordersDetails.length)
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

	const openStorageModal = () => {
		setStorageModalOpen(true, { replace: false });
	};

	const closeStorageModal = () => {
		setStorageModalOpen(false);
		console.log("창고 코드 출력 : " + form.storageCode );
	};

	const openProductModal = () => {
		setProductModalOpen(true, { replace: false });
	};

	const closeProductModal = () => {
		setProductModalOpen(false);
		console.log("품목 코드 출력 : " + form.productCode );
	};



 return (
 	<>
 		<Modal open={clientModalOpen} close={closeClientModal} header=' 거래처 선택' >
			<ClientList selectClient={selectClient} close={closeClientModal} />
		</Modal>
		<Modal open={empModalOpen} close={closeEmpModal} header=' 사원 선택' >
			<EmpList selectEmp={selectEmp} close={closeEmpModal} />
		</Modal>
		<Modal open={storageModalOpen} close={closeStorageModal} header=' 창고 선택' >
			<StorageList selectStorage={selectStorage} close={closeStorageModal} />
		</Modal>
		<Modal open={productModalOpen} close={closeProductModal} header=' 품목 선택' >
			<ProductList selectProduct={selectProduct} close={closeProductModal} />
		</Modal>

		<div className='outlet'>
			<h4>주문수정</h4>
			{ orders &&
			<Div>
				<TableHead>
					<tbody>
						<tr></tr>
						<tr>
							<th>주문코드</th>
							<td><Input value={ orders.ordersCode } readOnly/></td>
							<th>주문일자</th>
							<td><Input value={FormatDate(orders.ordersDate)} readOnly/></td>
						</tr>
						<tr></tr>
						<tr>
							<th>주문상태</th>
								<td>
									<label><input type="radio" name="ordersStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
									checked={ (modifyMode ? form.ordersStatus : orders.ordersStatus) === '미확인' ? true : false } value="미확인" /> 미확인</label> &nbsp;
									<label><input type="radio" name="ordersStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
									checked={ (modifyMode ? form.ordersStatus : orders.ordersStatus) === '진행중' ? true : false } value="진행중" /> 진행중</label> &nbsp;
									<label><input type="radio" name="ordersStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
									checked={ (modifyMode ? form.ordersStatus : orders.ordersStatus) === '완료' ? true : false } value="완료" /> 완료</label>
								</td>
							<th>납기일자</th>
							<td>
								<Input
									name="ordersDelivery" onChange={ onChangeHandler }
									type={ (modifyMode ? "Date" : null)}
									value={ (modifyMode ? form.ordersDelivery : FormatDate(orders.ordersDelivery))}
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
									value={ (modifyMode ? form.clientCode : orders.client?.clientCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openClientModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={(modifyMode ? form.clientName : orders.client?.clientName)}/>
							</td>
							<th>담당자명</th>
							<td>
								<Input size="1"
									type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
									value={ (modifyMode ? form.empCode : orders.emp?.empCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openEmpModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.empName : orders.emp?.empName)} />
							</td>
						</tr>
						<tr></tr>
						<tr>
							<th>창고명</th>
							<td>
								<Input size="1"
									type="text" name="storageCode" onChange={ onChangeHandler } onClick={ (openStorageModal ) }
									value={ (modifyMode ? form.storageCode : orders.storage?.storageCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openStorageModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.storageName : orders.storage?.storageName)} />
							</td>
						</tr>
						<tr></tr>
					</tbody>
				</TableHead>
			</Div>
			}
			{orders &&
				<Table style={{minWidth:"700px"}}>
					<thead>
						<tr>
							<th>품목코드</th>
							<th>품목명</th>
							<th>주문단가</th>
							<th>주문수량</th>
							<th>금액합계</th>
							<th>비고</th>
							<th onClick = {addDetail}> + </th>
						</tr>
					</thead>
					<tbody>
					{modifyMode ? (
						form.ordersDetails.map((detail, index) => (
							<tr key={index}>
								<td onClick={openProductModal} value={detail.productCode} onChange={(e) => handleChange(e, index, 'productCode')}>{detail.productCode}</td>
								<td onClick={openProductModal} >{detail.productName}</td>
								<td>{FormatNumber (detail?.productFwdPriceA)}</td>
								<td><input type="number" value={detail.ordersAmount} onChange={(e) => handleChange(e, index, 'ordersAmount')}/></td>
								<td>{FormatNumber (detail?.productFwdPriceA * detail?.ordersAmount)}</td>
								<td><input type="text" value={detail.ordersNote} onChange={(e) => handleChange(e, index, 'ordersNote')}/></td>
								<td onClick={() => removeDetail(index)}> - </td>
							</tr>
						))
					) : (
						orders?.ordersDetail?.map((detail, index) => (
							<tr key={index}>
								<td>{detail?.product?.productCode}</td>
								<td>{detail?.product?.productName}</td>
								<td>{FormatNumber (detail?.product?.productFwdPriceA)}</td>
								<td>{detail?.ordersAmount}</td>
								<td>{FormatNumber (detail?.product?.productFwdPriceA*detail?.ordersAmount)}</td>
								<td>{detail?.ordersNote}</td>
								<td></td>
							</tr>
						))
					)}
				</tbody>
			</Table>
			}
				{!modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
				{ modifyMode && <MainButton onClick={ onClickOrdersUpdateHandler } > 저장 </MainButton> }
				<SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	);
}

export default OrdersDetail;










