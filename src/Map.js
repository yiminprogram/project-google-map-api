import React, { useRef, useState, useEffect } from 'react';
import MySite from './image/iconfinder-mylocation.svg';
import RestaurantSite from './image/iconfinder-restaurant.svg';
import Search from './Search';
import styled from 'styled-components';

//----------CSS Style----------
const Container = styled.div`
  display: flex;
  height: 100%;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const MapContainer = styled.div`
  flex: 0 1 50%;
  overflow-y: hidden;
`;

//----------Change Default Icon----------
// my location icon
const myIcon = {
  url: MySite,
  scaledSize: new window.google.maps.Size(70, 70),
};
// restaurant icon
const restaurantIcon = {
  url: RestaurantSite,
  scaledSize: new window.google.maps.Size(50, 50),
};

const Map = () => {
  //----------Ref----------
  const mapDiv = useRef();

  //----------State----------
  const [map, setMap] = useState();
  const [mySite, setMySite] = useState({ lat: 25.033951, lng: 121.564655 });
  const [nearSite, setNearSite] = useState();
  const [myMark, setmyMark] = useState();
  const [nearMark, setNearMark] = useState();

  // Initial Map
  useEffect(() => {
    const options = {
      center: { lat: 25.033951, lng: 121.564655 },
      zoom: 16,
    };
    // Create Google Map
    const map = new window.google.maps.Map(mapDiv.current, options);
    map.addListener('dragend', () => {
      setMySite({ lat: map.getCenter().lat(), lng: map.getCenter().lng() });
    });
    // Set Map & My Site
    setMap(map);
  }, []);

  // Update Mark & Update Restaurant
  useEffect(() => {
    if (map === undefined) return;
    // Clearn Origin Mark
    if (myMark !== undefined) myMark.setMap(null);
    if (nearMark !== undefined) nearMark.forEach((item) => item.setMap(null));
    // Add My Mark
    const myNewMark = new window.google.maps.Marker({
      position: mySite,
      map: map,
      icon: myIcon,
    });
    setmyMark(myNewMark);
    // Get Restaurant & Add Restaurant Mark
    const addRestaurantMark = (results) => {
      // Set Restaurant Mark
      let markArray = [];
      results.forEach(({ geometry, name }) => {
        // Create Mark
        const mark = new window.google.maps.Marker({
          position: geometry.location,
          map: map,
          icon: restaurantIcon,
        });
        // Create Info Window
        const info = new window.google.maps.InfoWindow({
          content: `<h3>${name}</h3>`,
        });
        // Add Info Click Event
        mark.addListener('click', () => {
          info.open(map, mark);
          window.setTimeout(() => {
            info.close();
          }, 3000);
        });
        // Push Mark In Temp Array
        markArray.push(mark);
      });
      // Update Restaurant Mark
      setNearSite(results);
      setNearMark(markArray);
    };
    // Get Restaurant Data
    const getRestaurantData = (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        addRestaurantMark(results);
      }
    };
    // Set Request
    const request = {
      location: mySite,
      radius: '600',
      type: ['restaurant'],
    };
    // Set Map Place Service
    let service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, getRestaurantData);
  }, [map, mySite]);

  return (
    <Container>
      <MapContainer ref={mapDiv} />
      {map !== undefined && <Search props={{ map, nearSite, setMySite, setNearSite }} />}
    </Container>
  );
};

export default Map;
