import "../../../css/boardListStyle.css";
import { Table, MainButton, SubButton ,FormatDate} from '../../../components/ThemeColor'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {callTodoSearchAPI} from '../../../apis/TodoAPICalls';


function TodoSearch() {

  const { search } = useLocation();
	const { value } = queryString.parse(search);
  const [isTrue, setIsTrue] = useState(false);
	const navigate = useNavigate();

	const todos = useSelector(state => state.todoReducer); 

	const dispatch = useDispatch();

  useEffect(() => {
    
		dispatch(callTodoSearchAPI({
			search: value
		}));        
	},
	[]);

  
  const onClickTableTr = (todoCode) => {
		navigate(`/task/todo/detail/${todoCode}`, { replace : false });
	}

  /* 시간  */
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear() % 2000;

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("/");
  }

    /* 현재 날짜 */
    let today = new Date();

  return (
    <div className="boardlist">
      <h2>업무 검색</h2>
    <Table border={1}>
        <thead>
          <tr>
            <th>게시일자</th>
            <th>업무내용</th>
            <th>마감일자</th>
            <th>완료여부</th>
          </tr>
        </thead>
        <tbody>
        { todos.length > 0 && todos.map((todo) => (
              <tr key={todo.todoCode} className="boardCode" style={{textDecoration:(todo.completeYn === "완료")? 'line-through' : 'none' ,
              color:(todo.completeYn === "미완료")&& (FormatDate(todo.todoDeadline) < FormatDate(today))? 'red':'black'}} title="수정페이지로 이동합니다.">
                <td onClick={() => onClickTableTr(todo.todoCode)}>{FormatDate(todo.todoDate)}</td>
                <td onClick={() => onClickTableTr(todo.todoCode)}>{todo.todoContent}</td>
                <td onClick={() => onClickTableTr(todo.todoCode)}>{FormatDate(todo.todoDeadline)}</td>
                <td onClick={() => onClickTableTr(todo.todoCode)}>{todo.completeYn}</td>
              </tr>
            ))}
        </tbody>
        </Table>
        <div className="myListBut">
      <SubButton onClick={() => navigate(-1)}>돌아가기</SubButton>
      </div>
      </div>
  );
}

export default TodoSearch;