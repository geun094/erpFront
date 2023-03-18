import { Table, MainButton, SubButton, Input, FormatNumber } from '../../../components/ThemeColor'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageSearch from "../../../images/search.png";

import {
  callPositionListAPI,
  callPositionsDeleteAPI,
} from "../../../apis/PositionAPICalls";

function PositionList() {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.positionReducer);
  const positionList = positions.data;
  const navigate = useNavigate();
  const pageInfo = positions.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  const onSelectHandler = (e) => {
    setIsTrue(false);
    const input = document.getElementsByTagName("input");
    // console.log(input.length);
    for (var i = input.length - 1; i >= 0; i--) {
      if (input[0].checked === true) {
        input[i].checked = true;
      } else {
        input[i].checked = false;
      }
    }
  };

  /* 전체 조회 */
  useEffect(() => {
    dispatch(
      callPositionListAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]);

  /* 등록 */
  const onClickPositionRegist = () => {
    console.log("[PositionRegist] onClickPositionRegist");
    navigate("/regist/position/regist", { replace: false });
  };

  /* 수정 */
  const onClickTableTr = (positionCode) => {
    navigate(`/regist/position/detail/${positionCode}`, { replace: false });
  };

  /* 삭제 */
  const onClickDeleteHandler = () => {
    const selectedPosition = document.getElementsByTagName("input");
    const positionCodes = [];

    for (var i = selectedPosition.length - 1; i >= 0; i--) {
      if (selectedPosition[i].checked === true) {
        if (
          selectedPosition[i].parentElement.nextElementSibling.innerHTML !==
          "직급코드"
        ) {
          positionCodes.push(
            selectedPosition[i].parentElement.nextElementSibling.innerHTML
          );
        }
      }
    }
    console.log(positionCodes);
    dispatch(
      callPositionsDeleteAPI({
        positionCodes,
      })
    );

    alert("직급 복수 삭제 완료");
    navigate("/regist/position/list", { replace: true });
    window.location.reload();
  };

  /* 검색 */

  const openModal = (positionCode) => {
    setModalOpen(`/regist/position/detail/${positionCode}`, { replace: false });
  };

  const closeModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onEnterkeyHandler = (e) => {
    if (e.key == "Enter") {
      console.log("Enter key", search);
      navigate(`/regist/position/search?value=${search}`, { replace: false });
      window.location.reload();
    }
  };

  return (
    <>
    <div className='outlet'>
        <h4>직급조회</h4>
        <Input style={{ float:"left"}}
          type="text"
          value={search}
          onKeyUp={onEnterkeyHandler}
          onChange={onSearchChangeHandler}
          placeholder="입력후[Enter]"
        />

      <div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
        {Array.isArray(positionList) && (
          <SubButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </SubButton>
        )}

        {pageNumber.map((num) => (
          <li key={num} onClick={() => setCurrentPage(num)}>
            {currentPage === num ? (
              <MainButton>{num}</MainButton>
            ) : (
              <SubButton>{num}</SubButton>
            )}
          </li>
        ))}
        
        {Array.isArray(positionList) && (
          <SubButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
          >
            &gt;
          </SubButton>
        )}
      </div>

        <Table>
          <thead>
            <tr>
              <th style={{ width: 10 }}>
                <input type="checkbox" onChange={onSelectHandler} />
              </th>
              <th>직급코드</th>
              <th>직급명</th>
              <th>직급수당</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(positionList) &&
              positionList.map((position) => (
                <tr key={position.positionCode}>
                  <td style={{width: 10}}><input type="checkbox"/></td>
                  <td onClick={() => onClickTableTr(position.positionCode)}>{position.positionCode}</td>
                  <td onClick={() => onClickTableTr(position.positionCode)}>{position.positionName}</td>
                  <td onClick={() => onClickTableTr(position.positionCode)}>{FormatNumber(position.positionSalary)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
          <MainButton onClick={onClickPositionRegist}>신규</MainButton>
          <SubButton onClick={onClickDeleteHandler}>삭제</SubButton>
    </div>
    </>
  );
}

export default PositionList;
