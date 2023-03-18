import { Table, SubButton, MainButton } from '../../../components/ThemeColor';
import ApprovalStyle from '../../../css/Approval.module.css';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import back from '../../../images/back.png';
import on from '../../../images/on.png';
import off from '../../../images/off.png';
import { callSearchApprovalAPI } from '../../../apis/ApprovalAPICalls';
import { callApprovalLineAPI } from '../../../apis/ApprovalLineAPICalls';
import ApprovalLineList from '../../../components/task/ApprovalLineList';
import ApprovalTable from '../../../components/task/ApprovalTable';
import clip from '../../../images/clip.png';

function ApprovalSearch() {

  const navigate = useNavigate();
  const { search } = useLocation();
  const { value } = queryString.parse(search);
  const approvalList = useSelector(state => state.approvalReducer);
  const [isLineClicked, setIsLineClicked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callSearchApprovalAPI({
      search: value
    }));
  },
    []);

  /* 체크 선택 핸들러 */
  const onSelectHandler = (e) => {
    const input = document.getElementsByTagName('input');
    for (var i = input.length - 1; i >= 0; i--) {
      if (input[0].checked === true) {
        input[i].checked = true;
      } else {
        input[i].checked = false;
      }
    }
  }

  /* 결재라인 테이블 토글 */
  const onLineOpenHandler = () => {
    setIsLineClicked(true);
  };
  const onLineCloseHandler = () => {
    setIsLineClicked(false);
  };

  return (
    <div className={ApprovalStyle.search}>

      <h3>검색결과</h3>

      <div className={ApprovalStyle.right} onClick={() => navigate(-1)}>
        <p>돌아가기</p>
        <img src={back} />
      </div>

      <p>"<span>{value}</span>"에 대한 <span>{approvalList.length}</span>개의 검색 결과가 있습니다.</p>

      <ApprovalTable approvalList={approvalList} setIsLineClicked={setIsLineClicked} />

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

export default ApprovalSearch;