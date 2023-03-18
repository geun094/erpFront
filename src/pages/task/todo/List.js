import "../../../css/boardListStyle.css";
import { Table, MainButton, SubButton,FormatDate } from '../../../components/ThemeColor'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callTodoListAPI ,callTodoDetailAPI} from "../../../apis/TodoAPICalls";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer);
  const loginInfo = useSelector(state => state.loginReducer);
  const todoList = todos.data;
  const navigate = useNavigate();
  const pageInfo = todos.pageInfo;
  const [search, setSearch] = useState('');
  

  const [currentPage, setCurrentPage] = useState(1);

 

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }


  /* 전체 조회 */
  useEffect(() => {
    dispatch(
      callTodoListAPI({
        currentPage: currentPage,
        empCode:loginInfo.empCode
      })
    );
  }, [loginInfo.empCode, currentPage]);



    /* 등록 */
    const onClickTodoRegist = () => {
      console.log("[TodoRegist] onClickTodoRegist");
      navigate("/task/todo/regist", { replace: false });
    };

    
  /* 수정 */
  const onClickTableTr = (todoCode) => {
    dispatch(
      callTodoDetailAPI({
        todoCode: todoCode,
      })
    );
    navigate(`/task/todo/detail/${todoCode}`, { replace: false });
  };

   /* 검색 */

   const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onEnterkeyHandler = (e) => {
    if (e.key == "Enter") {
      console.log("Enter key", search);
      navigate(`/task/todo/search?value=${search}`, { replace: false });
      window.location.reload();
    }
  };


  /* 완료리스트 페이지 */ 

  const onClickCompleteList = () => {
    navigate("/task/todo/completeList", { replace: false });

  }
  /* 현재 날짜 */
  let today = new Date();
  

  return (
    <div className="boardlist">
      <h3>업무 조회</h3>
      <div className="in">
        <input
          type='text'
          placeholder="완료여부으로 검색"
          value={search}
          onKeyUp={onEnterkeyHandler}
          onChange={onSearchChangeHandler}
        />
      <MainButton onClick={onClickTodoRegist}>등록</MainButton>
      </div>
      <div className="tableHeight">
      <Table>
        <thead>
          <tr>
            <th>게시일자</th>
            <th>업무내용</th>
            <th>마감일자</th>
            <th>완료여부</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(todoList) &&
            todoList.map((todo) => (
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
      </div>
      <div className="pageButton">
        {Array.isArray(todoList) && (
          <SubButton
            className="activeButton"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </SubButton>
        )}

        {pageNumber.map((num) => (
          <li key={num} onClick={() => setCurrentPage(num)}>
            {currentPage === num ? (
              <MainButton>{num}</MainButton>
            ) : (
              <SubButton>{num}</SubButton>
            )}
          </li>
        ))}
        {Array.isArray(todoList) && (
          <SubButton
            className="activeButton"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
          >
            &gt;
          </SubButton>
        )}
      </div>
    </div>
  );
}

export default TodoList;
