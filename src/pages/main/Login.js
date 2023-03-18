import LoginForm from '../../components/LoginForm';
import { Navigate } from 'react-router-dom';

function Login() {

     /* 로그인 상태인데 호출할 경우 메인으로 */
    //  const loginStatus = !!localStorage.getItem('isLogin');

    //  if(loginStatus) {
    //      return <Navigate to="/" replace={ true }/>
    //  }
 

    return (
        <LoginForm/>
      
    );
}

export default Login;
