import * as actionTypes from "./actionTypes";
import DB_helper from "../config/DB/DB_helper";
import KeyDownload from "../config/network/KeyDownload";
import { setSpNerby } from "./ObservationAction";

const dbHelper = new DB_helper();

export function setTest() {
  return {
    type: actionTypes.TEST_ACTION_TYPE_ONE
  };
}
export function resettingReset() {
  return {
    type: actionTypes.RESETTING_RESET
  };
}
export function setKey(keyId, title, force = false) {
  return async (dispatch, getState) => {
    const isSameKey = !force && getState().key.chosenKey === keyId;
    dispatch({
      type: actionTypes.ACTION_CHOSEN_KEY,
      chosenKey: keyId,
      chosenKeyTitle: title
    });
    if (!isSameKey) {
      dispatch(resetKey(keyId));
      dispatch(setTraitValuecombo(keyId));
      dispatch(setAllSpToKEy(keyId));
      dispatch(setSpNerby(keyId));
      dispatch(getAllSpImages(keyId));
      dispatch(getValueImages(keyId));
      dispatch(setSpeciesLeft([], keyId));
    }
  };
}

export function changeValues(chosenValues, chosenTraits, keyId) {
  return {
    type: actionTypes.ACTION_VALUE_CHANGE,
    chosenValues: chosenValues,
    chosenTraits: chosenTraits
  };
}

export function setAllSpToKEy(keyId) {
  return {
    type: actionTypes.ACTION_FULL_SPECIES,
    payload: {
      promise: dbHelper.getSpeciesFromDb(keyId)
    }
  };
}

export function setSpeciesLeft(chosenValues, keyId) {
  return {
    // dette må være med
    type: actionTypes.ACTION_SP_LEFT,
    payload: {
      promise: dbHelper.getSpeciesWithvalue(chosenValues, keyId)
    }
  };
}

export function selectSpecies(species) {
  return {
    type: actionTypes.ACTION_SELCTED_SP,
    selectedSpecies: species
  };
}

export function setAllKeys() {
  return {
    type: actionTypes.ACTION_ALL_KEYS,
    payload: {
      promise: dbHelper.getKeys()
    }
  };
}

export function resetKey(keyId) {
  return {
    type: actionTypes.ACTION_RESET_KEY
  };
}

export function setTraitValuecombo(keyId) {
  return {
    type: actionTypes.TRAIT_VALUE_COMBO,
    payload: {
      promise: dbHelper.getTraitValuecombo(keyId)
    }
  };
}

export function getKey(keyId) {
  return {
    type: actionTypes.KEY_DETAILS,
    payload: {
      promise: dbHelper.getKeyDetails(keyId)
    }
  };
}

export function getValueImages(keyId) {
  return {
    type: actionTypes.VALUE_IMAGES,
    payload: {
      promise: dbHelper.getValueImagestoKey(keyId)
    }
  };
}

export function getAllSpImages(keyId) {
  return {
    type: actionTypes.ALL_SPECIES_IMAGES,
    payload: {
      promise: dbHelper.getAllSpImagestoKey(keyId)
    }
  };
}

export function downloadKey(keyWebName) {
  this.KeyDownload = new KeyDownload();
  return {
    type: actionTypes.DOWNLOAD_KEY,
    payload: {
      promise: this.KeyDownload.downloadKey(keyWebName)
    },
    meta: { keyWeb: keyWebName }
  };
}

export function selectTraitValue(keyId, value) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SELECT_TRAIT_VALUE,
      payload: { keyId, value }
    });
    dispatch(setSpeciesLeft(getState().key.chosenValues, keyId));
  };
}
