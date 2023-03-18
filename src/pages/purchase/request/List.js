import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callRequestListAPI } from '../../../apis/RequestAPICalls'

function RequestList(loginInfo) {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requests = useSelector(state => state.requestReducer);
	const requestList = requests.data;
	const pageInfo = requests.pageInfo;
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
			dispatch(callRequestListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickRequestRegist = () => {
		console.log('[RequestRegist] onClickRequestRegist');
		navigate('/purchase/request/regist', { replace: false })
	}

	const onClickTableTr = (requestCode) => {
		navigate(`/purchase/request/detail/${requestCode}`, { replace : false });
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);
			navigate(`/purchase/request/search?value=${search}`, { replace: false });
			window.location.reload();
		}
 }

	return (
		<>
			<div className='outlet'>
				<h4>요청조회</h4>
					<Input style={{float: "left"}}
						type="text"
						value = { search }
						onKeyUp = { onEnterkeyHandler }
						onChange={ onSearchChangeHandler }
					/>

				<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
				{ Array.isArray(requestList) &&
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

				{ Array.isArray(requestList) &&
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
							<th>요청코드</th>
							<th>요청일자</th>
							<th>거래처명</th>
							<th>담당자</th>
							<th>품목명</th>
							<th>요청금액합계</th>
							<th>진행상태</th>
							<th>인쇄</th> 
						</tr>
					</thead>

					<tbody>
					{ Array.isArray(requestList) && requestList.map(( request ) => {
						let totalPrice = 0;
						for (const amountAndPrice of request.requestDetail) {
							totalPrice += amountAndPrice.requestAmount * amountAndPrice.product.productFwdPriceA;
						}
							
						return (
							<tr key={ request?.requestCode }>
							<td style= {{width: 10}} onClick = { () => onSelectHandler }><input type='checkbox'/></td>
								<td onClick = { () => onClickTableTr( request?.requestCode )}>{ request?.requestCode }</td>
								<td onClick = { () => onClickTableTr( request?.requestCode )}>{ FormatDate(request?.requestDate) }</td>
								<td>{ request?.client?.clientName }</td>
								<td>{ request?.emp?.empName }</td>
								<td>
									{request?.requestDetail?.length > 1 ? 
									(request?.requestDetail[0]?.product?.productName + " 외 " + (request?.requestetail?.length - 1) + " 건")
									: (request?.requestDetail[0]?.product?.productName)
									}
								</td>
								<td>{FormatNumber( totalPrice )}</td>
								<td>{ request?.requestStatus }</td>
								<td><a href=''>인쇄</a></td>
							</tr>
						)
					})}
					</tbody>
				</Table>
				
					<MainButton className='mainButton' onClick={ onClickRequestRegist }>신규</MainButton>
					<SubButton className='subButton'>진행상태변경</SubButton>
					<SubButton className='subButton'>인쇄</SubButton>
					<SubButton className='subButton'>전자결재</SubButton>
					<SubButton className='subButton'>엑셀</SubButton>
				
			</div>
		</>
	);
}


export default RequestList;