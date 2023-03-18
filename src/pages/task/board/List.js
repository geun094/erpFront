import "../../../css/boardListStyle.css";
import { Table, MainButton, SubButton, FormatDate } from '../../../components/ThemeColor'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import boardNotice from '../../../images/boardNotice.png';


import {
  callBoardListAPI,
  callBoardDetailAPI,
} from "../../../apis/BoardAPICalls";

function BoardList() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardReducer);
  const boardList = boards.data;
  const navigate = useNavigate();
  const pageInfo = boards.pageInfo;


  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }


  /* 전체 조회 */
  useEffect(() => {
    dispatch(
      callBoardListAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]);

  /* 수정 */
  const onClickTableTr = (boardCode) => {
    dispatch(
      callBoardDetailAPI({
        boardCode: boardCode,
      })
    );
    navigate(`/task/board/detail/${boardCode}`, { replace: false });
  };

  const onClickBoardInsert = () => {
    console.log("[BoardList] onClickBoardInsert");
    navigate("/task/board/regist", { replace: false });
  };

  const onClickMyList = () => {
    navigate("/task/board/myList", { replace: false });
  };

  /* 검색 */

  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onEnterkeyHandler = (e) => {
    if (e.key == "Enter") {
      console.log("Enter key", search);
      navigate(`/task/board/search?value=${search}`, { replace: false });
      window.location.reload();
    }
  };

  return (
    <div className="boardlist">
      <h3>게시판보기</h3>
      <div className="in">
        <input
          type='text'
          placeholder="전체 게시글제목으로 검색"
          value={search}
          onKeyUp={onEnterkeyHandler}
          onChange={onSearchChangeHandler}
        />
        <MainButton onClick={onClickBoardInsert}>글쓰기</MainButton>
        <SubButton onClick={onClickMyList}>내글 보기</SubButton>
      </div>
      <div className="tableHeight">
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>게시글제목</th>
            <th>참부파일</th>
            <th>작성자</th>
            <th>게시일자</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(boardList) &&
            boardList.map((board) => (
              <tr key={board.boardCode} className="boardCode" title="상세페이지으로 이동합니다.">
                <td onClick={() => onClickTableTr(board.boardCode)}>{board.boardCode}</td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{ (board.noticeYn === "공지") ? <img src={boardNotice} style={{width:15, height:15}}/> : ''}{board.boardTitle} </td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{board.newFileName === null ? "참부파일 없습니다.":board.oldFileName}</td>
                <td onClick={() => onClickTableTr(board.boardCode)}>
                  {board.anonymousYn === "익명" ? "***" : board.emp?.empName}
                </td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{FormatDate(board.boardDate)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      </div>
      <div className="pageButton">
        {Array.isArray(boardList) && (
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
        {Array.isArray(boardList) && (
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

export default BoardList;
