import { SubButton, Div, MainButton } from '../../components/ThemeColor';
import ThemeStyle from '../../css/Theme.module.css';
import colors from '../../images/colors.png';
import yellow from '../../images/yellow.png';
import pink from '../../images/pink.png';
import blue from '../../images/blue.png';
import green from '../../images/green.png';
import orange from '../../images/orange.png';
import purple from '../../images/purple.png';
import red from '../../images/red.png';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { callThemeModifyAPI } from '../../apis/LoginAPICalls';

function ChangeTheme() {

  const loginInfo = useSelector(state => state.loginReducer);
  const [selectedColor, setSelectedColor] = useState('');
  const dispatch = useDispatch();

  /* 선택 핸들러 */
  const onSelectHandler = (e) => {
    setSelectedColor(e.target.value);
  }

  /* 테마 적용 버튼 핸들러 */
  const onSaveHandler = () => {
    console.log(!!selectedColor);
    if (!!selectedColor) {
      dispatch(callThemeModifyAPI({
        empCode: loginInfo.empCode,
        color: JSON.stringify(selectedColor).replace(/"/g, '')
      }));
      window.location.reload();
    } else {
      alert('색상을 선택하세요');
      return false;
    }
  }

  return (
    <Div className={ThemeStyle.changeTheme}>
      <h2>테마 변경</h2>

      <div className={ThemeStyle.content}>
        <div>
          <img src={colors} style={{width:80, height:80}} />
          <h4>원하는 테마 색상을 선택하세요.</h4>
        </div>
        <div className={ThemeStyle.selectColor}>

          <div>
            <label for="red">
              <img src={red} />
            </label>
            <div>
              <input
                type="radio"
                id="red"
                name="themeColor"
                value="빨강"
                onChange={onSelectHandler}
              />
              <label for="red">빨강</label>
            </div>
          </div>

          <div>
            <label for="orange">
              <img src={orange} />
            </label>
            <div>
              <input
                type="radio"
                id="orange"
                name="themeColor"
                value="주황"
                onChange={onSelectHandler}
              />
              <label for="orange">주황</label>
            </div>
          </div>

          <div>
            <label for="yellow">
              <img src={yellow} />
            </label>
            <div>
              <input
                type="radio"
                id="yellow"
                name="themeColor"
                value="노랑"
                onChange={onSelectHandler}
              />
              <label for="yellow">노랑</label>
            </div>
          </div>

          <div>
            <label for="green">
              <img src={green} />
            </label>
            <div>
              <input
                type="radio"
                id="green"
                name="themeColor"
                value="초록"
                onChange={onSelectHandler}
              />
              <label for="green">초록</label>
            </div>
          </div>

          <div>
            <label for="blue">
              <img src={blue} />
            </label>
            <div>
              <input
                type="radio"
                id="blue"
                name="themeColor"
                value="파랑"
                onChange={onSelectHandler}
              />
              <label for="blue">파랑</label>
            </div>
          </div>

          <div>
            <label for="purple">
              <img src={purple} />
            </label>
            <div>
              <input
                type="radio"
                id="purple"
                name="themeColor"
                value="보라"
                onChange={onSelectHandler}
              />
              <label for="purple">보라</label>
            </div>
          </div>

          <div>
            <label for="pink">
              <img src={pink} />
            </label>
            <div>
              <input
                type="radio"
                id="pink"
                name="themeColor"
                value="분홍"
                onChange={onSelectHandler}
              />
              <label for="pink">분홍</label>
            </div>
          </div>

        </div>
        <div className={ThemeStyle.buttonBox}>
          <MainButton onClick={onSaveHandler}>적용하기</MainButton>
        </div>
      </div>
    </Div>
  );
}

export default ChangeTheme;