import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import styles from "./styles.js";
import HorizontalList from "../HorizontalList";
import SpeciesPanelElement from "../SpeciesPanelElement";
import SelectionProgressBar from "../SelectionProgressBar";

type Props = {};
type State = {
  species: Array,
  speciesImages: Map,
  isCollapsed: Boolean,
  totalSpecies: Number,
  foundSpecies: Number,
  isFiltered: Boolean,
  observationsNearby: Array,
  emptyDescription: String,
  onToggleClick: Function,
  onSpeciesClick: Function,
  onViewAllClick: Function
};

class SpeciesPanel extends React.Component<Props, State> {
  handleToggleCollapsed = () => {
    const { onToggleClick } = this.props;
    onToggleClick && onToggleClick();
  };

  handleSpeciesOnPress = species => {
    const { onSpeciesClick } = this.props;
    onSpeciesClick && onSpeciesClick(species);
  };

  renderItem = item => {
    const {
      onViewAllClick,
      speciesImages,
      foundSpecies,
      observationsNearby
    } = this.props;
    if (item.type === "button") {
      return (
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={onViewAllClick}
        >
          <Icon
            style={styles.viewAllIcon}
            name={item.icon}
            size={30}
            color="#AAA"
          />
          <Text style={styles.viewAllText}>{item.title}</Text>
        </TouchableOpacity>
      );
    }
    const species = item.species;
    const imagePaths = speciesImages.get(species.species_id);
    let imagePath = null;
    if (imagePaths) imagePath = imagePaths[0];
    let state = "match";
    if (observationsNearby.find(obs => obs.species_id === species.species_id)) {
      state = "nearby";
    }
    return (
      <SpeciesPanelElement
        species={species}
        imagePath={imagePath}
        state={state}
        onPress={this.handleSpeciesOnPress}
      />
    );
  };

  render() {
    const {
      isCollapsed,
      species,
      strings,
      emptyDescription,
      speciesImages,
      totalSpecies,
      foundSpecies,
      observationsNearby,
      isFiltered
    } = this.props;

    const mappedElements = species
      .map(s => ({
        type: "species",
        species: s
      }))
      .sort((a, b) => {
        const obsa =
          observationsNearby.find(
            obs => obs.species_id === a.species.species_id
          ) !== undefined;
        const obsb =
          observationsNearby.find(
            obs => obs.species_id === b.species.species_id
          ) !== undefined;
        return obsa < obsb;
      });

    mappedElements.push({
      type: "button",
      title: strings.seeAllSpecies,
      icon: "chevron-right"
    });

    let numberOfObservedSpecies = observationsNearby.length;
    let numberOfFoundSpecies = foundSpecies - numberOfObservedSpecies;
    if (!isFiltered) {
      numberOfObservedSpecies = observationsNearby.length;
      numberOfFoundSpecies = totalSpecies - numberOfObservedSpecies;
    }

    const statusText = getStatusText(
      foundSpecies,
      totalSpecies,
      numberOfObservedSpecies,
      numberOfFoundSpecies
    );

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.panelHeader}
          onPress={this.handleToggleCollapsed}
        >
          <Text>{statusText}</Text>
          {isCollapsed && <Icon name="chevron-small-up" size={30} />}
          {!isCollapsed && <Icon name="chevron-small-down" size={30} />}
        </TouchableOpacity>
        {!isCollapsed && species.length > 0 && (
          <HorizontalList
            data={mappedElements}
            keyExtractor={item =>
              item.species ? item.species.species_id.toString() : item.title
            }
            renderItem={({ item }) => this.renderItem(item)}
          />
        )}
        {!isCollapsed && species.length === 0 && (
          <Text style={styles.emptyDescription}>{emptyDescription}</Text>
        )}
        <View style={styles.progress}>
          <SelectionProgressBar
            totalCount={totalSpecies}
            matchingCount={numberOfObservedSpecies}
            notInRangeCount={numberOfFoundSpecies}
          />
        </View>
      </View>
    );
  }
}

const getStatusText = (
  foundSpecies,
  totalSpecies,
  numberOfObservedSpecies,
  numberOfFoundSpecies
) => {
  const observedCountText =
    numberOfObservedSpecies > 0 ? numberOfObservedSpecies.toString() : "Ingen";
  if (foundSpecies === 0) {
    return observedCountText + " i nærheten, " + totalSpecies + " arter totalt";
  }

  return (
    observedCountText +
    " i nærheten av " +
    foundSpecies +
    " mulige - totalt " +
    totalSpecies +
    " arter."
  );
};

export default SpeciesPanel;
