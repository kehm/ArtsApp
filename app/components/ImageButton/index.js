import React from 'react';
import { TouchableOpacity, Image, View, ImageSourcePropType } from 'react-native';

import styles  from './styles.js';

type Props = {
  source: ImageSourcePropType,
  borderColor: String,
  onPress: Function,
};

class ImageButton extends React.Component<Props> {

  render() {
    const { source, borderColor, onPress } = this.props;

    const borderStyle = { borderColor: (borderColor ? borderColor : '#CCC') };

    return (
      <TouchableOpacity onPress={onPress}>
        {source && source.uri &&
          <Image source={source} style={[styles.image, borderStyle]}/>
        }
        {(!source || !source.uri) &&
          <View style={styles.image}/>
        }
      </TouchableOpacity>
    );
  }
}

export default ImageButton;
