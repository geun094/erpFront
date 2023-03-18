import { FormatDate, Div, MainButton, SubButton } from '../../components/ThemeColor';
import { useEffect, useRef } from 'react';
import refresh from '../../images/refreshing.png';
import { useSelector, useDispatch } from 'react-redux';
import MyPageStyle from '../../css/MyPage.module.css';
import face from '../../images/face.png';
import { callEmpImgModifyAPI } from '../../apis/LoginAPICalls';
import { useState } from 'react';

function MyPage() {

  const loginInfo = useSelector(state => state.loginReducer);

  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [changeMode, setChangeMode] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const imageInput = useRef();

  const onClickImageUpload = () => {
    setChangeMode(true);
    imageInput.current.click();
  }

  const onChangeImageUpload = (e) => {

    const image = e.target.files[0];

    setImage(image);
  };

  useEffect(() => {

    /* 이미지 업로드시 미리보기 세팅 */
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
  },
    [image]);

  const onClickEmpImgUpdateHandler = () => {
    const formData = new FormData();

    if (image) {
      formData.append("employeeImg", image);
    }

    dispatch(callEmpImgModifyAPI({
      empCode: loginInfo.empCode,
      form: formData
    }));

    alert('사진이 등록되었습니다.');
    window.location.reload();
  }

  const onRefreshHandler = () => {
    window.location.reload();
  }

  return (
    <div className={MyPageStyle.myPage}>
      <Div>
        <h3>개인정보관리</h3>
        <p>프로필 이미지</p>

        <div className={MyPageStyle.changeImg}>
          {(changeMode) ?
            imageUrl && <img
              src={imageUrl}
              alt="preview"
              style={{ height: 200 }}
            /> : <img src={loginInfo.empImage} />}
          <input
            style={{ display: 'none' }}
            type="file"
            name='employeeImg'
            accept='image/jpg,image/png,image/jpeg,image/gif'
            onChange={onChangeImageUpload}
            ref={imageInput}
          />
          {(changeMode) ?
            <MainButton onClick={onClickEmpImgUpdateHandler} style={{ width: 70 }}>저장</MainButton> :
            <SubButton onClick={onClickImageUpload} style={{ width: 140 }}>
              사진 변경하기
            </SubButton>}
        </div>

        <img src={refresh} onClick={onRefreshHandler} style={{ width: 30, height: 30 }} />
      </Div>
      <div>
        <table border={1}>
          <tbody>
            <tr>
              <td>이름</td>
              <td>{loginInfo.empName}</td>
            </tr>
            <tr>
              <td>입사일자</td>
              <td>{FormatDate(loginInfo.empEntdate)}</td>
            </tr>
            <tr>
              <td>전화</td>
              <td>{loginInfo.empPhone}</td>
            </tr>
            <tr>
              <td>휴대전화</td>
              <td>{loginInfo.empMobile}</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>{loginInfo.empEmail}</td>
            </tr>
            <tr>
              <td>주소</td>
              <td>{loginInfo.empAddress}</td>
            </tr>
            <tr>
              <td>계좌번호</td>
              <td>{loginInfo.empAccount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyPage;