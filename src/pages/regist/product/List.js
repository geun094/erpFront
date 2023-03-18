import { Table, Div, MainButton, SubButton, Input, FormatNumber } from '../../../components/ThemeColor'

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal/Modal.js';

import { callProductListAPI } from '../../../apis/ProductAPICalls';

function ProductList() {

    const dispatch = useDispatch();
	const products = useSelector(state => state.productReducer);
	const productList = products.data;
	const navigate = useNavigate();
	const pageInfo = products.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');

    const pageNumber = [];
	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

    useEffect(
		() => {
			dispatch(callProductListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickProductRegist = () => {
		navigate("/regist/product/regist", { replace: false })

	}

	const onClickProductDetail = (productCode) => {
		navigate(`/regist/product/detail/${productCode}`, { replace: false });
	}

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
				console.log('Enter key', search);
				
				navigate(`/regist/product/search?value=${search}`, { replace: false });
				
				window.location.reload();
		}
  }

    return (
			<>
				<div className="outlet">
					
					<h4>품목조회</h4>
					<Modal></Modal>
					<Input style={{ float:"left"}}
						type="text" 
						value={ search }
						placeholder="품목명 검색" 
						onKeyUp={ onEnterkeyHandler }
						onChange={ onSearchChangeHandler }
					/>

        	<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
					{Array.isArray(productList) &&
						<SubButton
							onClick={() => setCurrentPage(currentPage - 1)}
							disabled={currentPage === 1}
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
							disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
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
							<th>입고단가</th>
							<th>출고단가A</th>
							<th>출고단가B</th>
							<th>출고단가C</th>
							<th>구분</th>
							<th>품목사진</th>
						</tr>
					</thead>
					<tbody>
						{ Array.isArray(productList) && productList.map(( product ) => (
							<tr key={ product.productCode }
								onClick={ () => onClickProductDetail(product.productCode)}
							>
								<td>{ product.productCode }</td>
								<td>{ product.productName }</td>
								<td>{ FormatNumber(product.productRcvPrice) }</td>
								<td>{ FormatNumber(product.productFwdPriceA) }</td>
								<td>{ FormatNumber(product.productFwdPriceB) }</td>
								<td>{ FormatNumber(product.productFwdPriceC) }</td>
								<td>{ product.productType }</td>
								<td><img width="50px" height="15px" src={ product.productImageUrl} alt="" /></td>
							</tr>
						))}
					</tbody>
				</Table>
				<MainButton onClick={onClickProductRegist}>신규</MainButton>
				<SubButton>삭제</SubButton>	
			</div>  
    </>
   );
}

export default ProductList;