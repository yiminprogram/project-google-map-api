import MySiteIcon from '../image/iconfinder-MySiteIcon.svg';
import NearSiteIcon from '../image/iconfinder-NearSiteIcon.svg';

// Initial State
export const initialState = {
  map: null,
  mySite: { lat: 25.033951, lng: 121.564655 },
  myMark: null,
  nearSite: null,
  nearMark: null,
};

// Action
export const ACTION = {
  CREATE_MAP: 'CREATE_MAP',
  UPDATE_SITE_AND_MARK: 'UPDATE_SITE_AND_MARK',
  CREATE_NEAR_SITE_AND_MARK: 'CREATE_NEAR_SITE_AND_MARK',
};

// Change Icon
const MySiteMarkIcon = {
  url: MySiteIcon,
  scaledSize: new window.google.maps.Size(70, 70),
};
const NearSiteMarkIcon = {
  url: NearSiteIcon,
  scaledSize: new window.google.maps.Size(70, 70),
};

// Create Near Site
const createNearSiteMark = (state) => {
  // Set Request
  const request = {
    location: state.mySite,
    radius: '1000',
    type: ['restaurant'],
  };
  // Get Near Site Data
  const getNearSiteData = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      let tempArray = [];
      results.forEach(({ geometry, name }) => {
        // Near Site Mark
        const mark = new window.google.maps.Marker({
          position: geometry.location,
          map: state.map,
          icon: NearSiteMarkIcon,
        });
        // Near Site Info Window
        const info = new window.google.maps.InfoWindow({
          content: `<h3>${name}</h3>`,
        });
        // Info Window Event
        mark.addListener('click', () => {
          info.open(state.map, mark);
          window.setTimeout(() => {
            info.close();
          }, 3000);
        });
        // Push Mark in TempArray
        tempArray.push(mark);
      });
      return { ...state, nearSite: results, nearMark: tempArray };
    }
  };
  // Set Map Place Service
  const service = new window.google.maps.places.PlacesService(state.map);
  service.nearbySearch(request, getNearSiteData);
};
// Update My Site
const updateMySite = (state, centerSite) => {
  const myMark = createMyMark(state.map, state.myMark, centerSite);
  return { ...state, mySite: centerSite, myMark: myMark };
};
//======================================================================
// Create My Mark
const createMyMark = (initialState) => {
  const { map, mySite, myMark } = initialState;
  if (myMark !== undefined) myMark.setMap(null);
  const newMark = new window.google.maps.Marker({
    position: mySite,
    map: map,
    icon: MySiteMarkIcon,
  });
  return newMark;
};

// Create Map
const createMap = (state, mapDiv) => {
  const options = {
    center: state.mySite,
    zoom: 16,
  };
  const map = new window.google.maps.Map(mapDiv.current, options);
  const myMark = createMyMark({ map: map, mySite: state.mySite });
  return { ...state, map: map, myMark: myMark };
};

// Update Site And Mark
const updateSiteAndMark = (state, site) => {
  const mark = createMyMark({ map: state.map, mySite: site, myMark: state.myMark });
  return { ...state, mySite: site, myMark: mark };
};

// Reducer
export const mapReducer = (state, action) => {
  switch (action.type) {
    case ACTION.CREATE_MAP:
      return createMap(state, action.mapDiv);
    case ACTION.UPDATE_SITE_AND_MARK:
      return updateSiteAndMark(state, action.site);
    default:
      return state;
  }
};
