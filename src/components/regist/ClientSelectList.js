import { Table, MainButton, SubButton, Input } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {callClientListAPI} from '../../apis/ClientAPICalls';

function ClientSelectList(props) {

	const dispatch = useDispatch();
	const clients = useSelector(state => state.clientReducer);
	const clientList = clients.data;
	const navigate = useNavigate();
	const pageInfo = clients.pageInfo;
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');

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
				
				navigate(`/regist/client/search?value=${search}`, { replace: false });
				
		}
  }

	useEffect(
		() => {
			dispatch(callClientListAPI({
				currentPage: currentPage
			}));
		}
		, [currentPage]
	);

	const onClickTableTr = (clientCode, clientName) => {
		props.selectClient(clientCode, clientName);
		props.close();
	}

return (
	<div>
		<h4>거래처조회</h4>

		<div>
			<Input
				type="text"
				value = { search }
				onKeyUp = { onEnterkeyHandler }
				onChange={ onSearchChangeHandler }
			/>
			</div>

			<div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
				{ Array.isArray(clientList) &&
					<SubButton
						className='activeButton'
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

				{ Array.isArray(clientList) &&
					<SubButton 
						className='activeButton'
						onClick={() => setCurrentPage(currentPage + 1)} 
						disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
					>
						&gt;
					</SubButton>
				}
			</div>


			<div>
				<Table>
					<thead style={{ backgroundColor: '#266666', color: '#ffffff' }}>
						<tr>
							<th>거래처코드</th>
							<th>거래처명</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(clientList) && clientList.map((client) => (
							<tr key={client.clientCode}>
								<td onClick={() => onClickTableTr(client.clientCode, client.clientName)}>{client.clientCode}</td>
								<td onClick={() => onClickTableTr(client.clientCode, client.clientName)}>{client.clientName}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default ClientSelectList;