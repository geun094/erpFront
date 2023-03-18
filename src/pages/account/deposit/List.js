import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callDepositListAPI } from '../../../apis/DepositAPICalls'

function DepositList() {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const deposits = useSelector(state => state.depositReducer);
	const depositList = deposits.data;
	const pageInfo = deposits.pageInfo;
	const pageNumber = [];

	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

	useEffect(
		() => {
			dispatch(callDepositListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickDepositRegist = () => {
		console.log('[DepositRegist] onClickDepositRegist');
		navigate('/account/deposit/regist', { replace: false })
	}

	return (
		<>
			<div className='outlet'>
				<h4>입금조회</h4>
					<Input style={{float: "left"}}
						type="text"
						value = { search }
					/>

				<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
				{ Array.isArray(depositList) &&
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

				{ Array.isArray(depositList) &&
					<SubButton
						className='activeButton'
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
					>
						&gt;
					</SubButton>
				}
				</div>

				<Table>
					<thead>
						<tr>
							<th style= {{width: 10}}><input type='checkbox'/></th>
							<th>입금코드</th>
							<th>입금일자</th>
							<th>거래처명</th>
							<th>담당자명</th>
							<th>매출총액</th>
							<th>입금액</th>
							<th>미수금액</th>
							<th>인쇄</th>
						</tr>
					</thead>

					<tbody>
					{ Array.isArray(depositList) && depositList.map(( deposit ) => {
						let totalPrice = 0;
						for (const item of deposit.sales.salesDetail) {
							totalPrice += item.salesAmount * item.stock.product.productFwdPriceA;
					}
						return (
							<tr key={ deposit.depositCode }>
								<td style= {{width: 10}}><input type='checkbox'/></td>
								<td>{ deposit.depositCode }</td>
								<td>{FormatDate(deposit.depositDate)}</td>
								<td>{deposit?.sales?.client?.clientName}</td>
								<td>{deposit?.sales?.emp?.empName}</td>
								<td>{FormatNumber (totalPrice) }</td>
								<td>{FormatNumber (deposit.depositAmount) }</td>
								<td>{FormatNumber (deposit.depositReceivable)}</td>
								<td><a href=''>인쇄</a></td>
							</tr>
							)
						})}
					</tbody>
				</Table>
					<MainButton className='mainButton' onClick={ onClickDepositRegist }>신규</MainButton>
					<SubButton className='subButton'>인쇄</SubButton>
					<SubButton className='subButton'>전자결재</SubButton>
					<SubButton className='subButton'>엑셀</SubButton>
			</div>
		</>
	);
}

export default DepositList;