import { Table, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor'

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callStorageUpdateAPI,	callStorageDeleteAPI } from '../../../apis/StorageAPICalls';

function StorageDetail( {} ) {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const params = useParams();
	const storage = useSelector(state => state.detailReducer);

	const [modifyMode, setModifyMode] = useState(false);
	const [form, setForm] = useState({});

	const onClickModifyModeHandler = () => {
		setModifyMode(true);
		setForm({
			storageCode: storage.storageCode,
			storageName: storage.storageName,
			storageType: storage.storageType
		});
	}

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const onClickStorageUpdateHandler = () => {
		console.log('[StorageUpdate] onClickStorageUpdateHandler');
		const formData = new FormData();
		formData.append("storageCode", form.storageCode);
		formData.append("storageName", form.storageName);
		formData.append("storageType", form.storageType);
		dispatch(callStorageUpdateAPI({
			form: formData
		}));
		alert('창고 수정 완료');
		navigate('/regist/storage/list', { replace: true });
		window.location.reload();
	}

	const onClickStorageDeleteHandler = () => {
		dispatch(callStorageDeleteAPI({
			storageCode: params.storageCode
		}));

		alert('창고 삭제 완료');
		navigate('/regist/storage/list', { replace: true});
		window.location.reload();
	}

	return (
		<div>
			<div>
				<div>
					<h4>창고수정</h4>
					{storage &&
						<div>
							<Table>
								<tbody>
									<tr>
										<th>창고코드</th>
										<td>{ storage.storageCode }</td>
									</tr>
									<tr>
										<th>창고명</th>
										<td>
											<input
												name='storageName'
												value={ (modifyMode ? form.storageName : storage.storageName) || ''}
												onChange={ onChangeHandler }
												readOnly={ modifyMode ? false : true }
												style={ modifyMode ? {border: 'none', textAlign: 'center', color: 'gray'} : { border: 'none', background: 'transparent', textAlign: 'center'} }
											/>
										</td>
									</tr>
									<tr>
										<th>창고유형</th>
										<td>
											<label><input style={{textAlign: 'left'}} type="radio" name="storageType" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (modifyMode ? form.storageType : storage.storageType) === '창고' ? true : false } value="창고" /> 창고</label>
											<label><input style={{textAlign: 'right'}} type="radio" name="storageType" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (modifyMode ? form.storageType : storage.storageType) === '공장' ? true : false } value="공장" /> 공장</label>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
					}
					<div>
						{!modifyMode && <MainButton onClick={ onClickModifyModeHandler } > 수정 </MainButton> }
						{ modifyMode && <MainButton onClick={ onClickStorageUpdateHandler } > 저장 </MainButton>}
						<SubButton onClick={ onClickStorageDeleteHandler }> 삭제 </SubButton>
					</div>

				</div>
			</div>
		</div>
	);
}

export default StorageDetail;
