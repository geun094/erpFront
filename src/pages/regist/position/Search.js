import { Table, MainButton, SubButton } from '../../../components/ThemeColor'
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import {
	callPositionSearchAPI
} from '../../../apis/PositionAPICalls';

function Search() {

	const { search } = useLocation();
	const { value } = queryString.parse(search);
	const navigate = useNavigate();
	const [isTrue, setIsTrue] = useState(false);

	const positions = useSelector(position => position.positionReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(callPositionSearchAPI({
			search: value
		}));
	},
		[]);

	const onSelectHandler = (e) => {
		setIsTrue(false);
		const input = document.getElementsByTagName('input');
		for (var i = input.length - 1; i >= 0; i--) {
			if (input[0].checked === true) {
				input[i].checked = true;
			} else {
				input[i].checked = false;
			}
		}
	}

	const onClickTableTr = (positionCode) => {
		navigate(`/regist/position/detail/${positionCode}`, { replace: false });
	}

	return (
		<div className='search'>
			<h4>직급 조회</h4>
			<Table >
				<thead>
					<tr>
						<th style={{ width: 10 }}><input type='checkbox' onChange={onSelectHandler} /></th>
						<th >직급코드</th>
						<th >직급명</th>
						<th >직급수당</th>
					</tr>
				</thead>
				<tbody>
					{positions.length > 0 && positions.map((position) => (
						<tr key={position.positionCode} className="list">
							<td><input type='checkbox' /></td>
							<td onClick={() => onClickTableTr(position.positionCode)}>{position.positionCode}</td>
							<td onClick={() => onClickTableTr(position.positionCode)}>{position.positionName}</td>
							<td onClick={() => onClickTableTr(position.positionCode)}>{position.positionSalary}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<div className='ButtonMargin'>
			<SubButton onClick={() => navigate(-1)}>이전</SubButton>
			</div>
		</div>
	)
}

export default Search;