import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import styled from 'styled-components';

function MainColor() {
  const loginInfo = useSelector(state => state.loginReducer);
  switch (loginInfo.empTheme) {
    case "빨강": return "#881111";
    case "주황": return "#DA8555";
    case "노랑": return "#DDAC2D";
    case "초록": return "#226666";
    case "파랑": return "#115588";
    case "보라": return "#421A83";
    case "분홍": return "#965A5A";
    default: return "#226666";
  }
}

function SubColor() {
  const loginInfo = useSelector(state => state.loginReducer);
  switch (loginInfo.empTheme) {
    case "빨강": return "#F5F1F1";
    case "주황": return "#E9E5E2";
    case "노랑": return "#F1EFE6";
    case "초록": return "#E8EBE7";
    case "파랑": return "#EAEDF0";
    case "보라": return "#E0DDE8";
    case "분홍": return "#F2EFEF";
    default: return "#E8EBE7";
  }
}

function TableColor() {
  const loginInfo = useSelector(state => state.loginReducer);
  switch (loginInfo.empTheme) {
    
    case "빨강": return "#881111";
    case "주황": return "#706354";
    case "노랑": return "#DDAC2D";
    case "초록": return "#226666";
    case "파랑": return "#115588";
    case "보라": return "#421A83";
    case "분홍": return "#965A5A";
    default: return "#226666";
  }
}

export function FormatDate(date) {
  var
    d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
    if(year > 1999){
      year = year % 2000;
    } else {
      year = year % 1900;
    }
  
  if (year < 10)
    year = String('0' + year);
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('/');
}

const FormattedNumber = styled.div`
    text-align: right;
`;
export function FormatNumber(number) {
  if (isNaN(number)) {
    return '';
  }
  const numberFormat = new Intl.NumberFormat('ko-KR');
  return <FormattedNumber>{numberFormat.format(number)}</FormattedNumber>;
}

export const Table = styled.table`
  font-size: 14px;
  text-align: center;
  margin: 1px;
  border-collapse: collapse;
  border-color: ${props => TableColor()};
  tr.border-thick { padding: 5px; border: 1px solid; border-color: ${props => TableColor()}};
  th {
    padding: 5px;
    width: 100px;
    background-color: ${props => TableColor()};
    color: white;
    border-inline-style: solid;
    border-inline-color: white;
    box-sizing: border-box;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
  }

  td {
    padding: 5px;
    border: 1px solid; border-color: ${props => TableColor()}
  }
  
  td input {
    border: none;
    outline: none;
  }

  td input[type="text"] {
    width: 100%;
    border: none;
  }

  td input[type="number"] {
    width: 100%;
    border: none;
    text-align: center;
  }

  td textarea:focus {
    outline: none;
  }

  th:first-child {
    border-left-width: 1px;
    border-left-style: solid;
    border-left-color: ${props => TableColor()}};
  }

  th:last-child {
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: ${props => TableColor()}};
  }

  &:hover {
    cursor: pointer;
  `;


export const Div = styled.div`
  background-color: ${props => SubColor()};}
  display: flex;
  margin-bottom: 15px;
}
`;

export const TableHead = styled.table`
td {padding: 15px;}
margin-top 15px;
margin-left 30px;
margin-right 60px;
margin-bottom 15px;
`;

export const Navbar = styled.div`
  background-color: ${props => SubColor()};};
  min-width: 200px;
  height: 100vh;
  line-height: 25px;

  .link { margin-left: 30px; }
  .link h3 { margin-left: -10px; }

  h5:hover {
  cursor: pointer;
  text-shadow: '2px 2px #000, -2px -2px #000';
  }

  .active {
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
    color: black;
    text-shadow: 2px 2px 4px black;
  }

  .inactive {
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
    color: black
  }
`;

export const Main = styled.table`
  transform: scale(1);
  position: absolute;
  left: 220px;
  top: 120px;
`;

export const MainButton = styled.button`
margin: 1px;
height: 24px;
font-size: 14px;
border: 1px solid;
background-color: ${props => MainColor()};
border-color: ${props => MainColor()};
color: white;
&:hover {
  cursor: pointer;
}
`;

export const SubButton = styled.button`
margin: 1px;
height: 24px;
font-size: 14px;
border: 1px solid;
border-color: ${props => MainColor()};
background-color: ${props => SubColor()};
&:hover {
  cursor: pointer;
}
`;

export const Label = styled.label`
background-color: ${props => MainColor()};
color: white; 
`

export const Input = styled.input`
margin: 1px;
color: black;
border: 1px solid ${props => MainColor()};
font-size: 14px;
height: 21px;
outline: none;

::placeholder {
color: #aaa;
}
`;

export const ModalDiv = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0);

  button {
    cursor: pointer;
  }

  > section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;

    > header {
      border: 1px solid ${props => MainColor()};
      height: 2vh;
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color:  ${props => MainColor()};
      color: white;
      font-weight: bold;

      button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
        border: 0px;
      }
    }

    > main {
      padding: 16px;
      overflow: auto;
      max-height: 80vh;
      border-left: 1px solid ${props => MainColor()};
      border-right: 1px solid ${props => MainColor()};
    }

    > footer {
      border-left: 1px solid ${props => MainColor()};
      border-right: 1px solid ${props => MainColor()};
      border-bottom: 1px solid ${props => MainColor()};
      padding: 12px 16px;
      text-align: right;

      button {
        height: 24px;
        font-size: 14px;
        border: 1px solid;
        background-color: ${props => MainColor()};
        border-color: ${props => MainColor()};
        color: white;
      }
    }
  }

  &.openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.3s;
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Schedule = styled(Calendar)`
margin: auto;
margin-top: 50px;
border: 1px solid ${props => MainColor()};
padding: 20px;

.react-calendar__navigation {
  display: flex;

  .react-calendar__navigation__label {
    font-size: 15px;
    background-color: ${props => SubColor()};
  }

  .react-calendar__navigation__arrow {
    font-size: 15px;
    flex-grow: 0.333;
    background-color: ${props => SubColor()};
  }
}

/* ~~~ label styles ~~~ */
.react-calendar__month-view__weekdays {
  text-align: center;
  font-size: 15px;
}

/* ~~~ button styles ~~~ */
button {
  margin: 3px;
  border: 0;

  &:hover {
    border: 1px solid ${props => MainColor()};
  }

  &:active {
  }
}

/* ~~~ day grid styles ~~~ */
.react-calendar__month-view__days {
  position: relative;
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  .react-calendar__tile {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 5vw;
    min-height: 10vh;
    font-size: 1em;
  }

}

.react-calendar__month-view__weekdays__weekday {
  color: ${props => MainColor()};
}

.react-calendar__month-view__weekdays__weekday:nth-child(1) {
    color: red;
}
.react-calendar__month-view__weekdays__weekday:nth-child(7) {
    color: blue;
}

.react-calendar__tile{
    color: ${props => MainColor()};
}

/* ~~~ neighboring month & weekend styles ~~~ */
.react-calendar__month-view__days__day--neighboringMonth {
  opacity: 0.7;
}
.react-calendar__month-view__days__day:nth-child(7n-6) {
  color: red;
  }
  
  .react-calendar__month-view__days__day:nth-child(7n) {
  color: blue;
  }

/* ~~~ active day styles ~~~ */
.react-calendar__tile--range {
    box-shadow: 0 0 6px 2px ${props => MainColor()};
    color: darkgray;
}
`;

