import {MainButton, ModalDiv} from '../ThemeColor'
import React from 'react';

const Modal = (props) => {
  const { open, close, header } = props;

  return (
    <ModalDiv className={open ? 'openModal' : null}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              x
            </button>
          </header>
        <main>{props.children}</main>
          <footer>
            <MainButton onClick={close}>
              닫기
            </MainButton>
          </footer>
        </section>
      ) : null}
    </ModalDiv>
  );
};

export default Modal;