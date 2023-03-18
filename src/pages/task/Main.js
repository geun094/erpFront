import { Main } from '../../components/ThemeColor'

import ScheduleList from '../task/schedule/List'
import ApprovalList from '../task/approval/List'
import BoardList from '../task/board/List'
import TodoList from '../task/todo/List'

function Task() {
	return (

		<>

			<Main>
				<tr style={{verticalAlign:'top', textAlign:'left'}}>
					<td><ScheduleList/></td>
					<td><ApprovalList/></td>
				</tr>
				<tr style={{verticalAlign:'top', textAlign:'left'}}>
					<td>			
				<BoardList/></td>
				<td>
				<TodoList/></td>
				</tr>

			</Main>

		</>
	);
}

export default Task;