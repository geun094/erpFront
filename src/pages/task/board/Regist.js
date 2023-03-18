import "../../../css/boardRegistStyle.css";
import { Table, SubButton,MainButton} from '../../../components/ThemeColor'
import { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callBoardRegistAPI } from "../../../apis/BoardAPICalls";

function BoardRegist({isLinked}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [boardImage, setBoardImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const imageInput = useRef();
	const loginInfo = useSelector(state => state.loginReducer);

  
  const [form, setForm] = useState({
    boardTitle: '',
    boardContent: '',
    noticeYn: '',
    expireDate: '',
    boardPwd: '',
    anonymousYn: '',
    oldFileName: '',
    newFileName: '',
    boardDiv: '',
  });

  useEffect(() => {
    /* 이미지 업로드시 미리보기 세팅 */
    if (boardImage) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setImageUrl(result);
        }
      };
      fileReader.readAsDataURL(boardImage);
    }
  }, [boardImage]);

  const onChangeImageUpload = (e) => {
    const boardImage = e.target.files[0];

    setBoardImage(boardImage);
  };



  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickBoardRegistrationHandler = () => {
    console.log("[BoardRegistration] onClickBoardRegistrationHandler");

    const formData = new FormData();
    formData.append("boardTitle", form.boardTitle);
    formData.append("boardContent", form.boardContent);
    formData.append("noticeYn", form.noticeYn);
    formData.append("boardPwd", form.boardPwd);
    formData.append("anonymousYn", form.anonymousYn);
    formData.append("oldFileName", form.oldFileName);
    formData.append("newFileName", form.newFileName);
    formData.append("boardDiv", form.boardDiv);

    if(form.boardDate) {
      formData.append("boardDate", new Date(form.boardDate));
    }
    if(form.expireDate) {
      formData.append("expireDate", new Date(form.expireDate));
    }
    if (boardImage) {
      formData.append("boardImage", boardImage);
    }

    dispatch(
      callBoardRegistAPI({
        // 상품 상세 정보 조회
        form: formData,
        empCode:loginInfo.empCode
      })
    );
		console.log(form)

    alert("게시판 리스트로 이동합니다.");
    navigate("/task/board/list", { replace: true });
    window.location.reload();
  };

  return (
    <div className="boardregist">
      <h3>게시글 작성</h3>
      <Table border={1}>
        <tr className="board">
          <th>구분</th>
          <td>
					<label><input type="radio" name="boardDiv"  onChange={ onChangeHandler } value="자유게시판"/> 자유게시판</label> &nbsp;
          <label><input type="radio" name="boardDiv"  onChange={ onChangeHandler } value="공지게시판"/> 공지게시판</label>
					</td>
          <th>공지 여부</th>
            <td>
            <label><input type="radio" name="noticeYn" onChange={ onChangeHandler } value="공지" /> 공지 </label> &nbsp;
            <label><input type="radio" name="noticeYn" onChange={ onChangeHandler } value="비공지"/> 비공지</label>
            </td>
        </tr>
        <tr className="writer">
        <th>작성자</th>
          <td>
					<label><input type="radio" name="anonymousYn" onChange={ onChangeHandler } value="익명" /> 익명 </label> &nbsp;
          <label><input type="radio" name="anonymousYn" onChange={ onChangeHandler } value="공개"/> 공개</label>
          </td>
          <th>게시 종료일</th>
          <td>
            <input type="date" name="expireDate" onChange={ onChangeHandler}  value={form.expireDate}/>
          </td>
        </tr>
        <tr className="title1">
          <th>제목</th>
          <td colSpan={4}>
            <input style={{width:800, display:"flex"}} type="text" placeholder="제목을 입력하세요" maxLength={20} name="boardTitle" onChange={ onChangeHandler } ></input>
          </td>
        </tr>
        <tr className="detail">
          <th>내용</th>
          <td colSpan={4}>
            <textarea rows="20" cols="125" maxLength={330} type="text" placeholder="내용을 입력하세요" name="boardContent" onChange={ onChangeHandler }></textarea>
          </td>
        </tr>
        <tr className="file">
           {((isLinked) && <th>링크</th>) || <th>첨부파일</th>}
           {((isLinked) && <td  colSpan={4}><input type="text" name='link' onChange={onChangeHandler} /></td>) ||
           <td colSpan={4}><input type='file' name='boardImage' onChange={onChangeImageUpload}/></td>}
        </tr>
      </Table>
      <div className="myListBut">
      <SubButton onClick={() => navigate(-1)}>돌아가기</SubButton>
      <MainButton onClick={onClickBoardRegistrationHandler}>등록</MainButton>
      </div>
    </div>
  );
}

export default BoardRegist;
