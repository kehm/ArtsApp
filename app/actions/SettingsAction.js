import * as actionTypes from "./actionTypes";
import AsyncStorageHandler from "../config/AsyncStorageHandler";
import LangStrings from "../config/LangStrings";
import NetInfo from "@react-native-community/netinfo";
import DB_helper from "../config/DB/DB_helper";
import KeyDownload from "../config/network/KeyDownload";
import ImageConfig from "../config/network/ImageConfig";

export function setLanguage(lang) {
  return {
    type: actionTypes.SET_LANGUAGE,
    payload: {
      promise: new AsyncStorageHandler().setLanguage(lang),
      language: lang
    }
  };
}

export function getLanguage() {
  return {
    type: actionTypes.GET_LANGUAGE,
    payload: {
      promise: new AsyncStorageHandler().getLanguage()
    }
  };
}

export function setLastDownload(date) {
  return {
    type: actionTypes.SET_LAST_DOWNLOAD,
    payload: {
      promise: new AsyncStorageHandler().setLastDownload(date),
      lastDownloadDate: date
    }
  };
}

export function getLastDownload() {
  return {
    type: actionTypes.GET_LAST_DOWNLOAD,
    payload: {
      promise: new AsyncStorageHandler().getLastDownload()
    }
  };
}

export function setContentStrings(lang) {
  return {
    type: actionTypes.GET_LANG_STRINGS,
    strings: new LangStrings().getLangStrings(lang)
  };
}

export function isOnline(isConnected) {
  return {
    type: actionTypes.UPDATE_CONNECTIVITY,
    isConnected: isConnected
  };
}

export function debugMode(bool) {
  return {
    type: actionTypes.DEBUG_MODE,
    debugMode: bool
  };
}

export function setUpDataBase() {
  return {
    type: actionTypes.SETUP_DB,
    payload: {
      promise: new DB_helper().testDatabase()
    }
  };
}

export function updateKeys(keys) {
  return {
    type: actionTypes.UPDATE_KEYS,
    payload: {
      promise: new KeyDownload().updateKeys(keys)
    }
  };
}

export function getKeysFromAPI() {
  return {
    type: actionTypes.KEYS_FROM_API,
    payload: {
      promise: new KeyDownload().getkeyListFromApi()
    }
  };
}

export function setLocation(lat, long) {
  return {
    type: actionTypes.SET_LOCATION,
    latitude: lat,
    longitude: long
  };
}

export function keyListUpdated() {
  return {
    type: actionTypes.KEY_LIST_UPDATED
  };
}

export function deletedata(key_id) {
  return {
    type: actionTypes.DELETE_KEY_DATA,
    payload: {
      promise: Promise.all([
        new DB_helper().deleteKeyData(key_id),
        new ImageConfig().deleteImagesToKeyData(key_id)
      ])
    }
  };
}

export function setUpdateList() {
  return {
    type: actionTypes.SET_UPDATELIST,
    payload: {
      promise: new DB_helper().getDownloadedKeys()
    }
  };
}

export function resetUpdateKey() {
  return {
    type: actionTypes.RESET_UPDATE_KEY
  };
}
