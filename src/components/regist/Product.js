import { useNavigate } from 'react-router-dom';

function Product({ product : {productCode, productName, productRcvPrice, productFwdPriceA, productFwdPriceB, productFwdPriceC, productType}}) {

	const navigate = useNavigate();

	const onClickProductHandler = (productCode) => {
		navigate(`/regist/product/detail/${productCode}`, { replace: false });
	}

	return (
		<div 
			onClick={ () => onClickProductHandler(productCode) }
		>
			<h5>{ productCode }</h5>
			<h5>{ productName }</h5>
			<h5>{ productRcvPrice }</h5>
			<h5>{ productFwdPriceA }</h5>
			<h5>{ productFwdPriceB }</h5>
			<h5>{ productFwdPriceC }</h5>
			<h5>{ productType }</h5>
		</div>
	);
}

export default Product;