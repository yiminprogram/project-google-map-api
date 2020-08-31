import React from 'react';
import styled from 'styled-components';
import PageNotFound from '../image/undraw-page not found.svg';

const Container = styled.div`
  width: 70%;
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Information = styled.div`
  flex: 1;
  margin: 2em;

  > h1 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 2em;
  }

  > a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 700;
    color: #233d4d;
    border: 3px solid #233d4d;
    padding: 0.5em 1em;
    border-radius: 10px;

    &:hover {
      color: #fff;
      background-color: #233d4d;
    }
  }
`;
const ErrorImage = styled.div`
  flex: 1;
  margin: 2em;

  > img {
    width: 100%;
  }
`;
const ErrorPage = () => {
  return (
    <Container>
      <Information>
        <h1>頁面出錯，請檢查網路連線</h1>
        <h1>如問題未解決請稍後再試</h1>
        <a href="https://github.com/yiminprogram/project-google-map-api">GitHub頁面</a>
      </Information>
      <ErrorImage>
        <img src={PageNotFound} alt="error" />
      </ErrorImage>
    </Container>
  );
};

export default ErrorPage;
