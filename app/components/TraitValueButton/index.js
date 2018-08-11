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
  onPress: Function,
  onInfo: Function,
}

class TraitValueButton extends React.Component {

  onInfoPress = () => {
    const { value, onInfo } = this.props;
    onInfo && onInfo(value);
  }

  render() {
    const { value, selected, imagePath, onPress } = this.props;
    const source = mapToImageSource(imagePath);

    const containerStyle = [styles.container];
    if(selected) containerStyle.push(styles.selected);

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => onPress(value)}
      >
        {source && source.uri &&
          <Image source={source} style={styles.image}/>
        }
        {(!source || !source.uri) &&
          <View style={styles.image}/>
        }
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

export default TraitValueButton;
