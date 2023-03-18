import '../css/headerStyle.css';
import mainLogo from '../images/mainLogo.png'
import logout from '../images/logout.png';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const loginInfo = useSelector(state => state.loginReducer);
  // const token = decodeJwt(window.localStorage.getItem("accessToken"));

  // useEffect(
  //   () => {
  //     dispatch(callLoginInfoAPI({
  //       empCode: token.sub
  //     }));
  //   }, []
  // )

  const onClickHandler = () => {
    navigate('/');
  }

  return (
    <>
    {
      !!loginInfo  && <div className='header'
      style={{
        backgroundColor:
          (loginInfo?.empTheme === '초록') ? '#226666' :
            (loginInfo?.empTheme === '파랑') ? '#115588' :
              (loginInfo?.empTheme === '분홍') ? '#965A5A' :
                (loginInfo?.empTheme === '노랑') ? '#DDAC2D' :
                  (loginInfo?.empTheme === '주황') ? '#DA8555' :
                    (loginInfo?.empTheme === '보라') ? '#421A83' :
                      (loginInfo?.empTheme === '빨강') ? '#881111' :
                      '#226666'
      }}>
      <img width="2.5%" src={mainLogo} onClick={onClickHandler} style={{ cursor: 'pointer' }}></img>
      <div><NavLink className={({ isActive }) => isActive ? "activeHeader" : "inActiveHeader"} to="/regist"    >기초등록</NavLink></div>
      <div><NavLink className={({ isActive }) => isActive ? "activeHeader" : "inActiveHeader"} to="/business"  >영업관리</NavLink></div>
      <div><NavLink className={({ isActive }) => isActive ? "activeHeader" : "inActiveHeader"} to="/purchase"  >구매관리</NavLink></div>
      <div><NavLink className={({ isActive }) => isActive ? "activeHeader" : "inActiveHeader"} to="/production">생산관리</NavLink></div>
      <div><NavLink className={({ isActive }) => isActive ? "activeHeader" : "inActiveHeader"} to="/stock"     >재고관리</NavLink></div>
      <div><NavLink className={({ isActive }) => isActive ? "activeHeader" : "inActiveHeader"} to="/account"   >회계관리</NavLink></div>
      <div><NavLink className={({ isActive }) => isActive ? "activeHeader" : "inActiveHeader"} to="/task"      >업무관리</NavLink></div>
      <div><NavLink className={({ isActive }) => isActive ? "activeHeader" : "inActiveHeader"} to="/login"     ><img src={logout} style={{ width: 50, height: 50 }} /></NavLink></div>
    </div>
    }
    </>
  );
}


export default Header;