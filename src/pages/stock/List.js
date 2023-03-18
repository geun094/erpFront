import { Table, Div, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callStockListAPI } from '../../apis/StockAPICalls';

function StockList() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const stocks = useSelector(state => state.stockReducer);
	const stockList = stocks.data;
	const pageInfo = stocks.pageInfo;
	
	const [currentPage, setCurrentPage]           = useState(1);
	const [search, setSearch]                     = useState('');
  const [isDeleted, setIsDeleted]               = useState(false);
	const [registModalOpen, setRegistModalOpen] = useState(false);
	const [detailModalOpen, setDetailModalOpen] = useState(false);

	const [selectedStockCode, setSelectedStockCode] = useState(0);

	const totalStock = {}
	const uniqueProductCodes = new Set()

	useEffect(
		() => {
			dispatch(callStockListAPI({
				currentPage: currentPage,
				isDeleted: isDeleted,
				detailModalOpen: detailModalOpen
			}));
		}
		,[currentPage, isDeleted,
			// detailModalOpen
		]
	);


	/* 페이징 */
	const pageNumber = [];
	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

	/* 검색 핸들러 */
	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	/* 엔터 핸들러 */
	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);
			navigate(`/regist/stock/search?value=${search}`, { replace: false });
			window.location.reload();
		}
	}

	return (
<>
    <div className='outlet'>
			<h4>재고조회</h4>
			<div>
				<Input style={{ float:"left"}}
					type="text"
					value = { search }
					onKeyUp = { onEnterkeyHandler }
					onChange={ onSearchChangeHandler }
				/>
			</div>

			<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
				{ Array.isArray(stockList) &&
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

				{ Array.isArray(stockList) &&
					<SubButton 
						className='activeButton'
						onClick={() => setCurrentPage(currentPage + 1)} 
						disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
					>
					&gt;
					</SubButton>
				}
        </div>

        <Table>
					<thead>
						<tr>
							<th>품목코드</th>
							<th>품목명</th>
							<th>총재고수량</th>
							<th>입고단가</th>
							<th>금액</th>
						</tr>
					</thead>
						
					{ Array.isArray(stockList) && stockList.map(( stock ) => {
						/* 총재고수량 */
						if (!totalStock[stock.product.productCode]) {
							totalStock[stock.product.productCode] = 0
						}
						totalStock[stock.product.productCode] += stock.stockAmount
					})}

					<tbody>
						{ Array.isArray(stockList) && stockList.map(( stock ) => {
						if (uniqueProductCodes.has(stock.product.productCode)) {
							return null;
						}
						uniqueProductCodes.add(stock.product.productCode);
							return (
								<tr key={ stock.stockCode }>
									<td>{ stock?.product?.productCode }</td>
									<td>{ stock?.product?.productName }</td>
									<td>{ totalStock[stock.product.productCode] || 0 }</td>
									<td>{ FormatNumber (stock?.product?.productRcvPrice) }</td>
									<td>{ FormatNumber (totalStock[stock.product.productCode]*stock?.product?.productRcvPrice) }</td>
								</tr>
							)
						})}
					</tbody>
        </Table>
    </div>
</>
	);
}

export default StockList;