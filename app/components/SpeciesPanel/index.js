import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import IconButton from '../IconButton';
import SpeciesPanelElement from '../SpeciesPanelElement';
import SelectionProgressBar from '../SelectionProgressBar';

type Props = { };

class SpeciesPanel extends React.Component<Props> {
  handleSpeciesOnPress = species => {
    console.log('Species pressed');
  }
  render() {
    const imagePath = 'https://www.artsdatabanken.no/Media/F24913?mode=80x80';
    return (
      <View style={styles.container}>
        <View style={styles.panelHeader}>
          <Text>45 mulige arter, 14 i nærheten av 49 totalt</Text>
          {/* <IconButton /> */}
        </View>
        <SpeciesPanelElement imagePath={imagePath} onPress={this.handleSpeciesOnPress} />
        <SelectionProgressBar totalCount={49} matchingCount={22} notInRangeCount={7} />
      </View>
    );
  }
}

export default SpeciesPanel;
