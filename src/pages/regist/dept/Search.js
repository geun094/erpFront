import { Table, FormatNumber, MainButton, SubButton } from '../../../components/ThemeColor';
import DeptStyle from '../../../css/DeptList.module.css';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import back from '../../../images/back.png'
import { callSearchDeptAPI } from '../../../apis/DeptAPICalls'

function Search() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  
  const { value } = queryString.parse(search);
  const deptList = useSelector(state => state.deptReducer);

  /* 검색 결과 조회 */
  useEffect(
    () => {
      dispatch(callSearchDeptAPI({
        search: value
      }));
    }, []
  )

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

  /* 부서코드 클릭 핸들러 */
  const onClickTableTr = (deptCode) => {
    navigate(`/regist/dept/detail/${deptCode}`, { replace: false });
  };

  return (
    <div className={DeptStyle.deptList}>

      <h4>검색결과</h4>

      <p>"<span>{value}</span>"에 대한 <span>{deptList.length}</span>개의 검색 결과가 있습니다.</p>

      <div className={DeptStyle.goBack} onClick={() => navigate(-1)}>
        <p>돌아가기</p>
        <img src={back} />
      </div>

      <Table border={1} className={DeptStyle.deptTable}>
        <thead>
          <tr>
            <th>
              <input type='checkbox' onChange={onSelectHandler} className='check' />
            </th>
            <th>부서코드</th>
            <th>부서명</th>
            <th>부서수당</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(deptList) && deptList.map((dept) => (
            <tr key={dept.deptCode} >
              <td>
                <input type='checkbox' className='check' />
              </td>
              <td onClick={() => onClickTableTr(dept.deptCode)}>
                <a href=''>{dept.deptCode}</a>
              </td>
              <td onClick={() => onClickTableTr(dept.deptCode)}>{dept.deptName}</td>
              <td>{FormatNumber(dept.deptSalary)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Search;