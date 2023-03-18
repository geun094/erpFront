import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callSalesListAPI } from '../../apis/SalesAPICalls'

function SalesList(props) {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isUpdated, setIsUpdated] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const sales = useSelector(state => state.salesReducer);
	const salesList = sales.data;
	const pageInfo = sales.pageInfo;
	const pageNumber = [];


	
	useEffect(
		() => {
			dispatch(callSalesListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickTableTr = (salesCode, totalAmount, totalPrice) => {
		props.selectSales(salesCode, totalAmount, totalPrice);
		props.close()
	}

	return (
		<>
		<div className='outlet'>
			<h4>판매조회</h4>
			
			<Table>
				<thead>
					<tr>
						<th>판매코드</th>
						<th>판매일자</th>
            <th>거래처명</th>
            <th>품목명</th>
						<th>판매금액합계</th>
					</tr>
				</thead>

				<tbody>
					{ Array.isArray(salesList) && salesList.map(( sales ) => {
						let totalPrice = 0;
						for (const amountAndPrice of sales?.salesDetail) {
							totalPrice += amountAndPrice?.salesAmount * amountAndPrice?.stock?.product?.productFwdPriceA;
						}

						let totalAmount =
							sales?.salesDetail?.length > 1 ?
							(sales?.salesDetail[0]?.stock?.product?.productName + " 외 " + (sales?.salesDetail?.length - 1) + " 건")
							: (sales?.salesDetail[0]?.stock?.product?.productName)
							
						return (
							<tr key={ sales?.salesCode }>
								<td onClick = { () => onClickTableTr( sales.salesCode, totalAmount, totalPrice )}>{ sales?.salesCode }</td>
								<td onClick = { () => onClickTableTr( sales.salesCode, totalAmount, totalPrice )}>{ FormatDate(sales?.salesDate) }</td>
								<td>{ sales?.client?.clientName }</td>
								<td>{ totalAmount }</td>
								<td>{ FormatNumber ( totalPrice )}</td>
							</tr>
						)
					})}

				</tbody>
			</Table>
		</div>
		
		</>
	);
}

export default SalesList;
