import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

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
        <Image source={source} style={styles.image}/>
      </TouchableOpacity>
    );
  }
}

export default ImageButton;
