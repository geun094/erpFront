import { SubButton, MainButton } from '../../../components/ThemeColor';
import ApprovalStyle from '../../../css/Approval.module.css';
import draft from '../../../images/draft.png';
import pen from '../../../images/pen.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callMyDraftListAPI, callApprovalsDeleteAPI } from '../../../apis/ApprovalAPICalls';
import ApprovalTable from '../../../components/task/ApprovalTable';
import { decodeJwt } from '../../../utils/tokenUtils';

function ApprovalDraft() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const approvals = useSelector(state => state.approvalReducer);
  const approvalList = approvals.data;
  const pageInfo = approvals.pageInfo;
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const [currentPage, setCurrentPage] = useState(1);
  const isWriter = true;

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  };

  useEffect(
    () => {
      dispatch(callMyDraftListAPI({
        currentPage: currentPage,
        empCode: token.sub                      // token으로 변경 필요
      }));
    }
    , [currentPage]
  );
  
  /* 삭제 버튼 핸들러 */
  const onDeleteHandler = () => {
    const selectedApproval = document.getElementsByClassName('check');
    const approvalCodes = [];
    for (var i = selectedApproval.length - 1; i >= 0; i--) {
      if (selectedApproval[i].checked === true) {
        if (selectedApproval[i].parentElement.nextElementSibling.innerHTML !== "기안일시") {
          const num = selectedApproval[i].parentElement.parentElement.lastChild.innerHTML;
          approvalCodes.push(Number(num));
          console.log(approvalCodes);
        }
      }
    }
    if (approvalCodes.length > 0) {
      const answer = window.confirm(approvalCodes + '번 결재를 정말 삭제하시겠습니까?');
      if (answer === true) {
        dispatch(callApprovalsDeleteAPI({ approvalCodes }));
        window.location.reload();
      } else {
        return false;
      }
    } else {
      alert('삭제할 결재를 선택해주세요.');
    }
  }

  /* 수정 버튼 핸들러 */
  const onModifyHandler = () => {
    const selectedApproval = document.getElementsByClassName('check');
    const approvalCodes = [];
    for (var i = selectedApproval.length - 1; i >= 0; i--) {
      if (selectedApproval[i].checked === true) {
        if (selectedApproval[i].parentElement.nextElementSibling.innerHTML !== "기안일시") {
          const num = selectedApproval[i].parentElement.parentElement.lastChild.innerHTML;
          approvalCodes.push(Number(num));
          console.log(approvalCodes);
        }
      }
    }
    if (approvalCodes.length === 1) {
      navigate(`/task/approval/modify/${approvalCodes[0]}`, { replace: false });
    } else if (approvalCodes.length <= 0) {
      alert('문서를 선택해주세요.')
    } else {
      alert('하나의 문서만 선택해주세요.')
    }
  }

  /* 작성하기 버튼 핸들 */
  const onNewWriteHandler = () => {
    navigate('/task/approval/regist');
  }
  

  return (
    <div className={ApprovalStyle.outlet}>
      <h3>임시저장 문서</h3>
      <div className={ApprovalStyle.draftInfo}>
        <img src={draft} className={ApprovalStyle.approvalImg} />
        <p>임시저장된 문서 보관함입니다.</p>
      </div>
      
      <ApprovalTable approvalList={approvalList} isWriter={isWriter}/>
      
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

      <div className={ApprovalStyle.newWrite}>
        <div>
          <MainButton onClick={onDeleteHandler}>삭제</MainButton>
          <SubButton onClick={onModifyHandler}>이어서 작성</SubButton>
        </div>
        <div className={ApprovalStyle.registNew}>
          <p onClick={onNewWriteHandler}>새 글 작성하기</p>
          <img src={pen} onClick={onNewWriteHandler}/>
        </div>
      </div>
    </div>
  );
}

export default ApprovalDraft;