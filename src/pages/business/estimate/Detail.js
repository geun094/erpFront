import { Table, TableHead, Div, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Modal from '../../../components/modal/Modal.js';

import EmpList from '../../../components/regist/EmpSelectList'
import ClientList from '../../../components/regist/ClientSelectList'
import StorageList from '../../../components/regist/StorageSelectList'
import ProductList from '../../../components/regist/ProductSelectList'

import {
	callEstimateDetailAPI,
	callEstimateUpdateAPI
} from '../../../apis/EstimateAPICalls';

function EstimateDetail() {

	const dispatch = useDispatch();
	const params = useParams();
	const estimate = useSelector(state => state.estimateReducer);

	const [modifyMode, setModifyMode] = useState(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		estimateDetails: []
	});

	useEffect(
		() => {
			console.log('[EstimateDetail] estimateCode : ', params.estimateCode);
			dispatch(callEstimateDetailAPI({
				estimateCode: params.estimateCode
			}));
		}
	,[]);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		console.log("확인" + estimate.estimateDetail?.product?.productCode);
		setModifyMode(true);
		setForm({
			estimateCode: estimate.estimateCode,
			estimateDate: estimate.estimateDate,
			estimateStatus: estimate.estimateStatus,
			clientCode: estimate?.client?.clientCode,
			empCode: estimate.emp?.empCode,
			storageCode: estimate.storage?.storageCode,
			estimateDetails: [{
				estimateNo: estimate.estimateDetail?.estimateNo,
				estimateAmount: estimate.estimateDetail?.estimateAmount,
				estimateNote: estimate.estimateDetail?.estimateNote,
				productCode: estimate.estimateDetail?.product?.productCode
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
	const onClickEstimateUpdateHandler = () => {
 		console.log('[EstimateUpdate] onClickEstimateUpdateHandler');
 		const updateForm = {
			estimateCode : form.estimateCode,
			estimateStatus : form.estimateStatus,
			client : {
				clientCode : form.clientCode
			},
			emp : {
				empCode : form.empCode
			},
			storage : {
				storageCode : form.storageCode
			},
			estimateDetail : form.estimateDetails.map(detail => ({
				estimateNo: detail.estimateNo,
				estimateAmount : detail.estimateAmount,
				estimateNote : detail.estimateNote,
				product: {
							productCode: detail.productCode
				}
			}))
 		}

	dispatch(callEstimateUpdateAPI({
		form: updateForm }));
		alert('견적 수정 완료');
		navigate('/business/estimate/list', { replace: true});
		window.location.reload();
	}

	// detail 추가 버튼
	const addEstimateDetail = (estimateAmount = '', estimateNote = '', productCode = '') => {
		setForm(prevState => {
			const estimateDetails = [...prevState.estimateDetails];
			estimateDetails.unshift({estimateAmount, estimateNote, productCode});
			return {...prevState, estimateDetails};
		});
	}

	// detail 삭제 버튼
	const removeEstimateDetail = (index) => {
		setForm({
			...form,
			estimateDetails: form.estimateDetails.filter((_, i) => i !== index),
		});
	}

	const [clientModalOpen, setClientModalOpen] = useState(false)
	const [empModalOpen, setEmpModalOpen] = useState(false)
	const [storageModalOpen, setStorageModalOpen] = useState(false)
	const [productModalOpen, setProductModalOpen] = useState(false)

	const selectClient = (chosenClientCode, chosenClientName) => {
 		setForm({...form, clientCode : chosenClientCode, clientName : chosenClientName});
 		console.log("고객 코드 수신: " + form.clientCode)
	}

	const selectEmp = (chosenEmpCode, chosenEmpName) => {
		setForm({...form, empCode : chosenEmpCode, empName : chosenEmpName});
		console.log("사원 코드 수신: " + form.empCode)
	}

	const selectStorage = (chosenStorageCode, chosenStorageName) => {
		setForm({...form, storageCode : chosenStorageCode, storageName : chosenStorageName});
		console.log("창고 코드 수신: " + form.storageCode)
	}

	const selectProduct = (chosenProductCode, chosenProductName, chosenProductFwdPriceA) => {
 		setForm(prevForm => ({
 			...prevForm,
 			estimateDetails: [
 				...prevForm.estimateDetails,
				{
					productCode: chosenProductCode,
					productName: chosenProductName,
					productFwdPriceA: chosenProductFwdPriceA,
				}
			]
 		}));
 		console.log("품목 코드 수신: " + form.estimateDetails.length)
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

	const handleChange = (e, index, key) => {
		setForm(prevState => {
			const estimateDetails = [...prevState.estimateDetails];
				estimateDetails[index][key] = e.target.value;
			return { ...prevState, estimateDetails };
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
			<Modal open={storageModalOpen} close={closeStorageModal} header=' 창고 선택' >
				<StorageList selectStorage={selectStorage} close={closeStorageModal} />
			</Modal>
			<Modal open={productModalOpen} close={closeProductModal} header=' 품목 선택' >
				<ProductList selectProduct={selectProduct} close={closeProductModal} />
			</Modal>

			<div className='outlet'>
				<h4>견적수정</h4>
				{ estimate &&
				<Div>
					<TableHead>
						<tbody>
							<tr></tr>
							<tr>
								<th>견적코드</th>
								<td><Input value={ estimate.estimateCode } readOnly={true}/></td>
								<th>견적일자</th>
								<td><Input value={FormatDate( estimate?.estimateDate )} /></td>
							</tr>
							<tr></tr>
							<tr>
								<th>견적상태</th>
								<td>
										<input
											type="radio" name="estimateStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.estimateStatus : estimate.estimateStatus) === '미확인' ? true : false }
											value="미확인"
										/>
									미확인
										<input
											type="radio" name="estimateStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.estimateStatus : estimate.estimateStatus) === '진행중' ? true : false }
											value="진행중"
										/>
										진행중
										<input
											type="radio" name="estimateStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.estimateStatus : estimate.estimateStatus) === '완료' ? true : false }
											value="완료"
										/>
										완료
								</td>
								<th>거래처명</th>
								<td>
									<Input size="1"
										type="text" name="clientCode" onChange={ onChangeHandler } onClick={ (openClientModal ) }
										value={ (modifyMode ? form.clientCode : estimate.client?.clientCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openClientModal}>조회</MainButton>
									<Input size="7"
										type="text" onClick={ (openClientModal ) }
										value={ (modifyMode ? form.clientName : estimate.client?.clientName)}
										readOnly={ modifyMode ? false : true }/>
								</td>
							</tr>
							<tr></tr>
							<tr>
								<th>담당자명</th>
								<td>
									<Input size="1"
										type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
										value={ (modifyMode ? form.empCode : estimate.emp?.empCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openEmpModal}>조회</MainButton>
									<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.empName :estimate.emp?.empName)}/>
								</td>
								<th>창고명</th>
								<td>
									<Input size="1"
										type="text" name="storageCode" onChange={ onChangeHandler } onClick={ (openStorageModal ) }
										value={ (modifyMode ? form.storageCode : estimate.storage?.storageCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openStorageModal}>조회</MainButton>
									<Input size="7"
										readOnly={ modifyMode ? false : true }
										value={ (modifyMode ? form.storageName : estimate.storage?.storageName)}/>
								</td>
							</tr>
							<tr></tr>
						</tbody>
					</TableHead>
					</Div>
				}

				{estimate &&
					<Table>
						<thead>
							<tr>
								<th>품목코드</th>
								<th>품목명</th>
								<th>견적단가</th>
								<th>견적수량</th>
								<th>금액합계</th>
								<th>비고</th>
								<th onClick={() => addEstimateDetail()}> + </th>
							</tr>
						</thead>
						<tbody>
							{modifyMode ? (
								form.estimateDetails.map((detail, index) => (
									<tr key={index}>
										<td onClick={openProductModal} value={detail.productCode} onChange={e => handleChange(e, index, 'productCode')}>{detail.productCode}</td>
										<td onClick={openProductModal} >{detail.productName}</td>
										<td>{FormatNumber (detail?.productFwdPriceA)}</td>
										<td><input size="1" type="number" value={detail.estimateAmount} onChange={(e) => handleChange(e, index, 'estimateAmount')}/></td>
										<td>{FormatNumber (detail?.productFwdPriceA * detail?.estimateAmount)}</td>
										<td><input type="text" value={detail.estimateNote} onChange={(e) => handleChange(e, index, 'estimateNote')}/></td>
										<td onClick={() => removeEstimateDetail(index)}> - </td>
									</tr>
									))
							) : (
								estimate?.estimateDetail?.map((detail, index) => (
									<tr key={index}>
										<td>{detail?.product?.productCode}</td>
										<td>{detail?.product?.productName}</td>
										<td>{FormatNumber (detail?.product?.productFwdPriceA)}</td>
										<td>{detail?.estimateAmount}</td>
										<td>{FormatNumber (detail?.product?.productFwdPriceA*detail?.estimateAmount)}</td>
										<td>{detail?.estimateNote}</td>
										<td></td>
									</tr>
								))
							)}
						</tbody>
					</Table>
				}
				{!modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
				{ modifyMode && <SubButton onClick={ onClickEstimateUpdateHandler } > 저장 </SubButton> }

			</div>
		</>
	);
}

export default EstimateDetail;













