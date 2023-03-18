import Modal from '../../../components/modal/Modal.js';

import { Table, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor'

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";

import ClientList from '../../../components/regist/ClientSelectList'
import EmpList from '../../../components/regist/EmpSelectList'
import StorageList from '../../../components/regist/StorageSelectList'
import ProductList from '../../../components/regist/ProductSelectList'

import { callInstructionRegistAPI } from '../../../apis/InstructionAPICalls'


function InstructionRegist() {

	const inputRef = useRef({});
	const dispatch = useDispatch();
	   const navigate = useNavigate();
   
		   /* 등록 핸들러 */
		   const onClickInstructionRegistHandler = () => {
			   console.log('[InstructionRegist] onClickInstructionRegistHandler');
			   const registForm = {
				   instructionDelivery: form.instructionDelivery,
				   client: {
					   clientCode: form.clientCode
				   },
				   emp: {
					   empCode: form.empCode
				   },
				   storage: {
					   storageCode: form.storageCode
				   },
				   instructionDetail: form.instructionDetails.map(detail => ({	// instructionDetail자체에 map을 걸어서 배열로 값을 받도록 한다
					   instructionAmount: detail.instructionAmount,
					   instructionNote: detail.instructionNote,
					   product: {
						   productCode: detail.productCode
					   }
					 
				   }))
			   }
			   dispatch(callInstructionRegistAPI({ form: registForm }));
			   alert('지시서 등록 완료');
			   navigate('/production/instruction/list', {replace:true});
			   window.location.reload();
		   }
   
	   const [form, setForm] = useState({
		   instructionDelivery: '',
		   clientCode: '',
		   empCode: '',
		   instructionDetails: [],	// 빈 배열 생성
	   });
   
	   // detail 추가 버튼
	   const addInstructionDetail = (instructionAmount = '', instructionNote = '', productCode = '') => {
		   setForm(prevState => {
			   const instructionDetails = [...prevState.instructionDetails];
			   if(!instructionDetails.find(detail => detail?.productCode === productCode)){
				   instructionDetails.unshift({instructionAmount, instructionNote, productCode});
			   }
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
			setForm({...form, clientCode : chosenClientCode, clientName : chosenClientName}); // ...form을 통해 setForm에 기존 입력된 정보가 누적되도록 한다 !important
			console.log("넘겨받은 고객코드: " + form.clientCode)
	   }
   
	   const selectEmp = (chosenEmpCode, chosenEmpName) => {
		   setForm({...form, empCode : chosenEmpCode, empName : chosenEmpName});		// 그렇지 않으면 client, emp, storage가 동시에 선택되지 않음
		   console.log("넘겨받은 사원코드: " + form.empCode)
	   }
   
	   const selectStorage = (chosenStorageCode, chosenStorageName) => {
		   setForm({...form, storageCode : chosenStorageCode, storageName : chosenStorageName});	// setForm이 저장되지 않은 상태에서 다시 새로운 값을 불러오기 때문
		   console.log("넘겨받은 창고코드: " + form.storageCode)
	   }
   
	   const selectProduct = (chosenProductCode, chosenProductName, chosenProductFwdPriceA) => {
			setForm(prevForm => ({		// 배열의 이전 단계 form을 받아오기 위한 구문
				...prevForm,
				instructionDetails: [
					...prevForm.instructionDetails,
						{
						   productCode: chosenProductCode,
						   productName: chosenProductName,
						}
			   ]
			}));
			console.log("넘겨받은 품목코드: " + form.instructionDetails.length)
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
			   <Modal open={storageModalOpen} close={closeStorageModal} header=' 창고 선택' >
				   <StorageList selectStorage={selectStorage} close={closeStorageModal} />
			   </Modal>
			   <Modal open={productModalOpen} close={closeProductModal} header=' 품목 선택' >
				   <ProductList selectProduct={selectProduct} close={closeProductModal} />
			   </Modal>
   
			   <div>
			   <h4>지시서 등록</h4>
				   <Div>
   
					   <table>
						   <tbody>
							 
							   <tr>
								   <th>거래처명</th>
								   <td>
									   <Input size="1" type="text" name="clientCode" onChange={onChangeHandler} onClick={openClientModal} value={form.clientCode} ref={inputRef}/>
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
							
							   <tr>
									<th>납기일자</th>
									<td>
										<Input type="date" name="instructionDelivery" onChange={onChangeHandler} value={form.instructionDelivery}/>
									</td>
							   </tr>
						   
						   </tbody>
					   </table>
				   </Div>
   
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
						   {form.instructionDetails.map((detail, index) => (
							   <tr key={index}>
								   <td onClick={openProductModal} value={form.productCode}>{detail.productCode}</td>
								   <td onClick={openProductModal} >{detail.productName}</td>
								   <td><input size="1" value={detail.instructionAmount} onChange={(e) => handleChange(e, index, 'instructionAmount')}/></td>
								   <td></td>
								   <td><input value={detail.instructionNote} onChange={(e) => handleChange(e, index, 'instructionNote')}/></td>
								   <td onClick={() => removeInstructionDetail(index)}> - </td>
							   </tr>
						   ))}
					   </tbody>
				   </Table>
				   <MainButton	onClick={ onClickInstructionRegistHandler }>	등록 </MainButton>
				   <SubButton onClick={ () => navigate(-1) }> 이전 </SubButton>
			   </div>
		   </>
	   )
   }
  
  export default InstructionRegist;