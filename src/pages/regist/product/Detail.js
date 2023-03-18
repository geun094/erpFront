import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import  ProductStyle  from '../../../css/ProductRegist.css';


import { 
    callProductDetailAPI,
    callProductUpdateAPI,
    callProductDeleteAPI
} from '../../../apis/ProductAPICalls';

function ProductDetail() {

    const dispatch = useDispatch();
	const params = useParams();
    const productDetail  = useSelector(state => state.productReducer);  

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const imageInput = useRef();
    const [modifyMode, setModifyMode] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({});


    useEffect(        
		() => {
			console.log('[ProductDetail] productCode : ', params.productCode);

			dispatch(callProductDetailAPI({	
				productCode: params.productCode
			}));                     
		}
	,[]);

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
        console.log(e.target.files[0]);
        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        if(modifyMode){
            imageInput.current.click();
        }
    }

    const onClickModifyModeHandler = () => {    // 수정모드
        setModifyMode(true);
        setForm({
            productCode: productDetail.productCode,
            productName: productDetail.productName,
            productRcvPrice: productDetail.productRcvPrice,
            productFwdPriceA: productDetail.productFwdPriceA,
            productFwdPriceB: productDetail.productFwdPriceB,
            productFwdPriceC: productDetail.productFwdPriceC,
            productType: productDetail.productType
        });
    }

     /* form 데이터 세팅 */  
     const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    console.log(image);
    console.log(imageUrl);
    console.log(productDetail.productImageUrl);

    const onClickProductUpdateHandler = () => {

        console.log('[ProductUpdate] onClickProductUpdateHandler');

        const formData = new FormData();
        formData.append("productCode", form.productCode);
        formData.append("productName", form.productName);
        formData.append("productRcvPrice", form.productRcvPrice);
        formData.append("productFwdPriceA", form.productFwdPriceA);
        formData.append("productFwdPriceB", form.productFwdPriceB);
        formData.append("productFwdPriceC", form.productFwdPriceC);
        formData.append("productType", form.productType);

        if(image){
            formData.append("productImage", image);
        }

        dispatch(callProductUpdateAPI({	// 상품 정보 업데이트
            form: formData
        }));         

        alert('품목을 수정했습니다.');
        navigate('/regist/product/list', { replace: true});
    }

    /* 삭제 핸들러 */
	const onClickProductDeleteHandler = () => {
		dispatch(callProductDeleteAPI({	
			productCode: params.productCode
		})); 

		alert('품목 삭제 완료');
		navigate('/regist/product/list', { replace: true});
	}

    return (
        <div>
            <h4>품목 수정</h4>
        
        
			<div className="productBox">

                <div className="productLeftBox">
                    <div className="imgBox">
                        <img 
                            width="180px"
                            height="180px"
                            src={ (imageUrl == null) ? productDetail.productImageUrl : imageUrl } 
                            alt="preview"
                        />
                        
                        <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='productImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }                            
                        />
                        <button 
                            className={ ProductStyle.productImageButton }
                            onClick={ onClickImageUpload }    
                            style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>   

				<div>
                    <table>
                        <tbody>
                        <tr>
                            <td>품목코드</td>
                            <td>
                                <input
                                    id="productText"
                                    value={productDetail.productCode}
                                    
                                />
                            </td>
                        </tr>
                        
                        <tr>
                            <td>품목명</td>
                            <td>
                                <input 
                                    id="productText"
                                    name='productName'
                                    placeholder='품목명'
                                    value={ (!modifyMode ? productDetail.productName : form.productName) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                               />
                            </td>
                        </tr>

                        <tr>
                            <td>입고단가</td>
                            <td>
                                <input
                                    id="productText"
                                    name='productRcvPrice'
                                    placeholder='입고단가'
                                    value={ (!modifyMode ? productDetail.productRcvPrice : form.productRcvPrice) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>출고단가A</td>
                            <td>
                                <input
                                    id="productText"
                                    name='productFwdPriceA'
                                    placeholder='출고단가A'
                                    value={ (!modifyMode ? productDetail.productFwdPriceA : form.productFwdPriceA) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>출고단가B</td>
                            <td>
                                <input
                                    id="productText"
                                    name='productFwdPriceB'
                                    placeholder='출고단가B'
                                    value={ (!modifyMode ? productDetail.productFwdPriceB : form.productFwdPriceB) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>출고단가C</td>
                            <td>
                                <input
                                    id="productText"
                                    name='productFwdPriceC'
                                    placeholder='출고단가C'
                                    value={ (!modifyMode ? productDetail.productFwdPriceC : form.productFwdPriceC) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>구분</td>
                            <td>
                                <input
                                    id="productText"
                                    name='productType'
                                    placeholder='구분'
                                    value={ (!modifyMode ? productDetail.productType : form.productType) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>

                   
                </div>
            </div>
            
                <div>
                   
                    {!modifyMode &&
                        <button       
                            onClick={ onClickModifyModeHandler }             
                        >
                            수정모드
                        </button>
                    }
                    {modifyMode &&
                        <button       
                            onClick={ onClickProductUpdateHandler }             
                        >
                            상품 수정 저장하기
                        </button>
                    }
                    <button  
					className='subButton'
					onClick={  onClickProductDeleteHandler  }            
				    >
					삭제
				    </button>

                    <button        
                        onClick={ () => navigate(-1) }            
                    >
                        돌아가기
                    </button>    

                </div>
              
        </div>
    );

}

export default ProductDetail;