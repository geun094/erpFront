import { Table, Div, MainButton, SubButton, FormatDate } from '../../components/ThemeColor';
import ApprovalStyle from '../../css/Approval.module.css';
import clip from '../../images/clip.png';
import checked from '../../images/checked.png';
import { startTransition, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callApprovalLineAPI } from '../../apis/ApprovalLineAPICalls';

function ApprovalTable({ approvalList, setIsLineClicked, isApprover, isWriter, isViewer }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfo = useSelector(state => state.loginReducer);
  const approvalLines = useSelector(state => state.approvalLineReducer);

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
  };

  /* 행 클릭 핸들러 */
  const onLineClickHandler = (approvalCode) => {
    setIsLineClicked(true);
    {
      dispatch(callApprovalLineAPI({
        approvalCode: approvalCode
      }))
    }
  };

  /* 승인 페이지로 이동 */
  const onSignOffHandler = (code) => {
    navigate(`/task/approval/signoff/${code}`, { replace: false })
  }

  /* 상세페이지로 이동 */
  const onDetailHandler = (code, status, emp) => {
    console.log(status);
    if (isApprover === true) {
      navigate(`/task/approval/signoff/${code}`, { replace: false })
    } else if (isWriter === true) {
      navigate(`/task/approval/modify/${code}`, { replace: false })
    } else if (status.statusDesc === '최종승인' || emp === loginInfo.empCode || isViewer) {
      navigate(`/task/approval/detail/${code}`, { replace: false })
    } else {
      alert('열람이 제한됩니다.')
    }
  };

  return (
    <div>
      <Table border={1} className={ApprovalStyle.approvalTable}>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                onChange={onSelectHandler}
                className='check' />
            </th>
            <th>기안일시</th>
            <th>구분</th>
            <th>제목</th><th />
            <th>기안부서</th>
            <th>기안자</th>
            <th>상태</th>
            <th>문서번호</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(approvalList) && approvalList.map((approval) => (
            <tr
              key={approval.approvalCode}
              onClick={() => onLineClickHandler(approval.approvalCode)}
              className={(approval.approvalStatus.statusDesc === "반려") ?
                ApprovalStyle.rejectionTr : ApprovalStyle.approvalTr}
            >
              <td>
                <input type='checkbox' className='check' />
              </td>
              <td>
                {FormatDate(approval.approvalDate)}
              </td>
              <td>
                {approval.docType}
              </td>

              <td
                className={ApprovalStyle.approvalTile}
                onClick={() => {
                  (isApprover) ? onSignOffHandler(approval.approvalCode)
                  : onDetailHandler(approval.approvalCode, approval.approvalStatus, approval.emp.empCode)
                }}>
                <div style={{ width: 220, height: 20, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical' }}>{approval.approvalTitle}</div>
              </td>
              <td>
                {(approval.oldFileName !== null) ?
                  <img src={clip} style={{ width: 15, height: 15 }} /> : ''}
              </td>
              <td>
                {approval?.emp?.dept?.deptName}
              </td>
              <td>
                {approval?.emp?.empName}
              </td>

              {(approval.approvalStatus.statusDesc === "최종승인") ?
                <td>
                  <img src={checked} />
                </td>
                :
                <td
                  className={(approval.approvalStatus.statusDesc === "검토중") ? ApprovalStyle.inProgress
                    : (approval.approvalStatus.statusDesc === "반려") ? ApprovalStyle.rejected
                      : ApprovalStyle.before} >
                  {approval?.approvalStatus?.statusDesc}
                </td>}

              <td>
                {approval?.approvalCode}
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>


    </div>
  );
}

export default ApprovalTable;