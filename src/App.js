import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Layout from './layouts/Layout';

/* 메인 */
import Main from './pages/main/Main';
import ChangeTheme from './pages/main/ChangeTheme';
import MyPage from './pages/main/MyPage';
import Login from './pages/main/Login';

/* 기초 */
import Regist from './pages/regist/Main';

import EmpList from './pages/regist/emp/List';
import EmpRegist from './pages/regist/emp/Regist';
import EmpDetail from './pages/regist/emp/Detail';
import DeptSelectList from './components/regist/DeptSelectList';

import DeptList from './pages/regist/dept/List';
import DeptSearch from './pages/regist/dept/Search';
import DeptRegist from './pages/regist/dept/Regist';
import DeptDetail from './pages/regist/dept/Detail';

import PositionList from './pages/regist/position/List';
import PositionSearch from './pages/regist/position/Search';
import PositionRegist from './pages/regist/position/Regist';
import PositionDetail from './pages/regist/position/Detail';

import ProductList from './pages/regist/product/List';
import ProductSearch from './pages/regist/product/Search';
import ProductRegist from './pages/regist/product/Regist';
import ProductDetail from './pages/regist/product/Detail';

import StorageList from './pages/regist/storage/List';
import StorageSearch from './pages/regist/storage/Search';
import StorageRegist from './pages/regist/storage/Regist';
import StorageDetail from './pages/regist/storage/Detail';

import ClientList from './pages/regist/client/List';
import ClientSearch from './pages/regist/client/Search';
import ClientRegist from './pages/regist/client/Regist';
import ClientDetail from './pages/regist/client/Detail';


/* 영업 */
import Business from './pages/business/Main';

import EstimateList from './pages/business/estimate/List';
import EstimateSearch from './pages/business/estimate/Search';
import EstimateRegist from './pages/business/estimate/Regist';
import EstimateDetail from './pages/business/estimate/Detail';

import OrdersList from './pages/business/orders/List';
import OrdersRegist from './pages/business/orders/Regist';
import OrdersDetail from './pages/business/orders/Detail';

import SalesList from './pages/business/sales/List';
import SalesRegist from './pages/business/sales/Regist';
import SalesDetail from './pages/business/sales/Detail';

/* 구매 */
import Purchase from './pages/purchase/Main';

import RequestList from './pages/purchase/request/List';
import RequestSearch from './pages/purchase/request/Search';
import RequestRegist from './pages/purchase/request/Regist';
import RequestDetail from './pages/purchase/request/Detail';

import PlaceList from './pages/purchase/place/List';
import PlaceRegist from './pages/purchase/place/Regist';
import PlaceDetail from './pages/purchase/place/Detail';

import PurchaseList from './pages/purchase/purchase/List';
import PurchaseRegist from './pages/purchase/purchase/Regist';
import PurchaseDetail from './pages/purchase/purchase/Detail';

/* 생산 */
import Production from './pages/production/Main';

import InstructionList from './pages/production/instruction/List';
import InstructionRegist from './pages/production/instruction/Regist';
import InstructionDetail from './pages/production/instruction/Detail';

import ReceivingList from './pages/production/ReceivingList';
import ReceivingRegist from './pages/production/ReceivingRegist';

import WorkList from './pages/production/work/WorkList';

import ForwardingList from './pages/production/forwarding/ForwardingList';

/* 재고 */

import StockList from './pages/stock/List';
import StockStorage from './pages/stock/Storage';
import StockDetail from './pages/stock/Detail';

/* 회계 */
import Account from './pages/account/Main';

import DepositList from './pages/account/deposit/List';
import DepositRegist from './pages/account/deposit/Regist';
import WithdrawList from './pages/account/withdraw/List';
import WithdrawRegist from './pages/account/withdraw/Regist';

/* 업무 */
import Task from './pages/task/Main';

import ScheduleList from './pages/task/schedule/List';
import ScheduleRegist from './pages/task/schedule/Regist';
import ScheduleDetail from './pages/task/schedule/Detail';

