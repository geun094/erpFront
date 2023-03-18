import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import {
    callSearchClientAPI,
} from '../../../apis/ClientAPICalls';

function ClientSearch() {

    const { search } = useLocation();
    const { value } = queryString.parse(search);
    const navigate = useNavigate();

    const clients = useSelector(state => state.clientReducer); 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callSearchClientAPI({
            search: value
        }));        
    },
    []);

    const onClickClientDetail = (clientCode) => {
		navigate(`/regist/client/detail/${clientCode}`, { replace: false });
	}

    return (
        <>
            <div>
                <h4>거래처 조회</h4>
                <table border={1} className='clientTable'>
				<thead>
					<tr>
						<th >거래처코드</th>
						<th >대표자명</th>
                        <th >업태</th>
                        <th >전화</th>
                        <th >주소</th>
                        <th >FAX</th>
                        <th >홈페이지</th>
                        <th >거래처명</th>
						<th >담당자명</th>
                        <th >종목</th>
                        <th >모바일</th>
                        <th >이메일</th>
                        <th >계좌번호</th>
						
					</tr>
				</thead>
				<tbody>
					{ clients.length > 0 && clients.map((client) => (
						<tr key={ client.clientCode }
							onClick={ () => onClickClientDetail(client.clientCode)}
						>
							<td>{ client.clientCode }</td>
                            <td>{ client.clientRepresentative }</td>
							<td>{ client.clientType }</td>
                            <td>{ client.clientPhone }</td>
                            <td>{ client.clientAddress }</td>
                            <td>{ client.clientFax }</td>
                            <td>{ client.clientWeb }</td>
                            <td>{ client.clientName }</td>
                            <td>{ client.empName }</td>
							<td>{ client.clientItem }</td>
                            <td>{ client.clientMobile }</td>
                            <td>{ client.clientEmail }</td>
                            <td>{ client.clientAccount }</td>
						</tr>
					))}
				</tbody>
			</table>
			
            </div>
        </>
    );
}

export default ClientSearch;