import React from 'react';
import { View } from 'react-native';

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

class Key2 extends React.Component<Props> {

  onClose = () => {
    Actions.pop();
  }

  onTraitSelect = (trait) => {
    console.log(trait);
  }

  render() {
    const { title, traits } = this.props;

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
          onSelect={this.onTraitSelect}
        />
        <SpeciesPanel />
        <TraitDialog />
      </View>
    );

  }
}

function mapStateToProps({ key }) {
  return ({
    title: key.chosenKeyTitle,
    traits: key.traitValueCombo
  });
};

export default connect(mapStateToProps)(Key2);
