import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Card from './Card';
import LocationInfo from './LocationInfo';
import NearSiteContext from '../ContextApi/NearSiteContext';
const Container = styled.div`
  width: 100%;
  height: 80%;
  position: relative;
`;
const Slide = styled.div`
  width: 100%;
  height: 80%;
`;

const CardList = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.5s ease;
  opacity: ${(props) => (props.isInfo ? 0 : 1)};
  visibility: ${(props) => (props.isInfo ? 'hidden' : 'visible')};
  overflow-y: ${(props) => (props.isInfo ? 'hidden' : 'scroll')};
  scrollbar-color: #ffffff66 transparent;
  &::-webkit-scrollbar {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ffffff66;
  }
`;

const PlaceInfo = () => {
  const [isInfo, setIsInfo] = useState(false);
  const [siteInfo, setSiteInfo] = useState();
  const { nearSite } = useContext(NearSiteContext);
  return (
    <Container>
      <CardList isInfo={isInfo}>
        {nearSite !== undefined && nearSite.map((elem, idx) => <Card key={elem.place_id} isInfo={isInfo} setIsInfo={setIsInfo} data={elem} setSiteInfo={setSiteInfo} />)}
      </CardList>
      {siteInfo !== undefined && <LocationInfo isInfo={isInfo} setIsInfo={setIsInfo} siteInfo={siteInfo} />}
    </Container>
  );
};

export default PlaceInfo;
