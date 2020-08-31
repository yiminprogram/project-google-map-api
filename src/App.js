import React, { useEffect, useRef, useReducer } from 'react';
import styled from 'styled-components';
import { mapContext } from './ContextAPI';
import Map from './Map';
import Search from './Search';
import ErrorBoundary from './Error/ErrorBoundary';
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
  const { map } = mapState;

  // Create Map Object
  useEffect(() => {
    mapDispatch({ type: ACTION.CREATE_MAP, mapDiv: mapDiv });
  }, []);

  // Map Drag Event
  useEffect(() => {
    if (map === null) return;
    map.addListener('dragend', () => {
      const site = { lat: map.getCenter().lat(), lng: map.getCenter().lng() };
      mapDispatch({ type: ACTION.UPDATE_SITE_AND_MARK, site: site });
    });
  }, [map]);

  // Update My Site Mark
  // useEffect(() => {
  //   mapDispatch({ type: ACTION.CREATE_MY_MARK });
  // }, [mySite]);

  return (
    <ErrorBoundary>
      {console.log('app render')}
      <Container>
        <mapContext.Provider value={mapDispatch}>
          <Map mapDiv={mapDiv} />
          <Search />
        </mapContext.Provider>
      </Container>
    </ErrorBoundary>
  );
};

export default App;
