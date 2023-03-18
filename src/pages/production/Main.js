import InstructionList from './instruction/List';
import WorkList from './work/WorkList';
import ForwardingList from './forwarding/ForwardingList';
import StockList from '../stock/List'

import { Main } from '../../components/ThemeColor'

function Production() {
	return (
		<>
		<table>
			<tr style={{verticalAlign:"top"}}>
				<td>
					<InstructionList/>
				</td>
				<td>
					<WorkList/>
				</td>
			</tr>
			<tr style={{verticalAlign:"top"}}>
				<td>
					<ForwardingList/>
				</td>
				<td>
					<StockList/>
				</td>
				</tr>
			</table>
		</>
	);
}

export default Production;