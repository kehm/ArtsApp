import * as actionTypes from "./actionTypes";
import DB_helper from "../config/DB/DB_helper";

const dbHelper = new DB_helper();

export function getObservations() {
  return {
    type: actionTypes.GET_ALL_OBSERVATIONS,
    payload: {
      promise: dbHelper.getObservations()
    }
  };
}

export function deleteObservation(obsId) {
  return {
    type: actionTypes.DELETE_OBSERVATION,
    payload: {
      promise: dbHelper.deleteObservation(obsId)
    }
  };
}
export function insertObservation(observationId) {
  return {
    type: actionTypes.NEW_OBSERVATION,
    payload: {
      promise: dbHelper.insertNewObservation(observationId)
    }
  };
}

export function setSpNerby(key) {
  return {
    type: actionTypes.GET_OBSERVATION,
    payload: {
      promise: dbHelper.getNerbyObservation(key)
    }
  };
}

export function updateNerbyList(keys, latitude, longitude) {
  return {
    type: actionTypes.UPDATE_NERBY,
    payload: {
      promise: dbHelper.fethObservationNumbers(keys, latitude, longitude)
    }
  };
}

export function changeModal() {
  return {
    type: actionTypes.UPDATE_MODAL_OPEN
  };
}

export function changeUpdateSuccess() {
  return {
    type: actionTypes.UPDATE_SUCCESS
  };
}

export function updateReset() {
  return {
    type: actionTypes.UPDATE_RESET
  };
}
