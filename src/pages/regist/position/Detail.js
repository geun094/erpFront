import { Table, MainButton, SubButton } from '../../../components/ThemeColor'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
	callPositionDetailAPI,
	callPositionDeleteAPI,
	callPositionUpdateAPI
} from '../../../apis/PositionAPICalls'


function PositionUpdate() {
	const dispatch = useDispatch();
	const params = useParams();
	const positionDetail = useSelector(state => state.positionReducer);
	const [modifyMode, setModifyMode] = useState(false);
	const navigate = useNavigate();
	const [form, setForm] = useState({});

	useEffect(
		() => {
			console.log('[PositionUpdate] positionCode : ', params.positionCode);
			dispatch(callPositionDetailAPI({
				positionCode: params.positionCode
			}));
		}
		, []);

	/* 수정 모드 핸들러 */
	const onClickModifyModeHandler = () => {
		setModifyMode(true);
		setForm({
			positionCode: positionDetail.positionCode,
			positionName: positionDetail.positionName,
			positionSalary: positionDetail.positionSalary
		});
	}

	/* form 데이터 세팅 */
	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	/* 수정 핸들러 */
	const onClickPositionUpdateHandler = () => {

		console.log('[PositionUpdate] onClickPositionUpdateHandler');

		const formData = new FormData();
		formData.append("positionCode", form.positionCode);
		formData.append("positionName", form.positionName);
		formData.append("positionSalary", form.positionSalary);

		dispatch(callPositionUpdateAPI({
			form: formData
		}));

		alert('직급 수정 완료');
		navigate('/regist/position/list', { replace: true });
	}

	/* 삭제 핸들러 */
	const onClickPositionDeleteHandler = () => {
		dispatch(callPositionDeleteAPI({
			positionCode: params.positionCode
		}));

		alert('직급 삭제 완료');
		navigate('/regist/position/list', { replace: true });
	}

	return (
		<div>
			{positionDetail &&
				<div className='positionDetail'>
					<h3>직급수정</h3>
					<Table border={1}>
						<thead>
							<tr>
								<th>직급명</th>
								<th>직급수당</th>
							</tr>
						</thead>
						<tr>
							<td>
								<input
									name='positionName'
									placeholder='직급명'
									value={(!modifyMode ? positionDetail.positionName : form.positionName) || ''}
									onChange={onChangeHandler}
									readOnly={modifyMode ? false : true}
									style={!modifyMode ? { border: 'none', background: 'transparent' } : null}
								/>
							</td>
							<td>
								<input
									name='positionSalary'
									placeholder='직급수당'
									value={(!modifyMode ? positionDetail.positionSalary : form.positionSalary) || ''}
									onChange={onChangeHandler}
									readOnly={modifyMode ? false : true}
									style={!modifyMode ? { border: 'none', background: 'transparent' } : null}
								/>
							</td>
						</tr>
					</Table>
					<div className='ButtonMargin'>
					{!modifyMode &&
						<MainButton
							onClick={onClickModifyModeHandler}
						>
							수정
						</MainButton>
					}
					{modifyMode &&
						<MainButton
							onClick={onClickPositionUpdateHandler}
						>
							저장
						</MainButton>
					}
					<SubButton
						onClick={onClickPositionDeleteHandler}
					>
						삭제
					</SubButton>

					<SubButton
						onClick={() => navigate(-1)}
					>
						이전
					</SubButton>
					</div>
				</div>
			}
		</div>
	)
}

export default PositionUpdate;