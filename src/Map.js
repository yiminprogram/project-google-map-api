import React from 'react';
import styled from 'styled-components';

// CSS Style
const Container = styled.div`
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
`;

const Map = React.memo(({ mapDiv }) => {
  return <Container ref={mapDiv}>{console.log('map render')}</Container>;
});

export default Map;
