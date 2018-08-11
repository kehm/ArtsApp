import React from 'react';
import { View, LayoutAnimation } from 'react-native';

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';

import KeyHeader from '../../components/KeyHeader';
import TraitPanel from '../../components/TraitPanel';
import TraitList from '../../components/TraitList';
import SpeciesPanel from '../../components/SpeciesPanel';
import TraitDialog from '../../components/TraitDialog';

import * as KeyAction from '../../actions/KeyAction';

import styles  from './styles.js';

type Props = {
  title: String,
}

type State = {
  isSpeciesPanelToggled: Boolean,
  isTraitDialogVisible: Boolean,
  selectedTrait: Object,
}

class Key2 extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isSpeciesPanelToggled: true,
      isTraitDialogVisible: false,
      selectedTrait: null,
    };
  }

  setStateAnimated(callback: (state: State) => void) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(callback);
  }

  onClose = () => {
    Actions.pop();
  }

  toggleSpeciesPanel = () => {
    this.setStateAnimated((prevState) => ({
      ...prevState,
      isSpeciesPanelToggled: !prevState.isSpeciesPanelToggled
    }));
  }

  onSpeciesSelected = (species) => {
    // TODO: Open species dialog
  }

  onValueSelected = (value) => {
    const { actions, chosenValues, chosenTraits, keyId } = this.props;
    const { selectedTrait } = this.state;

    // TODO: Move to reducer
    let tempValueList = [...chosenValues];
    const tempTraitList = [...chosenTraits];

    const isSelected = chosenValues.find(v => v === value.value_id) !== undefined;

    // remove all selected values for trait
    tempValueList = tempValueList
      .filter(v => selectedTrait.values.find(tv => tv.value_id === v) === undefined);

    // remove selected trait from traits
    const traitIndex = tempTraitList.indexOf(selectedTrait.trait_id);
    if(traitIndex > -1) {
      tempTraitList.splice(traitIndex, 1);
    }

    // Not selected
    if(!isSelected) {
      tempValueList.push(value.value_id);
      tempTraitList.push(selectedTrait.trait_id);
    }

    actions.changeValues(tempValueList, tempTraitList, keyId);
    actions.setSpeciesLeft(tempValueList, keyId);

    this.onTraitSelected(undefined);
  }

  onTraitSelected = (trait) => {
    this.setStateAnimated((prevState) => ({
      ...prevState,
      isTraitDialogVisible: trait !== undefined,
      selectedTrait: trait,
    }));
  }

  render() {
    const { title, traits, species, speciesImages, valueImages,
      chosenValues, totalSpecies, foundSpecies, chosenTraits } = this.props;

    const { isSpeciesPanelToggled, isTraitDialogVisible, selectedTrait } = this.state;

    // Find selected value in selected trait (if dialog is visible)
    const selectedValue = selectedTrait ?
      selectedTrait.values.find(v => chosenValues.indexOf(v.value_id) > -1) : null;

    // Find used traits
    const unusedTraits = traits.filter(trait => chosenTraits.indexOf(trait.trait_id) === -1);

    // Find unused traits
    const usedTraits = traits.filter(trait => chosenTraits.indexOf(trait.trait_id) !== -1);

    return (
      <View style={styles.container}>
        <KeyHeader
          title={title}
          closeTitle="Lukk"
          onClose={this.onClose}
        />
        <TraitPanel
          traits={usedTraits}
          chosenValues={chosenValues}
          onSelect={this.onTraitSelected}
          emptyHeader='Egenskaper ved arter'
          emptyDescription='Du har ikke valgt noen egenskaper enda.'
        />
        <TraitList
          traits={unusedTraits}
          onSelect={this.onTraitSelected}
        />
        <SpeciesPanel
          species={species}
          speciesImages={speciesImages}
          isCollapsed={isSpeciesPanelToggled}
          onToggleClick={this.toggleSpeciesPanel}
          onSpeciesClick={this.onSpeciesSelected}
          totalSpecies={totalSpecies}
          foundSpecies={foundSpecies}
        />
        <TraitDialog
          isVisible={isTraitDialogVisible}
          onCancelDialog={this.onTraitSelected}
          onValueSelected={this.onValueSelected}
          title={selectedTrait ? selectedTrait.traitText : ''}
          traitValues={selectedTrait ? selectedTrait.values : []}
          selectedValue={selectedValue}
          valueImages={valueImages}
        />
      </View>
    );

  }
}

function mapStateToProps({ key }) {
  const isFiltered = key.speciesLeft.length === 0 && key.chosenValues.length === 0;
  return ({
    keyId: key.chosenKey,
    species: isFiltered ? key.fullSpList : key.speciesLeft,
    totalSpecies: key.fullSpList.length,
    foundSpecies: key.speciesLeft.length,
    title: key.chosenKeyTitle,
    traits: key.traitValueCombo,
    speciesImages: key.spesiecImageList,
    valueImages: key.valueImages,
    chosenValues: key.chosenValues,
    chosenTraits: key.chosenTraits,
  });
};

function mapDispatchToProps(dispatch) {
  return {
	  actions: bindActionCreators({ ...KeyAction}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Key2);
