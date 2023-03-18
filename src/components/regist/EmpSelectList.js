import { Table, Div, MainButton, SubButton, Input } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callEmpListAPI } from '../../apis/EmpAPICalls';

function EmpSelectList(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emps = useSelector(state => state.empReducer);
  const empList = emps.data;
  const pageInfo = emps.pageInfo;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [empCode, setEmpCode] = useState({});

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  }

  const onEnterkeyHandler = (e) => {
    if (e.key == 'Enter') {
      console.log('Enter key', search);
      navigate(`/regist/emp/search?value=${search}`, { replace: false });
    }
  }

  useEffect(
    () => {
      dispatch(callEmpListAPI({
        currentPage: currentPage
      }));
    }
    , [currentPage]
  );

  const onClickTableTr = (empCode, empName) => {
    props.selectEmp(empCode, empName);
    props.close();
  }

  return (
    <div>
      <h4>사원조회</h4>
        <Input
          type="text"
          value={search}
          onKeyUp={onEnterkeyHandler}
          onChange={onSearchChangeHandler}
        />

      <div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
        {Array.isArray(empList) &&
          <SubButton
            className='activeButton'
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage == 1}
          >
            &lt;
          </SubButton>
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

        {Array.isArray(empList) &&
          <SubButton
            className='activeButton'
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
          >
            &gt;
          </SubButton>
        }
      </div>

      <div>
        <Table>
          <thead>
            <tr>
              <th>사원코드</th>
              <th>사원명</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(empList) && empList.map((emp) => (
              <tr key={emp.empCode}>
                <td onClick={() => onClickTableTr(emp.empCode, emp.empName)}>{emp.empCode}</td>
                <td onClick={() => onClickTableTr(emp.empCode, emp.empName)}>{emp.empName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default EmpSelectList;