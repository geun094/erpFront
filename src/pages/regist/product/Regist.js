import { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductStyle from '../../../css/ProductRegist.css';

import { callProductRegistAPI } from '../../../apis/ProductAPICalls'

function ProductRegist() {

    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();


    const [form, setForm] = useState({
		productName: '',
        productRcvPrice: '',
        productFwdPriceA: '',
        productFwdPriceB: '',
        productFwdPriceC: '',
		productType: '',
        productImage: ''
	});

   
    useEffect(() => {

        /* 이미지 업로드시 미리보기 세팅 */
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);
    

    
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const onClickProductRegistHandler = () => {
		
		const formData = new FormData();

		formData.append("productName", form.productName);
        formData.append("productRcvPrice", form.productRcvPrice);
        formData.append("productFwdPriceA", form.productFwdPriceA);
        formData.append("productFwdPriceB", form.productFwdPriceB);
        formData.append("productFwdPriceC", form.productFwdPriceC);
		formData.append("productType", form.productType);

        console.log(image);

        if(image){
            formData.append("productImage", image);
        }

        console.log(form);

		dispatch(callProductRegistAPI({
			form: formData
		}));

        console.log("form : " + form);
		alert('품목 등록 완료');
		navigate('/regist/product/list', {replace:true});
		window.location.reload();
	}
    
    return (
        <>
            <div>
                <h4>품목 등록</h4>

                <div className="productBox">
                    <div className="productLeftBox">
                        <div>

                            <div className="imgBox">
                                {imageUrl && <img
                                    src={imageUrl}
                                    width="180px"
                                    height="180px"
                                    alt="preview"
                                />}
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    name='productImage'
                                    accept='image/jpg,image/png,image/jpeg,image/gif'
                                    onChange={onChangeImageUpload}
                                    ref={imageInput}
                                />
                            </div>

                            <button
                                onClick={onClickImageUpload}
                            >
                                이미지 업로드
                            </button></div>


                        <div className="leftbottom">
                            <b>입고단가</b>&nbsp;&nbsp;

                            <input
                                id="productText"
                                type="text"
                                name="productRcvPrice"
                                onChange={onChangeHandler}
                            /><br />



                            <b>출고단가B</b>
                            <input
                                id="productText"
                                type="text"
                                name="productFwdPriceB"
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>




                    <div className="productRightBox">


                        <div className="rightTop">
                            <b>품목명</b>
                            <input
                                id="productText"
                                type="text"
                                name="productName"
                                onChange={onChangeHandler}
                            /><br />

                            <b>구분</b>&nbsp;&nbsp;&nbsp;
                            <input
                                id="productText"
                                type="text"
                                name="productType"
                                onChange={onChangeHandler}
                            /><br />
                        </div>

                        <div className="rightBottom">
                            <b>출고단가A</b>
                            <input
                                id="productText"
                                type="text"
                                name="productFwdPriceA"
                                onChange={onChangeHandler}
                            /><br />

                            <b>출고단가C</b>
                            <input
                                id="productText"
                                type="text"
                                name="productFwdPriceC"
                                onChange={onChangeHandler}
                            />

                        </div>

                    </div>

                </div>


                <div>
                    <button onClick={onClickProductRegistHandler}>등록</button>
                    <button onClick={ () => navigate(-1) }>돌아가기</button>   
                </div>

            </div>
        </>
    )

}

export default ProductRegist;