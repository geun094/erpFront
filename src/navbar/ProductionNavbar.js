import { Navbar } from '../components/ThemeColor'
import { NavLink } from 'react-router-dom';

function ProductionNavbar() {
	return (
    <Navbar>

      <div className='link'>
        <h3>지시<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/production/instruction/list">지시서조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/production/instruction/regist">지시서입력</NavLink><br />
      </div>

      <div className='link'>
        <h3>입고<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/production/receivingList">입고조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/production/receivingRegist">입고입력</NavLink><br />
      </div>

      <div className='link'>
        <h3>작업<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/production/workList">작업조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/production/workRegist">작업입력</NavLink><br />
      </div>

      <div className='link'>
        <h3>출고<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/production/forwardingList">출고조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/production/forwardingRegist">출고입력</NavLink><br />
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

export default ProductionNavbar;