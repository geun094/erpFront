import { FormatDate, MainButton, SubButton } from '../../../components/ThemeColor';
import ApprovalStyle from '../../../css/Approval.module.css';
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callApprovalDetailAPI } from '../../../apis/ApprovalAPICalls';
import { callApprovalLineAPI } from '../../../apis/ApprovalLineAPICalls';
import StampBox from '../../../components/task/StampBox';

function ApprovalDetail() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const approvalDetail = useSelector(state => state.approvalReducer);
  const lineList = useSelector(state => state.approvalLineReducer);
  const loginInfo = useSelector(state => state.loginReducer);

  console.log(lineList);
  useEffect(
    () => {
      console.log('[ApprovalDetail] approvalCode : ', params.approvalCode);
      dispatch(callApprovalDetailAPI({
        approvalCode: params.approvalCode
      }));
      dispatch(callApprovalLineAPI({
        approvalCode: params.approvalCode
      }));
    }
    , []);

  /* 첨부파일 열기 */
  const fileView = () => {
    // window.open(approvalDetail.newFileName, 'file', 'width= 500, height=500, left=400, top=100');
    window.open(approvalDetail.newFileName)
  }
  
  return (
    <div className={ApprovalStyle.detailForm}>
      <div>
        <h2>{approvalDetail?.docType}</h2>
      </div>

      <div className={ApprovalStyle.flexEnd}>
        <div className={ApprovalStyle.docTable}>
          <table border={1}>
            <tbody>
              <tr>
                <th>문서번호</th>
                <td>{approvalDetail?.approvalCode}</td>
              </tr>
              <tr>
                <th>부서</th>
                <td>{approvalDetail?.emp?.dept?.deptName}</td>
              </tr>
              <tr>
                <th>기안일</th>
                <td>{FormatDate(approvalDetail?.approvalDate)}</td>
              </tr>
              <tr>
                <th>기안자</th>
                <td>{approvalDetail?.emp?.empName}</td>
              </tr>
              <tr>
                <th>직위</th>
                <td>{approvalDetail?.emp?.position?.positionName}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={ApprovalStyle.flex}>
          <div className={ApprovalStyle.stampHead}>
            <h4>결재</h4>
          </div>
          <div className={ApprovalStyle.horizontal}>
            {
              lineList.length > 0 && lineList.map((line) => (<StampBox key={line.lineCode} line={line} />))
            }
          </div>
        </div>
      </div>

      <div className={ApprovalStyle.contentTable}>
        <table border={1} className={ApprovalStyle.contentT}>
          <tbody>
            <tr>
              <th>제목</th>
              <td colSpan={3}>{approvalDetail?.approvalTitle}</td>
            </tr>
            {(approvalDetail?.docType === "휴가신청서") ?
              <>
                <tr>
                  <th>휴가종류</th>
                  <td colSpan={3}>{approvalDetail?.vacationType}</td>
                </tr>
                <tr>
                  <th>시작일</th>
                  <td>{FormatDate(approvalDetail?.vacationStartDate)}</td>
                  <th>종료일</th>
                  <td>{FormatDate(approvalDetail?.vacationEndDate)}</td>
                </tr>
              </> :
              <tr>
                <th>첨부파일</th>
                <td>
                  {(approvalDetail.oldFileName) ?
                    <p onClick={fileView}>{approvalDetail?.oldFileName}</p> :
                    <p style={{ color: 'gray' }}>첨부파일 없음</p>}
                </td>
              </tr>}
            <tr>
              <th>내용</th>
              <td colSpan={3} style={{ padding: 10 }}>
                <textarea 
                  value={approvalDetail.approvalContent} 
                  className={ApprovalStyle.textArea} 
                  style={(approvalDetail.docType === "휴가신청서") && { height: 150 } || { height: 170 }} 
                  readOnly/>
              </td>
            </tr>
            <tr>
              <td colSpan={4} className={ApprovalStyle.space}>상기와 같이 {approvalDetail?.docType}(을/를) 제출하오니 첨부파일 확인 부탁드립니다.</td>
            </tr>
          </tbody>
        </table>
        
        <div className={ApprovalStyle.closeButton}>
          <MainButton onClick={() => {navigate(-1)}}>닫기</MainButton>
        </div>
      </div>
    </div>
  );
}

export default ApprovalDetail;