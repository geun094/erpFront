import { Table, MainButton, SubButton, Input } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { callStorageListAPI } from '../../apis/StorageAPICalls';

function StorageSelectList(props) {

	const dispatch = useDispatch();
	const storages = useSelector(state => state.storageReducer);
	const storageList = storages.data;
	const navigate = useNavigate();

  const pageNumber = [];
	const pageInfo = storages.pageInfo;
  
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
				console.log('Enter key', search);		
				navigate(`/regist/storage/search?value=${search}`, { replace: false });
		}
  }

  useEffect(
    () => {
      dispatch(callStorageListAPI({
        currentPage: currentPage
      }));
    }
    , [currentPage]
  );

  const onClickTableTr = (storageCode, storageName) => {
    props.selectStorage(storageCode, storageName);
    props.close();
  }

  return (
    <div>
      <div>
        <div>
          <h4>창고조회</h4>

          <div>
            <Input
              type="text"
              value={search}
              onKeyUp={onEnterkeyHandler}
              onChange={onSearchChangeHandler}
            />
          </div>

          <div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
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

          <div>
            <Table>
              <thead>
                <tr>
                  <th>창고코드</th>
                  <th>창고명</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(storageList) && storageList.map((storage) => (
                  <tr key={storage.storageCode}>
                    <td onClick={() => onClickTableTr(storage.storageCode, storage.storageName)}>{storage.storageCode}</td>
                    <td onClick={() => onClickTableTr(storage.storageCode, storage.storageName)}>{storage.storageName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorageSelectList;