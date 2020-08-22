import React, { useContext } from 'react';
import styled from 'styled-components';
import Back from '../image/material-arrowback.svg';
import Star from '../image/iconfinder-star.svg';
import NearSiteContext from '../ContextApi/NearSiteContext';

//----------CSS Style----------
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.5s ease;
  opacity: ${(props) => (props.isInfo ? 1 : 0)};
  visibility: ${(props) => (props.isInfo ? 'visible' : 'hidden')};
  overflow-y: ${(props) => (props.isInfo ? 'scroll' : 'hidden')};
  scrollbar-color: #ffffff66 transparent;
  &::-webkit-scrollbar {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ffffff66;
  }

  > img {
    cursor: pointer;
    width: 5%;
    border-radius: 50%;
    &:hover {
      background-color: #ffffff66;
    }
  }
`;
const Information = styled.div`
  color: #ffffffaa;
  font-size: 1rem;
  line-height: 3;
  padding: 1em;
  > h1 {
    font-size: 1.1rem;
    font-weight: 700;
  }
  > h2 {
    display: flex;
    align-items: center;
    > img {
      width: 5%;
      margin-left: 1em;
    }
  }
`;

const Panel = styled.div`
  .adp table {
    font-size: 1rem !important;
    font-weight: 700;
    color: #ffffffaa !important;
    line-height: 3;
  }
  .adp-placemark {
    font-weight: 700;
    background-color: transparent !important;
    border: none;
  }
  .adp-substep {
    vertical-align: initial;
    border: none;
  }
  .adp-summary {
    color: #ffffffaa;
    font-weight: 700;
    margin-bottom: 1em;
  }
  .adp-legal {
    margin-right: 1em;
    text-align: right;
    font-size: 0.8rem;
    color: #ffffffaa;
  }
  .adp-marker2 {
    margin-right: 1em;
  }
  .adp-directions {
    width: 90%;
  }
  .adp-maneuver {
    background-color: #ffffffaa;
    border-radius: 50%;
  }
`;

const LocationInfo = ({ isInfo, setIsInfo, siteInfo }) => {
  const { distancePanel, mapRender } = useContext(NearSiteContext);
  const pageBack = () => {
    setIsInfo(!isInfo);
    mapRender.setMap(null);
    mapRender.setPanel(null);
  };
  return (
    <Container isInfo={isInfo}>
      {console.log('render lcoation info')}
      <img src={Back} alt="error" onClick={pageBack} />
      <Information>
        <h1>{siteInfo.name}</h1>
        <p>{siteInfo.vicinity}</p>
        <h2>
          {siteInfo.rating}
          <img src={Star} alt="error" />
        </h2>
      </Information>
      <Panel ref={distancePanel}></Panel>
    </Container>
  );
};

export default LocationInfo;
