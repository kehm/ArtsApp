import React from 'react';
import { TouchableOpacity, Image, View, ImageSourcePropType } from 'react-native';

import styles  from './styles.js';

type Props = {
  source: ImageSourcePropType,
  onPress: Function,
};

class ImageButton extends React.Component<Props> {

  render() {
    const { source, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        {source && source.uri &&
          <Image source={source} style={styles.image}/>
        }
        {(!source || !source.uri) &&
          <View style={styles.image}/>
        }
      </TouchableOpacity>
    );
  }
}

export default ImageButton;
