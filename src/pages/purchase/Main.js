import RequestList from './request/List'
import PlaceList from './place/List'
import PurchaseList from './purchase/List'
import StockList from '../stock/List'

function Purchase() {

	return (
		<>
		<table>
			<tr style={{verticalAlign:"top"}}>
				<td>
					<RequestList/>
				</td>
				<td>
					<PlaceList/>
				</td>
				</tr>
			<tr style={{verticalAlign:"top"}}>
				<td>
					<PurchaseList/>
				</td>
				<td>
					<StockList/>
				</td>
				</tr>
			</table>
		</>
	);
}

export default Purchase;