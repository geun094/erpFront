import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal/Modal.js';
import Detail from './Detail.js'

import { callPurchaseListAPI } from '../../../apis/PurchaseAPICalls'

function PurchaseList() {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const purchase = useSelector(state => state.purchaseReducer);
	const purchaseList = purchase.data;
	const pageInfo = purchase.pageInfo;
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
			dispatch(callPurchaseListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	/* 구매입력 핸들러 */
	const onClickPurchaseRegist = () => {
		console.log('[PurchaseRegist] onClickPurchaseRegist');
		navigate('/purchase/purchase/regist', { replace: false })
	}

	/* 구매상세 핸들러 */
	const onClickTableTr = (purchaseCode) => {
		navigate(`/purchase/purchase/detail/${purchaseCode}`, { replace : false });
	}

	

	

  return (
	<>
	<div className='outlet'>
		<h4>구매조회</h4>
		<div>
			<Input style={{float: "left"}}
			type="text"
			value = { search }
			
			/>
		</div>

		<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
			{ Array.isArray(purchaseList) &&
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

			{ Array.isArray(purchaseList) &&
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
					<th>구매코드</th>
					<th>구매일자</th>
		<th>거래처명</th>
		<th>품목명</th>
					<th>구매금액합계</th>
					<th>담당자명</th>
		<th>출하창고명</th>
		<th>인쇄</th> 
				</tr>
			</thead>

			<tbody>
				{ Array.isArray(purchaseList) && purchaseList.map(( purchase ) => {
					let totalPrice = 0;
					for (const amountAndPrice of purchase?.purchaseDetail) {
						totalPrice += amountAndPrice?.purchaseAmount * amountAndPrice?.stock?.product?.productFwdPriceA;
					}
						
					return (
						<tr key={ purchase?.purchaseCode }>
							<td style= {{width: 10}} onClick = { () => onSelectHandler }><input type='checkbox'/></td>
							<td onClick = { () => onClickTableTr( purchase?.purchaseCode )}>{ purchase?.purchaseCode }</td>
							<td onClick = { () => onClickTableTr( purchase?.purchaseCode )}>{ FormatDate(purchase?.purchaseDate) }</td>
							<td>{ purchase?.client?.clientName }</td>
							<td>
								{purchase?.purchaseDetail?.length > 1 ? 
								(purchase?.purchaseDetail[0]?.stock?.product?.productName + " 외 " + (purchase?.purchaseDetail?.length - 1) + " 건")
								: (purchase?.purchaseDetail[0]?.stock?.product?.productName)
								}
							</td>
							<td>{ FormatNumber ( totalPrice )}</td>
							<td>{ purchase?.emp?.empName }</td>
							<td>{ purchase?.purchaseDetail[0]?.stock?.storage?.storageName }</td>
							<td><a href=''>인쇄</a></td>
						</tr>
					)
				})}

			</tbody>
		</Table>
			<MainButton className='mainButton' onClick={ onClickPurchaseRegist }>신규</MainButton>
			<SubButton className='subButton'>인쇄</SubButton>
			<SubButton className='subButton'>전자결재</SubButton>
			<SubButton className='subButton'>엑셀</SubButton>
	</div>
	
	</>
);
			}
export default PurchaseList;
