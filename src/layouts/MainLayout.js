import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import MyCard from '../components/MyCard';
import '../css/layoutStyle.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {callLoginInfoAPI} from '../apis/LoginAPICalls';
import {decodeJwt} from '../utils/tokenUtils';

function MainLayout() {

	const dispatch = useDispatch();

	let token;

	// if(window.localStorage.getItem("accessToken")){
	// 	token = decodeJwt(window.localStorage.getItem("accessToken"));
	// 	console.log("토큰 출력 : " + token.sub)
	// }else{
	// 	token = null;
	// }

	token = decodeJwt(window.localStorage.getItem("accessToken"));
	
	useEffect(
    () => {
		if(token != null){
			dispatch(callLoginInfoAPI({
			  empCode: token.sub
					//   empCode: 1
			}));
		}
    }
    ,[]
  );

	return (
		<>
			<Header/>
			<div className='flex'>
				<MyCard/>
				<Outlet/>
			</div>
		</>
	);
}

export default MainLayout;