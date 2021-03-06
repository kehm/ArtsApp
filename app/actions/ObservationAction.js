import * as actionTypes from "./actionTypes";
import DB_helper from "../config/DB/DB_helper";

export function getObservations() {
  return {
    type: actionTypes.GET_ALL_OBSERVATIONS,
    payload: {
      promise: new DB_helper().getObservations()
    }
  };
}

export function deleteObservation(obsId) {
  return {
    type: actionTypes.DELETE_OBSERVATION,
    payload: {
      promise: new DB_helper().deleteObservation(obsId)
    }
  };
}

export function insertObservation(observationId) {
  return {
    type: actionTypes.NEW_OBSERVATION,
    payload: {
      promise: new DB_helper().insertNewObservation(observationId)
    }
  };
}

export function updateUserObservation(obsId, latitude, longitude, county, municipality, place) {
  return {
    type: actionTypes.UPDATE_OBSERVATION,
    payload: {
      promise: new DB_helper().updateUserObservation(obsId, latitude, longitude, county, municipality, place)
    }
  };
}

export function getNearbyObservations(key) {
  return {
    type: actionTypes.GET_NEARBY_OBSERVATIONS,
    payload: {
      promise: new DB_helper().getNearbyObservations(key)
    }
  };
}

export function updateNearbyList(key, latitude, longitude) {
  return {
    type: actionTypes.UPDATE_NEARBY,
    payload: {
      promise: new DB_helper().fethObservationNumbers(key, latitude, longitude)
    }
  };
}

export function setObservationLocation(county, municipality, place) {
  return {
    type: actionTypes.SET_OBSERVATION_LOCATION,
    county: county,
    municipality: municipality,
    place: place
  }
}
