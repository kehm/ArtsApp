import React from 'react';
import { View, LayoutAnimation } from 'react-native';

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';

import KeyHeader from '../../components/KeyHeader';
import TraitPanel from '../../components/TraitPanel';
import TraitList from '../../components/TraitList';
import SpeciesPanel from '../../components/SpeciesPanel';
import TraitDialog from '../../components/TraitDialog';

import styles  from './styles.js';

type Props = {
  title: String,
}

type State = {
  isSpeciesPanelToggled: Boolean
}

class Key2 extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { isSpeciesPanelToggled: true };
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
    console.log(species);
  }

  onTraitSelected = (trait) => {
    console.log(trait);
  }

  render() {
    const { title, traits, species, speciesImages } = this.props;
    const { isSpeciesPanelToggled } = this.state;

    return (
      <View style={styles.container}>
        <KeyHeader
          title={title}
          closeTitle="Lukk"
          onClose={this.onClose}
        />
        <TraitPanel />
        <TraitList
          data={traits}
          onSelect={this.onTraitSelected}
        />
        <SpeciesPanel
          species={species}
          speciesImages={speciesImages}
          isCollapsed={isSpeciesPanelToggled}
          onToggleClick={this.toggleSpeciesPanel}
          onSpeciesClick={this.onSpeciesSelected}
        />
        <TraitDialog />
      </View>
    );

  }
}

function mapStateToProps({ key }) {
  return ({
    species: key.fullSpList,
    title: key.chosenKeyTitle,
    traits: key.traitValueCombo,
    speciesImages: key.spesiecImageList
  });
};

export default connect(mapStateToProps)(Key2);
