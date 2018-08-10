import React from 'react';
import { View } from 'react-native';

import KeyHeader from '../../components/KeyHeader';
import TraitPanel from '../../components/TraitPanel';
import TraitList from '../../components/TraitList';
import SpeciesPanel from '../../components/SpeciesPanel';
import TraitDialog from '../../components/TraitDialog';

import styles  from './styles.js';

class Key2 extends React.Component {

  render() {

    return (
      <View style={styles.container}>
        <KeyHeader />
        <TraitPanel />
        <TraitList />
        <SpeciesPanel />
        <TraitDialog />
      </View>
    );

  }
}

export default Key2;
