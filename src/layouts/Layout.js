import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import '../css/layoutStyle.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {callLoginInfoAPI} from '../apis/LoginAPICalls';
import { decodeJwt } from '../utils/tokenUtils';

function Layout() {

	const dispatch = useDispatch();
	const token = decodeJwt(window.localStorage.getItem("accessToken"));

	useEffect(
    () => {
      dispatch(callLoginInfoAPI({
        empCode: token.sub
      }));
    }
    ,[]
  );

	return (
		<>
			<Header/>
			<div className='flex'>
				<Navbar/>
				<Outlet/>
			</div>
		</>
	);
}

export default Layout;