import { Navbar } from '../components/ThemeColor'
import { NavLink } from 'react-router-dom';

function AccountNavbar() {

	return (
    <Navbar>
			<div className='link'>
				<h3>입금<hr/></h3>
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/account/deposit/list">입금내역조회</NavLink><br/>
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/account/deposit/regist">입금내역입력</NavLink><br/>
			</div>

			<div className='link'>
				<h3>출금<hr/></h3>
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/account/withdraw/list">출금내역조회</NavLink><br/>
				<NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/account/withdraw/regist">출금내역입력</NavLink><br/>
			</div>
		</Navbar>
	);
}

export default AccountNavbar;