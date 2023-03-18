import { Table,  MainButton, SubButton} from '../../../components/ThemeColor'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callPositionRegistAPI } from "../../../apis/PositionAPICalls";

function PositionRegist () {
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const [form, setForm] = useState({
        positionName: '',
        positionSalary: 0
    });
    const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

    /* 등록 핸들러 */
	const onClickPositionRegistHandler = () => {
		console.log('[PositionRegist] onClickPositionRegistHandler');

		const formData = new FormData();

		formData.append("positionName", form.positionName);
		formData.append("positionSalary", form.positionSalary);

		dispatch(callPositionRegistAPI({
			form: formData
		}));

		alert('직급 등록 완료');
		navigate('/regist/position/list', {replace:true});
		window.location.reload();
	}


    return(
            <div className="positionRegist">
                <h3>직급등록</h3>
                <Table border={1}>
                <thead style={{ backgroundColor: '#266666', color: '#ffffff'}}>
                <tr>
                    <th>직급명</th>
                    <th>직급수당</th>
                </tr>
	            </thead>
                    <tr>
                        <td>
                            <input
                               name="positionName"
                               placeholder="직급명"
                               onChange={ onChangeHandler }
                            />
                        </td>
                        <td>
                            <input
                               name="positionSalary"
                               placeholder="직급수당"
                               onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>
                </Table>
                <div className='ButtonMargin'>
                <MainButton	 onClick={ onClickPositionRegistHandler }> 등록</MainButton>
                <SubButton onClick = { () => navigate(-1) }> 취소 </SubButton>
                </div>
            </div>
    )
}

export default PositionRegist;