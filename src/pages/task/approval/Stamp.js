import { Div, MainButton } from '../../../components/ThemeColor';
import StampStyle from '../../../css/Stamp.module.css';
import refresh from '../../../images/refreshing.png';
import stamp from '../../../images/stamp.png';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callStampRegistAPI } from '../../../apis/LoginAPICalls';

function Stamp() {

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const imageInput = useRef();

  const loginInfo = useSelector(state => state.loginReducer);

  useEffect(() => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setImageUrl(result);
        }
      }
      fileReader.readAsDataURL(image);
    }
  }, [image]);

  const onChangeImageUpload = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const onStampSaveHandler = () => {
    console.log('[Stamp] onStampSaveHandler');
    const formData = new FormData();
    if (image) {
      formData.append("stampImage", image);
      dispatch(callStampRegistAPI({
        empCode: loginInfo.empCode,
        form: formData
      }));
      window.location.reload();
      alert('저장되었습니다. 이미지가 나오지 않으면 새로고침을 해주세요.');
      window.location.reload();
    } else {
      alert('파일을 선택해주세요.');
    }
    console.log(image);
  }

  const onRefreshHandler = () => {
    window.location.reload();
  }

  const onClickImgView = () => {
    window.open(loginInfo.empStamp)
  }

  return (
    <div className={StampStyle.stampRegist}>
      <h3>도장등록</h3>

      {(imageUrl) ? 
        <img className={StampStyle.stampSize} src={imageUrl} alt="preview"/> :
        <img className={StampStyle.stampSize} src={stamp}/>
      }
      <input
        type='file'
        name='empStamp'
        accept='image/jpg,image/png,image/jpeg,image/gif'
        onChange={onChangeImageUpload}
        ref={imageInput}
      />

      <MainButton onClick={onStampSaveHandler}>저장</MainButton>
      <Div className={StampStyle.myStamp}>
        <h3>내 도장</h3>
      
        <div>
          {(loginInfo.empStamp !== "http://localhost:7777/stampimgs/null" ||  loginInfo.empStamp === undefined) ?
          <div>
          <img src={loginInfo?.empStamp} onClick={onClickImgView} className={StampStyle.stampImg}/>
          <img src={refresh} className={StampStyle.refreshImg} onClick={onRefreshHandler} />
          </div> : 
          <p>등록된 도장이 없습니다. 도장을 등록해주세요</p>}
        </div>
      </Div>
    </div>
  );
}

export default Stamp;