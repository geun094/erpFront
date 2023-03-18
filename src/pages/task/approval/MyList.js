import { SubButton, MainButton } from '../../../components/ThemeColor';
import ApprovalStyle from '../../../css/Approval.module.css';
import searchImg from '../../../images/search.png';
import user from '../../../images/user.png';
import on from '../../../images/on.png';
import off from '../../../images/off.png';
import pen from '../../../images/pen.png';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ApprovalLineList from '../../../components/task/ApprovalLineList';
import ApprovalTable from '../../../components/task/ApprovalTable';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callApprovalsDeleteAPI, callMyApprovalListAPI } from '../../../apis/ApprovalAPICalls';

function ApprovalList() {

  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const approvals = useSelector(state => state.approvalReducer);
  const approvalList = approvals.data;
  const pageInfo = approvals.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLineClicked, setIsLineClicked] = useState(false);

  const loginInfo = useSelector(state => state.loginReducer);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  };

  useEffect(
    () => {
      dispatch(callMyApprovalListAPI({
        currentPage: currentPage,
        empCode: token.sub                 // token으로 변경 필요
      }));
    }
    , [currentPage, loginInfo.emp]
  );

  /* 결재라인 테이블 토글 */
  const onLineOpenHandler = () => {
    setIsLineClicked(true);
  };
  const onLineCloseHandler = () => {
    setIsLineClicked(false);
  };

  /* 검색 기능 */
  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  }
  const onEnterkeyHandler = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key', search);
      navigate(`/task/approval/search?value=${search}`, { replace: false });
      window.location.reload();
    }
  };
  const onSearchClickHandler = () => {
    navigate(`/task/approval/search?value=${search}`, { replace: false });
    window.location.reload();
  };

  /* 전체 리스트 보기 */
  const allApprovalHandler = () => {
    navigate('/task/approval/list')
  };

  /* 작성하기 버튼 핸들 */
  const onNewWriteHandler = () => {
    navigate('/task/approval/regist');
  }

  return (
    <div className={ApprovalStyle.outlet}>
      <h3>나의 결재목록</h3>
      <div className={ApprovalStyle.approvalInfo}>
        <div>
          <img src={user} className={ApprovalStyle.approvalImg} />
          <p>내가 작성한 결재를 관리합니다.</p>
        </div>
        <SubButton onClick={allApprovalHandler}>전체 결제 보기</SubButton>
      </div>

      <ApprovalTable approvalList={approvalList} setIsLineClicked={setIsLineClicked} />

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
          <div className={ApprovalStyle.registNew}>
            <p onClick={onNewWriteHandler}>새 글 작성하기</p>
            <img src={pen} onClick={onNewWriteHandler}/>
          </div>
        </div>
        {isLineClicked && <ApprovalLineList />}
      </div>

    </div>
  );
}

export default ApprovalList;