import ApprovalList from './pages/task/approval/List';
import ApprovalRegist from './pages/task/approval/Regist';
import ApproverSelect from './components/task/ApproverSelect';
import ApprovalDetail from './pages/task/approval/Detail';
import ApprovalSearch from './pages/task/approval/Search';

import MyApprovalList from './pages/task/approval/MyList';
import ApprovalWaitingList from './pages/task/approval/WaitingList';
import ApprovalDoneList from './pages/task/approval/DoneList';
import ApprovalDraft from './pages/task/approval/Draft';
import ApprovalModify from './pages/task/approval/Modify';
import SignOff from './pages/task/approval/SignOff';
import Stamp from './pages/task/approval/Stamp';

import BoardList from './pages/task/board/List';
import BoardSearch from './pages/task/board/Search';
import BoardRegist from './pages/task/board/Regist';
import BoardDetail from './pages/task/board/Detail';

import MyBoardList from './pages/task/board/MyList'
import MyBoardDetail from './pages/task/board/MyDetail';
import TodoList from './pages/task/todo/List';
import TodoRegist from './pages/task/todo/Regist';
import TodoDetail from './pages/task/todo/Detail';
import TodoSearch from './pages/task/todo/Search';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}>
        <Route index element={<Login/>}/>

        </Route>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Main/>}/>
          <Route path="changeTheme" element={<ChangeTheme/>}/>
          <Route path="myPage" element={<MyPage/>}/>
        </Route>

        <Route path="/" element={<Layout/>}>

          <Route path="regist">
            <Route index element={<Regist/>}/>

            <Route path="emp">
              <Route path="list" element={<EmpList/>}/>
              <Route path="regist" element={<EmpRegist/>}/>
              <Route path="detail" element={<EmpDetail/>}/>
              <Route path="showDepts" element={<DeptSelectList/>}/>
            </Route>

            <Route path="dept">
              <Route path="list" element={<DeptList/>}/>
              <Route path="regist" element={<DeptRegist/>}/>
              <Route path="detail/:deptCode" element={<DeptDetail/>}/>
              <Route path="search" element={<DeptSearch/>}/>
            </Route>

            <Route path="position">
              <Route path="list" element={<PositionList/>}/>
              <Route path="regist" element={<PositionRegist/>}/>
              <Route path="search" element={<PositionSearch/>}/>
              <Route path="detail/:positionCode" element={<PositionDetail/>}/>
            </Route>

            <Route path="product">
              <Route path="list" element={<ProductList/>}/>
              <Route path="regist" element={<ProductRegist/>}/>
              <Route path="detail/:productCode" element={<ProductDetail/>}/>
              <Route path="search" element={<ProductSearch/>}/>
            </Route>

            <Route path="storage">
              <Route path="list" element={<StorageList/>}/>
              <Route path="search" element={<StorageSearch/>}/>
              <Route path="regist" element={<StorageRegist/>}/>
              <Route path="detail/:storageCode" element={<StorageDetail/>}/>
            </Route>

            <Route path="client">
              <Route path="list" element={<ClientList/>}/>
              <Route path="regist" element={<ClientRegist/>}/>
              <Route path="search" element={<ClientSearch/>}/>
              <Route path="detail/:clientCode" element={<ClientDetail/>}/>
            </Route>

          </Route>

          <Route path="business">
            <Route index element={<Business/>}/>

            <Route path="estimate">
              <Route path="list" element={<EstimateList/>}/>
              <Route path="search" element={<EstimateSearch/>}/>
              <Route path="regist" element={<EstimateRegist/>}/>
              <Route path="detail/:estimateCode" element={<EstimateDetail/>}/>
            </Route>

            <Route path="orders">
              <Route path="list" element={<OrdersList/>}/>
              <Route path="regist" element={<OrdersRegist/>}/>
              <Route path="detail/:ordersCode" element={<OrdersDetail/>}/>
            </Route>

            <Route path="sales">
              <Route path="list" element={<SalesList/>}/>
              <Route path="regist" element={<SalesRegist/>}/>
              <Route path="detail/:salesCode" element={<SalesDetail/>}/>
            </Route>

          </Route>

          <Route path="purchase">
            <Route index element={<Purchase/>}/>

            <Route path="request">
              <Route path="list" element={<RequestList/>}/>
              <Route path="search" element={<RequestSearch/>}/>
              <Route path="regist" element={<RequestRegist/>}/>
              <Route path="detail/:requestCode" element={<RequestDetail/>}/>
            </Route>

            <Route path="place">
              <Route path="list" element={<PlaceList/>}/>
              <Route path="regist" element={<PlaceRegist/>}/>
              <Route path="detail/:placeCode" element={<PlaceDetail/>}/>
            </Route>

            <Route path="purchase">
              <Route path="list" element={<PurchaseList/>}/>
              <Route path="regist" element={<PurchaseRegist/>}/>
              <Route path="detail/:purchaseCode" element={<PurchaseDetail/>}/>
            </Route>

          </Route>

          <Route path="production">
            <Route index element={<Production/>}/>

            <Route path="instruction">
              <Route path="list" element={<InstructionList/>}/>
              <Route path="regist" element={<InstructionRegist/>}/>
              <Route path="detail/:instructionCode" element={<InstructionDetail/>}/>
            </Route>
            
            <Route path="InstructionList" element={<InstructionList/>}/>
            <Route path="InstructionRegist" element={<InstructionRegist/>}/>
            <Route path="ReceivingList" element={<ReceivingList/>}/>
            <Route path="ReceivingRegist" element={<ReceivingRegist/>}/>
            <Route path="WorkList" element={<WorkList/>}/>
            <Route path="ForwardingList" element={<ForwardingList/>}/>
          </Route>

          <Route path="account">
            <Route index element={<Account/>}/>

            <Route path="deposit">
              <Route path="list" element={<DepositList/>}/>
              <Route path="regist" element={<DepositRegist/>}/>
            </Route>
            <Route path="withdraw">
              <Route path="list" element={<WithdrawList/>}/>
              <Route path="regist" element={<WithdrawRegist/>}/>
            </Route>

          </Route>

          <Route path="task">
            <Route index element={<Task/>}/>
            <Route path="approval">
              <Route path="regist" element={<ApprovalRegist/>}/>
              <Route path="select" element={<ApproverSelect/>}/>
              <Route path="list" element={<ApprovalList/>}/>
              <Route path="mylist" element={<MyApprovalList/>}/>
              <Route path="search" element={<ApprovalSearch/>}/>
              <Route path="detail/:approvalCode" element={<ApprovalDetail/>}/>
              <Route path="waiting" element={<ApprovalWaitingList/>}/>
              <Route path="done" element={<ApprovalDoneList/>}/>
              <Route path="draft" element={<ApprovalDraft/>}/>
              <Route path="modify/:approvalCode" element={<ApprovalModify/>}/>
              <Route path="signoff/:approvalCode" element={<SignOff/>}/>
              <Route path="stamp" element={<Stamp/>}/>
            </Route>

            <Route path="schedule">
              <Route path="list" element={<ScheduleList/>}/>
              <Route path="regist" element={<ScheduleRegist/>}/>
              <Route path="detail/:scheduleCode" element={<ScheduleDetail/>}/>
            </Route>

            <Route path="board">
              <Route path="list" element={<BoardList/>}/>
              <Route path="detail/:boardCode" element={<BoardDetail/>}/>
              <Route path="regist" element={<BoardRegist/>}/>
              <Route path="search" element={<BoardSearch />} />
              <Route path="myList" element={<MyBoardList/>}/>
              <Route path="myDetail/:boardCode" element={<MyBoardDetail/>}/>
            </Route>
            <Route path="todo">
              <Route path="list" element={<TodoList/>}/>
              <Route path="detail/:todoCode" element={<TodoDetail/>}/>
              <Route path="regist" element={<TodoRegist/>}/>
              <Route path="search" element={<TodoSearch />} />
            </Route>
          </Route>

          <Route path="stock">
            <Route index element={<StockList/>}/>
            <Route path="list" element={<StockList/>}/>
            <Route path="storage" element={<StockStorage/>}/>
            <Route path="detail" element={<StockDetail/>}/>
          </Route>

        </Route>
      </Routes>

    </BrowserRouter>
    
  );
}

export default App;

