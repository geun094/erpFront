import { Table, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor'

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callStorageRegistAPI } from '../../../apis/StorageAPICalls'

function StorageRegist() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		storageName: '',
		storageType: ''
	});

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	/* regist Handler */
	const onClickStorageRegistHandler = () => {
		console.log('[StorageRegist] onClickStorageRegistHandler');

		const formData = new FormData();
		formData.append("storageName", form.storageName);
		formData.append("storageType", form.storageType);

		dispatch(callStorageRegistAPI({
			form: formData
		}));
		alert('창고 등록 완료');
		navigate('/regist/storage/list', {replace:true});
		window.location.reload();
	}

	return (
		<div>
			<h4>창고등록</h4>
			<div>
				<Table>
					
					<tbody>
					
						<tr>
								<th>창고명</th>
							<td>
								<input
									name='storageName'
									placeholder='창고명'
									onChange={ onChangeHandler }
									style={{border:"none"}}
								/>
							</td>
						</tr>

						<tr>
								<th>창고유형</th>
							<td>
								<label><input type="radio" name="storageType" onChange={ onChangeHandler } value="창고"/> 창고</label> &nbsp;
								<label><input type="radio" name="storageType" onChange={ onChangeHandler } value="공장"/> 공장</label>
							</td>
						</tr>

					</tbody>
				</Table>
			</div>

			<div>
				<MainButton	className='mainButton' onClick={ onClickStorageRegistHandler }>	등록 </MainButton>
			</div>
		</div>
	)
}
export default StorageRegist;