import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from './image/material-search.svg';
import Img from './image/material-restaurant.svg';
import SearchlocationIcon from './image/iconfinder-searchmark.svg';
import Card from './Card';
import FilterIcon from './image/material-filter.svg';

//----------CSS Style----------
const Container = styled.div`
  flex: 0 1 50%;
  height: 100%;
  overflow-y: scroll;
  background: linear-gradient(330deg, #320d8c, #230669);
  color: #fff;
  padding: 3em;
  position: relative;
  overflow-y: scroll;

  &::before {
    content: '';
    position: absolute;
    background-image: url(${Img});
    background-repeat: no-repeat;
    background-size: contain;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    filter: opacity(0.1);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5em;
  letter-spacing: 0.5em;
`;

const Form = styled.form`
  margin-bottom: 1em;
`;

const UserInput = styled.div`
  position: relative;
  border-bottom: 3px solid #ffffff66;
  > input {
    width: 90%;
    font-size: 1.3rem;
    color: #eb663e;
    background-color: transparent;
    border: none;
    &:focus {
      outline: none;
      & + .place-label {
        color: #eb663e;
      }
    }
    &:focus,
    &:valid {
      & + .place-label {
        top: -100%;
        left: 0;
      }
    }
  }
  > label {
    cursor: text;
    color: #ffffff66;
    font-size: 1rem;
    font-weight: 700;
    position: absolute;
    top: 20%;
    left: 1%;
    transition: 0.5s;
  }
  > button {
    cursor: pointer;
    position: absolute;
    top: 20%;
    right: 0;
    background-color: transparent;
    border: none;
    width: 10%;
    height: 60%;
    &:active {
      outline: none;
    }
    > img {
      width: 100%;
      height: 100%;
    }
  }
  &:focus-within {
    border-bottom: 3px solid #eb663e;
  }
`;

const Filter = styled.div`
  margin-bottom: 0.5em;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > button {
    cursor: pointer;
    color: #ffffff66;
    background-color: transparent;
    border: 3px solid #ffffff66;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.3em 1em;
    position: relative;

    > img {
      margin-left: 0.5em;
    }
    > ul {
      position: absolute;
      width: 100%;
      opacity: ${(props) => (props.filterState ? 1 : 0)};
      visibility: ${(props) => (props.filterState ? 'visible' : 'hidden')};
      top: 110%;
      right: 0;
      background-color: #2abf70;
      border-radius: 10px;
      color: #fff;
      /* padding: 0.5em 1em 0 1em; */
      z-index: 1;
      font-weight: 700;
      font-size: 1rem;
      transition: 0.5s;
      > li {
        border-radius: 10px;
        padding: 0.5em 0;

        &:hover {
          background-color: #ffffff66;
        }
      }
    }
    &:focus {
      outline: none;
    }
  }
`;

//----------Change Default Icon----------
// my location icon
const searchIcon = {
  url: SearchlocationIcon,
  scaledSize: new window.google.maps.Size(70, 70),
};

const Search = React.memo((props) => {
  //----------Destructuring Assignment----------
  const { map, nearSite, setMySite, setNearSite } = props.props;
  //----------Ref----------
  const userInput = useRef();

  //----------State----------
  const [searchLocation, setSearchLocation] = useState();
  const [searchMark, setSearchMark] = useState();
  const [filterState, setFilterState] = useState(false);

  // add search place mark
  useEffect(() => {
    if (searchLocation === undefined) return;
    if (searchMark !== undefined) {
      setSearchMark((item) => item.setMap(null));
    }
    setSearchMark(
      new window.google.maps.Marker({
        position: searchLocation,
        map: map,
        icon: searchIcon,
      })
    );
    setMySite(searchLocation);
  }, [searchLocation]);

  // Submit Event
  const SearchPlace = (e) => {
    e.preventDefault();
    // set google map geocoder
    const geocoder = new window.google.maps.Geocoder();
    // get user input address location
    const geocodeAddress = (geocoder, map) => {
      const address = userInput.current.value;
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          const { lat, lng } = results[0].geometry.location;
          setSearchLocation({ lat: lat(), lng: lng() });
          map.setCenter(results[0].geometry.location);
          map.setZoom(16);
        } else {
          alert(`載入失敗，原因為${status}`);
        }
      });
    };
    geocodeAddress(geocoder, map);
  };

  // Filter List Method
  const showList = () => {
    setFilterState(!filterState);
  };
  const filterName = (e) => {
    if (e.target.textContent === '評價最高') {
      nearSite.sort((a, b) => (a.rating > b.rating ? -1 : b.rating > a.rating ? 1 : 0));
      setNearSite(nearSite);
    }
  };
  return (
    <Container>
      <Title>餐廳搜尋</Title>
      <Form>
        <UserInput>
          <input ref={userInput} id="place" type="text" required />
          <label className="place-label" htmlFor="place">
            請輸入地點
          </label>
          <button onClick={SearchPlace} type="submit">
            <img src={SearchIcon} alt="error" />
          </button>
        </UserInput>
      </Form>
      <Filter filterState={filterState}>
        <button onClick={showList}>
          條件篩選
          <img src={FilterIcon} alt="error" />
          <ul onClick={filterName}>
            <li>評價最高</li>
          </ul>
        </button>
      </Filter>
      {nearSite !== undefined && nearSite.map((elem, idx) => <Card key={idx} {...elem} />)}
    </Container>
  );
});

export default Search;
