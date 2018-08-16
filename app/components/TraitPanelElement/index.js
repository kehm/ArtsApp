import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import styles  from './styles.js';
import TraitImageButton from '../TraitImageButton';

import { mapToImageSource } from '../../utilities/image';

type Props = {
  trait: Object,
  selectedValue: Object,
  imagePath: String,
  truncate: Boolean,
  onPress: Function,
};

class TraitPanelElement extends React.Component<Props> {

  render() {
    const { trait, imagePath, selectedValue, truncate, onPress } = this.props;
    const source = mapToImageSource(imagePath);
    const truncateStyle = truncate ? { maxWidth: 140 } : {};

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.imageContainer}>
          {source && source.uri &&
            <Image
              collapsable={false}
              source={source}
              style={styles.image}/>
          }
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[styles.text, truncateStyle]}
            numberOfLines={truncate ? 1 : 0}
            ellipsizeMode={'tail'}
          >{trait.traitText}
          </Text>
          <Text
            style={[styles.value, truncateStyle]}
            numberOfLines={truncate ? 1 : 0}
            ellipsizeMode={'tail'}
          >{selectedValue && selectedValue.valueText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

}

export default TraitPanelElement;
