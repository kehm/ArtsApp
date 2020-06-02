import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Actions } from "react-native-router-flux";

import HorizontalList from "../HorizontalList";
import TraitPanelElement from "../TraitPanelElement";

import { styles, androidTabletStyles } from "./styles.js";
import ImageButton from "../ImageButton";

import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

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
        <TouchableOpacity style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.resetButton : styles.resetButton} onPress={onReset}>
          <View style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.resetButtonImage : styles.resetButtonImage}>
            <Icon name={item.icon} size={this.props.deviceTypeAndroidTablet ? 32 : 21} color="#AAA" />
          </View>
          <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.resetButtonText : styles.resetButtonText}>{item.title}</Text>
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
        icon: "ccw"
      },
      ...mappedElements.slice().reverse()
    ];
    return (
      <View style={styles.container}>
        {traits.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.header : styles.header}>{emptyHeader} <Icon name="help-with-circle" size={this.props.deviceTypeAndroidTablet ? 28 : 16} onPress={() => { Actions.Help() }} /></Text>
            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.description : styles.description}>{emptyDescription}</Text>
          </View>
        )}
        {traits.length > 0 && header && (
          <View style={styles.headerContainer}>
            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.label : styles.label}>{header} <Icon name="help-with-circle" size={this.props.deviceTypeAndroidTablet ? 28 : 16} onPress={() => { Actions.Help() }} /></Text>
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

export default connect(mapStateToProps)(TraitPanel);
