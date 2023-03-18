import { Navbar } from '../components/ThemeColor'
import { NavLink } from 'react-router-dom';

function StockNavbar() {
	return (
    <Navbar>

      <div className='link'>
        <h3>재고<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/stock/list">재고조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/stock/storage">창고별재고</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/stock/detail">재고수불부</NavLink><br />
      </div>

    </Navbar>
  );
}

export default StockNavbar;