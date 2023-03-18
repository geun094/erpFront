
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {callStorageListAPI} from '../../apis/StorageAPICalls';

function StorageSelectList(props) {


	const dispatch = useDispatch();
	const storages = useSelector(state => state.storageReducer);
	const storageList = storages.data;
	const navigate = useNavigate();
	const pageInfo = storages.pageInfo;


	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isTrue, setIsTrue] = useState(false);

	
	const [storageCode, setStorageCode] = useState({});

	const pageNumber = [];
	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

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
		console.log("꼬꼬댁")
		props.selectOutStorage(storageCode, storageName);
		props.close();
	}

	return (
		<div>
			<div>
				<div>
					<h4>창고조회</h4>

					<div>
						<input
							type="text"
							value = { search }
							onKeyUp = { onEnterkeyHandler }
							onChange={ onSearchChangeHandler }
						/>
						</div>

						<div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
							{ Array.isArray(storageList) &&
								<button
									className='activeButton'
									onClick={() => setCurrentPage(currentPage - 1)} 
									disabled={currentPage == 1}
								>
									&lt;
								</button>
							}

							{pageNumber.map((num) => (
								<li key={num} onClick={() => setCurrentPage(num)}>
								<button  
									className='inactiveButton' 
									style={ currentPage == num ? {backgroundColor : '#E8EBE7' } : null}
								>
									{num}
								</button>
						</li>
						))}

							{ Array.isArray(storageList) &&
								<button 
									className='activeButton'
									onClick={() => setCurrentPage(currentPage + 1)} 
									disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
								>
									&gt;
								</button>
							}
						</div>


						<div>
							<table style={{ borderColor: '#aaaaaa', borderSpacing: 0 }} border={1}>
								<thead style={{ backgroundColor: '#266666', color: '#ffffff' }}>
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
							</table>
						</div>
					<div>
						<button className='subButton'> 닫기 </button>
					</div>

				</div>
			</div>
		</div>
	);
}

export default StorageSelectList;