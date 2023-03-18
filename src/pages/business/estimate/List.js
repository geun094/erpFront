import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callEstimateListAPI } from '../../../apis/EstimateAPICalls'

function EstimateList(loginInfo) {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const estimates = useSelector(state => state.estimateReducer);
	const estimateList = estimates.data;
	const pageInfo = estimates.pageInfo;
	const pageNumber = [];

	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

 	/* 체크 선택 핸들러 */
 	const onSelectHandler = (e) => {
 		const input = document.getElementsByTagName('input');
		console.log(input);
 		for(var i = input.length-1; i >= 0; i--) {
 			if(e.target.checked === true) {
 				input[i].checked = true;
 			} else {
 				input[i].checked = false;
 			}
 		}
 	}

	useEffect(
		() => {
			dispatch(callEstimateListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickEstimateRegist = () => {
		console.log('[EstimateRegist] onClickEstimateRegist');
		navigate('/business/estimate/regist', { replace: false })
	}

	const onClickTableTr = (estimateCode) => {
		navigate(`/business/estimate/detail/${estimateCode}`, { replace : false });
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);
			navigate(`/business/estimate/search?value=${search}`, { replace: false });
			window.location.reload();
		}
 	}

	return (
		<>
			<div className='outlet'>
				<h4>견적조회</h4>
					<Input style={{float: "left"}}
						type="text"
						value = { search }
						onKeyUp = { onEnterkeyHandler }
						onChange={ onSearchChangeHandler }
					/>

				<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
				{ Array.isArray(estimateList) &&
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

				{ Array.isArray(estimateList) &&
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
							<th>견적코드</th>
							<th>견적일자</th>
							<th>거래처명</th>
							<th>담당자</th>
							<th>품목명</th>
							<th>견적금액합계</th>
							<th>진행상태</th>
							<th>인쇄</th> 
						</tr>
					</thead>

					<tbody>
					{ Array.isArray(estimateList) && estimateList.map(( estimate ) => {
						let totalPrice = 0;
						for (const amountAndPrice of estimate.estimateDetail) {
							totalPrice += amountAndPrice.estimateAmount * amountAndPrice.product.productFwdPriceA;
						}
							
						return (
							<tr key={ estimate?.estimateCode }>
								<td style= {{width: 10}} onClick = { () => onSelectHandler }><input type='checkbox'/></td>
								<td onClick = { () => onClickTableTr( estimate?.estimateCode )}>{ estimate?.estimateCode }</td>
								<td onClick = { () => onClickTableTr( estimate?.estimateCode )}>{ FormatDate(estimate?.estimateDate) }</td>
								<td>{ estimate?.client?.clientName }</td>
								<td>{ estimate?.emp?.empName }</td>
								<td>
									{estimate?.estimateDetail?.length > 1 ? 
									(estimate?.estimateDetail[0]?.product?.productName + " 외 " + (estimate?.estimateDetail?.length - 1) + " 건")
									: (estimate?.estimateDetail[0]?.product?.productName)
									}
								</td>
								<td>{FormatNumber( totalPrice )}</td>
								<td>{ estimate?.estimateStatus }</td>
								<td><a href=''>인쇄</a></td>
							</tr>
						)
					})}
					</tbody>
				</Table>
					<MainButton className='mainButton' onClick={ onClickEstimateRegist }>신규</MainButton>
					<SubButton className='subButton'>진행상태변경</SubButton>
					<SubButton className='subButton'>인쇄</SubButton>
					<SubButton className='subButton'>전자결재</SubButton>
					<SubButton className='subButton'>엑셀</SubButton>
			</div>
		</>
	);
}

export default EstimateList;