import "../../../css/boardRegistStyle.css";
import { Table, MainButton,FormatDate} from '../../../components/ThemeColor'
import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  callBoardDetailAPI,
} from "../../../apis/BoardAPICalls";

function BoardUpdate() {
  const dispatch = useDispatch();
  const params = useParams();
  const boardDetail = useSelector((state) => state.boardReducer);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[BoardUpdate] boardCode : ", params.boardCode);

    dispatch(
      callBoardDetailAPI({
        boardCode: params.boardCode,
      })
    );
    
  }, []);



  /* 첨부파일 열기 */
  const fileView = () => {
    window.open(boardDetail.newFileName)
  }

  return (
    <div className="boardregist">
      {boardDetail && (
        <div>
          <h3>게시글 상세</h3>
          <Table border={1}>
            <tr className="board">
              <th>게시판 구분</th>
              <td>
                {boardDetail.boardDiv}
              </td>
              <th>공지 설정</th>
              <td>
                {boardDetail.noticeYn}
              </td>
            </tr>
            <tr className="writer">
              <th>작성자</th>
              <td>
                {boardDetail.anonymousYn === "익명"
                  ? "***"
                  : boardDetail.emp?.empName}
              </td>
              <th>게시 종료일</th>
              <td>{FormatDate(boardDetail.expireDate)}</td>
            </tr>
            <tr className="title1">
              <th>제목</th>
              <td colSpan={4}>{boardDetail.boardTitle}</td>
            </tr>
            <tr className="detail">
              <th>내용</th>
              <td colSpan={4}><textarea style={{ width: 900, height:400,display:"flex" ,padding:10}} value={boardDetail.boardContent}></textarea></td>
            </tr>
            <tr className="file">
              <th>첨부파일</th>
              <td colSpan={4}>
              {(boardDetail.oldFileName) ?
                      <p onClick={fileView}>{boardDetail?.oldFileName}</p> :
                      <p style={{ color: 'gray' }}>첨부파일 없음</p>}
              </td>
            </tr>
          </Table>
          <div className="myListBut">
            <MainButton onClick={() => navigate(-1)}>돌아가기</MainButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardUpdate;
