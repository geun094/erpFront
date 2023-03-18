import { Table, Div, MainButton, SubButton, Input, FormatDate, FormatNumber } from '../../components/ThemeColor'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { callStockListAPI } from '../../apis/StockAPICalls';
import { callStorageListAPI } from '../../apis/StorageAPICalls';
import { callProductListAPI } from '../../apis/ProductAPICalls';

function StockList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stocks = useSelector(state => state.stockReducer);
  const stockList = stocks.data;

  const storages = useSelector(state => state.storageReducer);
  const storageList = storages.data;

  const products = useSelector(state => state.productReducer);
  const productList = products.data;

  const pageInfo = stocks.pageInfo;

  const [currentPage, setCurrentPage]           = useState(1);
  const [search, setSearch]                     = useState('');

  useEffect(
    () => {
      dispatch(callStockListAPI({
        currentPage: currentPage,
        stockList: stockList
      }));
    }
    ,[currentPage, stockList]
  );

  useEffect(
    () => {
      dispatch(callStorageListAPI({
        currentPage: currentPage
      }));
    }
    ,[currentPage]
  );

  useEffect(
    () => {
      dispatch(callProductListAPI({
        currentPage: currentPage
      }));
    }
    ,[currentPage]
  );

  return (
    <>
      <div className='outlet'>
        <h4>창고별재고</h4>
        <Table>
          <thead>
            <tr>
              <th>품목코드</th>
              <th>품목명</th>
                {Array.isArray(storageList) && storageList.map((storage) => {
                  return <th key={storage.storageCode}>{storage.storageName}</th>
                })}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productList) && productList.map((product) => {
              return (
                <tr key={product?.productCode}>
                  <td>{product?.productCode}</td>
                  <td>{product?.productName}</td>

                  {Array.isArray(storageList) && storageList.map((storage) => {
                    const matchingStocks = stockList.filter(stock =>
                    stock?.product?.productCode === product?.productCode &&
                    stock?.storage?.storageCode === storage?.storageCode
                    );
                    return (
                      <>
                        {matchingStocks.map((stock) => (
                          <td key={`${product?.productCode}-${storage?.storageCode}-${stock.stockCode}`}>
                            {stock.stockAmount || ''}
                          </td>
                        ))}
                      </>
                    );
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default StockList;