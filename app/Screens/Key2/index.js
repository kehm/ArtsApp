import React from 'react';
import { View } from 'react-native';

import { Actions } from 'react-native-router-flux';

import KeyHeader from '../../components/KeyHeader';
import TraitPanel from '../../components/TraitPanel';
import TraitList from '../../components/TraitList';
import SpeciesPanel from '../../components/SpeciesPanel';
import TraitDialog from '../../components/TraitDialog';

import styles  from './styles.js';

class Key2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      traits: [
        { id:1, trait: 'Habitat'},
        { id:2, trait: 'Sporer'},
        { id:3, trait: 'Fikenblad'},
        { id:4, trait: 'Hostesaft'},
      ],
    };
  }

  onClose = () => {
    Actions.pop();
  }

  render() {
    const { traits } = this.state;

    return (
      <View style={styles.container}>
        <KeyHeader
          title="Nøkler"
          closeTitle="Lukk"
          onClose={this.onClose}
        />
        <TraitPanel />
        <TraitList
          data={traits}
        />
        <SpeciesPanel />
        <TraitDialog />
      </View>
    );

  }
}

export default Key2;
