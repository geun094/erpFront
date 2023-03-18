import { Navbar } from '../components/ThemeColor'
import { NavLink } from 'react-router-dom';

function TaskNavbar() {
	return (
    <Navbar>


      <div className='link'>
        <h3>일정<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/schedule/list">일정조회</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/schedule/regist">일정등록</NavLink><br />
      </div>

      <div className='link'>
        <h3>전자결재<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/approval/regist"  >기안서작성</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/approval/mylist"  >결재목록</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/approval/waiting" >대기중인결재</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/approval/draft"   >임시저장문서</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/approval/stamp"   >도장등록</NavLink><br />
      </div>

      <div className='link'>
        <h3>게시판<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/board/list">게시판보기</NavLink><br />
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/board/regist">게시판등록</NavLink><br />
      </div>

      <div className='link'>
        <h3>업무<hr /></h3>
        <NavLink className={({ isActive }) => isActive ? "active" : "inactive"} to="/task/todo/List">업무조회</NavLink><br />
      </div>

    </Navbar>
  );
}

export default TaskNavbar;