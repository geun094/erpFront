import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callWithdrawListAPI } from '../../../apis/WithdrawAPICalls'

function WithdrawList(loginInfo) {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const withdraws = useSelector(state => state.withdrawReducer);
	const withdrawList = withdraws.data;
	const pageInfo = withdraws.pageInfo;
	const pageNumber = [];

	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

	useEffect(
		() => {
			dispatch(callWithdrawListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickWithdrawRegist = () => {
		console.log('[WithdrawRegist] onClickWithdrawRegist');
		navigate('/account/withdraw/regist', { replace: false })
	}

	const onClickTableTr = (withdrawCode) => {
		navigate(`/account/withdraw/detail/${withdrawCode}`, { replace : false });
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);
			navigate(`/account/withdraw/search?value=${search}`, { replace: false });
			window.location.reload();
		}
 	}

	return (
		<>
			<div className='outlet'>
				<h4>출금조회</h4>
					<Input style={{float: "left"}}
						type="text"
						value = { search }
						onKeyUp = { onEnterkeyHandler }
						onChange={ onSearchChangeHandler }
					/>

				<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
				{ Array.isArray(withdrawList) &&
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

				{ Array.isArray(withdrawList) &&
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
							<th>출금코드</th>
							<th>출금일자</th>
							<th>거래처명</th>
							<th>담당자명</th>
							<th>매입총액</th>
							<th>출금액</th>
							<th>미지급액</th>
							<th>인쇄</th> 
						</tr>
					</thead>

					<tbody>
					{ Array.isArray(withdrawList) && withdrawList.map(( withdraw ) => {
						let totalPrice = 0;
						for (const item of withdraw.purchase.purchaseDetail) {
							totalPrice += item.purchaseAmount * item.stock.product.productRcvPrice;
					}
					
						return (
							<tr key={ withdraw.withdrawCode }>
								<td style= {{width: 10}}><input type='checkbox'/></td>
								<td>{ withdraw.withdrawCode }</td>
								<td>{FormatDate(withdraw.withdrawDate)}</td>
								<td>{withdraw?.purchase?.client?.clientName}</td>
								<td>{withdraw?.purchase?.emp?.empName}</td>
								<td>{FormatNumber (totalPrice) }</td>
								<td>{FormatNumber (withdraw.withdrawAmount)}</td>
								<td>{FormatNumber (withdraw.withdrawPayable)}</td>
								<td><a href=''>인쇄</a></td>
							</tr>
							)
						})}
					</tbody>
				</Table>
					<MainButton className='mainButton' onClick={ onClickWithdrawRegist }>신규</MainButton>
					<SubButton className='subButton'>인쇄</SubButton>
					<SubButton className='subButton'>전자결재</SubButton>
					<SubButton className='subButton'>엑셀</SubButton>
			</div>
		</>
	);
}

export default WithdrawList;