import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callPurchaseListAPI } from '../../apis/PurchaseAPICalls'

function PurchaseList(props) {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isUpdated, setIsUpdated] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const purchase = useSelector(state => state.purchaseReducer);
	const purchaseList = purchase.data;
	const pageInfo = purchase.pageInfo;
	const pageNumber = [];


	
	useEffect(
		() => {
			dispatch(callPurchaseListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickTableTr = (purchaseCode, totalAmount, totalPrice) => {
		props.selectPurchase(purchaseCode, totalAmount, totalPrice);
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
					{ Array.isArray(purchaseList) && purchaseList.map(( purchase ) => {
						let totalPrice = 0;
						for (const amountAndPrice of purchase?.purchaseDetail) {
							totalPrice += amountAndPrice?.purchaseAmount * amountAndPrice?.stock?.product?.productRcvPrice;
						}

						let totalAmount =
							purchase?.purchaseDetail?.length > 1 ?
							(purchase?.purchaseDetail[0]?.stock?.product?.productName + " 외 " + (purchase?.purchaseDetail?.length - 1) + " 건")
							: (purchase?.purchaseDetail[0]?.stock?.product?.productName)
							
						return (
							<tr key={ purchase?.purchaseCode }>
								<td onClick = { () => onClickTableTr( purchase.purchaseCode, totalAmount, totalPrice )}>{ purchase?.purchaseCode }</td>
								<td onClick = { () => onClickTableTr( purchase.purchaseCode, totalAmount, totalPrice )}>{ FormatDate(purchase?.purchaseDate) }</td>
								<td>{ purchase?.client?.clientName }</td>
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

export default PurchaseList;
