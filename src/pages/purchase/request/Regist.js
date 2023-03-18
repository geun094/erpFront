import { Table, TableHead, Div, MainButton, SubButton, Input, FormatNumber } from '../../../components/ThemeColor'



import Modal from '../../../components/modal/Modal.js';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";

import ClientList from '../../../components/regist/ClientSelectList'
import EmpList from '../../../components/regist/EmpSelectList'
import StorageList from '../../../components/regist/StorageSelectList'
import ProductList from '../../../components/regist/ProductSelectList'

import { callRequestRegistAPI } from '../../../apis/RequestAPICalls'


function RequestRegist() {

	const inputRef = useRef({});
 	const dispatch = useDispatch();
	const navigate = useNavigate();

		/* 등록 핸들러 */
		const onClickRequestRegistHandler = () => {
			console.log('[RequestRegist] onClickRequestRegistHandler');
			const registForm = {
				requestStatus: "미확인",
				client: {
					clientCode: form.clientCode
				},
				emp: {
					empCode: form.empCode
				},
				storage: {
					storageCode: form.storageCode
				},
				requestDetail: form.requestDetails.map(detail => ({
					requestAmount: detail.requestAmount,
					requestNote: detail.requestNote,
					product: {
						productCode: detail.productCode
					}
				}))
			}
			dispatch(callRequestRegistAPI({ form: registForm }));
			alert('요청등록 완료');
			navigate('/purchase/request/list', {replace:true});
			window.location.reload();
		}

		const [form, setForm] = useState({
			requestStatus: '',
			clientCode: '',
			empCode: '',
			storageCode: '',
			requestDetails: [],	// 빈 배열 생성
		});

		// detail 추가 버튼
	const addDetail = (requestAmount = '', requestNote = '', productCode = '') => {
		setForm(prevState => {
			const requestDetails = [...prevState.requestDetails];
				requestDetails.unshift({requestAmount, requestNote, productCode});
			return {...prevState, requestDetails};
		});
	}

	// detail 삭제 버튼
	const removeDetail = (index) => {
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
 		setForm(prevForm => ({		// 배열의 이전 단계 form을 받아오기 위한 구문
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

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
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
			<h4>요청등록</h4>
				<Div>

				<TableHead>
						<tbody>
							<tr>　</tr>
							<tr>
								<th>거래처명</th>
								<td>
									<Input size="1" type="text" name="clientCode" onChange={onChangeHandler} onClick={openClientModal} value={form.clientCode} ref={inputRef}/>
									<MainButton onClick={openClientModal}>조회</MainButton>
									<Input size="7" type="text" name="clinetName" onClick={openClientModal} value={form.clientName}/>
								</td>

								<th>담당자명</th>
								<td>
									<Input size="1" name="empCode" onChange={onChangeHandler} onClick={openEmpModal} value={form.empCode} ref={inputRef}/>
									<MainButton onClick={openEmpModal}>조회</MainButton>
									<Input size="7" name="empName" onClick={openEmpModal} value={form.empName}/>
								</td>					
							</tr>

							<tr>　</tr>

							<tr>
								<th>창고명</th>
								<td>
									<Input size="1" name="storageCode" onChange={onChangeHandler} onClick={openStorageModal} value={form.storageCode} ref={inputRef}/>
									<MainButton onClick={openStorageModal}>조회</MainButton>
									<Input size="7" name="storageName" onClick={openStorageModal} value={form.storageName}/>
								</td>

								<th>요청상태</th>
								<td>
								<Input value="미확인" readonly="true"/>
								</td>
							</tr>
							<tr>　</tr>
						</tbody>
						</TableHead>
				</Div>

				<Table style={{minWidth:"700px"}}>
					<thead>
						<tr>
							<th>품목코드</th>
							<th>품목명</th>
							<th>요청단가</th>
							<th>요청수량</th>
							<th>금액합계</th>
							<th>비고</th>
							<th onClick={() => addDetail()}> + </th>
						</tr>
					</thead>
					<tbody>
						{form.requestDetails.map((detail, index) => (
							<tr key={index}>
								<td onClick={openProductModal} name="productCode">{detail.productCode}</td>
								<td onClick={openProductModal}>{detail.productName}</td>
								<td> {FormatNumber (detail.productFwdPriceA)}</td>
								<td><input size="1" type="number" value={detail.requestAmount} onChange={(e) => handleChange(e, index, 'requestAmount')}/></td>
								<td>{FormatNumber (detail.productFwdPriceA * detail.estimateAmount)}</td>
								<td><input value={detail.requestNote} onChange={(e) => handleChange(e, index, 'requestNote')}/></td>
								<td onClick={() => removeDetail(index)}> - </td>
							</tr>
						))}
					</tbody>
				</Table>
				<MainButton	onClick={ onClickRequestRegistHandler }>	등록 </MainButton>
				<SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			</div>
		</>
	)
						}
export default RequestRegist;