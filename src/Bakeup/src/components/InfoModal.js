import React, { useRef } from 'react';
import styled from 'styled-components';
import MySite from '../image/iconfinder-mylocation.svg';
import RestaurantSite from '../image/iconfinder-restaurant.svg';
import SearchSite from '../image/iconfinder-searchmark.svg';
import CloseIcon from '../image/material-close.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isHelp ? 1 : 0)};
  visibility: ${(props) => (props.isHelp ? 'visible' : 'hidden')};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000066;
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  color: #000;
  font-size: 1rem;
  width: 30vw;
  border-radius: 10px;
  padding: 2em;
  line-height: 2;
  background-color: #fff;
`;

const List = styled.ul`
  margin: 1em 0;
  > li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1em;
  }
`;

const CloseBtn = styled.img`
  cursor: pointer;
  position: absolute;
  right: 3%;
  top: 3%;
  width: 5%;
`;

const Modal = React.memo(({ isHelp, setIsHelp }) => {
  const outside = useRef();
  const close = (e) => {
    if (e.target === outside.current) {
      setIsHelp(!isHelp);
    } else {
      console.log('fail');
    }
  };
  return (
    <Container isHelp={isHelp} onClick={close} ref={outside}>
      <Content>
        <CloseBtn src={CloseIcon} onClick={() => setIsHelp(!isHelp)} />
        <h1>[使用說明]</h1>
        <p>可在 [請輸入地址中查詢您的地址] ，移動地圖會即時顯示地圖中之餐廳資訊</p>
        <p>注意：餐廳顯示資訊至多20筆餐廳資訊</p>
        <List>
          <li>
            <img src={MySite} alt="error" />
            <label>當前地圖中心位置</label>
          </li>
          <li>
            <img src={RestaurantSite} alt="error" />
            <label>餐廳位置地點</label>
          </li>
          <li>
            <img src={SearchSite} alt="error" />
            <label>搜尋地點之位置</label>
          </li>
        </List>
      </Content>
    </Container>
  );
});

export default Modal;
