import React, { useEffect, useRef, useReducer } from 'react';
import styled from 'styled-components';
import { mapContext } from './ContextAPI';
import Map from './Map';
import Search from './Search';
import ErrorBoundary from './Error/ErrorBoundary';
import createMap, { getMySite, createMySiteMark, getNearSite, createNearSiteMark } from './GoogleMapAPI';
import { mapReducer, ACTION, initialState } from './Reducer/MapReducer';

// CSS Style
const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
`;

const App = () => {
  const mapDiv = useRef();
  const [mapState, mapDispatch] = useReducer(mapReducer, initialState);
  const { map, mySite, mySiteMark, nearSiteMark } = mapState;
  // Create Map Object
  useEffect(() => {
    const newMap = createMap(mySite, mapDiv.current);
    mapDispatch({ type: ACTION.MAP, payload: newMap });
    const newMySiteMark = createMySiteMark(newMap, mySite);
    mapDispatch({ type: ACTION.MY_SITE_MARK, payload: newMySiteMark });
  }, []);

  useEffect(() => {
    if (map === null) return;
    map.addListener('dragend', () => {
      mapDispatch({ type: ACTION.CLEAN_ALL_MARK });
      const newMysite = getMySite(map);
      mapDispatch({ type: ACTION.MY_SITE, payload: newMysite });
      const newMySiteMark = createMySiteMark(map, newMysite);
      mapDispatch({ type: ACTION.MY_SITE_MARK, payload: newMySiteMark });
      const newNearSite = getNearSite(map, newMysite);
      mapDispatch({ type: ACTION.NEAR_SITE, payload: newNearSite });
      console.log(newNearSite);
      // const newNearSiteMark = createNearSiteMark(map, newNearSite);
      // mapDispatch({ type: ACTION.NEAR_SITE_MARK, payload: newNearSiteMark });
    });
  }, [map]);

  return (
    <ErrorBoundary>
      {console.log('app render')}
      <Container>
        <mapContext.Provider>
          <Map mapDiv={mapDiv} />
          <Search />
        </mapContext.Provider>
      </Container>
    </ErrorBoundary>
  );
};

export default App;
