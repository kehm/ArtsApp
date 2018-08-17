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
  onViewAllClick: Function,
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

    const { onViewAllClick, speciesImages } = this.props;

    if(item.type === 'button') {
      return (
        <TouchableOpacity style={styles.viewAllContainer} onPress={onViewAllClick}>
          <Icon style={styles.viewAllIcon} name={item.icon} size={30} color='#AAA'/>
          <Text style={styles.viewAllText}>{item.title}</Text>
        </TouchableOpacity>
      );
    }

    const species = item.species;

    const imagePaths = speciesImages.get(species.species_id);
    let imagePath = null;
    if (imagePaths) imagePath = imagePaths[0];

    return (
      <SpeciesPanelElement
        species={species}
        imagePath={imagePath}
        onPress={this.handleSpeciesOnPress}
      />
    );
  }

  render() {
    const { isCollapsed, species, strings, emptyDescription, speciesImages,
      totalSpecies, foundSpecies } = this.props;

    const mappedElements = species.map(s => ({
      type: 'species',
      species: s,
    }));

    mappedElements.push({
      type: 'button',
      title: strings.seeAllSpecies,
      icon: 'chevron-right',
    });

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
          data={mappedElements}
          keyExtractor={(item) => item.species ? item.species.species_id : item.title}
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
