import { Navbar } from '../components/ThemeColor'
import { NavLink } from 'react-router-dom';

function PurchaseNavbar() {
	return (
    <Navbar>

      <div className='link'>
        <h3>요청<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/purchase/request/list">요청서조회</NavLink><br />
       	<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/business/estimate/regist">견적서입력</NavLink><br />

      </div>

      <div className='link'>
        <h3>발주<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/purchase/place/list">발주서조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/purchase/place/regist">발주서입력</NavLink><br />
      </div>

      <div className='link'>
        <h3>구매<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/purchase/purchase/list">구매조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/purchase/purchase/regist">구매입력</NavLink><br />
      </div>

      <div className='link'>
        <h3>재고<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/stock/list">재고조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/stock/storage">창고별재고</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/stock/detail">재고수불부</NavLink><br />
      </div>

    </Navbar>
  );
}

export default PurchaseNavbar;