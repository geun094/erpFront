import { useLocation } from 'react-router-dom';
import { useState, useEffect } from    'react';

import RegistNavbar     from     '../navbar/RegistNavbar';
import TaskNavbar       from       '../navbar/TaskNavbar';
import AccountNavbar    from    '../navbar/AccountNavbar';
import BusinessNavbar   from   '../navbar/BusinessNavbar';
import PurchaseNavbar   from   '../navbar/PurchaseNavbar';
import ProductionNavbar from '../navbar/ProductionNavbar';
import StockNavbar      from      '../navbar/StockNavbar';

function Navbar() {
  const location = useLocation(); // 현재 페이지의 주소정보를 가져 옴
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  let NavbarHandler;

  switch (true) {
    case pathname.startsWith('/regist')     : NavbarHandler = <RegistNavbar/>    ; break;  // startsWith를 통해 일치하는 url에 대응
    case pathname.startsWith('/business')   : NavbarHandler = <BusinessNavbar/>  ; break;
    case pathname.startsWith('/purchase')   : NavbarHandler = <PurchaseNavbar/>  ; break;
    case pathname.startsWith('/production') : NavbarHandler = <ProductionNavbar/>; break;
    case pathname.startsWith('/stock')      : NavbarHandler = <StockNavbar/>     ; break;
    case pathname.startsWith('/account')    : NavbarHandler = <AccountNavbar/>   ; break;
    case pathname.startsWith('/task')       : NavbarHandler = <TaskNavbar/>      ; break;
    default                                 : NavbarHandler = null               ; break;
  }
  return NavbarHandler;
}
export default Navbar;