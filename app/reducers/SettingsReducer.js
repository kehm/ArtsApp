/**
 * @file SettingsReduser.js
 * @author Kjetil Fossheim
 */

import * as actionTypes from "../actions/actionTypes";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

/**
 *  DEFAULT_STATE has the collection of empty states in the SettingsReduser.
 *
 * state:
 * -language = language
 * -platform = mobile platform (IOS or Android)
 * -isConnected = network available
 * -debugMode = debugMode flag
 * -lastDownloadDate = timestamp for last download date
 * -keysUpdated = keysUpdated success flag
 * -keysUpdated_loading = key update loading flag
 * -keysFromApi_loading = retrive keys from web api loading flag
 * -keysFromApi_success = retrive keys from web api success flag
 * -deleted = key success deleted flag
 * -latitude = cur latitude
 * -longitude = cur longitude
 * -getLastDownloadDate = getLastDownloadDate flag
 * -updateList = updated keys
 * -deviceTypeAndroidTablet = TRUE if device is android and a tablet(more than 7')
 * @type {Object}
 */
const DEFAULT_STATE = {
  language: "no",
  platform: Platform.OS,
  isConnected: false,
  debugMode: false,
  lastDownloadDate: -1,
  keysUpdated: false,
  keyListUpdated: false,
  keysUpdated_loading: false,
  keysFromApi_loading: false,
  keysFromApi_success: false,
  deleted: false,
  latitude: "undefined",
  longitude: "undefined",
  getLastDownloadDate: false,
  updateList: [],
  deviceTypeAndroidTablet:
    Platform.OS === "android" && DeviceInfo.isTablet() ? true : false
};

export default function(state = DEFAULT_STATE, actions) {
  switch (actions.type) {
    case actionTypes.SET_LANGUAGE:
      return { ...state };
    case `${actionTypes.SET_LANGUAGE}_LOADING`:
      return { ...state };
    case `${actionTypes.SET_LANGUAGE}_SUCCESS`:
      return { ...state, language: actions.payload };
    case `${actionTypes.SET_LANGUAGE}_ERROR`:
      return { ...state, languageError: actions.payload };
    case `${actionTypes.GET_LANGUAGE}_LOADING`:
      return { ...state };
    case `${actionTypes.GET_LANGUAGE}_SUCCESS`:
      return { ...state, language: actions.payload };
    case `${actionTypes.GET_LANGUAGE}_ERROR`:
      return { ...state, languageError: actions.payload };
    case `${actionTypes.SET_LAST_DOWNLOAD}_LOADING`:
      return { ...state };
    case `${actionTypes.SET_LAST_DOWNLOAD}_SUCCESS`:
      return { ...state, lastDownloadDate: actions.payload };
    case `${actionTypes.SET_LAST_DOWNLOAD}_ERROR`:
      return { ...state, lastDownloadDate_error: actions.payload };
    case `${actionTypes.GET_LAST_DOWNLOAD}_LOADING`:
      return { ...state };
    case `${actionTypes.GET_LAST_DOWNLOAD}_SUCCESS`:
      if (typeof actions.payload === "undefined") {
        return { ...state, lastDownloadDate: -1, getLastDownloadDate: true };
      }
      return { ...state, lastDownloadDate: actions.payload };
    case `${actionTypes.GET_LAST_DOWNLOAD}_ERROR`:
      return { ...state, lastDownloadDate_error: actions.payload };
    case actionTypes.GET_LANG_STRINGS:
      return { ...state, strings: actions.strings };
    case actionTypes.UPDATE_CONNECTIVITY:
      return { ...state, isConnected: actions.isConnected };
    case actionTypes.DEBUG_MODE:
      return { ...state, debugMode: actions.debugMode };
    case `${actionTypes.UPDATE_KEYS}_LOADING`:
      return { ...state, keysUpdated_loading: true, keysUpdated: false };
    case `${actionTypes.UPDATE_KEYS}_SUCCESS`:
      return { ...state, keysUpdated: true, keysUpdated_loading: false };
    case `${actionTypes.UPDATE_KEYS}_ERROR`:
      return {
        ...state,
        keysUpdated_error: actions.payload,
        keysUpdated_loading: false
      };
    case `${actionTypes.KEYS_FROM_API}_LOADING`:
      return {
        ...state,
        keysFromApi_success: false,
        keysFromApi_loading: true
      };
    case `${actionTypes.KEYS_FROM_API}_SUCCESS`:
      return {
        ...state,
        keysFromApi_success: true,
        keysFromApi_loading: false
      };
    case `${actionTypes.KEYS_FROM_API}_ERROR`:
      return {
        ...state,
        keysFromApi_error: actions.payload,
        keysFromApi_success: false,
        keysFromApi_loading: false
      };
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        latitude: actions.latitude,
        longitude: actions.longitude
      };
    case actionTypes.KEY_LIST_UPDATED:
      return { ...state, keyListUpdated: !state.keyListUpdated };
    case `${actionTypes.DELETE_KEY_DATA}_LOADING`:
      return { ...state };
    case `${actionTypes.DELETE_KEY_DATA}_SUCCESS`:
      return { ...state, deleted: true, keyListUpdated: true };
    case `${actionTypes.DELETE_KEY_DATA}_ERROR`:
      return { ...state, deleted: false };
    case `${actionTypes.SET_UPDATELIST}_SUCCESS`:
      return { ...state, updateList: actions.payload };
    case `${actionTypes.SET_UPDATELIST}_ERROR`:
      return { ...state };
    case `${actionTypes.SET_UPDATELIST}_LOADING`:
      return { ...state };
    case actionTypes.RESET_UPDATE_KEY:
      return { ...state, keysUpdated: false, deleted: false };
    default:
      return state;
  }
}
