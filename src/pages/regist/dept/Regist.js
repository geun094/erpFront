import { Table, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor';
import DeptStyle from '../../../css/DeptList.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callDeptRegistAPI } from '../../../apis/DeptAPICalls';
import { callDeptCodesAPI } from '../../../apis/DetailAPICalls';

function DeptRegist() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deptCodes = useSelector(state => state.detailReducer);
  const lastNum = Math.max.apply(null,deptCodes) + 1;

  useEffect(        
		() => {
			dispatch(callDeptCodesAPI()); 
		}
	,[]);

  const [form, setForm] = useState({
    deptCode: 0,
    deptName: '',
    deptSalary: 0
  });

  /* 입력 핸들러 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  /* 저장 버튼 핸들러 */
  const onDeptSaveHandler = () => {
    console.log('[DeptRegist] onDeptSaveHandler')
    if(!form.deptCode || !form.deptName || !form.deptSalary) {
      alert('값을 모두 입력해주세요.');
      return false;
    }
    if(deptCodes.includes(Number(form.deptCode))) {
      const answer = window.confirm('이미 존재하는 부서코드입니다. 수정으로 진행할까요?')
      if(answer !== true) {
        return false;
      }
    }
    const formData = new FormData();
    formData.append("deptCode", form.deptCode);
    formData.append("deptName", form.deptName);
    formData.append("deptSalary", form.deptSalary);
    dispatch(callDeptRegistAPI({
      form: formData
    }));
    alert('부서 등록 완료');
    navigate('/regist/dept/list', {replace:true});
    window.location.reload();
  }

  return (
    <div className={DeptStyle.deptRegist}>
      <h4>부서등록</h4>
      <Div>
        <table>
          <tbody>
            <tr>
              <td>부서코드</td>
              <td>
                <input 
                  type='number' 
                  name='deptCode'
                  placeholder={lastNum}
                  onChange={ onChangeHandler }
                />
              </td>
            </tr>
            <tr>
              <td>부서명</td>
              <td>
                <Input 
                  type='text'
                  name='deptName'
                  onChange={ onChangeHandler }
                />
              </td>
            </tr>
            <tr>
              <td>부서수당</td>
              <td>
                <Input 
                  type='number'
                  name='deptSalary'
                  onChange={ onChangeHandler }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Div>
      <div>
        <MainButton onClick={onDeptSaveHandler}>등록</MainButton>
      </div>
    </div>
  );
}

export default DeptRegist;