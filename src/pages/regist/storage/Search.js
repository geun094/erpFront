import { Table, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor'

import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import {
	callStorageSearchAPI
} from '../../../apis/StorageAPICalls';

function Search() {

	const { search } = useLocation();
	const { value } = queryString.parse(search);
	const navigate = useNavigate();
	const [isTrue, setIsTrue] = useState(false);

	const storages = useSelector(state => state.storageReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(callStorageSearchAPI({
			search: value
		}));
	},
	[]);

	const onSelectHandler = (e) => {
 		setIsTrue(false);
 		const input = document.getElementsByTagName('input');
		for(var i = input.length-1; i >= 0; i--) {
			if(input[0].checked === true) {
				input[i].checked = true;
			} else {
		input[i].checked = false;
			}
		}
	}

	const onClickTableTr = (storageCode) => {
		navigate(`/regist/storage/update/${storageCode}`, { replace : false });
	}

	return (
		<>
			<div className='outlet'>
				<h4>창고조회</h4>

				<Table>
					<thead>
						<tr>
							<th style= {{width: 10}}><input type='checkbox' onChange={onSelectHandler}/></th>
							<th >창고코드</th>
							<th >창고명</th>
							<th >창고유형</th>
						</tr>
					</thead>
					<tbody>
					{ storages.length > 0 && storages.map((storage) => (
						<tr key={ storage.storageCode }>
							<td style= {{width: 10}}><input type='checkbox'/></td>
							<td onClick = { () => onClickTableTr( storage.storageCode )}>{ storage.storageCode }</td>
							<td>{ storage.storageName }</td>
							<td>{ storage.storageType }</td>
						</tr>
					))}
					</tbody>
				</Table>
			</div>
		</>
	);
}

export default Search;