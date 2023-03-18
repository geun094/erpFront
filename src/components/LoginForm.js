import LoginStyle from '../css/Login.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { callLoginAPI } from '../apis/LoginAPICalls'
import mainLogo from '../images/mainLogo.png'

function LoginForm() {

	const navigate = useNavigate();

	/* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
	const dispatch = useDispatch();
	const loginMember = useSelector(state => state.loginReducer);  // API 요청하여 가져온 loginMember 정보

	/* 폼 데이터 한번에 변경 및 State에 저장 */
	const [form, setForm] = useState({
		empCode: '',
		empPw: ''
	});

	// useEffect(() => {

	//     if(loginMember.status === 200){
	//         console.log("[Login] Login SUCCESS {}", loginMember);
	//         navigate("/", { replace: true });
	//     }
	// }
	// ,[loginMember]);

	/* 로그인 상태일 시 로그인페이지로 접근 방지 */
	console.log("loginmember : " + loginMember.status)
	console.log("로그인 멤버 조건 출력" + (loginMember.status == 200))
	if (loginMember.status == 200) {
		console.log("[Login] Login is already authenticated by the server");
		return <Navigate to="/" />
	}

	/* 엔터 핸들러 */
	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			if (typeof (parseInt(form.empCode)) !== "number") {
				alert("사원번호 입력란에는 숫자만 입력해주십시오.");
				return;
			}
			dispatch(callLoginAPI({	// 로그인
				form: form
			}));
		}
	}

	/* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
	const onClickLoginHandler = () => {
		// empCode 타입이 number가 아닌 경우 alert띄우기
		console.log("empCode 타입 출력 : " + typeof (parseInt(form.empCode)));
		if (typeof (parseInt(form.empCode)) !== "number") {
			alert("사원번호 입력란에는 숫자만 입력해주십시오.");
			return;
		}

		dispatch(callLoginAPI({	// 로그인
			form: form
		}));
	}

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	return (

		<div>
			<div className={LoginStyle.loginBox}>
				<img
					style={{width: '40%', marginTop: '10%', marginBottom: '10%'}}
					src={mainLogo}
				/>
				<input className={LoginStyle.idInput}
					type="text"
					name='empCode'
					placeholder="사원번호"
					autoComplete='off'
					onChange={onChangeHandler}
					onKeyUp={onEnterkeyHandler}
				/>
				<input className={LoginStyle.pwInput}
					type="password"
					name='empPw'
					placeholder="패스워드"
					autoComplete='off'
					onChange={onChangeHandler}
					onKeyUp={onEnterkeyHandler}
				/>
				<div className={LoginStyle.chkBoxDiv}>
					<label style={{ color: 'white', marginLeft: '10%'}}><input type="checkbox"/>저장[id]</label>
					<label style={{ color: 'white', marginLeft: '5%'}}><input type="checkbox"/>출근체크</label>
				</div>
				<button className={LoginStyle.submitBtn} onClick={onClickLoginHandler}>로그인</button>
				<div className={LoginStyle.extraBtn}>
					<label>비밀번호 찾기</label>
					<label style={{ marginLeft: '10%' }}>이메일 문의</label>
				</div>
			</div>
		</div>
	);
}

export default LoginForm;