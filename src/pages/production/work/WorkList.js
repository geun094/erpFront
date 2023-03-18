import '../../../css/Main.module.css';

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callWorkListAPI, callWorkDeleteAPI } from '../../../apis/WorkAPICalls';

import WorkDetail from './WorkDetail';
import DetailModal from '../../../components/modal/DetailModal';


function WorkList() {

	const dispatch = useDispatch();
	const works = useSelector(state => state.workReducer);
	const workList = works.data;
	console.log("워크스 출력 : " + works)

	const navigate = useNavigate();
	const pageInfo = works.pageInfo;

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isTrue, setIsTrue] = useState(false);
	const [detailModalOpen, setDetailModalOpen] = useState(false);
	const [selectedWorkCode, setSelectedWorkCode] = useState();
	const [detailModalHeader, setDetailModalHeader] = useState();

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

		const workCodes = [] = [...checkedList]

		console.log(workCodes);

		console.log(workCodes);
		dispatch(callWorkDeleteAPI({
			workCodes: JSON.stringify(workCodes)
		}));
		alert('작업 복수 삭제 완료');
		navigate('/regist/work/list', { reload: true });
		window.location.reload();
	}

	useEffect(
		() => {
			dispatch(callWorkListAPI({
				currentPage: currentPage
			}));
		}
		, [currentPage]
	);

	const onClickWorkRegist = () => {
		navigate('/regist/work/regist', { replace: false })
	}

	const onClickTableTr = (work) => {
		setSelectedWorkCode(work.workCode)
		setDetailModalHeader("작업 수정");
		setDetailModalOpen(true);
	}

	const closeDetailModal = () => {
		setDetailModalOpen(false);
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);

			navigate(`/regist/work/search?value=${search}`, { replace: false });

			window.location.reload();
		}
	}

	return (
		<>
			<DetailModal open={detailModalOpen} close={closeDetailModal} header={detailModalHeader} >
				<WorkDetail close={closeDetailModal} selectedWorkCode= {selectedWorkCode} header={detailModalHeader} />
			</DetailModal>
			<div className='outlet'>
				<h4>작업 조회</h4>
				<div>
					<input
						type="text"
						value={search}
						onKeyUp={onEnterkeyHandler}
						onChange={onSearchChangeHandler}
					/>

				</div>


				<div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
					{Array.isArray(workList) &&
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
					{Array.isArray(workList) &&
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
							<th >작업번호</th>
							<th >작업일자</th>
							<th >생산공장명</th>
							<th >담당자명</th>
							<th >생산품명</th>
							<th >생산수량</th>
							<th >작업지시서</th>
							<th >인쇄</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(workList) && workList.map((work) => (
							<tr key={work.workCode}>
								<td><input type='checkbox' onChange={e => onCheckedElement(e.target.checked, work)} /></td>
								<td onClick={() => onClickTableTr(work)}>{work.workCode}</td>
								<td onClick={() => onClickTableTr(work)}>{work.workDate}</td>
								<td onClick={() => onClickTableTr(work)}>{work.storage.storageName}</td>
								<td onClick={() => onClickTableTr(work)}>{work.emp.empName}</td>
								<td onClick={() => onClickTableTr(work)}>{work.product.productName}</td>
								<td onClick={() => onClickTableTr(work)}>{work.workDetailList.productQuantity}</td>
								<td onClick={() => onClickTableTr(work)}>{"작업지시서"}</td>
								<td onClick={() => onClickTableTr(work)}>{"인쇄"}</td>
							</tr>
						))}
					</tbody>
				</table>
				<div>
					<button className='mainButton' onClick={onClickWorkRegist}>신규</button>
					<button className='subButton' onClick={onClickDeleteHandler}>삭제</button>
				</div>
			</div>

		</>
	);
}

export default WorkList;





