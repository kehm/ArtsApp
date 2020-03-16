import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HorizontalList from "../HorizontalList";
import TraitPanelElement from "../TraitPanelElement";

import styles from "./styles.js";
import ImageButton from "../ImageButton";

type Props = {
  traits: Array,
  traitImages: Map,
  chosenValues: Array,
  valueImages: Map,
  header: String,
  emptyHeader: String,
  emptyDescription: String,
  resetTitle: String,
  onSelect: Function,
  onReset: Function
};

class TraitPanel extends React.Component<Props> {
  handleTraitSelected = trait => {
    const { onSelect } = this.props;
    onSelect && onSelect(trait);
  };

  renderItem = (item, truncate) => {
    const { valueImages, chosenValues, onReset } = this.props;

    if (item.type === "button") {
      return (
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <View style={styles.resetButtonImage}>
            <Icon name={item.icon} size={21} color="#AAA" />
          </View>
          <Text style={styles.resetButtonText}>{item.title}</Text>
        </TouchableOpacity>
      );
    }

    const trait = item.trait;
    const selectedValue = trait.values.find(
      val => chosenValues.indexOf(val.value_id) > -1
    );

    const imagePaths = valueImages.get(selectedValue.value_id);
    let imagePath = null;
    if (imagePaths) imagePath = imagePaths[0];

    return (
      <TraitPanelElement
        trait={trait}
        truncate={truncate}
        selectedValue={selectedValue}
        imagePath={imagePath}
        onPress={() => this.handleTraitSelected(trait)}
      />
    );
  };

  render() {
    const {
      traits,
      header,
      resetTitle,
      emptyHeader,
      emptyDescription
    } = this.props;

    const mappedElements = traits.map(t => ({
      type: "trait",
      trait: t
    }));

    const elementsWithButton = [
      {
        type: "button",
        title: resetTitle,
        icon: "refresh"
      },
      ...mappedElements.slice().reverse()
    ];

    return (
      <View style={styles.container}>
        {traits.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.header}>{emptyHeader}</Text>
            <Text style={styles.description}>{emptyDescription}</Text>
          </View>
        )}
        {traits.length > 0 && header && (
          <View style={styles.headerContainer}>
            <Text style={styles.label}>{header}</Text>
          </View>
        )}
        {traits.length > 0 && (
          <HorizontalList
            data={elementsWithButton}
            keyExtractor={item =>
              item.trait ? item.trait.trait_id.toString() : item.title
            }
            renderItem={({ item, index }) =>
              this.renderItem(item, index !== elementsWithButton.length - 1)
            }
          />
        )}
      </View>
    );
  }
}

export default TraitPanel;
