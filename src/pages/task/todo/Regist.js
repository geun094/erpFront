import "../../../css/boardListStyle.css";
import { Table, MainButton, SubButton } from '../../../components/ThemeColor'

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callTodoRegistAPI } from '../../../apis/TodoAPICalls';




function TodoRegist() {

  const dispatch = useDispatch();
	const navigate = useNavigate();
  const loginInfo = useSelector(state => state.loginReducer);

    const [form, setForm] = useState({
        todoContent: '',
        completeYn: '',
        todoDeadline: ''
    });

    

    const onChangeHandler = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    };
  
      /* 등록 핸들러 */
    const onClickTodoRegistHandler = () => {
      console.log('[TodoRegist] onClickTodoRegistHandler');
  
      const formData = new FormData();
  
      formData.append("todoContent", form.todoContent);
      formData.append("completeYn", form.completeYn);
  
      if(form.todoDate) {
        formData.append("todoDate", new Date(form.todoDate));
      }
      if(form.todoDeadline) {
        formData.append("todoDeadline", new Date(form.todoDeadline));
      }
  
      dispatch(callTodoRegistAPI({
        form: formData,
        empCode:loginInfo.empCode
      }));
  
      console.log(form)
      alert('업무 등록 완료');
      navigate('/task/todo/list', {replace:true});
      window.location.reload();
    }
  
  
  return (
    <div className="boardlist">
    <h3>업무등록</h3>
    <Table border={1}>
    <thead style={{ backgroundColor: '#266666', color: '#ffffff'}}>
    <tr>
        <th>업무내용</th>
        <th>업무상태</th>
        <th>종료일자</th>
    </tr>
  </thead>
        <tr>
            <td>
                <input
                   name="todoContent"
                   placeholder="업무내용"
                   onChange={ onChangeHandler }
                  
                />
            </td>
            <td>
              <label><input type="radio" name="completeYn" onChange={ onChangeHandler } value="미완료" /> 미완료 </label> &nbsp;
              <label><input type="radio" name="completeYn" onChange={ onChangeHandler } value="완료"/> 완료</label>
            </td>
            <td>
                <input
                   name="todoDeadline"
                   type="date"
                   placeholder="완료일자"
                   onChange={ onChangeHandler }
                   value={form.todoDeadline}
                />
            </td>
        </tr>
    </Table>
    <div className="myListBut">
    <MainButton	className='mainButton' onClick={ onClickTodoRegistHandler }> 저장</MainButton>
    <SubButton className='subButton' onClick = { () => navigate(-1) }> 돌아가기 </SubButton>
    </div>
</div>
  );
}

export default TodoRegist;