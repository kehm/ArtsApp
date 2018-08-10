import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import SpeciesPanelElement from '../SpeciesPanelElement';

type Props = { };

class SpeciesPanel extends React.Component<Props> {
  handleSpeciesOnPress = species => {
    console.log('Species pressed');
  }
  render() {
    const imagePath = 'https://www.artsdatabanken.no/Media/F24913?mode=80x80';
    return (
      <View style={styles.container}>
        <SpeciesPanelElement imagePath={imagePath} onPress={this.handleSpeciesOnPress} />
      </View>
    );
  }
}

export default SpeciesPanel;
