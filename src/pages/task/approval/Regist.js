import ApprovalStyle from '../../../css/Approval.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApprovalForm from '../../../components/task/Form';
import { callApprovalRegistAPI, callApprovalDraftAPI } from '../../../apis/ApprovalAPICalls';
import { decodeJwt } from '../../../utils/tokenUtils';
import { useSelector, useDispatch } from 'react-redux';
import { MainButton, SubButton } from '../../../components/ThemeColor';

function ApprovalRegist() {

  const [docType, setDocType] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [form, setForm] = useState({});
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfo = useSelector(state => state.loginReducer);

  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  /* 양식 선택 핸들러 */
  const onClickHandler = (e) => {
    setDocType(e.target.innerText)
    setIsSelected(true);
  }

  /* 저장 버튼 핸들러 */
  const saveHandler = () => {

    if (form.approvalLine.length === 0) {
      alert('결재 라인을 지정해 주세요');
      return false;
    }
    if (!form.approvalTitle) {
      alert("제목을 입력하세요");
      return false;
    }

    if (!form.approvalContent) {
      alert("내용을 입력하세요.");
      return false;
    }

    if (docType === "휴가신청서") {
      if(!form.vacationType) {
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
    formData.append("empCode", token.sub);
    formData.append("statusCode", 0); // 결재 상태를 0으로 저장
    formData.append("docType", docType);
    formData.append("approvalTitle", form.approvalTitle);
    formData.append("approvalContent", form.approvalContent);
    formData.append("oldFileName", form.oldFileName);
    formData.append("newFileName", form.newFileName);
    formData.append("link", form.link);
    formData.append("vacationType", form.vacationType);
    if (form.vacationStartDate) {
      formData.append("vacationStartDate", new Date(form.vacationStartDate));
    }
    if (form.vacationEndDate) {
      formData.append("vacationEndDate", new Date(form.vacationEndDate));
    }
    if (attachment) {
      formData.append("attachment", attachment);
    }
    console.log(form);
    console.log(form.approvalLine);
    dispatch(callApprovalRegistAPI({
      form: formData,
      approvalLineList: form.approvalLine
    }));
    alert("결재가 제출되었습니다");
    navigate('/task/approval/mylist');
  }

  const draftHandler = () => {

    if (form.approvalLine.length === 0) {
      alert('결재 라인을 지정해 주세요');
      return false;
    }
    const formData = new FormData();
    formData.append("empCode", token.sub);
    formData.append("statusCode", 4); // 결재 상태를 4로 저장
    formData.append("docType", docType);
    formData.append("approvalTitle", form.approvalTitle);
    formData.append("approvalContent", form.approvalContent);
    formData.append("oldFileName", form.oldFileName);
    formData.append("newFileName", form.newFileName);
    formData.append("link", form.link);
    formData.append("vacationType", form.vacationType);
    if (form.vacationStartDate) {
      formData.append("vacationStartDate", new Date(form.vacationStartDate));
    }
    if (form.vacationEndDate) {
      formData.append("vacationEndDate", new Date(form.vacationEndDate));
    }
    if (attachment) {
      formData.append("attachment", attachment);
    }
    dispatch(callApprovalDraftAPI({
      form: formData,
      approvalLineList: form.approvalLine
    }));
    alert("임시보관함에 보관됩니다.");
    navigate('/task/approval/draft');
  }

  return (
    <div className={ApprovalStyle.flex} >
      <div className={ApprovalStyle.outlet}>
        <h3>기안서 작성</h3>
        <div className={ApprovalStyle.docType}>
          <h4>기안서 양식을 선택하세요.</h4>
          <p>양식</p>
          <ul>
            <li onClick={onClickHandler}>품의서</li>
            <li onClick={onClickHandler}>지출결의서</li>
            <li onClick={onClickHandler}>입금확인서</li>
            <li onClick={onClickHandler}>전표</li>
            <li onClick={onClickHandler}>기안서</li>
            <li onClick={onClickHandler}>제안서</li>
            <li onClick={onClickHandler}>보고서</li>
          </ul>
          <p>기타</p>
          <ul>
            <li onClick={onClickHandler}>휴가신청서</li>
          </ul>

        </div>
      </div>

      <div>

        {
          isSelected &&
          <div className={ApprovalStyle.form}>
            <ApprovalForm docType={docType} setIsSelected={setIsSelected} form={form} setForm={setForm} setAttachment={setAttachment} />
            <div className={ApprovalStyle.buttons}>
              <MainButton onClick={saveHandler}>기안하기</MainButton>
              <SubButton onClick={draftHandler}>임시저장</SubButton>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default ApprovalRegist;