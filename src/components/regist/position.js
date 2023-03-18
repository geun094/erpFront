import { useNavigate } from 'react-router-dom';

function Position({ position : {positionCode, positionName, positionSalary}}) {

	const navigate = useNavigate();

	const onClickProductHandler = (positionCode) => {
		navigate(`/regist/positionUpdate/${positionCode}`, { replace: false });
	}

	return (
		<div 
			onClick={ () => onClickProductHandler(positionCode) }
		>
			<h5>{ positionName }</h5>
			<h5>{ positionSalary }</h5>
		</div>
	);
}

export default Position;