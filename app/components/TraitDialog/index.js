import React from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';

import TraitValueButton from '../TraitValueButton';

import styles  from './styles.js';

type Props = {
  isVisible: Boolean,
  title: String,
  traitValues: Array,
  selectedValue: Object,
  activeValues: Array,
  valueImages: Map,
  onValueSelected: Function,
  onInfo: Function,
  onCancelDialog: Function,
}

class TraitDialog extends React.Component<Props> {

  onValueInfo = (item) => {
    const { onInfo } = this.props;
    onInfo && onInfo(item);
  }

  onCancelDialog = () => {
    const { onCancelDialog } = this.props;
    onCancelDialog && onCancelDialog();
  }

  onValueSelected = (value) => {
    const { onValueSelected } = this.props;
    onValueSelected && onValueSelected(value);
  }

  renderItem = (item) => {
    const { valueImages, onValueSelected, selectedValue, activeValues } = this.props;

    // Path to image
    const imagePaths = valueImages.get(item.value_id);
    let imagePath = null;
    if (imagePaths) imagePath = imagePaths[0];

    const selected = selectedValue && selectedValue.value_id === item.value_id;
    const isActive = activeValues.length === 0 || activeValues.indexOf(item.value_id) > -1;

    return (
      <TraitValueButton
        value={item}
        isActive={isActive}
        imagePath={imagePath}
        selected={selected}
        onPress={() => this.onValueSelected(item)}
        onInfo={() => this.onValueInfo(item)}
      />
    );
  }

  render() {
    const { isVisible, title, traitValues } = this.props;

    if(isVisible) {
      return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onCancelDialog}
      >
        <TouchableOpacity style={styles.dialogBorder} activeOpacity={1}>
          <View style={styles.dialogHeaderContainer}>
            <Text style={styles.dialogHeader}>{title}</Text>
          </View>
          <View style={styles.valuesContainer}>
          <FlatList
            data={traitValues}
            extraData={this.props}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={(item) => item.value_id}
          />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
      );
    }
    return null;
  }
}

export default TraitDialog;
