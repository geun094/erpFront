import WorkDetailStyle from '../../../css/WorkDetail.module.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../../../components/modal/DetailModal';

import InStorageSelectList from '../../../components/regist/InStorageSelectList';
import OutStorageSelectList from '../../../components/regist/OutStorageSelectList';
import StockSelectList from '../../../components/stock/StockSelectList';

import {callForwardingUpdateAPI} from '../../../apis/ForwardingAPICalls';

function ForwardingRegist() {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [form, setForm] = useState();

	/* form 데이터 세팅 */
	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	/* 수정 핸들러 */
	const onClickForwardingUpdateHandler = () => {
		console.log('[ForwardingUpdate] onClickForwardingUpdateHandler');
		const updateForm = {
			forwardingCode: form.forwardinigCode,
			forwardingDate: form.forwardingDate,
			empCode: form.empCode,
			outStorageCode: form.outStorageCode,
			inStorageCode: form.inStorageCode,
			emp: {
				empCode: form.empCode
			},
			outStorage: {
				storageCode: form.outStorageCode
			},
			inStorage: {
				storageCode: form.inStorageCode
			},
			forwardingDetail: form.forwardingDetails.map(detail => ({
				forwardingNo: detail.forwardingNo,
				forwardingAmount: detail.forwardingAmount,
				forwardingCode: detail.forwardingCode,
				productCode: detail.productCode,
				forwardingNote: detail.forwardingNote,
				product: {
					productCode: detail.productCode
				}
			}))
		}

		dispatch(callForwardingUpdateAPI({
			form: updateForm
		}));
		alert('출고 수정 완료');
		navigate('/production/forwarding/list', { replace: true });
		window.location.reload();
	}

	// detail 추가 버튼
	const addForwardingDetail = (productCode = '', productName = '', forwardingAmount = '', forwardingNote = '') => {
		setForm(prevState => {
			const forwardingDetails = [...prevState.forwardingDetails];
				forwardingDetails.unshift({productCode, forwardingAmount, forwardingNote})
			return { ...prevState, forwardingDetails };
		});
	}

	// detail 삭제 버튼
	const removeForwardingDetail = (index) => {
		setForm({
			...form,
			forwardingDetails: form.forwardingDetails.filter((_, i) => i !== index),
		});
	}

	const [inStorageModalOpen, setInStorageModalOpen] = useState(false);
	const [outStorageModalOpen, setOutStorageModalOpen] = useState(false);
	const [stockModalOpen, setStockModalOpen] = useState(false);

	const selectInStorage = (chosenInStorageCode, chosenInStorageName) => {
		setForm({ ...form, inStorageCode: chosenInStorageCode, inStorageName: chosenInStorageName });
	};

	const selectOutStorage = (chosenOutStorageCode, chosenOutStorageName) => {
		setForm({ ...form, outStorageCode: chosenOutStorageCode, outStorageName: chosenOutStorageName });
	};

	const selectStock = (chosenStockCode, chosenStorageCode, chosenStorageName, chosenProductCode, chosenProductName, chosenProductFwdPriceA) => {
		setForm(prevForm => ({
			...prevForm,
			forwardingDetailList: [
				...prevForm.forwardingDetailList,
				{
					stockCode: chosenStockCode,
					storageCode: chosenStorageCode,
					productCode: chosenProductCode,
					productName: chosenProductName,
				}
			]
		}));
	}

	/* 모달 여닫이 */

	const openInStorageModal = () => {
		setInStorageModalOpen(true, { replace: false });
	};

	const closeInStorageModal = () => {
		setInStorageModalOpen(false);
	};

	const openOutStorageModal = () => {
		setOutStorageModalOpen(true, { replace: false });
	};

	const closeOutStorageModal = () => {
		setOutStorageModalOpen(false);
	};

	const openStockModal = () => {
		setStockModalOpen(true, { replace: false });
	};

	const closeStockModal = () => {
		setStockModalOpen(false);
		console.log("재고 코드 출력 : " + form.stockCode);
	};

	// const handleChange = (e, index, key) => {
	// const value = e.target.value;
	// setForm(prevState => {
	// 		const forwardingDetails = [...prevState.forwardingDetails];
	// 		forwardingDetails[index][key] = value;
	// 		forwardingDetails[index]["forwardingPrice"] = forwardingDetails[index]["productFwdPriceA"] * salesDetails[index]["salesAmount"]
	// 		return { ...prevState, salesDetails };
	// });	
	// }

	return (
		<>

			<Modal open={inStorageModalOpen} close={closeInStorageModal} header=' 입하창고  선택' >
				<InStorageSelectList selectInStorage={selectInStorage} close={closeInStorageModal} />
			</Modal>
			<Modal open={outStorageModalOpen} close={closeOutStorageModal} header=' 출하공장  선택' >
				<OutStorageSelectList selectOutStorage={selectOutStorage} close={closeOutStorageModal} />
			</Modal>
			<Modal open={stockModalOpen} close={closeStockModal} header=' 재고 선택' >
				<StockSelectList selectStock={selectStock} close={closeStockModal} />
			</Modal>


			<div>
				<div className={WorkDetailStyle.outBox}>
					<hr></hr>
					<div className={WorkDetailStyle.outContainer}>
						<div className={WorkDetailStyle.upperContainer}>
							<div className={WorkDetailStyle.LabelContainer}>
								<label>출고코드</label><br />
								<label>출고일자</label><br />
								<label>담당자</label>
							</div>
							<div className={WorkDetailStyle.inputContainer}>
								<input onChange={onChangeHandler} name="forwardingCode"></input>
								<input onChange={onChangeHandler} name="forwardingDate"></input>
								<input onChange={onChangeHandler} name="empName"></input>
							</div>
							<div className={WorkDetailStyle.LabelContainer}>
								<label></label><br />
								<label>출하공장</label><br />
								<label>입하창고</label>
							</div>
							<div className={WorkDetailStyle.inputContainer}>
								<input style={{ border: "none", background: "transparent" }}></input>
								<div className={WorkDetailStyle.buttonWithInputContainer}>
								<input className={WorkDetailStyle.leftInputWithButton}></input>
								<button className={WorkDetailStyle.Search} onClick={openOutStorageModal}></button>
								<input className={WorkDetailStyle.rightInputWithButton}></input>
								</div>
								<div className={WorkDetailStyle.buttonWithInputContainer}>
								<input className={WorkDetailStyle.leftInputWithButton}></input>
								<button className={WorkDetailStyle.Search} onClick={openInStorageModal}></button>
								<input className={WorkDetailStyle.rightInputWithButton}></input>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr />

					<table border={1}>
						<thead>
							<tr>
								<th>품목코드</th>
								<th>품목명</th>
								<th>수량</th>
								<th>비고</th>
								<th><button onClick={addForwardingDetail}> + </button></th>
							</tr>
						</thead>
						<tbody>
							{form?.forwardingDetailList?.map((detail, index) => (
								<tr key={index}>
									<td onClick={openStockModal} >{detail?.productCode}</td>
									<td onClick={openStockModal} >{detail?.productName}</td>
									<td onClick={openStockModal} >{detail?.forwardingAmount}</td>
									<td onClick={openStockModal} >{detail?.forwardingNote}</td>
									<td>
										<button onClick={() => removeForwardingDetail(index)}> - </button>
									</td>
								</tr>
							))
							}
						</tbody>


					</table>
			</div>
			<div>
				<button className='mainButton' onClick={onClickForwardingUpdateHandler} > 저장 </button>
				<button className='subButton' onClick={() => navigate(-1)}> 이전 </button>
			</div>
		</>
	);
}

export default ForwardingRegist;













