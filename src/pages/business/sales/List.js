import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callSalesListAPI } from '../../../apis/SalesAPICalls'

function SalesList() {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const sales = useSelector(state => state.salesReducer);
	const salesList = sales.data;
	const pageInfo = sales.pageInfo;
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
			dispatch(callSalesListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	/* 판매입력 핸들러 */
	const onClickSalesRegist = () => {
		console.log('[SalesRegist] onClickSalesRegist');
		navigate('/business/sales/regist', { replace: false })
	}

	/* 판매상세 핸들러 */
	const onClickTableTr = (salesCode) => {
		navigate(`/business/sales/detail/${salesCode}`, { replace : false });
	}

	return (
		<>
		<div className='outlet'>
			<h4>판매조회</h4>
			<div>
				<Input style={{float: "left"}}
				type="text"
				value = { search }
				/>
			</div>

			<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
				{ Array.isArray(salesList) &&
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

				{ Array.isArray(salesList) &&
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
						<th>판매코드</th>
						<th>판매일자</th>
            <th>거래처명</th>
            <th>품목명</th>
						<th>판매금액합계</th>
						<th>담당자명</th>
            <th>출하창고명</th>
            <th>인쇄</th> 
					</tr>
				</thead>

				<tbody>
					{ Array.isArray(salesList) && salesList.map(( sales ) => {
						let totalPrice = 0;
						for (const amountAndPrice of sales?.salesDetail) {
							totalPrice += amountAndPrice?.salesAmount * amountAndPrice?.stock?.product?.productFwdPriceA;
						}
							
						return (
							<tr key={ sales?.salesCode }>
								<td style= {{width: 10}} onClick = { () => onSelectHandler }><input type='checkbox'/></td>
								<td onClick = { () => onClickTableTr( sales?.salesCode )}>{ sales?.salesCode }</td>
								<td onClick = { () => onClickTableTr( sales?.salesCode )}>{ FormatDate(sales?.salesDate) }</td>
								<td>{ sales?.client?.clientName }</td>
								<td>
									{sales?.salesDetail?.length > 1 ? 
									(sales?.salesDetail[0]?.stock?.product?.productName + " 외 " + (sales?.salesDetail?.length - 1) + " 건")
									: (sales?.salesDetail[0]?.stock?.product?.productName)
									}
								</td>
								<td>{ FormatNumber ( totalPrice )}</td>
								<td>{ sales?.emp?.empName }</td>
								<td>{ sales?.salesDetail[0]?.stock?.storage?.storageName }</td>
								<td><a href=''>인쇄</a></td>
							</tr>
						)
					})}

				</tbody>
			</Table>
				<MainButton className='mainButton' onClick={ onClickSalesRegist }>신규</MainButton>
				<SubButton className='subButton'>인쇄</SubButton>
				<SubButton className='subButton'>전자결재</SubButton>
				<SubButton className='subButton'>엑셀</SubButton>
		</div>
		
		</>
	);
}

export default SalesList;
