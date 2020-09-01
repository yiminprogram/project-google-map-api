import { cleanAllMark as ClearAllMark } from '../GoogleMapAPI';
// Initial State
export const initialState = {
  map: null,
  mySite: { lat: 25.033951, lng: 121.564655 },
  mySiteMark: null,
  nearSite: null,
  nearSiteMark: null,
};

// Action
export const ACTION = {
  MAP: 'MAP',
  MY_SITE: 'MY_SITE',
  NEAR_SITE: 'NEAR_SITE',
  MY_SITE_MARK: 'MY_SITE_MARK',
  NEAR_SITE_MARK: 'NEAR_SITE_MARK',
  CLEAN_ALL_MARK: 'CLEAN_ALL_MARK',
};

// Map State
const stateMap = (state, payload) => {
  return { ...state, map: payload };
};

// My Site State
const stateMySite = (state, payload) => {
  return { ...state, mySite: payload };
};

// My Site Mark State
const stateMySiteMark = (state, payload) => {
  return { ...state, mySiteMark: payload };
};

// Near Site State
const stateNearSite = (state, payload) => {
  return { ...state, nearSite: payload };
};

// Near Site Mark State
const stateNearSiteMark = (state, payload) => {
  return { ...state, nearSiteMark: payload };
};

// Clear All Mark State
const clearAllMark = (state) => {
  const { mySiteMark, nearSiteMark } = state;
  ClearAllMark(mySiteMark, nearSiteMark);
  return { ...state, mySiteMark: null, nearSiteMark: null };
};
// Reducer
export const mapReducer = (state, action) => {
  switch (action.type) {
    case ACTION.MAP:
      return stateMap(state, action.payload);
    case ACTION.MY_SITE:
      return stateMySite(state, action.payload);
    case ACTION.MY_SITE_MARK:
      return stateMySiteMark(state, action.payload);
    case ACTION.NEAR_SITE:
      return stateNearSite(state, action.payload);
    case ACTION.NEAR_SITE_MARK:
      return stateNearSiteMark(state, action.payload);
    case ACTION.CLEAN_ALL_MARK:
      return clearAllMark(state);
    default:
      return state;
  }
};
