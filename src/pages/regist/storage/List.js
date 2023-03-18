import { Table, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal/Modal.js';
import StorageDetail from './Detail.js'
import StorageRegist from './Regist.js'

import { callStorageListAPI, callStoragesDeleteAPI } from '../../../apis/StorageAPICalls';
import { callStorageDetailAPI } from '../../../apis/DetailAPICalls';

function StorageList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storages = useSelector(state => state.storageReducer);
  const storageList = storages.data;
  const pageInfo = storages.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [registModalOpen, setRegistModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);


  useEffect(
    () => {
      dispatch(callStorageListAPI({
        currentPage: currentPage
      }));
    }
    , [currentPage]
  );

  /* 페이징 */
  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  /* 전체 선택 핸들러 */
  const onSelectHandler = (e) => {
    const input = document.getElementsByTagName('input');
    console.log(input);
    for (var i = input.length - 1; i >= 0; i--) {
      if (e.target.checked === true) {
        input[i].checked = true;
      } else {
        input[i].checked = false;
      }
    }
  }

  /* 전체 삭제 핸들러 */
  const onClickDeleteHandler = () => {
    const selectedStorage = document.getElementsByTagName('input');
    const storageCodes = []
    for (var i = selectedStorage.length - 1; i >= 0; i--) {
      if (selectedStorage[i].checked === true) {
        if (selectedStorage[i].parentElement.nextElementSibling.innerHTML !== "창고코드") {
          storageCodes.push(selectedStorage[i].parentElement.nextElementSibling.innerHTML)
        }
      }
    }
    console.log(storageCodes);
    dispatch(callStoragesDeleteAPI({
      storageCodes
    }));
    alert('창고 복수 삭제 완료');
    navigate('/regist/storage/list', { replace: false });
    window.location.reload();
  }

  /* 검색 핸들러 */
  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  }

  /* 모달 여닫이 */
  const openRegistModal = () => {
    setRegistModalOpen(true, { replace: false });
  };

  const closeRegistModal = () => {
    setRegistModalOpen(false);
  };

  const openDetailModal = (storageCode) => {
    setDetailModalOpen(true);
    dispatch(callStorageDetailAPI({ storageCode }));
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
  };

  /* 엔터 핸들러 */
  const onEnterkeyHandler = (e) => {
    if (e.key == 'Enter') {
      console.log('Enter key', search);
      navigate(`/regist/storage/search?value=${search}`, { replace: false });
      window.location.reload();
    }
  }

  return (
    <>
      <div className='outlet'>
        <Modal open={detailModalOpen} close={closeDetailModal} header='창고수정' >
          <StorageDetail close={closeDetailModal} />
        </Modal>
        <Modal open={registModalOpen} close={closeRegistModal} header='창고등록' >
          <StorageRegist close={closeRegistModal} />
        </Modal>
        
				<h4>창고조회</h4>
				<Input style={{ float:"left"}}
					type="text"
          placeholder="창고유형 검색"
					value = { search }
					onKeyUp = { onEnterkeyHandler }
					onChange={ onSearchChangeHandler }
				/>

        <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
          {Array.isArray(storageList) &&
            <SubButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage == 1}
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

          {Array.isArray(storageList) &&
            <SubButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
            >
              &gt;
            </SubButton>
          }
        </div>

        <Table>
          <thead>
            <tr>
              <th style={{ width: 10 }}>
                <input type='checkbox' onChange={onSelectHandler}/>
              </th>
              <th>창고코드</th>
              <th>창고명</th>
              <th>창고유형</th>
            </tr>
          </thead>
					<tbody>
						{ Array.isArray(storageList) && storageList.map(( storage ) => (
							<tr key={ storage.storageCode }>
								<td style={{width: 10}}><input type='checkbox'/></td>
								<td onClick = {() => openDetailModal(storage.storageCode)}>{ storage.storageCode }</td>
								<td onClick = {() => openDetailModal(storage.storageCode)}>{ storage.storageName }</td>
								<td onClick = {() => openDetailModal(storage.storageCode)}>{ storage.storageType }</td>
							</tr>
						))}
					</tbody>
				</Table>
					<MainButton onClick={ openRegistModal }>신규</MainButton>
					<SubButton onClick={ onClickDeleteHandler }>삭제</SubButton>
			</div>
		</>
	);
}

export default StorageList;