import "../../../css/boardListStyle.css";
import { Table, MainButton, SubButton } from '../../../components/ThemeColor'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  callTodoDetailAPI,
  callTodoUpdateAPI
} from '../../../apis/TodoAPICalls';


function TodoDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const todoDetail = useSelector((state) => state.todoReducer);
  const navigate = useNavigate();
  const [form, setForm] = useState({})
  const [modifyMode, setModifyMode] = useState(false);

  useEffect(() => {
    console.log("[TodoUpdate] todoCode : ", params.todoCode);

    dispatch(
      callTodoDetailAPI({
        todoCode: params.todoCode,
      })
    );
  }, []);

  const onClickModifyModeHandler = () => {
    // 수정모드
    setModifyMode(true);
    setForm({
      todoCode: todoDetail.todoCode,
      todoDate: todoDetail.todoDate,
      todoDeadline: todoDetail.todoDeadline,
      todoContent: todoDetail.todoContent,
      completeYn: todoDetail.completeYn,
    });
  };

  /* form 데이터 세팅 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickTodoUpdateHandler = () => {
    console.log("[TodoUpdate] onClickTodoUpdateHandler");

    const formData = new FormData();
    formData.append("todoCode", form.todoCode);
    formData.append("todoContent", form.todoContent);
    formData.append("completeYn", form.completeYn);

    if (form.todoDate) {
      formData.append("todoDate", new Date(form.todoDate));
    }
    if (form.todoDeadline) {
      formData.append("todoDeadline", new Date(form.todoDeadline));
    }



    dispatch(
      callTodoUpdateAPI({
        // 상품 정보 업데이트
        form: formData,

      })
    );
    console.log(form);

    alert("업무을 수정했습니다.");
    navigate("/task/todo/list", { replace: true });
  };

  
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

 /* 수정모드 배경색상*/
 const detailInputStyle = !modifyMode ? { backgroundColor: '#E8EBE7' } : {};
  return (
    <div className="boardlist">
      {todoDetail && (
        <>
          <h3>업무세상</h3>
          <Table border={1}>
            <thead>
              <tr>
                <th>완료여부</th>
                <th>업무내용</th>
                <th>마감일자</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="completeYn"
                      placeholder="업무상태"
                      checked={
                        (!modifyMode ? todoDetail.completeYn : form.completeYn) == "완료" ? true : false
                      }
                      value="완료"
                      onChange={onChangeHandler}
                      readOnly={modifyMode ? false : true}
                    />완료</label>&nbsp;
                  <label>
                    <input
                      type="radio"
                      name="completeYn"
                      placeholder="업무상태"
                      checked={
                        (!modifyMode ? todoDetail.completeYn : form.completeYn) == "미완료" ? true : false
                      }
                      value="미완료"
                      onChange={onChangeHandler}
                      readOnly={modifyMode ? false : true}
                    />미완료</label>
                </td>
                <td>
                  <input
                    type="text"
                    style={{width: '90%', display:"flex", ...detailInputStyle}}
                    name="todoContent"
                    placeholder="내용을 입력하세요"
                    value={
                      (!modifyMode
                        ? todoDetail.todoContent
                        : form.todoContent) || ""
                    }
                    onChange={onChangeHandler}
                    readOnly={modifyMode ? false : true}
                  />
                </td>
                <td>
                {!modifyMode ? (
                  formatDate(todoDetail.todoDeadline)
                ) : (
                  <input
                    style={!modifyMode ? { backgroundColor: "gray" } : null}
                    name="todoDeadline"
                    placeholder="마감일자"
                    value={form.todoDeadline}
                    type="date"
                    onChange={onChangeHandler}
                  />
                )}
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="myListBut">
            {!modifyMode && (
              <MainButton onClick={onClickModifyModeHandler}>수정모드</MainButton>
              )}
            {modifyMode && (
              <MainButton onClick={onClickTodoUpdateHandler}>
                업무 수정 저장하기
              </MainButton>
            )}
            <SubButton onClick={() => navigate(-1)}>돌아가기</SubButton>
          </div>
        </>

      )}

    </div>
  );
}

export default TodoDetail;