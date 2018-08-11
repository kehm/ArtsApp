import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import IconButton from '../IconButton';
import HorizontalList from '../HorizontalList';
import SpeciesPanelElement from '../SpeciesPanelElement';
import SelectionProgressBar from '../SelectionProgressBar';

type Props = { };
type State = {
  species: Array,
  speciesImages: Map,
  isCollapsed: Boolean,
  onToggleClick: Function,
  onSpeciesClick: Function,
}

class SpeciesPanel extends React.Component<Props,State> {

  handleToggleCollapsed = () => {
    const { onToggleClick } = this.props;
    onToggleClick && onToggleClick();
  }

  handleSpeciesOnPress = species => {
    const { onSpeciesClick } = this.props;
    onSpeciesClick && onSpeciesClick(species);
  }

  renderItem = (item) => {
    const { speciesImages } = this.props;
    const imagePaths = speciesImages.get(item.species_id);
    let imagePath = null;
    if (imagePaths) imagePath = imagePaths[0];

    return (
      <SpeciesPanelElement
        species={item}
        imagePath={imagePath}
        onPress={this.handleSpeciesOnPress}
      />
    );
  }

  render() {
    const { isCollapsed, species, speciesImages } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.panelHeader}>
          <Text>45 mulige arter, 14 i nærheten av 49 totalt</Text>
          {isCollapsed &&
          <IconButton icon='chevron-small-up' onPress={this.handleToggleCollapsed} />
          }
          {!isCollapsed &&
          <IconButton icon='chevron-small-down' onPress={this.handleToggleCollapsed} />
          }
        </View>
        {!isCollapsed &&
        <HorizontalList
          data={species}
          keyExtractor={(item) => item.species_id}
          renderItem={({item}) => this.renderItem(item)}
        />
        }
        <View style={styles.progress}>
          <SelectionProgressBar totalCount={49} matchingCount={13} notInRangeCount={7} />
        </View>
      </View>
    );
  }
}

export default SpeciesPanel;
