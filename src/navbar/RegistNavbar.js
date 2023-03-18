import { Navbar } from '../components/ThemeColor'
import { NavLink } from 'react-router-dom';

function RegistNavbar() {
	return (
    <Navbar>

      <div className='link'>
        <h3>등록<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/regist/emp/list"      >사원등록</NavLink><br/>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/regist/dept/list"     >부서등록</NavLink><br/>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/regist/position/list" >직급등록</NavLink><br/>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/regist/product/list"  >품목등록</NavLink><br/>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/regist/storage/list"  >창고등록</NavLink><br/>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/regist/client/list"   >거래처등록</NavLink><br/>
      </div>

    </Navbar>
  );
}

export default RegistNavbar;