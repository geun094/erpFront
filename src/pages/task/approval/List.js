import { SubButton, MainButton } from '../../../components/ThemeColor';
import ApprovalStyle from '../../../css/Approval.module.css';
import searchImg from '../../../images/search.png';
import approval from '../../../images/approval.png';
import on from '../../../images/on.png';
import off from '../../../images/off.png';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ApprovalLineList from '../../../components/task/ApprovalLineList';
import { callApprovalListAPI } from '../../../apis/ApprovalAPICalls';
import ApprovalTable from '../../../components/task/ApprovalTable';

function ApprovalList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginInfo = useSelector(state => state.loginReducer);
  const approvals = useSelector(state => state.approvalReducer);
  const approvalList = approvals.data;
  const pageInfo = approvals.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLineClicked, setIsLineClicked] = useState(false);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  };

  useEffect(
    () => {
      dispatch(callApprovalListAPI({
        currentPage: currentPage,
        empCode: loginInfo.empCode
      }));
    }
    , [currentPage]
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

  /* 내 결재보기 버튼 핸들러 */
  const myApprovalHandler = () => {
    navigate('/task/approval/mylist');
  };
  
  const test = () => {
    console.log(approvals)
  }
  return (
    <div className={ApprovalStyle.outlet}>
      <h3>전체 결재목록</h3>
      <div className={ApprovalStyle.approvalInfo}>
        <div>
          <img src={approval} className={ApprovalStyle.approvalImg} />
          <p>전체 기안서 목록입니다. 내 결재 및 승인 완료된 문서에 한하여 열람 가능합니다.</p>
        </div>
        <MainButton onClick={myApprovalHandler}>내 결재 보기</MainButton>
      </div>

      <div className={ApprovalStyle.right}>
        <input
          type='text'
          placeholder="문서 제목으로 검색"
          value={search}
          onKeyUp={onEnterkeyHandler}
          onChange={onSearchChangeHandler}
        />
        <img
          onClick={onSearchClickHandler}
          src={searchImg}
          className={ApprovalStyle.imgButton}
        />
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
        </div>
        {isLineClicked && <ApprovalLineList />}
      </div>


      {/* <button onClick={test}>테스트</button> */}
    </div>
  );
}

export default ApprovalList;