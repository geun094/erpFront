import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../css/InstructionList.css';

import { callInstructionListAPI }  from '../../../apis/InstructionAPICalls';





function InstructionList() {


  const dispatch = useDispatch();
	const instruction = useSelector(state => state.instructionReducer);
	const instructionList = instruction.data;
	const navigate = useNavigate();
	const pageInfo = instruction.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);


  const pageNumber = [];
	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

    useEffect(
		() => {
			dispatch(callInstructionListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);


    const onClickInstructionRegist = () => {
		console.log('[InstructionRegist] onClickInstructionRegist');
		navigate('/production/instruction/regist', { replace: false })
	}

  const onClickInstructionDetail = (instructionCode) => {
    console.log("123123123::::::"+instructionCode);
		navigate(`/production/instruction/detail/${instructionCode}`, { replace : false, state: instructionCode });
	}

  return (
       <div className="outlet">
          <h4>지시서조회</h4>
          <div style={{ listStyleType: "none", display: "flex", justifyContent: "left" }}>
              { Array.isArray(instructionList) &&
                <button
                
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
              >
              &lt;
              </button>
              }

              {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                  <button  
                    
                    style={ currentPage === num ? {backgroundColor : '#E8EBE7' } : null}
                  >
                    {num}
                  </button>
              </li>
              ))}
              { Array.isArray(instructionList) &&
                <button 
                
                  onClick={() => setCurrentPage(currentPage + 1)} 
                  disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
                >
                  &gt;
                </button>
                }
          </div>


          <Table border={1} className='instructionTable'>
                <thead>
                  <tr>
                    <th >지시번호</th>
                    <th >지시일자</th>
                    <th >납품처명</th>
                    <th >품목명</th>
                    <th >담당자명</th>
                    <th >납기일자</th>
                    <th >지시수량</th>
                    <th >비고</th>
                  </tr>
                </thead>
                <tbody>
                  { Array.isArray(instructionList) && instructionList.map(( instruction ) => (
                    <tr key={ instruction.instructionCode }
                      onClick={ () => onClickInstructionDetail(instruction.instructionCode)}
                    >
                      <td>{ instruction.instructionCode }</td>
                      <td>{ instruction.instructionDate }</td>
                      <td>{ instruction?.client?.clientName }</td>
                      <td>{ instruction?.instructionDetail[0]?.product.productName }</td>
                      <td>{ instruction?.emp?.empName }</td>
                      <td>{ instruction.instructionDelivery }</td>
                      <td>{ instruction?.instructionDetail[0]?.instructionAmount }</td>
                      <td>{ instruction?.instructionDetail[0]?.instructionNote }</td>
                    </tr>
                  ))}
                </tbody>
          </Table>

          <div>
          <MainButton  onClick={ onClickInstructionRegist }>신규</MainButton>
          </div>

      </div>
  );
}

export default InstructionList;