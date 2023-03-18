import { Table, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal/Modal.js';
import ClientDetail from './Detail.js'
import ClientRegist from './Regist.js'

import { callClientListAPI, callClientsDeleteAPI, callClientModifyAPI,
/*callClientDetailAPI*/ } from '../../../apis/ClientAPICalls';

function ClientList() {

	const dispatch = useDispatch();
	const clients = useSelector(state => state.clientReducer);
	const clientList = clients.data;
	const navigate = useNavigate();
	const pageInfo = clients.pageInfo;

	const [currentPage, setCurrentPage] = useState(1);
	const [isTrue, setIsTrue] = useState(false);
	const [search, setSearch] = useState('');
	const [isDeleted, setIsDeleted]               = useState(false);
	const [registModalOpen, setRegistModalOpen] = useState(false);
	const [modifyModalOpen, setModifyModalOpen] = useState(false);

	const [checkedList, setCheckedList] = useState([]);
	// 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
	const onCheckedElement = (checked, client) => {
	  if (checked) {
		setCheckedList([...checkedList, client.clientCode]);
	  } else if (!checked) {
		setCheckedList(checkedList.filter(el => el !== client.clientCode));
	  }
	};

	useEffect(
		() => {
			dispatch(callClientListAPI({
				currentPage: currentPage
			}));
		}
		, [currentPage]
	);

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

	const onClickDeleteHandler = () => {

		const selectedClient = document.getElementsByTagName("input");
		const clientCodes = []

		for (var i = selectedClient.length - 1; i >= 0; i--) {

			if (selectedClient[i].checked === true) {

				if (selectedClient[i].parentElement.nextElementSibling.innerHTML !== "거래처코드") {
					clientCodes.push(selectedClient[i].parentElement.nextElementSibling.innerHTML);
				}
			}
		}
		console.log(clientCodes);
		dispatch(
			callClientsDeleteAPI({
			  clientCodes,
			})
		  );


		alert('거래처 복수 삭제 완료');
		navigate('/regist/client/list', { reload: true });
		window.location.reload();
	};

		/* 등록 모달 열기 */
	const openRegistModal = () => {
		setRegistModalOpen(true, { replace: false });
	};


	/* 등록 모달 닫기 */
	const closeRegistModal = () => {
		setRegistModalOpen(false);
	};

	const openModifyModal = (clientCode) => {
		console.log("받아옴?" + clientCode);
		// setSelectedClientCode(clientCode);
		setModifyModalOpen(true, { replace: false});
		dispatch(callClientModifyAPI({ clientCode }));
	};

	
	const closeModifyModal = () => {
		setModifyModalOpen(false);
	};

	const onClickTableTr = (clientCode) => {
		navigate(`/regist/client/detail/${clientCode}`, { replace: false, state : clients });
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);

			navigate(`/regist/client/search?value=${search}`, { replace: false });

			window.location.reload();
		}
	}

	return (
		<>
			<div className="outlet">
				<Modal open={modifyModalOpen} close={closeModifyModal} header= '거래처 수정' >
					<ClientDetail close={closeModifyModal} />
				</Modal>
				<Modal open={registModalOpen} close={closeRegistModal} header= '거래처 등록' >
					<ClientRegist close={closeRegistModal} />
				</Modal>

				<h4>거래처조회</h4>
					<Input style={{ float:"left"}}
						type="text" 
						placeholder="거래처명 검색" 
						value={ search }
						onKeyUp={ onEnterkeyHandler }
						onChange={ onSearchChangeHandler }
					/>
				<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
					{Array.isArray(clientList) &&
						<SubButton
							onClick={() => setCurrentPage(currentPage - 1)} 
							disabled={currentPage === 1}
						>
						&lt;
						</SubButton>
					}

					{pageNumber.map((num) => (
						<li key={num} onClick={() => setCurrentPage(num)}>
						{currentPage === num ? (
							<MainButton>{num}</MainButton>
						) : (
							<SubButton>{num}</SubButton>
						)}
						</li>
					))}

					{Array.isArray(clientList) &&
						<SubButton
							onClick={() => setCurrentPage(currentPage + 1)} 
							disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
						>
						&gt;
						</SubButton>
					}
			</div>

			<Table>
				<thead>
					<tr>
							<th style={{ width: 10 }}><input type='checkbox' onChange={onSelectHandler} /></th>
							<th >거래처코드</th>
							<th >거래처명</th>
							<th >대표자명</th>
							<th >전화번호</th>
							<th >핸드폰번호</th>
							<th >담당사원</th>
							<th >사용구분</th>
							<th >이체정보</th>
							<th >주소</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(clientList) && clientList.map((client) => (
							<tr key={client.clientCode}>
								<td style={{ width: 10 }}><input type='checkbox' onChange={e => onCheckedElement(e.target.checked, client)} /></td>
								<td onClick = { () => onClickTableTr( client )}>{ client.clientCode }</td>
								<td onClick = { () => onClickTableTr( client )}>{ client.clientName }</td>
								<td onClick = { () => onClickTableTr( client )}>{ client.clientRepresentative }</td>
								<td onClick = { () => onClickTableTr( client )}>{ client.clientPhone }</td>
								<td onClick = { () => onClickTableTr( client )}>{ client.clientMobile }</td>
								<td onClick = { () => onClickTableTr( client )}>{ client?.emp?.empName }</td>
								<td onClick = { () => onClickTableTr( client )}>{ "YES" }</td>
								<td onClick = { () => onClickTableTr( client )}>{ "등록" }</td>
								<td onClick = { () => onClickTableTr( client )}>{ client.clientAddress }</td>
							</tr>
						))}
					</tbody>
			</Table>
				<div>
					<MainButton onClick={openRegistModal}>등록</MainButton>
					<SubButton onClick={openModifyModal}>수정</SubButton>
					<SubButton onClick={onClickDeleteHandler}>삭제</SubButton>
				</div>
			</div>
		</>
	);
}
export default ClientList;