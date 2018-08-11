import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import TraitImageButton from '../TraitImageButton';

type Props = {
  trait: Object,
  selectedValue: Object,
  imagePath: String,
  onPress: Function,
};

class TraitPanelElement extends React.Component<Props> {

  render() {
    const { trait, imagePath, selectedValue, onPress } = this.props;

    return (
      <View style={styles.container}>
        <TraitImageButton imagePath={imagePath} onPress={onPress} />
        <Text
          style={styles.text}
          numberOfLines={1}
          ellipsizeMode='tail'
        >{trait.traitText}
        </Text>
        <Text
          style={styles.value}
          numberOfLines={1}
          ellipsizeMode='tail'
        >{selectedValue && selectedValue.valueText}
        </Text>
      </View>
    );
  }

}

export default TraitPanelElement;
