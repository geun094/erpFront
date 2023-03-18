import EstimateList from './estimate/List'
import OrdersList from './orders/List'
import SalesList from './sales/List'
import StockList from '../stock/List'

function Business() {

	return (
		<>
		<table>
			<tr style={{verticalAlign:"top"}}>
				<td>
					<EstimateList/>
				</td>
				<td>
					<OrdersList/>
				</td>
			</tr>
			<tr style={{verticalAlign:"top"}}>
				<td>
					<SalesList/>
				</td>
				<td>
					<StockList/>
				</td>
				</tr>
			</table>
		</>
	);
}

export default Business;