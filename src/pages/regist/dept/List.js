import { Table, FormatNumber, MainButton, SubButton, Input } from '../../../components/ThemeColor';
import DeptStyle from '../../../css/DeptList.module.css';
import Modal from '../../../components/modal/Modal.js';
import searchImg from '../../../images/search.png';
import DeptDetail from './Detail';
import DeptRegist from './Regist';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callDeptListAPI, callDeptsDeleteAPI } from '../../../apis/DeptAPICalls';
import { callDeptDetailAPI } from '../../../apis/DetailAPICalls';


function DeptList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const depts = useSelector(state => state.deptReducer);
  const deptList = depts.data;
  const pageInfo = depts.pageInfo;

  const [registModalOpen, setRegistModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  /* 부서 조회 */
  useEffect(
    () => {
      dispatch(callDeptListAPI({
        currentPage: currentPage
      }));
    }, [currentPage]
  )

  /* 페이징 */
  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  /* 신규 버튼 핸들러 */
  const openRegistModal = () => {
    setRegistModalOpen(true, { replace: false });
  };
  const closeRegistModal = () => {
    setRegistModalOpen(false);
  };

  /* 체크 선택 핸들러 */
  const onSelectHandler = (e) => {
    const checkbox = document.getElementsByClassName('check');
    for (var i = checkbox.length - 1; i >= 0; i--) {
      if (e.target.checked === true) {
        checkbox[i].checked = true;
      } else {
        checkbox[i].checked = false;
      }
    }
  }

  /* 삭제 버튼 핸들러 */
  const onDeleteHandler = () => {
    const selectedDept = document.getElementsByClassName('check');
    const deptCodes = [];
    for (var i = selectedDept.length - 1; i >= 0; i--) {
      if (selectedDept[i].checked === true) {
        if (selectedDept[i].parentElement.nextElementSibling.innerHTML !== "부서코드") {
          const num = selectedDept[i].parentElement.nextElementSibling.firstChild.innerHTML;
          deptCodes.push(Number(num));
          console.log(deptCodes);
        }
      }
    }
    if (deptCodes.length > 0) {
      const answer = window.confirm(deptCodes + '번 부서를 정말 삭제하시겠습니까?');
      if (answer === true) {
        dispatch(callDeptsDeleteAPI({ deptCodes }));
        window.location.reload();
      } else {
        return false;
      }
    } else {
      alert('삭제할 부서를 선택해주세요.');
    }
  }

  /* 부서코드 클릭 핸들러 */
  const onClickTableTr = (deptCode) => {
    navigate(`/regist/dept/detail/${deptCode}`, { replace: false });
  }

  /* 수정 버튼 핸들러 */
  const onModifyHandler = () => {
    const selectedDept = document.getElementsByTagName('input');
    const arr = []
    for (var i = selectedDept.length - 1; i >= 0; i--) {
      if (selectedDept[i].checked === true) {
        if (selectedDept[i].parentElement.nextElementSibling.innerHTML !== "부서코드") {
          arr.push(selectedDept[i].parentElement.nextElementSibling.firstChild.innerHTML)
        }
      }
    }
    if (arr.length === 1) {
      openDetailModal(arr[0])
    } else if (arr.length <= 0) {
      alert('수정할 부서를 선택해주세요.')
    } else {
      alert('수정할 부서는 하나만 선택해주세요.')
    }
    console.log(arr);
  }

  const openDetailModal = (deptCode) => {
    setDetailModalOpen(true);
    dispatch(callDeptDetailAPI({ deptCode }));
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
  };

  /* 검색 기능 */
  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  }
  const onEnterkeyHandler = (e) => {
    if (e.key == 'Enter') {
      console.log('Enter key', search);
      navigate(`/regist/dept/search?value=${search}`, { replace: false });
      window.location.reload();
    }
  }
  const onSearchHandler = () => {
    navigate(`/regist/dept/search?value=${search}`, { replace: false });
    window.location.reload();
  }

  return (
    <div className='outlet'>
      <Modal open={detailModalOpen} close={closeDetailModal} header='부서관리' >
        <DeptDetail close={closeDetailModal} />
      </Modal>
      <Modal open={registModalOpen} close={closeRegistModal} header='부서등록' >
        <DeptRegist close={closeRegistModal} />
      </Modal>

      <h4>부서조회</h4>
        <Input style={{float:'left'}}
          type='text'
          placeholder="부서명으로 검색"
          value={search}
          onKeyUp={onEnterkeyHandler}
          onChange={onSearchChangeHandler}
        />
        {/* <img onClick={onSearchHandler} src={searchImg} /> */}

        <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
        {Array.isArray(deptList) &&
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

        {Array.isArray(deptList) &&
          <SubButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage == pageInfo.pageEnd || pageInfo.total == 0}
          > &gt; </SubButton>
        }
      </div>

      <Table>
        <thead>
          <tr>
            <th style={{ width: 10 }}>
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
              <td style={{ width: 10 }}>
                <input type='checkbox' className='check' />
              </td>
              <td onClick={() => openDetailModal(dept.deptCode)}>
                <div>{dept.deptCode}</div>
              </td>
              <td onClick={() => openDetailModal(dept.deptCode)}>{dept.deptName}</td>
              <td onClick={() => openDetailModal(dept.deptCode)}>{FormatNumber(dept.deptSalary)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        <MainButton onClick={openRegistModal}>신규</MainButton>
        <SubButton onClick={onModifyHandler}>수정</SubButton>
        <SubButton onClick={onDeleteHandler}>삭제</SubButton>
    </div>
  );
}

export default DeptList;