import ApprovalStyle from '../../css/Approval.module.css';


function StampBox({ line: { emp, approvedDate, approveYn } }) {

  // const navigate = useNavigate();

  // const onClickProductHandler = (productCode) => {
  //     navigate(`/product/${productCode}`, { replace: false });
  // }

  /* 날짜 형식 */
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = (d.getFullYear()) % 2000;
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('/');
  }

  const onTestHandler = () => {
    console.log(emp?.empStamp);
  }

  return (
    <div
      className={ApprovalStyle.stampBox}
    // onClick={ () => onClickProductHandler(productCode) }
    >
      <div>{emp?.empName}</div>
      <div>
        {
          (approveYn === 'Y') ?
            (
              (emp.empStamp !== "http://localhost:7777/stampimgs/null") ?
              <img src={emp?.empStamp} style={{ width: 50, height: 50 }} /> :
              <p className={ApprovalStyle.signature}>{emp.empName}</p>) :
            ''
        }
      </div>
      <div>{(approvedDate) ? formatDate(approvedDate) : ''}</div>
    </div>
  );
}

export default StampBox;
