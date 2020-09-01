import MySiteIcon from './image/iconfinder-MySiteIcon.svg';
import NearSiteIcon from './image/iconfinder-NearSiteIcon.svg';
// Change Icon
const MySiteMarkIcon = {
  url: MySiteIcon,
  scaledSize: new window.google.maps.Size(70, 70),
};
const NearSiteMarkIcon = {
  url: NearSiteIcon,
  scaledSize: new window.google.maps.Size(70, 70),
};

// Get My Current Site (Map Center)
export const getMySite = (map) => {
  const site = { lat: map.getCenter().lat(), lng: map.getCenter().lng() };
  return site;
};

// Create My Site Mark
export const createMySiteMark = (map, site) => {
  const mark = new window.google.maps.Marker({
    position: site,
    map: map,
    icon: MySiteMarkIcon,
  });
  return mark;
};

// Get Near Site
export const getNearSite = (map, site) => {
  // Get Near Site Data
  const getNearSiteData = async (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      return results;
    }
  };
  // Request Setting
  const request = {
    location: site,
    radius: '1000',
    type: ['restaurant'],
  };
  const service = new window.google.maps.places.PlacesService(map);
  service.nearbySearch(request, getNearSiteData);
};

// Create Near Site Mark
export const createNearSiteMark = (map, nearSite) => {
  let nearSiteMark = [];
  nearSite.map(({ geometry, name }) => {
    // Create Mark
    const mark = new window.google.maps.Marker({
      position: geometry.location,
      map: map,
      icon: NearSiteMarkIcon,
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
    return [...nearSiteMark, mark];
  });
  return nearSiteMark;
};

// Clean My Site And Near Site Mark
export const cleanAllMark = (mySiteMark, nearSiteMark) => {
  if (mySiteMark !== null) {
    mySiteMark.setMap(null);
  }
  if (nearSiteMark !== null) {
    nearSiteMark.forEach((elem) => elem.setMap(null));
  }
};

// Default Create Google Map
const createMap = (site, target) => {
  const options = {
    center: site,
    zoom: 16,
  };
  const map = new window.google.maps.Map(target, options);
  return map;
};
export default createMap;
