// @flow weak
/**
 * @file observationReduser.js
 * @author Kjetil Fossheim
 */

import * as actionTypes from '../actions/actionTypes';

/**
 * * DEFAULT_STATE has the collection of empty states in the observationReduser.
 *
 * state:
 * -observationsList = list of user saved observations.
 * -deleteObs = delete user observation flag
 * -nearbyList = array of nearby observation for species in currant key.
 * -nerby_updated_loading = loading flag
 * -modalOpen = open and close update nearby observation modal
 * -getGerbyList = retrive nearbylist from DB flag
 * -nerby_updatedErrorBool =error flag
 * @type {Object}
 */
const DEFAULT_STATE = {
  onLogging: false,
  observationsList: [],
  deleteObs: -1,
  nearbyList: [],
  nerby_updated_loading: false,
  modalOpen: false,
  getGerbyList: false,
  nerby_updatedErrorBool: false,
  county: '',
  municipality: '',
  place: ''
};

export default function (state = DEFAULT_STATE, actions) {
  switch (actions.type) {
    case `${actionTypes.GET_ALL_OBSERVATIONS}_LOADING`:
      return {
        ...state,
      };
    case `${actionTypes.GET_ALL_OBSERVATIONS}_SUCCESS`:
      return {
        ...state,
        observationsList: actions.payload
      };
    case `${actionTypes.GET_ALL_OBSERVATIONS}_ERROR`:
      return {
        ...state,
        observationsList: [],
        observationsListError: actions.payload
      };
    case `${actionTypes.DELETE_OBSERVATION}_LOADING`:
      return {
        ...state,
      };
    case `${actionTypes.DELETE_OBSERVATION}_SUCCESS`:
      return {
        ...state,
        deleteObs: 'sucsess',
        observationsList: actions.payload,
      };
    case `${actionTypes.DELETE_OBSERVATION}_ERROR`:
      return {
        ...state,
        deleteObs: 'fail',
        deleteObsError: actions.payload
      };
    case `${actionTypes.NEW_OBSERVATION}_LOADING`:
      return {
        ...state,
      };
    case `${actionTypes.NEW_OBSERVATION}_SUCCESS`:
      return {
        ...state,
        insertObs: 'sucsess',
      };
    case `${actionTypes.NEW_OBSERVATION}_ERROR`:
      return {
        ...state,
        insertObs: 'fail',
        insertObsError: actions.payload
      };
    case `${actionTypes.UPDATE_OBSERVATION}_LOADING`:
      return {
        ...state,
      };
    case `${actionTypes.UPDATE_OBSERVATION}_SUCCESS`:
      return {
        ...state,
      };
    case `${actionTypes.UPDATE_OBSERVATION}_ERROR`:
      return {
        ...state,
      };
    case `${actionTypes.GET_NEARBY_OBSERVATIONS}_LOADING`:
      return {
        ...state,
        getGerbyList: false,
      };
    case `${actionTypes.GET_NEARBY_OBSERVATIONS}_SUCCESS`:
      return {
        ...state,
        nearbyList: actions.payload,
        getGerbyList: true,
      };
    case `${actionTypes.GET_NEARBY_OBSERVATIONS}_ERROR`:
      return {
        ...state,
        getGerbyList: false,
        getGerbyListError: actions.payload
      };
    case `${actionTypes.UPDATE_NEARBY}_LOADING`:
      return {
        ...state,
        nerby_updated_loading: true,
        nerby_updated: false,
        nerby_updatedErrorBool: false,
      };
    case `${actionTypes.UPDATE_NEARBY}_SUCCESS`:
      return {
        ...state,
        nerby_updated: true,
        nerby_updatedErrorBool: false,
        nerby_updated_loading: false,
        modalOpen: !state.modalOpen,
      };
    case `${actionTypes.UPDATE_NEARBY}_ERROR`:
      return {
        ...state,
        nerby_updated: false,
        nerby_updatedError: actions.payload,
        nerby_updatedErrorBool: true,
        nerby_updated_loading: false,
      };
    case actionTypes.SET_OBSERVATION_LOCATION:
      return {
        ...state,
        county: actions.county,
        municipality: actions.municipality,
        place: actions.place
      };
    default:
      return state;
  }
}
