import { combineReducers } from 'redux';
import storageReducer from './StorageModule';
import detailReducer from './DetailModule';
import deptReducer from './DeptModule';
import estimateReducer from './EstimateModule';
import empReducer from './EmpModule';
import positionReducer from './PositionModule';
import productReducer from './ProductModule';
import approvalReducer from './ApprovalModule'
import approvalLineReducer from './ApprovalLineModule'
import boardReducer from './BoardModule';
import clientReducer from './ClientModule';
import loginReducer from './LoginModule';
import ordersReducer from './OrdersModule';
import salesReducer from './SalesModule';
import requestReducer from './RequestModule';
import purchaseReducer from './PurchaseModule';
import placeReducer from './PlaceModule';
import stockReducer from './StockModule';
import todoReducer from './TodoModule';
import workReducer from './WorkModule';
import depositReducer from './DepositModule';
import withdrawReducer from './WithdrawModule';
import scheduleReducer from './ScheduleModule';
import approverReducer from './ApproverModule';
import forwardingReducer from './ForwardingModule';

import instructionReducer from './InstructionModule';

const rootReducer = combineReducers({
  approvalReducer,
  approvalLineReducer,
  approverReducer,

  scheduleReducer,
  boardReducer,
  todoReducer,

  clientReducer,
  empReducer,
  deptReducer,
  positionReducer,
  storageReducer,
  productReducer,

  estimateReducer,
  ordersReducer,
  salesReducer,
  
  requestReducer,
  placeReducer,
  purchaseReducer,

  instructionReducer,
  workReducer,
  forwardingReducer,

  depositReducer,
  withdrawReducer,
  
  stockReducer,
  detailReducer,
  loginReducer
    
});

export default rootReducer;
