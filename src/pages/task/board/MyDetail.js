import "../../../css/boardRegistStyle.css";
import { Table, SubButton,MainButton,FormatDate} from '../../../components/ThemeColor'
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  callBoardDetailAPI,
  callBoardUpdateAPI,
} from "../../../apis/BoardAPICalls";

function MyBoardDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const boardDetail = useSelector((state) => state.boardReducer);

  const [modifyMode, setModifyMode] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  

  useEffect(() => {
    console.log("[BoardUpdate] boardCode : ", params.boardCode);

    dispatch(
      callBoardDetailAPI({
        boardCode: params.boardCode,
      })
    );
  }, []);


  const onClickModifyModeHandler = () => {
    // 수정모드
    setModifyMode(true);
    setForm({
      boardCode: boardDetail.boardCode,
      boardTitle: boardDetail.boardTitle,
      boardDate: boardDetail.boardDetail,
      boardContent: boardDetail.boardContent,
      noticeYn: boardDetail.noticeYn,
      expireDate: boardDetail.expireDate,
      boardPwd: boardDetail.boardPwd,
      anonymousYn: boardDetail.anonymousYn,
      oldFileName: boardDetail.oldFileName,
      newFileName: boardDetail.newFileName,
      boardDiv: boardDetail.boardDiv,
    });
  };

  /* form 데이터 세팅 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickBoardUpdateHandler = () => {
    console.log("[BoardUpdate] onClickBoardUpdateHandler");

    const formData = new FormData();
    formData.append("boardCode", form.boardCode);
    formData.append("boardTitle", form.boardTitle);
    formData.append("boardContent", form.boardContent);
    formData.append("noticeYn", form.noticeYn);
    formData.append("boardPwd", form.boardPwd);
    formData.append("anonymousYn", form.anonymousYn);
    formData.append("oldFileName", form.oldFileName);
    formData.append("newFileName", form.newFileName);
    formData.append("boardDiv", form.boardDiv);

    if(form.boardDate) {
      formData.append("boardDate", new Date(form.boardDate));
    }
    if(form.expireDate) {
      formData.append("expireDate", new Date(form.expireDate));
    }

    dispatch(
      callBoardUpdateAPI({
        // 상품 정보 업데이트
        form: formData,
      })
    );
    console.log(form);

    alert("게시판을 수정했습니다.");
    navigate("/task/board/MyList", { replace: true });
  };

   /* 첨부파일 열기 */
   const fileView = () => {
    window.open(boardDetail.newFileName)
  }



  /* 수정모드 배경색상*/
  const detailInputStyle = !modifyMode ? { backgroundColor: '#E8EBE7' } : {};

  return (
    <div className="boardregist">
      {boardDetail && (
        <div>
          <h3>게시글 수정</h3>
          <Table border={1}>
          
            <tr className="board">
              <th>게시판 구분</th>
              <td>
                  <label>
                <input
                  type="radio"
                  name="boardDiv"
                  placeholder="게시판 구분"
                  checked={
                    (!modifyMode ? boardDetail.boardDiv : form.boardDiv) == "자유게시판"? true : false
                  }
                  value="자유게시판"
                  onChange={onChangeHandler}
                  readOnly={modifyMode ? false : true}
                  style={!modifyMode ? { backgroundColor: "gray" } : null}
                />신고</label>&nbsp;
                <label>
                 <input
                  type="radio"
                  name="boardDiv"
                  placeholder="게시판 구분"
                  checked={
                    (!modifyMode ? boardDetail.boardDiv : form.boardDiv) == "공지게시판"? true : false
                  }
                  value="공지게시판"
                  onChange={onChangeHandler}
                  readOnly={modifyMode ? false : true}
                  style={!modifyMode ? { backgroundColor: "gray" } : null}
                />자유게시판</label>
              </td>

              <th>공지 설정</th>
              <td>
                <label>
                  <input
                    type="radio"
                    name="noticeYn"
                    onChange={onChangeHandler}
                    readOnly={modifyMode ? false : true}
                    checked={
                      (!modifyMode ? boardDetail.noticeYn : form.noticeYn) ==
                      "공지"
                        ? true
                        : false
                    }
                    value="공지"
                  />{" "}
                  공지{" "}
                </label>{" "}
                &nbsp;
                <label>
                  <input
                    type="radio"
                    name="noticeYn"
                    onChange={onChangeHandler}
                    readOnly={modifyMode ? false : true}
                    checked={
                      (!modifyMode ? boardDetail.noticeYn : form.noticeYn) ==
                      "비공지"
                        ? true
                        : false
                    }
                    value="비공지"
                  />{" "}
                  비공지
                </label>{" "}
                &nbsp;
              </td>
            </tr>
            <tr className="writer">
              <th>작성자</th>
              <td>
                {boardDetail.emp?.empName}
              </td>
             
              <th>게시 종료일</th>
              <td>
                {FormatDate(boardDetail.expireDate)}
              </td>
            </tr>
            <tr className="title1">
              <th>제목</th>
              <td colSpan={4}>
                <input
                  style={{ width: '90%', display:"flex", ...detailInputStyle ,padding:10}}
                  type="text"
                  name="boardTitle"
                  placeholder="제목을 입력하세요"
                  value={
                    (!modifyMode ? boardDetail.boardTitle : form.boardTitle) ||
                    ""
                  }
                  onChange={onChangeHandler}
                  readOnly={modifyMode ? false : true}
                />
              </td>
            </tr>
            <tr className="detail1">
              <th>내용</th>
              <td colSpan={4}>
                  <textarea style={{ width: 900, ...detailInputStyle }}
                  name="boardContent"
                  rows={20}
                  placeholder="내용을 입력하세요"
                  value={
                    (!modifyMode
                      ? boardDetail.boardContent
                      : form.boardContent) || ""
                  }
                  onChange={onChangeHandler}
                  readOnly={modifyMode ? false : true}
                />
              </td>
            </tr>
          </Table>
          <div className="myListBut.">
            {!modifyMode && (
              <MainButton onClick={onClickModifyModeHandler}>수정모드</MainButton>
              )}
            {modifyMode && (
              <MainButton onClick={onClickBoardUpdateHandler}>게시판 수정 저장하기
              </MainButton>
            )}
            <SubButton onClick={() => navigate(-1)}>돌아가기</SubButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBoardDetail;
