import { useNavigate } from 'react-router-dom';


function Client({ client : {clientCode, clientRepresentative, clientType, clientPhone, clientAddress, clientFax, clientWeb, clientName, empName, clientItem, clientMobile, clientEmail, clientAccount}}) {

	const navigate = useNavigate();

	const onClickClientHandler = (clientCode) => {
		navigate(`/regist/client/detail/${clientCode}`, { replace: false });
	}

	return (
		<div 
			onClick={ () => onClickClientHandler(clientCode) }
		>
			<h5>{ clientCode }</h5>
			<h5>{ clientRepresentative }</h5>
			<h5>{ clientType }</h5>
			<h5>{ clientPhone }</h5>
			<h5>{ clientAddress }</h5>
			<h5>{ clientFax }</h5>
			<h5>{ clientWeb }</h5>
			<h5>{ clientName }</h5>
			<h5>{ empName }</h5>
			<h5>{ clientItem }</h5>
			<h5>{ clientMobile }</h5>
			<h5>{ clientEmail }</h5>
			<h5>{ clientAccount }</h5>
		</div>
	);

}

export default Client;