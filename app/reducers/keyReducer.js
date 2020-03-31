// @flow weak
/**
 * @file keyReducer.js
 * @author Kjetil Fossheim
 */

import findIndex from "lodash/findIndex";
import merge from "lodash/merge";

import * as actionTypes from "../actions/actionTypes";

/**
 * DEFAULT_STATE has the collection of empty states in the keyReducer.
 *
 * state:
 * -test = debug state
 * -chosenKey = id of selected Key, default -1
 * -chosenKeyTitle = title of selected Key
 * -chosenValues = array of selected values in current key.
 * -chosenTraits = array of traits containing the selected values in current key.
 * -speciesLeft = array of all reminding species after chosenValues
 * -relevant: List of relevant traits for the remaining species.
 * -irelevant: List of irrelevant traits for the remaining species.
 * -speciesLeftLoading = loading flag, default false
 * -fullSpList = total species list for selected key
 * -traitValueCombo = array of all trait value combinations to current key
 * -keyDownloaded_SUCCESS = success flag, default false
 * -keyDownloaded_LOADING = loading flag, default false
 * -keys = list of all keys availablein the app
 * -key = object of one selected key
 * -valueImages = array of all value images in the key
 * -speciesImageList = array of all species images in the key
 * -spTraits = list of all trait possible used by the reminding species
 * -spValues =list of all values possible used by the reminding species
 * -resetting = resetting flag, default false
 * @type {Object}
 */
const DEFAULT_STATE = {
  onLogging: false,
  test: -1,
  chosenKey: -1,
  chosenKeyTitle: "",
  chosenValues: [],
  chosenTraits: [],
  speciesLeft: [],
  relevant: [],
  irelevant: [],
  speciesLeftLoading: false,
  fullSpList: [],
  traitValueCombo: [],
  keyDownloaded_SUCCESS: false,
  keyDownloaded_LOADING: false,
  keys: [],
  key: "",
  valueImages: new Map(),
  speciesImageList: new Map(),
  spTraits: [],
  spValues: [],
  resetting: false
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case actionTypes.TEST_ACTION_TYPE_ONE:
      return { ...state, test: state.test + 1 };
    case actionTypes.ACTION_CHOSEN_KEY:
      return {
        ...state,
        chosenKey: action.chosenKey,
        chosenKeyTitle: action.chosenKeyTitle
      };
    case actionTypes.ACTION_VALUE_CHANGE:
      return {
        ...state,
        loading: true,
        chosenValues: action.chosenValues,
        chosenTraits: action.chosenTraits
      };
    case `${actionTypes.ACTION_SP_LEFT}_LOADING`:
      return { ...state, speciesLeftLoading: true };
    case `${actionTypes.ACTION_SP_LEFT}_SUCCESS`:
      let temp = [];
      let ret = action.payload.map(item => {
        let i = findIndex(state.fullSpList, { species_id: item.species_id });
        temp = temp.concat(state.fullSpList[i].values);
        return state.fullSpList[i].traits;
      });
      ret = Array.from(new Set([].concat.apply([], ret)));
      temp = Array.from(new Set([].concat.apply([], temp)));
      // ##########
      let traitList = state.traitValueCombo;
      let tempRel = [];
      let tempIRel = [];
      if (state.chosenTraits.length === 0) {
        tempRel = traitList;
      } else {
        for (let i = 0; i < traitList.length; i++) {
          let k = ret.findIndex(ele => {
            return ele === traitList[i].trait_id;
          });
          if (k !== -1) {
            tempRel.push(traitList[i]);
          } else {
            tempIRel.push(traitList[i]);
          }
        }
      }
      // ##########
      return {
        ...state,
        spTraits: ret,
        spValues: temp,
        relevant: tempRel,
        irelevant: tempIRel,
        speciesLeftLoading: false,
        speciesLeft: action.payload
      };
    case `${actionTypes.ACTION_SP_LEFT}_ERROR`:
      return {
        ...state,
        speciesLeft: [],
        speciesLeftLoading: false,
        speciesLeftError: action.payload
      };
    case `${actionTypes.ACTION_FULL_SPECIES}_SUCCESS`:
      return { ...state, fullSpList: action.payload };
    case `${actionTypes.ACTION_FULL_SPECIES}_ERROR`:
      return { ...state, fullSpList: [], fullSpListError: action.payload };
    case actionTypes.ACTION_SELCTED_SP:
      return { ...state, selectedSpecies: action.selectedSpecies };
    case `${actionTypes.ACTION_ALL_KEYS}_SUCCESS`:
      return { ...state, keys: action.payload, keyDownloaded_SUCCESS: false };
    case `${actionTypes.ACTION_ALL_KEYS}_ERROR`:
      return { ...state, keysError: action.payload };
    case actionTypes.RESETTING_RESET:
      return { ...state, resetting: false };
    case actionTypes.ACTION_RESET_KEY:
      return {
        ...state,
        chosenTraits: [],
        chosenValues: [],
        speciesLeft: [],
        relevant: state.traitValueCombo,
        irelevant: [],
        resetting: true
      };
    case `${actionTypes.TRAIT_VALUE_COMBO}_SUCCESS`:
      return { ...state, traitValueCombo: action.payload, speciesLeft: [] };
    case `${actionTypes.TRAIT_VALUE_COMBO}_LOADING`:
    case `${actionTypes.TRAIT_VALUE_COMBO}_ERROR`:
      return {
        ...state,
        traitValueCombo: [],
        traitValueComboError: action.payload
      };
    case `${actionTypes.KEY_DETAILS}_SUCCESS`:
      return { ...state, key: action.payload };
    case `${actionTypes.KEY_DETAILS}_LOADING`:
    case `${actionTypes.KEY_DETAILS}_ERROR`:
      return { ...state, key: "", keyError: action.payload };
    case `${actionTypes.VALUE_IMAGES}_SUCCESS`:
      return { ...state, valueImages: action.payload };
    case `${actionTypes.VALUE_IMAGES}_LOADING`:
    case `${actionTypes.VALUE_IMAGES}_ERROR`:
      return { ...state, valueImageError: action.payload };
    case `${actionTypes.ALL_SPECIES_IMAGES}_SUCCESS`:
      return { ...state, speciesImageList: action.payload };
    case `${actionTypes.ALL_SPECIES_IMAGES}_LOADING`:
    case `${actionTypes.ALL_SPECIES_IMAGES}_ERROR`:
      return { ...state, speciesImageError: action.payload };
    case `${actionTypes.DOWNLOAD_KEY}_SUCCESS`: {
      const { keyWeb } = action.meta;
      const keys = updateKey(state.keys, "keyWeb", keyWeb, {
        keyDownloaded: 1
      });

      return {
        ...state,
        keys,
        keyDownloaded_SUCCESS: true,
        keyDownloaded_LOADING: false,
        chosenKey: -1,
        chosenKeyTitle: ""
      };
    }
    case `${actionTypes.DOWNLOAD_KEY}_LOADING`: {
      return {
        ...state,
        keyDownloaded_LOADING: true
      };
    }
    case `${actionTypes.DOWNLOAD_KEY}_ERROR`:
      return {
        ...state,
        keyDownloaded_ERROR: action.payload,
        keyDownloaded_LOADING: false
      };
    case actionTypes.SELECT_TRAIT_VALUE: {
      return selectTraitValue(
        action.payload.keyId,
        action.payload.value,
        state
      );
    }
    default:
      return state;
  }
}

