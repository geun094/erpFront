import { Div, MainButton, SubButton } from '../../../components/ThemeColor';
import DeptStyle from '../../../css/DeptList.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callDeptModifyAPI, callDeptDeleteAPI } from '../../../apis/DeptAPICalls';

function DeptDetail() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const dept = useSelector(state => state.detailReducer);

  const [modifyMode, setModifyMode] = useState(false);
  const [form, setForm] = useState({});

  /* 클릭하여 수정모드로 전환 */
  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({
      deptCode: dept.deptCode,
      deptName: dept.deptName,
      deptSalary: dept.deptSalary
    })
  }

  /* 입력 핸들러 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  /* 저장 버튼 핸들러 */
  const onDeptModifyHandler = () => {
    if (!form.deptName || !form.deptSalary) {
      alert('값을 모두 입력해주세요.');
      return false;
    }
    console.log('[DeptDetail] onDeptModifyHandler');
    const formData = new FormData();
    formData.append("deptCode", dept.deptCode);
    formData.append("deptName", form.deptName);
    formData.append("deptSalary", form.deptSalary);
    dispatch(callDeptModifyAPI({
      form: formData
    }));
    alert('부서 수정 완료');
    navigate('/regist/dept/list', { replace: true });
    window.location.reload();
  }

  /* 삭제 버튼 핸들러 */
  const onDeptDeleteHandler = () => {
    const answer = window.confirm(dept.deptName + '(을/를) 정말 삭제하시겠습니까?');
    if (answer === true) {
      dispatch(callDeptDeleteAPI({
        deptCode: dept.deptCode
      }));
    } else {
      return false;
    }
    navigate('/regist/dept/list', { replace: true });
    window.location.reload();
  }

  return (
    <div className={DeptStyle.deptDetail}>
      <h4>상세정보</h4>
      <Div>
        <table>
          <tbody>
            <tr>
              <td>부서코드</td>
              <td>{dept.deptCode}</td>
            </tr>
            <tr>
              <td>부서명</td>
              <td>
                <input
                  type='text'
                  name='deptName'
                  value={(modifyMode ? form.deptName : dept.deptName) || ''}
                  readOnly={modifyMode ? false : true}
                  onChange={onChangeHandler}
                  className={modifyMode ? DeptStyle.active : DeptStyle.inactive}
                />
              </td>
            </tr>
            <tr>
              <td>부서수당</td>
              <td>
                <input
                  type='number'
                  name='deptSalary'
                  value={(modifyMode ? form.deptSalary : dept.deptSalary) || ''}
                  readOnly={modifyMode ? false : true}
                  onChange={onChangeHandler}
                  className={modifyMode ? DeptStyle.active : DeptStyle.inactive}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Div>

      <div className={DeptStyle.buttons}>
        {!modifyMode && <MainButton onClick={onClickModifyModeHandler} > 수정 </MainButton>}
        {modifyMode && <MainButton onClick={onDeptModifyHandler} > 저장 </MainButton>}
        <SubButton onClick={onDeptDeleteHandler}>삭제</SubButton>
      </div>

    </div>
  );
}

export default DeptDetail;