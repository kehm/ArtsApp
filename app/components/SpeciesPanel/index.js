import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import styles  from './styles.js';
import HorizontalList from '../HorizontalList';
import SpeciesPanelElement from '../SpeciesPanelElement';
import SelectionProgressBar from '../SelectionProgressBar';

type Props = { };
type State = {
  species: Array,
  speciesImages: Map,
  isCollapsed: Boolean,
  totalSpecies: Number,
  foundSpecies: Number,
  emptyDescription: String,
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
    const { isCollapsed, species, emptyDescription, speciesImages,
      totalSpecies, foundSpecies } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.panelHeader}
          onPress={this.handleToggleCollapsed}
        >
          {foundSpecies === 0 &&
            <Text>{totalSpecies + ' arter totalt'}</Text>
          }
          {foundSpecies > 0 &&
            <Text>{foundSpecies + ' mulige arter, XX i nærheten av ' + totalSpecies + ' totalt'}</Text>
          }
          {isCollapsed &&
            <Icon name='chevron-small-up' size={30} />
          }
          {!isCollapsed &&
            <Icon name='chevron-small-down' size={30} />
          }
        </TouchableOpacity>
        {!isCollapsed && species.length > 0 &&
        <HorizontalList
          data={species}
          keyExtractor={(item) => item.species_id}
          renderItem={({item}) => this.renderItem(item)}
        />
        }
        {!isCollapsed && species.length === 0 &&
          <Text style={styles.emptyDescription}>{emptyDescription}</Text>
        }
        <View style={styles.progress}>
          <SelectionProgressBar
            totalCount={totalSpecies}
            matchingCount={foundSpecies}
            notInRangeCount={0}
          />
        </View>
      </View>
    );
  }
}

export default SpeciesPanel;
