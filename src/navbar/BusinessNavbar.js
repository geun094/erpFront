import { Navbar } from '../components/ThemeColor'
import { NavLink } from 'react-router-dom';

function BusinessNavbar() {
	return (
    <Navbar>

			<div className='link'>
				<h3>견적<hr /></h3>
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/business/estimate/list">견적서조회</NavLink><br />
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/business/estimate/regist">견적서입력</NavLink><br />
			</div>

			<div className='link'>
				<h3>주문<hr /></h3>
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/business/orders/list">주문서조회</NavLink><br />
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/business/orders/regist">주문서입력</NavLink><br />
			</div>

			<div className='link'>
				<h3>판매<hr /></h3>
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/business/sales/list">판매조회</NavLink><br />
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/business/sales/regist">판매입력</NavLink><br />
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

export default BusinessNavbar;