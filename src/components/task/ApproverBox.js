import ApprovalStyle from '../../css/Approval.module.css';


function ApproverBox({ empName }) {

  return (
    <div
      className={ApprovalStyle.stampBox}
    // onClick={ () => onClickProductHandler(productCode) }
    >
      <div>{empName}</div>
      <div>
      </div>
      <div></div>
    </div>
  );
}

export default ApproverBox;
