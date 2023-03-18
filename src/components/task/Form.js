import { Input, MainButton, SubButton } from '../ThemeColor';
import ApprovalStyle from '../../css/Approval.module.css';
import { useSelector, useDispatch } from 'react-redux';
import plus from '../../images/plus.png';
import refresh from '../../images/refreshing.png';
import { useState, useEffect } from "react";
import Modal from '../modal/Modal.js';
import ApproverSelect from '../../components/task/ApproverSelect';
import ApproverBox from './ApproverBox';
import { decodeJwt } from '../../utils/tokenUtils';

function ApprovalForm({ docType, isLinked, linkURL, setIsSelected, form, setForm, setAttachment }) {

  const [empModalOpen, setEmpModalOpen] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const loginInfo = useSelector(state => state.loginReducer);
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  let date = new Date();
  const today = date.toLocaleDateString();

  useEffect(
    () => {
      setForm({
        statusCode: 0,
        docType: docType,
        approvalTitle: '',
        approvalContent: '',
        attachment: '',
        link: '',
        vacationType: '',
        vacationStartDate: '',
        vacationEndDate: '',
        approverName: [],
        approvalLine: []
      })
    }, []
  );

  const onChangeFileUpload = (e) => {
    const attachment = e.target.files[0];
    setAttachment(attachment);
  };

  const onChangeHandler = (e) => {
    if (e.target.name === 'approvalContent') {
      setTextCount(e.target.value.length)
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  /* 결재라인 추가 */
  const openApprovalLineModal = () => {
    setEmpModalOpen(true, { replace: false });
  }
  const closeEmpModal = () => {
    setEmpModalOpen(false);
  };

  /* 결재 라인 선택 */
  const selectEmp = (chosenEmpCode, chosenEmpName) => {
    if (chosenEmpCode === loginInfo.empCode) {
      alert('자기 자신을 결재자로 지정할 수 없습니다.')
    } else if (form.approvalLine.length >= 4) {
      alert('결재자는 최대 4명으로 제한됩니다.')
    } else if (!form.approvalLine.includes(chosenEmpCode)) {
      form.approvalLine.push(chosenEmpCode);
      form.approverName.push(chosenEmpName);
    } else {
      alert('중복된 사원이 있습니다.');
    }
  }

  /* 새로고침 버튼 핸들러 */
  const refreshApprovalLine = () => {
    setForm({
      approverName: [],
      approvalLine: []
    })
  }

  return (
    <div className={ApprovalStyle.approvalForm}>

      <Modal open={empModalOpen} close={closeEmpModal} header='결재 라인 선택' >
        {/* <EmpList selectEmp={selectEmp} close={closeEmpModal} /> */}
        <ApproverSelect selectEmp={selectEmp} close={closeEmpModal} />
      </Modal>

      <div>
        <h2>{docType}</h2>
      </div>

      <div className={ApprovalStyle.flexEnd}>
        <div className={ApprovalStyle.docTable}>
          <table border={1}>
            <tbody>
              <tr>
                <th>문서번호</th>
                <td></td>
              </tr>
              <tr>
                <th>부서</th>
                <td>{loginInfo?.dept?.deptName}</td>
              </tr>
              <tr>
                <th>기안일</th>
                <td>{today}</td>
              </tr>
              <tr>
                <th>기안자</th>
                <td>{loginInfo?.empName}</td>
              </tr>
              <tr>
                <th>직위</th>
                <td>{loginInfo?.position?.positionName}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={ApprovalStyle.flex}>
          <div className={ApprovalStyle.stampHead}>
            <h4>결재</h4>
          </div>
          <div>
            <div className={ApprovalStyle.horizontal}>
              {Array.isArray(form.approverName) && form.approverName.map((empName) => (
                <ApproverBox empName={empName} />
              ))}

            </div>
            <div className={ApprovalStyle.plusButton}>
              <img src={plus} onClick={openApprovalLineModal} className={ApprovalStyle.plusImg} />
              <img src={refresh} onClick={refreshApprovalLine} className={ApprovalStyle.refreshImg} />
            </div>
          </div>

        </div>

      </div>

      <div className={ApprovalStyle.contentTable}>
        <table border={1}>
          <tbody>
            <tr>
              <th>제목</th>
              <td colSpan={3}>
                <input type="text" name='approvalTitle' maxLength="80" onChange={onChangeHandler} className={ApprovalStyle.title} />
              </td>
            </tr>
            {(docType === "휴가신청서") ?
              <>
                <tr><th>휴가종류</th><td colSpan={3}>
                  <div className={ApprovalStyle.sort}>
                    <div>
                      <label>
                        <input type="radio" name="vacationType" value="연차" onChange={onChangeHandler} /> 연차
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="radio" name="vacationType" value="오전반차" onChange={onChangeHandler} /> 오전반차
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="radio" name="vacationType" value="오후반차" onChange={onChangeHandler} /> 오후반차
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="radio" name="vacationType" value="기간휴가" onChange={onChangeHandler} /> 기간휴가
                      </label>
                    </div>
                  </div>
                </td></tr>
                <tr>
                  <th>시작일</th>
                  <td>
                    <input type="date" name='vacationStartDate' onChange={onChangeHandler} />
                  </td>
                  <th>종료일</th>
                  <td>
                    <input type="date" name='vacationEndDate' onChange={onChangeHandler} />
                  </td>
                </tr>
              </> :
              <tr>
                {((isLinked) && <th>링크</th>) || <th>첨부파일</th>}
                {((isLinked) && <td><input type="text" name='link' onChange={onChangeHandler} /></td>) ||
                  <td><input type='file' name='attachment' onChange={onChangeFileUpload} /></td>}
              </tr>
            }
            <tr>
              <th>내용</th>
              <td colSpan={3} style={{ padding: 10 }}>
                <div className={ApprovalStyle.text}>
                  <textarea
                    name='approvalContent'
                    maxLength="650"
                    onChange={onChangeHandler}
                    className={ApprovalStyle.textArea}
                    style={(docType === "휴가신청서") && { height: 150 } || { height: 190 }}
                  />
                  <div class={ApprovalStyle.count}><span id='zero'>{textCount}</span>/650</div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4} className={ApprovalStyle.space}>상기와 같이 {docType}(을/를) 제출하오니 첨부파일 확인 부탁드립니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApprovalForm;