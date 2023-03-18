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
	callPlaceDetailAPI,
	callPlaceUpdateAPI
} from '../../../apis/PlaceAPICalls';

function PlaceDetail() {

	const dispatch = useDispatch();
	const params = useParams();
	const place  = useSelector(state => state.placeReducer);

	const [modifyMode, setModifyMode] = useState(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		placeDetails: []
	});

	useEffect(        
		() => {
			console.log('[PlaceDetail] placeCode : ', params.placeCode);
			dispatch(callPlaceDetailAPI({	
				placeCode: params.placeCode
			}));
		}
	,[]);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		console.log("확인" + place.placeDetail.product?.productCode);
		setModifyMode(true);
		setForm({
			placeCode: place.placeCode,
			placeDate: place.placeDate,
			placeDelivery: place.Delivery,
			placeStatus: place.placeStatus,
			clientCode: place?.client?.clientCode,
			empCode: place.emp?.empCode,
			storageCode: place.storage?.storageCode,
			placeDetails: [{
				placeAmount: place.placeDetail?.placeAmount,
				placeNote: place.placeDetail?.placeNote,
				productCode: place.placeDetail?.product?.productCode
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
	const onClickPlaceUpdateHandler = () => {
    console.log('[PlaceUpdate] onClickPlaceUpdateHandler');
    const updateForm = {
			placeCode : form.placeCode,
			placeDelivery : form.placeDelivery,
			placeStatus : form.placeStatus,
			client : {
				clientCode : form.clientCode
			},
			emp : {
				empCode : form.empCode
			},
			storage : {
				storageCode : form.storageCode
			},
			placeDetail : form.placeDetails.map(detail => ({
				placeAmount : detail.placeAmount,
				placeNote : detail.placeNote,
				product: {
							productCode: detail.productCode
				}
			}))
    }

	dispatch(callPlaceUpdateAPI({
		form: updateForm }));         
	alert('발주 수정 완료');
	navigate('/purchase/place/list', { replace: true});
	window.location.reload();

}

	// detail 추가 버튼
	const addDetail = (placeAmount = '', placeNote = '', productCode = '') => {
		setForm(prevState => {
			const placeDetails = [...prevState.placeDetails];
				placeDetails.unshift({placeAmount, placeNote, productCode});
			return {...prevState, placeDetails};
		});
	}

	// detail 삭제 버튼
	const removeDetail = (index) => {
		setForm({
			...form,
			placeDetails: form.placeDetails.filter((_, i) => i !== index),
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
      placeDetails: [
        ...prevForm.placeDetails,
        {
          productCode: chosenProductCode,
          productName: chosenProductName,
          productFwdPriceA: chosenProductFwdPriceA,
        }
      ]
    }));
    console.log("넘겨받은 품목코드: " + form.placeDetails.length)
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
			const placeDetails = [...prevState.placeDetails];
			placeDetails[index][key] = value;
			placeDetails[index]["placePrice"] = placeDetails[index]["productFwdPriceA"] * placeDetails[index]["placeAmount"]
			return { ...prevState, placeDetails };
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
			<h4>발주수정</h4>
			{ place &&
			<Div>
				<TableHead>
					<tbody>
						<tr>　</tr>
						<tr>
							<th>발주코드</th>
							<td><Input value={ place.placeCode } readOnly/></td>
							<th>발주일자</th>
							<td><Input value={FormatDate(place.placeDate)} readOnly/></td>
						</tr>
						<tr>　</tr>
						<tr>
							<th>발주상태</th>
								<td>
									<label><input type="radio" name="placeStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
									checked={ (modifyMode ? form.placeStatus : place.placeStatus) === '미확인' ? true : false } value="미확인" /> 미확인</label> &nbsp;
									<label><input type="radio" name="placeStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
									checked={ (modifyMode ? form.placeStatus : place.placeStatus) === '진행중' ? true : false } value="진행중" /> 진행중</label> &nbsp;
									<label><input type="radio" name="placeStatus" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }
									checked={ (modifyMode ? form.placeStatus : place.placeStatus) === '완료' ? true : false } value="완료" /> 완료</label>
								</td>
							<th>납기일자</th>
							<td>
								<Input
									name="placeDelivery" onChange={ onChangeHandler }
									type={ (modifyMode ? "Date" : null)}
									value={ (modifyMode ? form.placeDelivery : FormatDate(place.placeDelivery))}
									readOnly={ modifyMode ? false : true }
								/>
							</td>
						</tr>
						<tr>　</tr>
						<tr>
							<th>거래처명</th>
							<td>
								<Input size="1"
									type="text" name="clientCode" onChange={ onChangeHandler } onClick={ (openClientModal ) }
									value={ (modifyMode ? form.clientCode : place.client?.clientCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openClientModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={(modifyMode ? form.clientName : place.client?.clientName)}/>
							</td>
							<th>담당자명</th>
							<td>
								<Input size="1"
									type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
									value={ (modifyMode ? form.empCode : place.emp?.empCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openEmpModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.empName : place.emp?.empName)} />
							</td>
						</tr>
						<tr>　</tr>
						<tr>
							<th>창고명</th>
							<td>
								<Input size="1"
									type="text" name="storageCode" onChange={ onChangeHandler } onClick={ (openStorageModal ) }
									value={ (modifyMode ? form.storageCode : place.storage?.storageCode) || ''}
									readOnly={ modifyMode ? false : true }
								/>
								<MainButton onClick={openStorageModal}>조회</MainButton>
								<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.storageName : place.storage?.storageName)} />
							</td>
						</tr>
						<tr>　</tr>
					</tbody>
					</TableHead>
			</Div>
			}
			<hr/>

			{place &&
				<Table style={{minWidth:"700px"}}>
					<thead>
						<tr>
							<th>품목코드</th>
							<th>품목명</th>
							<th>발주단가</th>
							<th>발주수량</th>
							<th>금액합계</th>
							<th>비고</th>
							<th onClick = {addDetail}> + </th>
						</tr>
					</thead>
					<tbody>
					{modifyMode ? (
						form.placeDetails.map((detail, index) => (
							<tr key={index}>
								<td onClick={openProductModal} value={detail.productCode}>{detail.productCode}</td>
								<td onClick={openProductModal} >{detail.productName}</td>
								<td>{FormatNumber (detail?.productFwdPriceA)}</td>
								<td><input type="number" value={detail.placeAmount} onChange={(e) => handleChange(e, index, 'placeAmount')}/></td>
								<td>{FormatNumber (detail?.productFwdPriceA * detail?.placeAmount)}</td>
								<td><input type="text" value={detail.placeNote} onChange={(e) => handleChange(e, index, 'placeNote')}/></td>
								<td onClick={() => removeDetail(index)}> - </td>
							</tr>
						))
					) : (
						place?.placeDetail?.map((detail, index) => (
							<tr key={index}>
								<td>{detail?.product?.productCode}</td>
								<td>{detail?.product?.productName}</td>
								<td>{FormatNumber (detail?.product?.productFwdPriceA)}</td>
								<td>{detail?.placeAmount}</td>
								<td>{FormatNumber (detail?.product?.productFwdPriceA*detail?.placeAmount)}</td>
								<td>{detail?.placeNote}</td>
								<td></td>
							</tr>
						))
					)}
				</tbody>
			</Table>
			}
				{!modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
				{ modifyMode && <MainButton onClick={ onClickPlaceUpdateHandler } > 저장 </MainButton> }
				<SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	);
}

export default PlaceDetail;