function selectTraitValue(keyId, value, state) {
  let tempValueList = [...state.chosenValues];
  const tempTraitList = [...state.chosenTraits];
  const selectedTrait = state.traitValueCombo.find(
    tp => tp.trait_id === value.trait_id
  );

  const isSelected =
    state.chosenValues.find(v => v === value.value_id) !== undefined;

  // remove all selected values for trait
  tempValueList = tempValueList.filter(
    v => selectedTrait.values.find(tv => tv.value_id === v) === undefined
  );

  // remove selected trait from traits
  const traitIndex = tempTraitList.indexOf(selectedTrait.trait_id);
  if (traitIndex > -1) {
    tempTraitList.splice(traitIndex, 1);
  }

  // Not selected
  if (!isSelected) {
    tempValueList.push(value.value_id);
    tempTraitList.push(selectedTrait.trait_id);
  }

  return {
    ...state,
    loading: true,
    chosenValues: tempValueList,
    chosenTraits: tempTraitList
  };
}

function findKeyByProperty(keys, propName, propValue) {
  const index = findIndex(keys, [propName, propValue]);
  return {
    key: index >= 0 ? keys[index] : null,
    index
  };
}

function updateKey(keys, lookupProp, lookupValue, changes) {
  const { key, index } = findKeyByProperty(keys, lookupProp, lookupValue);
  if (!key) {
    return keys;
  }

  const newKey = merge({}, key, changes);
  const newKeys = keys.map((k, i) => (i === index ? newKey : k));
  return newKeys;
}
