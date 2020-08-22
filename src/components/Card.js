import React, { useContext } from 'react';
import styled from 'styled-components';
import Star from '../image/iconfinder-star.svg';
import Error from '../image/material-error.svg';
import NearSiteContext from '../ContextApi/NearSiteContext';

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

const Card = ({ data, isInfo, setIsInfo, setSiteInfo }) => {
  const { setCardSite } = useContext(NearSiteContext);
  const { name, rating, vicinity } = data;
  const { lat, lng } = data.geometry.location;
  return (
    <Container
      onClick={(e) => {
        setIsInfo(!isInfo);
        setSiteInfo(data);
        setCardSite({ lat: lat(), lng: lng() });
      }}
    >
      {console.log('render Card')}
      <PlaceInfo>
        <h2>{name}</h2>
        <p>{vicinity}</p>
      </PlaceInfo>
      <h2>{rating}</h2>
      <img src={rating !== null ? Star : Error} alt="error" />
    </Container>
  );
};

export default Card;
