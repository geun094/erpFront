import "../../../css/boardListStyle.css";
import boardNotice from '../../../images/boardNotice.png';
import { Table, MainButton, SubButton ,FormatDate} from '../../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {
  callBoardSearchAPI
} from '../../../apis/BoardAPICalls';


function BoardSearch() {

  const { search } = useLocation();
	const { value } = queryString.parse(search);
  const [isTrue, setIsTrue] = useState(false);
	const navigate = useNavigate();

	const boards = useSelector(state => state.boardReducer); 

	const dispatch = useDispatch();
  

  useEffect(() => {
		dispatch(callBoardSearchAPI({
			search: value
		}));        
	},
	[]);

  /* 체크 선택 핸들러 */
  const onSelectHandler = (e) => {
    setIsTrue(false);
    const input = document.getElementsByTagName('input');
    for(var i = input.length-1; i >= 0; i--) {
      if(input[0].checked === true) {
        input[i].checked = true;
      } else {
        input[i].checked = false;
      }
    }
  }

  const onClickTableTr = (boardCode) => {
		navigate(`/task/board/detail/${boardCode}`, { replace : false });
	}

 

  return(
    <div className="boardlist">
      <h3>게시글 조회</h3>
      <Table border={1}>
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
        { boards.length > 0 && boards.map((board) => (
              <tr key={board.boardCode} className="boardCode" title="상세페이지로 이동합니다.">
                <td
                  className="boardCode"
                  onClick={() => onClickTableTr(board.boardCode)}
                >
                  {board.boardCode}
                </td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{ (board.noticeYn === "공지") ? <img src={boardNotice} style={{width:15, height:15}}/> : ''}{board.boardTitle}</td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{board.newFileName === null ? "참부파일 없습니다.":board.oldFileName}</td>
                <td onClick={() => onClickTableTr(board.boardCode)}>
                  {board.anonymousYn === "익명" ? "***" : board.emp?.empName}
                </td>
                <td onClick={() => onClickTableTr(board.boardCode)}>{FormatDate(board.boardDate)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="myListBut">
      <SubButton onClick={() => navigate(-1)}>돌아가기</SubButton>
      </div>
    </div>
  )
}

export default BoardSearch;