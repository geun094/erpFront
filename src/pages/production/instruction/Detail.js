import { Table, Div, MainButton, SubButton, Input, FormatDate } from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Modal from '../../../components/modal/Modal.js';

import EmpList from '../../../components/regist/EmpSelectList'
import ClientList from '../../../components/regist/ClientSelectList'
import StorageList from '../../../components/regist/StorageSelectList'
import ProductList from '../../../components/regist/ProductSelectList'

import {
	callInstructionDetailAPI,
	callInstructionUpdateAPI
} from '../../../apis/InstructionAPICalls';

function InstructionDetail() {

	const dispatch = useDispatch();
    const { state } = useLocation();
	const instruction = useSelector(state => state.instructionReducer);

	const [modifyMode, setModifyMode] = useState(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		instructionDetails: []
	});

	useEffect(
		() => {
			console.log('[InstructionDetail] instructionCode : ', state);
			dispatch(callInstructionDetailAPI({
				instructionCode: state
			}));
		}
	,[]);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		console.log("확인" + instruction.instructionDetail?.product?.productCode);
		setModifyMode(true);
		setForm({
			instructionCode: instruction.instructionCode,
			instructionDelivery: instruction.instructionDelivery,
			clientCode: instruction?.client?.clientCode,
			empCode: instruction.emp?.empCode,
			// storageCode: instruction.storage?.storageCode,
			instructionDetails: [{
				instructionNo: instruction.instructionDetail?.instructionNo,
				instructionAmount: instruction.instructionDetail?.instructionAmount,
				instructionNote: instruction.instructionDetail?.instructionNote,
				productCode: instruction.instructionDetail?.product?.productCode
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
	const onClickInstructionUpdateHandler = () => {
 		console.log('[InstructionUpdate] onClickInstructionUpdateHandler');
 		const updateForm = {
			instructionCode : form.instructionCode,
			instructionDelivery : form.instructionDelivery,
			client : {
				clientCode : form.clientCode
			},
			emp : {
				empCode : form.empCode
			},
			
			instructionDetail : form.instructionDetails.map(detail => ({
				instructionNo: detail.instructionNo,
				instructionAmount : detail.instructionAmount,
				instructionNote : detail.instructionNote,
				product: {
							productCode: detail.productCode
				}
			}))
 		}

	dispatch(callInstructionUpdateAPI({
		form: updateForm }));
		alert(' 수정 완료');
		navigate('/production/instruction/list', { replace: true});
		window.location.reload();
	}

	// detail 추가 버튼
	const addInstructionDetail = (instructionAmount = '', instructionNote = '', productCode = '') => {
		setForm(prevState => {
			const instructionDetails = [...prevState.instructionDetails];
				instructionDetails.unshift({instructionAmount, instructionNote, productCode});		// unshift: 입력된 값이 자동으로 위로 올라가게 함
			return {...prevState, instructionDetails};
		});
	}

	// detail 삭제 버튼
	const removeInstructionDetail = (index) => {
		setForm({
			...form,
			instructionDetails: form.instructionDetails.filter((_, i) => i !== index),
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

	// const selectStorage = (chosenStorageCode, chosenStorageName) => {
	// 	setForm({...form, storageCode : chosenStorageCode, storageName : chosenStorageName});
	// 	console.log("창고 코드 수신: " + form.storageCode)
	// }

	const selectProduct = (chosenProductCode, chosenProductName) => {
 		setForm(prevForm => ({
 			...prevForm,
 			instructionDetails: [
 				...prevForm.instructionDetails,
				{
					productCode: chosenProductCode,
					productName: chosenProductName,
				}
			]
 		}));
 		console.log("품목 코드 수신: " + form.instructionDetails.length)
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
			const instructionDetails = [...prevState.instructionDetails];
				instructionDetails[index][key] = value;
			return { ...prevState, instructionDetails };
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
			{/* <Modal open={storageModalOpen} close={closeStorageModal} header=' 창고 선택' >
				<StorageList selectStorage={selectStorage} close={closeStorageModal} />
			</Modal> */}
			<Modal open={productModalOpen} close={closeProductModal} header=' 품목 선택' >
				<ProductList selectProduct={selectProduct} close={closeProductModal} />
			</Modal>

			<div>
				<h4>지시서수정</h4>
				{ instruction &&
				<Div>
					<table>
						<tbody>
							
							<tr>
								<th>지시서코드</th>
								<td><Input value={ instruction.instructionCode } readOnly={true}/></td>
								<th>납기일자</th>
								<td><Input value={FormatDate( instruction?.instructionDelivery )} /></td>
							</tr>
							
							<tr>
								
								<th>거래처명</th>
								<td>
									<Input size="1"
										type="text" name="clientCode" onChange={ onChangeHandler } onClick={ (openClientModal ) }
										value={ (modifyMode ? form.clientCode : instruction.client?.clientCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openClientModal}>조회</MainButton>
									<Input size="7"
										type="text" onClick={ (openClientModal ) }
										value={ (modifyMode ? form.clientName : instruction.client?.clientName)}
										readOnly={ modifyMode ? false : true }/>
								</td>
							
							
							
								<th>담당자명</th>
								<td>
									<Input size="1"
										type="text" name="empCode" onChange={ onChangeHandler } onClick={ (openEmpModal ) }
										value={ (modifyMode ? form.empCode : instruction.emp?.empCode) || ''}
										readOnly={ modifyMode ? false : true }
									/>
									<MainButton onClick={openEmpModal}>조회</MainButton>
									<Input size="7"
									readOnly={ modifyMode ? false : true }
									value={ (modifyMode ? form.empName :instruction.emp?.empName+' '+instruction.emp?.position?.positionName)}/>
								</td>
							
                            </tr>
						</tbody>
					</table>
					</Div>
				}

				{instruction &&
					<Table>
						<thead>
							<tr>
								<th>품목코드</th>
								<th>품목명</th>
								<th>수량</th>
								<th>생산공장</th>
								<th>비고</th>
								<th onClick={() => addInstructionDetail()}> + </th>
							</tr>
						</thead>
						<tbody>
							{modifyMode ? (
								form.instructionDetails.map((detail, index) => (
									<tr key={index}>
										<td onChange={ onChangeHandler } onClick={openProductModal} value={detail.productCode}>{detail.productCode}</td>
										<td onClick={openProductModal} >{detail.productName}</td>
										<td><input size="1" type="number" value={detail.instructionAmount} onChange={(e) => handleChange(e, index, 'instructionAmount')}/></td>
                                        <td></td>
										<td><input type="text" value={detail.instructionNote} onChange={(e) => handleChange(e, index, 'instructionNote')}/></td>
										<td onClick={() => removeInstructionDetail(index)}> - </td>
									</tr>
									))
							) : (
								instruction?.instructionDetail?.map((detail, index) => (
									<tr key={index}>
										<td>{detail?.product?.productCode}</td>
										<td>{detail?.product?.productName}</td>
										<td>{detail?.instructionAmount}</td>
                                        <td></td>
										<td>{detail?.instructionNote}</td>
										
									</tr>
								))
							)}
						</tbody>
					</Table>
				}
				{!modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
				{ modifyMode && <SubButton onClick={ onClickInstructionUpdateHandler } > 저장 </SubButton> }

			</div>
		</>
	);
}

export default InstructionDetail;













