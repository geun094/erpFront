import { Table, Div, MainButton, SubButton, Input, FormatNumber } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { callDeptAllListAPI } from '../../apis/DeptAPICalls';

function DeptSelectList(props) {

  const dispatch = useDispatch();
  const deptList = useSelector(state => state.deptReducer);
  const navigate = useNavigate();

  const [deptCode, setDeptCode] = useState({});

  useEffect(
    () => {
      dispatch(callDeptAllListAPI({

      }));
    }
    , []
  );

  const onClickTableTr = (deptCode, deptName) => {
    props.selectDept(deptCode, deptName);
    // props.testfunction();
    props.close();
  }

  return (
    <div>
      <div>
        <div>
          <h4>부서선택</h4>
          {deptList &&
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>부서코드</th>
                    <th>부서명</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(deptList) && deptList.map((dept) => (
                    <tr key={dept.deptCode}>
                      <td onClick={() => onClickTableTr(dept.deptCode, dept.deptName)}>{dept.deptCode}</td>
                      <td onClick={() => onClickTableTr(dept.deptCode, dept.deptName)}>{dept.deptName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default DeptSelectList;