import { MainButton, SubButton, subButton } from '../../../components/ThemeColor';
import Detail from '../../../pages/task/approval/Detail';
import ApprovalStyle from '../../../css/Approval.module.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callUpdateAprroveYnAPI } from '../../../apis/ApprovalLineAPICalls';
import { callRejectApprovalAPI } from '../../../apis/ApprovalAPICalls';

function SignOff() {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const approvalDetail = useSelector(state => state.approvalReducer);
  const approvalLine = useSelector(state => state.approvalLineReducer);
  const loginInfo = useSelector(state => state.loginReducer);

  const signOffOnApproval = () => {
    console.log(params.approvalCode);

    dispatch(callUpdateAprroveYnAPI({
      approvalCode: params.approvalCode,
      empCode: loginInfo.empCode
    }));
    window.location.reload();
    // navigate('/task/approval/done');
  }

  const onRejectionHandler = (docType) => {
    const answer = window.confirm(`해당 ${docType}를 정말 반려하시겠습니까?`);
    if(answer) {
      dispatch(callRejectApprovalAPI({
        approvalCode: params.approvalCode
      }));
      alert('반려되었습니다.')
    } else {
      return false;
    }
    navigate('/task/approval/list');
  }

  const onDoneListHandler = () => {
    navigate('/task/approval/done');
  }

  return (
    <div className={ApprovalStyle.signoff}>
      <h3>승인하기</h3>
      <Detail/>
      <MainButton onClick={signOffOnApproval}>승인</MainButton>
      <SubButton onClick={ () => onRejectionHandler(approvalDetail.docType)}>반려</SubButton>
      <MainButton onClick={() => {navigate(-1)}}>뒤로가기</MainButton>
      <SubButton onClick={onDoneListHandler}>완료 목록 보러가기</SubButton>

      {/* <button onClick={test}>테스트</button> */}
    </div>
  );
}

export default SignOff;