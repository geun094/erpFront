import { Table, Div, MainButton, SubButton, Input, FormatNumber } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {callPositionListAPI} from '../../apis/PositionAPICalls';

function PositionSelectList(props) {

	//   << props로 넘어오는 값들 >>
	// props.selectPosition
	// -- 목록에서 선택한 positionCode, positionName을 받아서 부모 컴포넌트의 state인
	// -- selectedPositionCode와 selectedPositionName에 넣어준다.
	// 
	// props.close

	const dispatch = useDispatch();

	const positions = useSelector(state => state.positionReducer);
	const positionList = positions.data;




	const pageInfo = positions.pageInfo;
	const [currentPage, setCurrentPage] = useState(1);

	const pageNumber = [];
	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

	useEffect(
		() => {
			dispatch(callPositionListAPI({
				currentPage: currentPage
			}));
		}
		, [currentPage]
	);


	useEffect(
		() => {
			dispatch(callPositionListAPI({
				
			}));
		}
		, []
	);

	const onClickTableTr = (positionCode, positionName) => {
		props.selectPosition(positionCode, positionName);
		props.close();
	}

	return (
		<div>
			<div>
				<div>
					<h4>직급선택</h4>
					{positionList &&
						<div>
							<Table>
								<thead>
									<tr>
										<th>직급코드</th>
										<th>직급명</th>
									</tr>
								</thead>
								<tbody>
									{Array.isArray(positionList) && positionList.map((position) => (
										<tr key={position.positionCode}>
											<td onClick={() => onClickTableTr(position.positionCode, position.positionName)}>{position.positionCode}</td>
											<td onClick={() => onClickTableTr(position.positionCode, position.positionName)}>{position.positionName}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default PositionSelectList;