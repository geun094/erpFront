import { FormatDate, Div, MainButton, SubButton, Input } from '../../../components/ThemeColor';
import ApprovalStyle from '../../../css/Approval.module.css';
import Detail from '../approval/Detail';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callApprovalDeleteAPI, callApprovalModifyAPI, callApprovalDetailAPI } from '../../../apis/ApprovalAPICalls';
import { callApprovalLineAPI } from '../../../apis/ApprovalLineAPICalls';
import StampBox from '../../../components/task/StampBox';

function ApprovalModify() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyFile, setModifyFile] = useState(false);
  const [form, setForm] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [textCount, setTextCount] = useState(0);
  const approvalDetail = useSelector(state => state.approvalReducer);
  const loginInfo = useSelector(state => state.loginReducer);
  const lineList = useSelector(state => state.approvalLineReducer);

  let date = new Date();
  const today = date.toLocaleDateString();

  /* 상세 정보 불러오기 */
  useEffect(
    () => {
      dispatch(callApprovalDetailAPI({
        approvalCode: params.approvalCode
      }));
      dispatch(callApprovalLineAPI({
        approvalCode: params.approvalCode
      }));
    }, []
  )

  /* 첨부파일 열기 */
  const fileView = () => {
    window.open(approvalDetail.newFileName)
  }

  /* 삭제 버튼 핸들러 */
  const onDeleteHandler = () => {
    const answer = window.confirm(approvalDetail.approvalTitle + '(을/를) 정말 삭제하시겠습니까?');
    if (answer === true) {
      dispatch(callApprovalDeleteAPI({
        approvalCode: params.approvalCode
      }));
    } else {
      return false;
    }
    navigate('/task/approval/draft', { replace: true });
  }

  /* 클릭하여 수정모드로 전환 */
  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({
      approvalCode: approvalDetail.approvalCode,
      empCode: approvalDetail.emp.empCode,
      statusCode: approvalDetail.approvalStatus.statusCode,
      docType: approvalDetail.docType,
      approvalDate: today,
      approvalTitle: approvalDetail.approvalTitle,
      approvalContent: approvalDetail.approvalContent,
      oldFileName: approvalDetail.oldFileName,
      newFileName: approvalDetail.newFileName,
      // attachment: approvalDetail.oldFileName,
      link: approvalDetail.link,
      vacationType: approvalDetail.vacationType,
      vacationStartDate: approvalDetail.vacationStartDate,
      vacationEndDate: approvalDetail.vacationEndDate,
      // approvalLine: [1, 2]
    })
  }

  /* 입력 핸들러 */
  const onChangeHandler = (e) => {
    if (e.target.name === 'approvalContent') {
      setTextCount(e.target.value.length)
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  /* 임시저장 핸들러 */
  const onDraftHandler = () => {
    const formData = new FormData();
    formData.append("approvalCode", form.approvalCode);
    formData.append("empCode", form.empCode);
    formData.append("statusCode", 4);
    formData.append("docType", form.docType);
    // formData.append("approvalDate", today);
    formData.append("approvalTitle", form.approvalTitle);
    formData.append("approvalContent", form.approvalContent);
    formData.append("oldFileName", form.oldFileName);
    // formData.append("newFileName", form.newFileName);
    // formData.append("link", form.link);
    // formData.append("vacationType", form.vacationType);

    if (form.vacationStartDate) {
      formData.append("vacationStartDate", new Date(form.vacationStartDate));
    }
    if (form.vacationEndDate) {
      formData.append("vacationEndDate", new Date(form.vacationEndDate));
    }
    if (attachment) {
      formData.append("attachment", attachment);
    }

    console.log(attachment);
    dispatch(callApprovalModifyAPI({
      form: formData,
      approvalCode: form.approvalCode
      // approvalLineList: form.approvalLine
    }));
    alert('수정 후 임시보관함에 저장됩니다.')
    navigate('/task/approval/draft');
  }

  /* 기안하기 버튼 핸들러 */
  const onApprovalModifyHandler = () => {

    console.log(form);

    if (!form.approvalTitle) {
      alert("제목을 입력하세요");
      return false;
    }

    if (!form.approvalContent) {
      alert("내용을 입력하세요.");
      return false;
    }

    if (approvalDetail.docType === "휴가신청서") {
      if (!form.vacationType) {
        alert('휴가종류를 지정해주세요.');
        return false;
      }
      if (!form.vacationStartDate) {
        alert("휴가 시작일을 입력해주세요.")
        return false;
      }
      if (!form.vacationEndDate) {
        alert("휴가 종료일을 입력해주세요.")
        return false;
      }
      if (!form.vacationStartDate) {
        alert("휴가종류를 입력해주세요.")
      }
      if (form.vacationType !== "기간휴가" && form.vacationEndDate !== form.vacationStartDate) {
        alert('휴가 시작일과 종료일을 동일하게 입력해주세요.');
        return false;
      }
      if (form.vacationType === "기간휴가" && form.vacationStartDate === form.vacationEndDate) {
        alert('기간휴가는 시작일과 종료일을 다르게 입력해주세요.');
        return false;
      }

    }

    const formData = new FormData();
    formData.append("approvalCode", form.approvalCode);
    formData.append("empCode", form.empCode);
    formData.append("statusCode", 0);
    formData.append("docType", form.docType);
    // formData.append("approvalDate", today);
    formData.append("approvalTitle", form.approvalTitle);
    formData.append("approvalContent", form.approvalContent);
    formData.append("oldFileName", form.oldFileName);
    formData.append("newFileName", form.newFileName);
    // formData.append("link", form.link);
    // formData.append("vacationType", form.vacationType);

    if (form.vacationStartDate) {
      formData.append("vacationStartDate", new Date(form.vacationStartDate));
    }
    if (form.vacationEndDate) {
      formData.append("vacationEndDate", new Date(form.vacationEndDate));
    }
    if (attachment) {
      formData.append("attachment", attachment);
    }

    dispatch(callApprovalModifyAPI({
      form: formData,
      approvalCode: form.approvalCode
      // approvalLineList: form.approvalLine
    }));
    alert("결재 제출 완료");
    navigate('/task/approval/mylist');
  }

  const onChangeFileUpload = (e) => {
    const attachment = e.target.files[0];
    setAttachment(attachment);
  };

  const onClickImageUpload = () => {
    if(modifyMode){
        imageInput.current.click();
    }
}

const imageInput = useRef();


  return (
    <div className={ApprovalStyle.modify}>
      <h3>기안서 수정</h3>

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
                  <td>{today}</td>
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
                <td colSpan={3}>
                  <input
                    type="text"
                    name="approvalTitle"
                    value={(modifyMode ? form.approvalTitle : approvalDetail.approvalTitle) || ''}
                    maxLength="80"
                    onChange={onChangeHandler}
                    className={ApprovalStyle.title}
                  />
                </td>
              </tr>
              {(approvalDetail?.docType === "휴가신청서") ?
                <>
                  <tr>
                    <th>휴가종류</th>
                    <td colSpan={3}>
                      <div className={ApprovalStyle.sort}>
                        <div>
                          <label>
                            <input type="radio" name="vacationType" value="연차" onChange={onChangeHandler} readOnly={modifyMode ? false : true}
                              checked={(!modifyMode ? approvalDetail.vacationType : form.vacationType) == "연차" ? true : false}
                            /> 연차
                          </label>
                        </div>
                        <div>
                          <label>
                            <input type="radio" name="vacationType" value="오전반차" onChange={onChangeHandler} readOnly={modifyMode ? false : true}
                              checked={(!modifyMode ? approvalDetail.vacationType : form.vacationType) == "오전반차" ? true : false}
                            /> 오전반차
                          </label>
                        </div>
                        <div>
                          <label>
                            <input type="radio" name="vacationType" value="오후반차" onChange={onChangeHandler} readOnly={modifyMode ? false : true}
                              checked={(!modifyMode ? approvalDetail.vacationType : form.vacationType) == "오후반차" ? true : false}
                            /> 오후반차
                          </label>
                        </div>
                        <div>
                          <label>
                            <input type="radio" name="vacationType" value="기간휴가" onChange={onChangeHandler} readOnly={modifyMode ? false : true}
                              checked={(!modifyMode ? approvalDetail.vacationType : form.vacationType) == "기간휴가" ? true : false}
                            /> 기간휴가
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>시작일</th>
                    <td>
                      {(modifyMode) ?
                        <input
                          style={!modifyMode ? { backgroundColor: "gainsboro" } : null}
                          name="vacationStartDate"
                          value={form.vacationStartDate}
                          type="date"
                          onChange={onChangeHandler}
                        />
                        :
                        <p>{(approvalDetail.vacationStartDate) && FormatDate(approvalDetail?.vacationStartDate)}</p>}

                    </td>

                    <th>종료일</th>
                    <td>
                      {(modifyMode) ?
                        <input
                          style={!modifyMode ? { backgroundColor: "gainsboro" } : null}
                          name="vacationEndDate"
                          value={form.vacationEndDate}
                          type="date"
                          onChange={onChangeHandler}
                        />
                        :
                        <p>{(approvalDetail.vacationStartDate) && FormatDate(approvalDetail?.vacationEndDate)}</p>}
                    </td>
                  </tr>
                </> :
                <tr>
                  <th>첨부파일</th>
                  <td>
                    {(modifyMode) && <input type='file' name="attachment" onChange={onChangeFileUpload}/> }
                    {(approvalDetail.oldFileName) ?
                        <p onClick={fileView}>{approvalDetail.oldFileName}</p> :
                        <p style={{ color: 'gray' }}>첨부파일 없음</p>}
                  </td>
                </tr>}

              <tr>
                <th>내용</th>

                {/* style={(docType === "휴가신청서") && { height: 150 } || { height: 190 }} /><div class={ApprovalStyle.count}><span id='zero'>{textCount}</span>/650</div></div> */}


                <td colSpan={3} style={(approvalDetail?.docType === "휴가신청서") && { height: 150 } || { height: 180 }}>
                  <div className={ApprovalStyle.text}>
                    <textarea
                      name='approvalContent'
                      maxLength="650"
                      value={(modifyMode ? form.approvalContent : approvalDetail.approvalContent) || ''}
                      onChange={onChangeHandler}
                      style={(approvalDetail.docType === "휴가신청서") && { height: 150 } || { height: 190 }}
                      className={ApprovalStyle.textArea} />
                    {(modifyMode) && <div className={ApprovalStyle.count}><span id='zero'>{textCount}</span>/650</div>}
                  </div>
                  {/* {approvalDetail?.approvalContent} */}
                </td>
              </tr>
              <tr>
                <td colSpan={4} className={ApprovalStyle.space}>상기와 같이 {approvalDetail?.docType}(을/를) 제출하오니 첨부파일 확인 부탁드립니다.</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

      <div className={ApprovalStyle.buttons}>
        <MainButton onClick={onDeleteHandler}>삭제</MainButton>
        <SubButton onClick={() => navigate(-1)}>닫기</SubButton>

        {!modifyMode && <MainButton onClick={onClickModifyModeHandler} > 수정 </MainButton>}
        {modifyMode && <><SubButton onClick={onDraftHandler} > 임시저장 </SubButton> <MainButton onClick={onApprovalModifyHandler} >기안하기</MainButton></>}
      </div>
    </div>
  );
}

export default ApprovalModify;