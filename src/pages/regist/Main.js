import EmpList from '../regist/emp/List'
import ClientList from '../regist/client/List'
import DeptList from '../regist/dept/List'
import PositionList from '../regist/position/List'
import ProductList from '../regist/product/List'
import StorageList from '../regist/storage/List'

import { Main } from '../../components/ThemeColor'

function RegistMain() {

	return (
		<>
			<Main>

				<tr style={{verticalAlign:'top', textAlign:'left'}}>
					<td colspan="3">
						<ProductList/>
					</td>
					<td>
						<StorageList/>
					</td>
					<td>
						<DeptList/>
					</td>
					<td>
						<PositionList/>
					</td>
				</tr>

				<tr style={{verticalAlign:"top", textAlign:'left'}}>
					<td colspan="3">
						<EmpList/>
					</td>
					<td colspan="3">
						<ClientList/>
					</td>
				</tr>


			</Main>
		</>
	);
}

export default RegistMain;





