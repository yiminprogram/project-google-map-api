import React from 'react';
import styled from 'styled-components';
import Star from './image/iconfinder-star.svg';

//----------CSS Style----------
const Container = styled.div`
  cursor: pointer;
  color: #ffffffaa;
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 1.5em;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
  > h2 {
    flex: 2;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #ffffffaa;
  }
  > img {
    flex: 1;
    width: 13%;
  }

  &:hover {
    background-color: #ffffff25;
    transform: translate(-5%, -5%);
  }
`;

const PlaceInfo = styled.div`
  flex: 6;
  margin-right: 1em;
  > h2 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.8em;
    line-height: 1.5;
  }
  > p {
    font-size: 0.8rem;
  }
`;

const Card = ({ name, rating, vicinity }) => {
  return (
    <Container>
      <PlaceInfo>
        <h2>{name}</h2>
        <p>{vicinity}</p>
      </PlaceInfo>
      <h2>{rating}</h2>
      <img src={Star} alt="error" />
    </Container>
  );
};

export default Card;
