import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Schedule, Label } from '../../../components/ThemeColor';
import moment from 'moment';

import { callScheduleListAPI } from '../../../apis/ScheduleAPICalls'

function ScheduleList() {
	const dispatch = useDispatch();
  const navigate = useNavigate();

	const schedules = useSelector(state => state.scheduleReducer)
	const scheduleList = schedules.data

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    dispatch(callScheduleListAPI({}));
    setDate(new Date());
  }, [dispatch]);

  const tileContent = ({ date, view }) => {
    let scheduleTitles = [];
    if(scheduleList) {
      scheduleList.forEach(schedule => {
        if (moment(schedule.startDate).isSame(date, 'day')) {
          scheduleTitles.push(
            <div key={schedule.scheduleCode} onClick={() => navigate(`/task/schedule/detail/${schedule.scheduleCode}`)}>
              <Label>{schedule.scheduleTitle}</Label>
            </div>
          );
        }
      });
      return <div>{scheduleTitles}</div>;
    }
  }

	return (
    <>
      <div className='outlet'>
        <h4>일정조회</h4>
        <Schedule
          scheduleList={scheduleList} 
          calendarType='US'
          formatDay={(locale, date) => moment(date).format("DD")}
          minDetail="month"
          maxDetail="month"
          tileContent={tileContent}/>
      </div>
    </>
	);
}

export default ScheduleList;
