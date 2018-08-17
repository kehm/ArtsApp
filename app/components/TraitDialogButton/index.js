import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ImageButton from '../ImageButton';

import { mapToImageSource } from '../../utilities/image';

import styles  from './styles.js';

type Props = {
  value: Object,
  imagePath: String,
  selected: Boolean,
  isActive: Boolean,
  onPress: Function,
  onInfo: Function,
}

class TraitDialogButton extends React.Component {

  onInfoPress = () => {
    const { value, onInfo } = this.props;
    onInfo && onInfo(value);
  }

  onClick = () => {
    const { value, isActive, selected, onPress } = this.props;
    (isActive || selected) && onPress && onPress(value);
  }

  render() {
    const { value, selected, imagePath, isActive } = this.props;
    const source = mapToImageSource(imagePath);

    const containerStyle = [styles.container];
    if (selected) containerStyle.push(styles.selected);
    if (!isActive) containerStyle.push(styles.inactive);

    const imageContainerStyle = [styles.imageContainer];
    if (selected) imageContainerStyle.push(styles.selectedImage);
    if (!isActive) imageContainerStyle.push(styles.inactiveImage);

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={this.onClick}
      >
        <View style={imageContainerStyle}>
          {source && source.uri &&
            <Image source={source} style={styles.image}/>
          }
          {(!source || !source.uri) &&
            <View style={styles.image}/>
          }
        </View>
        <View style={styles.titleIconContainer}>
          <Text style={styles.title}>{value.valueText}</Text>
          <TouchableOpacity onPress={this.onInfoPress}>
            <Icon style={styles.icon} name='info-outline' size={30} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

}

export default TraitDialogButton;
