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
	callRequestDetailAPI,
	callRequestUpdateAPI
} from '../../../apis/RequestAPICalls';

function RequestDetail() {

	const dispatch = useDispatch();
	const params = useParams();
	const request  = useSelector(state => state.requestReducer);

	const [modifyMode, setModifyMode] = useState(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		requestDetails: []
	});

	useEffect(        
		() => {
			console.log('[RequestDetail] requestCode : ', params.requestCode);
			dispatch(callRequestDetailAPI({	
				requestCode: params.requestCode
			}));
		}
	,[]);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		console.log("확인" + request.requestDetail.product?.productCode);
		setModifyMode(true);
		setForm({
			requestCode: request.requestCode,
			requestDate: request.requestDate,
			requestStatus: request.requestStatus,
			clientCode: request?.client?.clientCode,
			empCode: request.emp?.empCode,
			storageCode: request.storage?.storageCode,
			requestDetails: [{
				requestNo: request.requestDetail?.requestNo,
				requestAmount: request.requestDetail?.requestAmount,
				requestNote: request.requestDetail?.requestNote,
				productCode: request.requestDetail?.product?.productCode
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
	const onClickRequestUpdateHandler = () => {
    console.log('[RequestUpdate] onClickRequestUpdateHandler');
    const updateForm = {
			requestCode : form.requestCode,
			requestStatus : form.requestStatus,
			client : {
				clientCode : form.clientCode
			},
			emp : {
				empCode : form.empCode
			},
			storage : {
				storageCode : form.storageCode
			},
			requestDetail : form.requestDetails.map(detail => ({
				requestNo: detail.requestNo,
				requestAmount : detail.requestAmount,
				requestNote : detail.requestNote,
				product: {
							productCode: detail.productCode
				}
			}))
    }

	dispatch(callRequestUpdateAPI({
		form: updateForm }));         
	alert('요청 수정 완료');
	navigate('/purchase/request/list', { replace: true});
	window.location.reload();

}

		// detail 추가 버튼
		const addRequestDetail = (requestAmount = '', requestNote = '', productCode = '') => {
			setForm(prevState => {
				const requestDetails = [...prevState.requestDetails];
					requestDetails.unshift({requestAmount, requestNote, productCode});		// unshift: 입력된 값이 자동으로 위로 올라가게 함
				return {...prevState, requestDetails};
			});
		}
		
		// detail 삭제 버튼
		const removeRequestDetail = (index) => {
			setForm({
					...form,
					requestDetails: form.requestDetails.filter((_, i) => i !== index),
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
      requestDetails: [
        ...prevForm.requestDetails,
        {
          productCode: chosenProductCode,
          productName: chosenProductName,
          productFwdPriceA: chosenProductFwdPriceA,
        }
      ]
    }));
    console.log("넘겨받은 품목코드: " + form.requestDetails.length)
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
    const value = e.target.value;
    setForm(prevState => {
			const requestDetails = [...prevState.requestDetails];
			requestDetails[index][key] = value;
			requestDetails[index]["requestPrice"] = requestDetails[index]["productFwdPriceA"] * requestDetails[index]["requestAmount"]
			return { ...prevState, requestDetails };
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
				<h4>요청수정</h4>
				{ request &&
				<Div>
					<TableHead>
						<tbody>
							<tr></tr>
							<tr>
								<th>요청코드</th>
								<td><Input value={ request.requestCode } readOnly={true}/></td>
								<th>요청일자</th>
								<td><Input value={FormatDate( request?.requestDate )} /></td>
							</tr>
							<tr></tr>
							<tr>
								<th>요청상태</th>
								<td>
										<input
											type="radio" name="requestStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.requestStatus : request.requestStatus) === '미확인' ? true : false }
											value="미확인"
										/>
									미확인
										<input
											type="radio" name="requestStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.requestStatus : request.requestStatus) === '진행중' ? true : false }
											value="진행중"
										/>
										진행중
										<input
											type="radio" name="requestStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
											checked={ (modifyMode ? form.requestStatus : request.requestStatus) === '완료' ? true : false }
											value="완료"
										/>
										완료
								</td>
								<th>거래처명</th>
								<td>
									<Input size="1"
										type="text" name="clientCode" onChange={ onChangeHandler } onClick={ (openClientModal ) }
										value={ (modifyMode ? form.clientCode : request.client?.clientCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openClientModal}>조회</MainButton>
									<Input size="7"
										type="text" onClick={ (openClientModal ) }
										value={ (modifyMode ? form.clientName : request.client?.clientName)}
										readOnly={ modifyMode ? false : true }/>
								</td>
							</tr>
							<tr></tr>
							<tr>
								<th>담당자명</th>
								<td>
									<Input size="1"
										type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
										value={ (modifyMode ? form.empCode : request.emp?.empCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openEmpModal}>조회</MainButton>
									<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.empName :request.emp?.empName)}/>
								</td>
								<th>창고명</th>
								<td>
									<Input size="1"
										type="text" name="storageCode" onChange={ onChangeHandler } onClick={ (openStorageModal ) }
										value={ (modifyMode ? form.storageCode : request.storage?.storageCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openStorageModal}>조회</MainButton>
									<Input size="7"
										readOnly={ modifyMode ? false : true }
										value={ (modifyMode ? form.storageName : request.storage?.storageName)}/>
								</td>
							</tr>
							<tr></tr>
						</tbody>
					</TableHead>
					</Div>
				}
			
			{request &&
					<Table>
						<thead>
							<tr>
								<th>품목코드</th>
								<th>품목명</th>
								<th>요청단가</th>
								<th>요청수량</th>
								<th>금액합계</th>
								<th>비고</th>
								<th onClick={() => addRequestDetail()}> + </th>
							</tr>
						</thead>
						<tbody>
							{modifyMode ? (
								form.requestDetails.map((detail, index) => (
									<tr key={index}>
										<td onChange={ onChangeHandler } onClick={openProductModal} value={detail.productCode}>{detail.productCode}</td>
										<td onClick={openProductModal} >{detail.productName}</td>
										<td>{FormatNumber (detail?.productFwdPriceA)}</td>
										<td><input size="1" type="number" value={detail.requestmount} onChange={(e) => handleChange(e, index, 'requestAmount')}/></td>
										<td>{FormatNumber (detail?.productFwdPriceA * detail?.requestAmount)}</td>
										<td><input type="text" value={detail.requestNote} onChange={(e) => handleChange(e, index, 'requestNote')}/></td>
										<td onClick={() => removeRequestDetail(index)}> - </td>
									</tr>
									))
							) : (
								request?.requestDetail?.map((detail, index) => (
									<tr key={index}>
										<td>{detail?.product?.productCode}</td>
										<td>{detail?.product?.productName}</td>
										<td>{FormatNumber (detail?.product?.productFwdPriceA)}</td>
										<td>{detail?.requestAmount}</td>
										<td>{FormatNumber (detail?.product?.productFwdPriceA*detail?.requestAmount)}</td>
										<td>{detail?.requestNote}</td>
										<td></td>
									</tr>
								))
							)}
						</tbody>
					</Table>
				}
				{!modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
				{ modifyMode && <SubButton onClick={ onClickRequestUpdateHandler } > 저장 </SubButton> }

			</div>
		</>
	);
}

export default RequestDetail;













