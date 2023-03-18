import { Table, Div, MainButton, SubButton, Input } from '../../components/ThemeColor'

import ApproverStyle from '../../css/Approver.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import searchImg from '../../images/search.png';
import { useNavigate } from 'react-router-dom';
import { callApproverListAPI, callSearchApproverAPI } from '../../apis/ApproverAPICalls';

function ApproverSelect(props) {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const approvers = useSelector(state => state.approverReducer);
  const approverList = approvers.data;
  const pageInfo = approvers.pageInfo;
  const [isSearched, setIsSearched] = useState(false);

  useEffect(
    () => {
      dispatch(callApproverListAPI({
        currentPage: currentPage
      }));
    }
    , [currentPage]
  );

  const pageNumber = [];

  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  const onClickTableTr = (empCode, empName) => {
    props.selectEmp(empCode, empName);
    props.close();
  }

  /* 검색 기능 */
  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  }
  const onEnterkeyHandler = (e) => {
    if (e.key == 'Enter') {
      console.log('Enter key', search);
      setIsSearched(true);
      dispatch(callSearchApproverAPI({
        search: search
      }));   
    }
  }
  const onSearchHandler = () => {
    setIsSearched(true);
    window.location.reload();
    dispatch(callSearchApproverAPI({
      search: search
    }));   
  }

  return (
    <div>
      <h3>사원목록 조회</h3>
      <div className={ApproverStyle.search}>
        <input
          type='text'
          placeholder='이름으로 검색하기'
          value={search}
          onKeyUp={onEnterkeyHandler}
          onChange={onSearchChangeHandler}
        />
        <img onClick={onSearchHandler} src={searchImg} />
      </div>

      <div className={ApproverStyle.pagingButton}>
        {Array.isArray(approverList) &&
          <SubButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage == 1}
          > &lt; </SubButton>
        }
        {pageNumber.map((num) => (
          <li key={num} onClick={() => setCurrentPage(num)}>
            {currentPage === num ? (
              <MainButton>{num}</MainButton>
            ) : (
              <SubButton>{num}</SubButton>
            )}
          </li>
        ))}
        {Array.isArray(approverList) &&
          <SubButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
          > &gt; </SubButton>
        }
      </div>

      <Table border={1}>
        <thead>
          <tr>
            <th style={{width:50}}>사번</th>
            <th>부서명</th>
            <th>성명</th>
            <th>직급</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(approverList) && approverList.map((approver) => (
            <tr
              key={approver.empCode}
              onClick={() => onClickTableTr(approver.empCode, approver.empName)}
            >
              <td>{approver?.empCode}</td>
              <td>{approver?.dept?.deptName}</td>
              <td>{approver?.empName}</td>
              <td>{approver?.position?.positionName}</td>
            </tr>
          ))
          }
          {Array.isArray(approvers) && approvers.map((approver) => (
            <tr
              key={approver.empCode}
              onClick={() => onClickTableTr(approver.empCode, approver.empName)}
            >
              <td>{approver?.dept?.deptName}</td>
              <td>{approver?.empName}</td>
              <td>{approver?.position?.positionName}</td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default ApproverSelect;
