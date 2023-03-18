import { Table, Div, MainButton, SubButton } from '../../components/ThemeColor';
import ApprovalLineStyle from '../../css/ApprovalLineList.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import checked from '../../images/checked.png';

function ApprovalLineList() {


  /* 날짜 형식 */
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = (d.getFullYear()) % 2000,
      hour = '' + (d.getHours()),
      minute = '' + (d.getMinutes()),
      second = '' + (d.getSeconds());
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    if (hour.length < 2)
      hour = '0' + hour;
    if (minute.length < 2)
      minute = '0' + minute;
    if (second.length < 2)
      second = '0' + second;
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
  }

  const approvalLines = useSelector(state => state.approvalLineReducer);

  return (
    <div className={ApprovalLineStyle.approvalLineList}>
      <Table border={1}>
        <tbody>
          <tr>
            <th>순서</th>
            <th>성명</th>
            <th>직급</th>
            <th>부서</th>
            <th>상태</th>
            <th>승인일시</th>
          </tr>
          {Array.isArray(approvalLines) && approvalLines.map((line) => (
            <tr>
              <td>{line.approverOrder}</td>
              <td>{line.emp.empName}</td>
              <td>{line.emp.position.positionName}</td>
              <td>{line.emp.dept.deptName}</td>
              <td>{(line.approveYn === "Y") && <img src={checked} />}</td>
              <td>{(line.approveYn === "Y") && formatDate(line.approvedDate)}</td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default ApprovalLineList;