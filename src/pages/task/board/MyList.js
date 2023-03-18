
import "../../../css/boardListStyle.css";
import boardNotice from '../../../images/boardNotice.png';
import { Table, MainButton, SubButton,FormatDate } from '../../../components/ThemeColor'
import { useNavigate , useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { callMyListAPI, callBoardDetailAPI} from "../../../apis/BoardAPICalls";

function MyBoardList() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardReducer);
  const MyBoardList = boards.data;
  const navigate = useNavigate();
  const pageInfo = boards.pageInfo;
  const loginInfo = useSelector(state => state.loginReducer);
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
      callMyListAPI({
        currentPage: currentPage,
        empCode:loginInfo.empCode
      })
    );
  }, [loginInfo.empCode,currentPage]);


  
  /* 수정 */
  const onClickTableTr = (boardCode) => {
    dispatch(
      callBoardDetailAPI({
        boardCode: boardCode,
      })
    );
    navigate(`/task/board/myDetail/${boardCode}`, { replace: false });
  };

  


  return (
  <div className="boardlist">

      <h3>내 게시판</h3>
      <div className="myListBut">
      <SubButton onClick={() => navigate(-1)}>돌아가기</SubButton>
      </div>
      <div className="tableHeight">
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>참부파일</th>
            <th>작성자</th>
            <th>게시일자</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(MyBoardList) &&
            MyBoardList.map((board) => (
              <tr key={board.boardCode}  className="boardCode" title="수정페이지으로 이동합니다.">
                <td  onClick={() => onClickTableTr(board.boardCode)}>{board.boardCode}</td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{ (board.noticeYn === "공지") ? <img src={boardNotice} style={{width:15, height:15}}/> : ''}{board.boardTitle}</td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{board.newFileName === null ? "참부파일 없습니다.":board.oldFileName}</td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{board.emp?.empName}</td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{FormatDate(board.boardDate)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      </div>
      
      <div className="pageButton">
        {Array.isArray(MyBoardList) && (
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
        {Array.isArray(MyBoardList) && (
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

export default MyBoardList;
