import { Table, Div, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { callSalesListAPI } from '../../apis/SalesAPICalls'

function StockDetail() {

	const [currentPage, setCurrentPage] = useState(1);
	const sales = useSelector(state => state.salesReducer);

	const pageInfo = sales.pageInfo;
	const pageNumber = [];


	const dispatch = useDispatch();

	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

	useEffect(
		() => {
			dispatch(callSalesListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	return (
		<>
		<div className="outlet">
			<h2>점검 중</h2>
		</div>



		</>
	);
}

export default StockDetail;