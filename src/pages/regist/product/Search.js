import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Product from "../../../components/regist/Product";
import { Table, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor'

import {
    callSearchProductAPI,
} from '../../../apis/ProductAPICalls';

function ProductSearch() {

    const { search } = useLocation();
    const { value } = queryString.parse(search);
    const navigate = useNavigate();

    const products = useSelector(state => state.productReducer); 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callSearchProductAPI({
					search: value
        }));        
    },
    []);

    const onClickProductDetail = (productCode) => {
		navigate(`/regist/product/detail/${productCode}`, { replace: false });
	}

    return (
        <>
            <div>
                <h4>품목 조회</h4>
                <Table border={1} className='productTable'>
				<thead>
					<tr>
						<th >품목코드</th>
						<th >품목명</th>
							<th >입고단가</th>
							<th >A단가</th>
							<th >B단가</th>
							<th >C단가</th>
							<th >구분</th>
						
					</tr>
				</thead>
				<tbody>
					{ products.length > 0 && products.map((product) => (
						<tr key={ product.productCode }
							onClick={ () => onClickProductDetail(product.productCode)}
						>
							<td>{ product.productCode }</td>
								<td>{ product.productName }</td>
							<td>{ product.productRcvPrice }</td>
								<td>{ product.productFwdPriceA }</td>
								<td>{ product.productFwdPriceB }</td>
								<td>{ product.productFwdPriceC }</td>
								<td>{ product.productType }</td>
						</tr>
					))}
				</tbody>
			</Table>
			
            </div>
        </>
    );
}

export default ProductSearch;