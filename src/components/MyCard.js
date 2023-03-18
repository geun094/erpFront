import { MainButton, SubButton } from './ThemeColor'
import MyCardStyle from '../css/MyCardStyle.module.css';
import face from '../images/face.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callLoginInfoAPI } from '../apis/LoginAPICalls';
// import { decodeJwt } from '../utils/tokenUtils';

function MyCard() {

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const loginInfo = useSelector(state => state.loginReducer);

  // const token = decodeJwt(window.localStorage.getItem("accessToken"));

  // useEffect(
  //   () => {
  //     dispatch(callLoginInfoAPI({
  //       empCode: token.sub
  //       // empCode: loginInfo.empCode
  //       // empCode: 1
  //     }));
  //   }, []
  // )

  const themeHandler = () => {
    navigate('/changeTheme')
  }

  const test = () => {
    console.log(loginInfo.empImage);
  }
  return (
    <div
      className={MyCardStyle.mycard}
      style={{
        backgroundColor:
          (loginInfo.empTheme === '초록') ? '#779999' :
            (loginInfo.empTheme === '파랑') ? '#B3C5D6' :
              (loginInfo.empTheme === '분홍') ? '#DBC8CB' :
                (loginInfo.empTheme === '노랑') ? '#EDDDB3' :
                  (loginInfo.empTheme === '주황') ? '#E7BE8C' :
                    (loginInfo.empTheme === '보라') ? '#8F80A1' :
                      (loginInfo.empTheme === '빨강') ? '#D6B3B3' :
                        '#779999'
      }}
    >
      <div className={MyCardStyle.top}>
        <div className={MyCardStyle.face}>
          <img src={loginInfo.empImage} className={MyCardStyle.img} />
        </div>
        <div className={MyCardStyle.name}>
          <p>{loginInfo?.dept?.deptName}</p>
          <></>
          <p>{loginInfo.empName} {loginInfo?.position?.positionName}</p>
        </div>
      </div>
      <div className={MyCardStyle.bottom}>
        {(loginInfo.empName) ? <div>
          <MainButton onClick={themeHandler}>테마 변경</MainButton>
          <SubButton onClick={() => navigate('/myPage')}>개인정보관리</SubButton></div> :
          <p>로그인하세요</p>}
      </div>
    </div>
  );
}

export default MyCard;