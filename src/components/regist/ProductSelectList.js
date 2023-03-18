import { Table, Div, MainButton, SubButton, Input, FormatNumber } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {callProductListAPI} from '../../apis/ProductAPICalls';

function ProductSelectList(props) {

	const dispatch = useDispatch();
	const products = useSelector(state => state.productReducer);
	const productList = products.data;
	const navigate = useNavigate();
	const pageInfo = products.pageInfo;


	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isTrue, setIsTrue] = useState(false);

	
	const [productCode, setProductCode] = useState({});

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
				navigate(`/regist/product/search?value=${search}`, { replace: false });
		}
  }

	useEffect(
		() => {
			dispatch(callProductListAPI({
				currentPage: currentPage
			}));
		}
		, [currentPage]
	);

	const onClickTableTr = (productCode, productName, productFwdPriceA) => {
		console.log("productSelctList로부터 보냄:" + productName)
		props.selectProduct(productCode, productName, productFwdPriceA);
		props.close();
	}

	return (
		<div>
			<div>
				<div>
					<h4>품목조회</h4>

					<div>
						<Input
							type="text"
							value = { search }
							onKeyUp = { onEnterkeyHandler }
							onChange={ onSearchChangeHandler }
						/>
					</div>

					<div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
						{ Array.isArray(productList) &&
							<SubButton
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

						{ Array.isArray(productList) &&
							<SubButton 
								onClick={() => setCurrentPage(currentPage + 1)} 
								disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
							>
								&gt;
							</SubButton>
						}
					</div>

					<div>
						<Table>
							<thead>
								<tr>
									<th>품목코드</th>
									<th>품목명</th>
									<th>매출단가</th>
								</tr>
							</thead>
							<tbody>
								{Array.isArray(productList) && productList.map((product) => (
									<tr key={product.productCode}>
										<td onClick={() => onClickTableTr(product.productCode, product.productName, product.productFwdPriceA)}>{product.productCode}</td>
										<td onClick={() => onClickTableTr(product.productCode, product.productName, product.productFwdPriceA)}>{product.productName}</td>
										<td onClick={() => onClickTableTr(product.productCode, product.productName, product.productFwdPriceA)}>{FormatNumber(product.productFwdPriceA)}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductSelectList;