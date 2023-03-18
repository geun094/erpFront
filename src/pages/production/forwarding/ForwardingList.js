import '../../../css/Main.module.css';

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callForwardingListAPI, callForwardingDeleteAPI } from '../../../apis/ForwardingAPICalls';

import ForwardingDetail from './ForwardingDetail';
import ForwardingRegist from './ForwardingRegist';
import DetailModal from '../../../components/modal/DetailModal';


function ForwardingList() {

	const dispatch = useDispatch();
	const forwardings = useSelector(state => state.forwardingReducer);
	const forwardingList = forwardings.data;
	console.log("뽀워딩스 출력 : " + forwardings)

	const navigate = useNavigate();
	const pageInfo = forwardings.pageInfo;

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isTrue, setIsTrue] = useState(false);
	const [detailModalOpen, setDetailModalOpen] = useState(false);
	const [registModalOpen, setRegistModalOpen] = useState(false);
	const [selectedForwardingCode, setSelectedForwardingCode] = useState();
	const DETAIL_MODAL_HEADER = "출고 수정";
	const REGIST_MODAL_HEADER = "출고 등록";

	const [checkedList, setCheckedList] = useState([]);
	// 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
	const onCheckedElement = (checked, work) => {
		if (checked) {
			setCheckedList([...checkedList, work.workCode]);
		} else if (!checked) {
			setCheckedList(checkedList.filter(el => el !== work.workCode));
		}
	};

	const pageNumber = [];
	if (pageInfo) {
		for (let i = 1; i <= pageInfo.pageEnd; i++) {
			pageNumber.push(i);
		}
	}

	const onSelectHandler = (e) => {
		setIsTrue(false);
		const input = document.getElementsByTagName('input');
		// console.log(input.length);
		for (var i = input.length - 1; i >= 0; i--) {
			if (input[0].checked === true) {
				input[i].checked = true;
			} else {
				input[i].checked = false;
			}
		}
	}

	/* 삭제 핸들러 */
	const onClickDeleteHandler = () => {

		const forwardingCodes = [] = [...checkedList]

		console.log(forwardingCodes);

		console.log(forwardingCodes);
		dispatch(callForwardingDeleteAPI({
			forwardingCodes: JSON.stringify(forwardingCodes)
		}));
		alert('작업 복수 삭제 완료');
		navigate('/regist/forwarding/list', { reload: true });
		window.location.reload();
	}

	useEffect(
		() => {
			dispatch(callForwardingListAPI({
				currentPage: currentPage
			}));
		}
		, [currentPage]
	);

	const onClickTableTr = (forwarding) => {
		setSelectedForwardingCode(forwarding.forwardingCode)
		setDetailModalOpen(true);
	}

	const closeDetailModal = () => {
		setDetailModalOpen(false);
	}

	const closeRegistModal = () => {
		setRegistModalOpen(false);
	}

	const openRegistModal = () => {
		setRegistModalOpen(true);
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);

			navigate(`/regist/forwarding/search?value=${search}`, { replace: false });

			window.location.reload();
		}
	}

	return (
		<>
			<DetailModal open={detailModalOpen} close={closeDetailModal} header={DETAIL_MODAL_HEADER} >
				<ForwardingDetail close={closeDetailModal} selectedForwardingCode={selectedForwardingCode} header={DETAIL_MODAL_HEADER} />
			</DetailModal>
			<DetailModal open={registModalOpen} close={closeRegistModal} header={REGIST_MODAL_HEADER} >
				<ForwardingRegist close={closeRegistModal} header={REGIST_MODAL_HEADER} />
			</DetailModal>
			<div className='outlet'>
				<h4>출고 조회</h4>
				<div>
					<input
						type="text"
						value={search}
						onKeyUp={onEnterkeyHandler}
						onChange={onSearchChangeHandler}
					/>

				</div>


				<div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
					{Array.isArray(forwardingList) &&
						<button
							className='activeButton'
							onClick={() => setCurrentPage(currentPage - 1)}
							disabled={currentPage === 1}
						>
							&lt;
						</button>
					}

					{pageNumber.map((num) => (
						<li key={num} onClick={() => setCurrentPage(num)}>
							<button
								className='inactiveButton'
								style={currentPage === num ? { backgroundColor: '#E8EBE7' } : null}
							>
								{num}
							</button>
						</li>
					))}
					{Array.isArray(forwardingList) &&
						<button
							className='activeButton'
							onClick={() => setCurrentPage(currentPage + 1)}
							disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
						>
							&gt;
						</button>
					}
				</div>

				<table style={{ borderColor: '#aaaaaa', borderSpacing: 0 }} border={1}>
					<thead style={{ backgroundColor: '#266666', color: '#ffffff' }}>
						<tr>
							<th style={{ width: 10 }}><input type='checkbox' onChange={onSelectHandler} /></th>
							<th >출고번호</th>
							<th >출고일자</th>
							<th >출고공장</th>
							<th >입고창고</th>
							<th >품목명</th>
							<th >작업지시서</th>
                            <th >진행상태</th>
							<th >인쇄</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(forwardingList) && forwardingList.map((forwarding) => (
							<tr key={forwarding.forwardingCode}>
								<td><input type='checkbox' onChange={e => onCheckedElement(e.target.checked, forwarding)} /></td>
								<td onClick={() => onClickTableTr(forwarding)}>{forwarding.forwardingCode}</td>
								<td onClick={() => onClickTableTr(forwarding)}>{forwarding.forwardingDate}</td>
								<td onClick={() => onClickTableTr(forwarding)}>{forwarding.outStorage.storageName}</td>
								<td onClick={() => onClickTableTr(forwarding)}>{forwarding.inStorage.storageName}</td>
								<td onClick={() => onClickTableTr(forwarding)}>{forwarding.forwardingDetailList[0]?.stock?.product?.productName} 등</td>
								<td onClick={() => onClickTableTr(forwarding)}>{"작업지시서"}</td>
                                <td onClick={() => onClickTableTr(forwarding)}>{"진행상태"}</td>
								<td onClick={() => onClickTableTr(forwarding)}>{"인쇄"}</td>
							</tr>
						))}
					</tbody>
				</table>
				<div>
					<button className='mainButton' onClick={openRegistModal}>신규</button>
					<button className='subButton' onClick={onClickDeleteHandler}>삭제</button>
				</div>
			</div>

		</>
	);
}

export default ForwardingList;





