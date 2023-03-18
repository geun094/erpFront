import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callPlaceListAPI, callPlaceDetailAPI,  callPlaceUpdateAPI } from '../../../apis/PlaceAPICalls'

function PlaceList() {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isTrue, setIsTrue] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const place = useSelector(state => state.placeReducer);
	const placeList = place.data;
	const pageInfo = place.pageInfo;
	const pageNumber = [];

	if(pageInfo){
		for(let i = 1; i <= pageInfo.pageEnd; i++){
			pageNumber.push(i);
		}
	}

  /* 체크 선택 핸들러 */
  const onSelectHandler = (e) => {

    const input = document.getElementsByTagName('input');
    console.log(input);

    for(var i = input.length-1; i >= 0; i--) {
      if(e.target.checked === true) {
        input[i].checked = true;
      } else {
        input[i].checked = false;
      }
    }
  }

	/* 진행상태 변경 핸들러 */
  const onClickStatusHandler = () => {

    const selectedPlace = document.getElementsByTagName('input');
    const placeCodes = []
    
    for(var i = selectedPlace.length-1; i >= 0; i--) {
      if(selectedPlace[i].checked === true) {
        if(selectedPlace[i].parentElement.nextElementSibling.innerHTML !== "발주코드") {
          const num = selectedPlace[i].parentElement.nextElementSibling.firstChild.innerHTML;
          placeCodes.push(Number(num))
        }
      }
    }
    if(placeCodes.length > 0) {
      const answer = window.confirm(placeCodes + '상태를 변경하시겠습니까??');
      if(answer === true) {
        dispatch(callPlaceUpdateAPI({placeCodes}));
        setIsUpdated(!isUpdated);
        window.location.reload();
      } else {
        return false;
      }
    } else {
      alert('수정할 발주서를 선택해주세요')
    }
    console.log(placeCodes);
  }
	
	useEffect(
		() => {
			dispatch(callPlaceListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickPlaceRegist = () => {
		console.log('[PlaceRegist] onClickPlaceRegist');
		navigate('/purchase/place/regist', { replace: false })
	}

	const onClickTableTr = (placeCode) => {
		navigate(`/purchase/place/detail/${placeCode}`, { replace : false });
	}

	const openModal = (placeCode) => {
    setModalOpen(
			dispatch(callPlaceDetailAPI({
				placeCode
			}))
		);
  };

  const closeModal = () => {
    setModalOpen(false);
		window.location.reload();
  };

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
				console.log('Enter key', search);
				navigate(`/purchase/place/search?value=${search}`, { replace: false });
				window.location.reload();
		}
  }

  return (
	<>
	<div className='outlet'>
		<h4>발주조회</h4>
			<Input style={{float: "left"}}
			type="text"
			value = { search }
			onKeyUp = { onEnterkeyHandler }
			onChange={ onSearchChangeHandler }
			/>

		<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
			{ Array.isArray(placeList) &&
				<SubButton
				className='activeButton'
				onClick={() => setCurrentPage(currentPage - 1)} 
				disabled={currentPage == 1}
			>
			&lt;
			</SubButton>
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

			{ Array.isArray(placeList) &&
				<SubButton 
					className='activeButton'
					onClick={() => setCurrentPage(currentPage + 1)} 
					disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
				>
					&gt;
				</SubButton>
				}
		</div>

			<Table>
				<thead>
					<tr>
						<th style= {{width: 10}}><input type='checkbox'/></th>
						<th>발주코드</th>
						<th>발주일자</th>
						<th>납기일자</th>
            <th>거래처명</th>
            <th>담당자</th>
            <th>품목명</th>
						<th>발주금액합계</th>
            <th>진행상태</th>
            <th>인쇄</th> 
					</tr>
				</thead>

				<tbody>
					{ Array.isArray(placeList) && placeList.map(( place ) => {
						let totalPrice = 0;
						for (const amountAndPrice of place.placeDetail) {
							totalPrice += amountAndPrice.placeAmount * amountAndPrice.product.productFwdPriceA;
						}
	
						return (
							<tr key={ place?.placeCode }>
								<td style= {{width: 10}} onClick = { () => onSelectHandler }><input type='checkbox'/></td>
								<td onClick = { () => onClickTableTr( place?.placeCode )}>{ place?.placeCode }</td>
								<td onClick = { () => onClickTableTr( place?.placeCode )}>{ FormatDate(place?.placeDate) }</td>
								<td onClick = { () => onClickTableTr( place?.placeCode )}>{ FormatDate(place?.placeDelivery) }</td>
								<td>{ place?.client?.clientName }</td>
								<td>{ place?.emp?.empName }</td>
								<td>
									{place?.placeDetail?.length > 1 ? 
									(place?.placeDetail[0]?.product?.productName + " 외 " + (place?.placeDetail?.length - 1) + " 건")
									: (place?.placeDetail[0]?.product?.productName)
									}
								</td>
								<td>{ FormatNumber ( totalPrice )}</td>
								<td>{ place?.placeStatus }</td>
								<td><a href=''>인쇄</a></td>
							</tr>
						)
					})}

				</tbody>
			</Table>
				<MainButton className='mainButton' onClick={ onClickPlaceRegist }>신규</MainButton>
				<SubButton className='subButton' onClick={ onClickStatusHandler }>진행상태변경</SubButton>
				<SubButton className='subButton'>인쇄</SubButton>
				<SubButton className='subButton'>전자결재</SubButton>
				<SubButton className='subButton'>엑셀</SubButton>
		</div>
		
		</>
	);
}

export default PlaceList;
