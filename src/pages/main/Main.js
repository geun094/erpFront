import ScheduleList from '../../pages/task/schedule/List'
import StockList from '../stock/List'
import BoardList from '../task/board/List'
import EstimateList from '../business/estimate/List'
import ApprovalList from '../task/approval/List'

function Main() {
	return (
		<>
		<table>
			<tr style={{verticalAlign:"top"}}>
				<td>
					<ScheduleList/>
				</td>
				<td>
					<BoardList/>
				</td>
			</tr>
			<tr style={{verticalAlign:"top"}}>
				<td>
					<EstimateList/>
				</td>
				<td>
					<ApprovalList/>
				</td>
				</tr>
			</table>
		</>
	);
}

export default Main;