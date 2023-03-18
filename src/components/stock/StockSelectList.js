import { Table, Div, MainButton, SubButton, Input, FormatNumber } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callStockListAPI } from '../../apis/StockAPICalls';

function StockSelectList(props) {

	const dispatch = useDispatch();
	const stocks = useSelector(state => state.stockReducer);
	const stockList = stocks.data;
	const navigate = useNavigate();
	const pageInfo = stocks.pageInfo;
	
	const [currentPage, setCurrentPage]           = useState(1);
	const [search, setSearch]                     = useState('');
  const [isDeleted, setIsDeleted]               = useState(false);


	const totalStock = {}

	const pageNumber = [];
	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);
			navigate(`/regist/stock/search?value=${search}`, { replace: false });
			window.location.reload();
		}
	}

	useEffect(
		() => {
			dispatch(callStockListAPI({
				currentPage: currentPage,
			}));
		}
		,[currentPage]
	);

	/* 상세 핸들러 */
	const onClickTableTr = (stockCode, storageCode, storageName, productCode, productName, productFwdPriceA) => {
		console.log("StockSelectList 발신: " + productName);
		props.selectStock(stockCode, storageCode, storageName, productCode, productName, productFwdPriceA);
		props.close();
	}

	return (
		<>
    	<div className='outlet'>
        <h4>재고선택</h4>
					<Input
						type="text"
						value = { search }
						onKeyUp = { onEnterkeyHandler }
						onChange={ onSearchChangeHandler }
            />

			<div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
				{ Array.isArray(stockList) &&
					<button
						onClick={() => setCurrentPage(currentPage - 1)} 
						disabled={currentPage == 1}
					>
					&lt;
					</button>
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
					<button 
						onClick={() => setCurrentPage(currentPage + 1)} 
						disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
					>
					&gt;
					</button>
				}
			</div>

        <Table>
					<thead>
						<tr>
							<th>재고코드</th>
							<th>창고코드</th>
							<th>창고명</th>
							<th>품목코드</th>
							<th>품목명</th>
							<th>재고수량</th>
							<th>출고단가</th>
						</tr>
					</thead>
					
						<tbody>
							{ Array.isArray(stockList) && stockList.map(( stock ) => {
								return (
									<tr key={ stock?.stockCode }>
										<td onClick={() => onClickTableTr(stock?.stockCode, stock?.storage?.storageCode, stock?.storage?.storageName,
											stock?.product?.productCode, stock?.product?.productName, stock?.product?.productFwdPriceA)}>{ stock?.stockCode }</td>
									
										<td onClick={() => onClickTableTr(stock?.stockCode, stock?.storage?.storageCode, stock?.storage?.storageName,
											stock?.product?.productCode, stock?.product?.productName, stock?.product?.productFwdPriceA)}>{ stock?.storage?.storageCode }</td>

										<td onClick={() => onClickTableTr(stock?.stockCode, stock?.storage?.storageCode, stock?.storage?.storageName,
											stock?.product?.productCode, stock?.product?.productName, stock?.product?.productFwdPriceA)}>{ stock?.storage?.storageName }</td>

										<td onClick={() => onClickTableTr(stock?.stockCode, stock?.storage?.storageCode, stock?.storage?.storageName,
											stock?.product?.productCode, stock?.product?.productName, stock?.product?.productFwdPriceA)}>{ stock?.product?.productCode }</td>

										<td onClick={() => onClickTableTr(stock?.stockCode, stock?.storage?.storageCode, stock?.storage?.storageName,
											stock?.product?.productCode, stock?.product?.productName, stock?.product?.productFwdPriceA)}>{ stock?.product?.productName }</td>

										<td onClick={() => onClickTableTr(stock?.stockCode, stock?.storage?.storageCode, stock?.storage?.storageName,
											stock?.product?.productCode, stock?.product?.productName, stock?.product?.productFwdPriceA)}>{ stock?.stockAmount} </td>

										<td onClick={() => onClickTableTr(stock?.stockCode, stock?.storage?.storageCode, stock?.storage?.storageName,
											stock?.product?.productCode, stock?.product?.productName, stock?.product?.productFwdPriceA)}>{ FormatNumber(stock?.product?.productFwdPriceA) }</td>
									</tr>
								)
							})}
            </tbody>
        </Table>
    </div>
</>
	);
}

export default StockSelectList;