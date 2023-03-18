import { Table, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../../components/ThemeColor';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callOrdersListAPI, callOrdersDetailAPI, callOrdersUpdateAPI } from '../../../apis/OrdersAPICalls'

function OrdersList() {

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isTrue, setIsTrue] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const orders = useSelector(state => state.ordersReducer);
	const ordersList = orders.data;
	const pageInfo = orders.pageInfo;
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

    const selectedOrders = document.getElementsByTagName('input');
    const ordersCodes = []
    
    for(var i = selectedOrders.length-1; i >= 0; i--) {
      if(selectedOrders[i].checked === true) {
        if(selectedOrders[i].parentElement.nextElementSibling.innerHTML !== "주문코드") {
          const num = selectedOrders[i].parentElement.nextElementSibling.firstChild.innerHTML;
          ordersCodes.push(Number(num))
        }
      }
    }
    if(ordersCodes.length > 0) {
      const answer = window.confirm(ordersCodes + '상태를 변경하시겠습니까??');
      if(answer === true) {
        dispatch(callOrdersUpdateAPI({ordersCodes}));
        setIsUpdated(!isUpdated);
        window.location.reload();
      } else {
        return false;
      }
    } else {
      alert('수정할 주문서를 선택해주세요')
    }
    console.log(ordersCodes);
  }
	
	useEffect(
		() => {
			dispatch(callOrdersListAPI({
				currentPage: currentPage
			}));
		}
		,[currentPage]
	);

	const onClickOrdersRegist = () => {
		console.log('[OrdersRegist] onClickOrdersRegist');
		navigate('/business/orders/regist', { replace: false })
	}

	const onClickTableTr = (ordersCode) => {
		navigate(`/business/orders/detail/${ordersCode}`, { replace : false });
	}

	const openModal = (ordersCode) => {
    setModalOpen(
			dispatch(callOrdersDetailAPI({
				ordersCode
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
				navigate(`/business/orders/search?value=${search}`, { replace: false });
				window.location.reload();
		}
  }

	return (
		<>
		<div className='outlet'>
			<h4>주문조회</h4>
				<Input style={{float: "left"}}
				type="text"
				value = { search }
				onKeyUp = { onEnterkeyHandler }
				onChange={ onSearchChangeHandler }
				/>

			<div style={{ listStyleType: "none", display: "flex", justifyContent: "right" }}>
				{ Array.isArray(ordersList) &&
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

				{ Array.isArray(ordersList) &&
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
						<th>주문코드</th>
						<th>주문일자</th>
						<th>납기일자</th>
            <th>거래처명</th>
            <th>담당자</th>
            <th>품목명</th>
						<th>주문금액합계</th>
            <th>진행상태</th>
            <th>인쇄</th> 
					</tr>
				</thead>

				<tbody>
					{ Array.isArray(ordersList) && ordersList.map(( orders ) => {
						let totalPrice = 0;
						for (const amountAndPrice of orders.ordersDetail) {
							totalPrice += amountAndPrice.ordersAmount * amountAndPrice.product.productFwdPriceA;
						}
	
						return (
							<tr key={ orders?.ordersCode }>
								<td style= {{width: 10}} onClick = { () => onSelectHandler }><input type='checkbox'/></td>
								<td onClick = { () => onClickTableTr( orders?.ordersCode )}>{ orders?.ordersCode }</td>
								<td onClick = { () => onClickTableTr( orders?.ordersCode )}>{ FormatDate(orders?.ordersDate) }</td>
								<td onClick = { () => onClickTableTr( orders?.ordersCode )}>{ FormatDate(orders?.ordersDelivery) }</td>
								<td>{ orders?.client?.clientName }</td>
								<td>{ orders?.emp?.empName }</td>
								<td>
									{orders?.ordersDetail?.length > 1 ? 
									(orders?.ordersDetail[0]?.product?.productName + " 외 " + (orders?.ordersDetail?.length - 1) + " 건")
									: (orders?.ordersDetail[0]?.product?.productName)
									}
								</td>
								<td>{ FormatNumber ( totalPrice )}</td>
								<td>{ orders?.ordersStatus }</td>
								<td><a href=''>인쇄</a></td>
							</tr>
						)
					})}

				</tbody>
			</Table>
				<MainButton className='mainButton' onClick={ onClickOrdersRegist }>신규</MainButton>
				<SubButton className='subButton' onClick={ onClickStatusHandler }>진행상태변경</SubButton>
				<SubButton className='subButton'>인쇄</SubButton>
				<SubButton className='subButton'>전자결재</SubButton>
				<SubButton className='subButton'>엑셀</SubButton>
		</div>
		
		</>
	);
}

export default OrdersList;
