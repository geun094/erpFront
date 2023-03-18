import { SubButton, MainButton } from '../../../components/ThemeColor';
import ApprovalStyle from '../../../css/Approval.module.css';
import on from '../../../images/on.png';
import off from '../../../images/off.png';
import waiting from '../../../images/waiting.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ApprovalTable from '../../../components/task/ApprovalTable';
import ApprovalLineList from '../../../components/task/ApprovalLineList';
import { callWaitingProcessListAPI } from '../../../apis/ApprovalAPICalls';
import { decodeJwt } from '../../../utils/tokenUtils';

function WaitingList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLineClicked, setIsLineClicked] = useState(false);
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const isApprover = true;

  const approvalList = useSelector(state => state.approvalReducer);

  useEffect(
    () => {
      dispatch(callWaitingProcessListAPI({
        empCode: token.sub
      }));
    }
    , []
  );

  /* 내가 승인했던 서류 조회 */
  const doneProcessHandler = () => {
    navigate('/task/approval/done')
  }

  /* 결재라인 테이블 토글 */
  const onLineOpenHandler = () => {
    setIsLineClicked(true);
  };
  const onLineCloseHandler = () => {
    setIsLineClicked(false);
  };

  // const test = () => {
  //   console.log(approvals)
  // }

  return (
    <div className={ApprovalStyle.outlet}>
      <h3>대기중인 결재</h3>

      <div className={ApprovalStyle.approvalInfo}>
        <div>
          <img src={waiting} className={ApprovalStyle.approvalImg} />
          <p>나의 승인을 기다리는 기안서가 <span style={{ color: 'red' }}>{(approvalList) ? approvalList.length : ''}</span>개 있습니다.</p>
        </div>
        <SubButton onClick={doneProcessHandler}>결재완료 서류보기</SubButton>
      </div>

      <ApprovalTable approvalList={approvalList} setIsLineClicked={setIsLineClicked} isApprover={isApprover} />

      <div>
        <div className={ApprovalStyle.toggle}>
          <div>
            {(isLineClicked) ?
              <img src={on} onClick={onLineCloseHandler} /> :
              <img src={off} onClick={onLineOpenHandler} />}
            <p>행을 클릭하여 결재 라인을 확인하세요.</p>
          </div>
        </div>
        {isLineClicked &&
          <ApprovalLineList />
        }
      </div>

      {/* <button onClick={test}>테스트</button> */}
    </div>
  );
}

export default WaitingList;