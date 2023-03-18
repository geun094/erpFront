import { Table, Div, MainButton, SubButton } from '../../../components/ThemeColor';
import ApprovalStyle from '../../../css/Approval.module.css';
import on from '../../../images/on.png';
import off from '../../../images/off.png';
import waiting from '../../../images/waiting.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ApprovalTable from '../../../components/task/ApprovalTable';
import ApprovalLineList from '../../../components/task/ApprovalLineList';
import { callWaitingProcessListAPI, callDoneProcessListAPI, callApprovalsDeleteAPI } from '../../../apis/ApprovalAPICalls';
import { callApprovalLineAPI } from '../../../apis/ApprovalLineAPICalls';

function DoneList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLineClicked, setIsLineClicked] = useState(false);
  const isViewer = true;

  const approvals = useSelector(state => state.approvalReducer);
  const loginInfo = useSelector(state => state.loginReducer);
  const approvalList = approvals.data;
  const pageInfo = approvals.pageInfo;

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  };

  useEffect(
    () => {
      dispatch(callDoneProcessListAPI({
        currentPage: currentPage,
        empCode: loginInfo.empCode
      }));
    }
    , [currentPage, loginInfo.empCode]
  );

  /* 승인 대기중인 서류 조회 */
  const waitingProcessHandler = () => {
    navigate('/task/approval/waiting')
  }

  /* 결재라인 테이블 토글 */
  const onLineOpenHandler = () => {
    setIsLineClicked(true);
  };
  const onLineCloseHandler = () => {
    setIsLineClicked(false);
  };

  return (
    <div className={ApprovalStyle.outlet}>
      <h3>승인 완료된 결재</h3>
      <div className={ApprovalStyle.approvalInfo}>
        <div>
          <img src={waiting} className={ApprovalStyle.approvalImg} />
          <p>내가 승인했던 기안서 목록을 표시합니다.</p>
        </div>
        <MainButton onClick={waitingProcessHandler}>대기중인 결재 보기</MainButton>
      </div>

      <ApprovalTable approvalList={approvalList} setIsLineClicked={setIsLineClicked} isViewer={isViewer}/>

      <div className={ApprovalStyle.paging}>
        {Array.isArray(approvalList) &&
          <SubButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage == 1}
          > &lt; </SubButton>
        }
        {pageNumber.map((num) => (
          <li key={num} onClick={() => setCurrentPage(num)}>
            {currentPage === num ? (<MainButton>{num}</MainButton>) :
              (<SubButton>{num}</SubButton>)}
          </li>
        ))}
        {Array.isArray(approvalList) &&
          <SubButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
          > &gt; </SubButton>
        }
      </div>
      
      <div>
        <div className={ApprovalStyle.toggle}>
          <div>
            {(isLineClicked) ?
              <img src={on} onClick={onLineCloseHandler} /> :
              <img src={off} onClick={onLineOpenHandler} />}
            <p>행을 클릭하여 결재 라인을 확인하세요.</p>
          </div>
        </div>
        {isLineClicked && <ApprovalLineList />}
      </div>
    </div>
  );
}

export default DoneList;