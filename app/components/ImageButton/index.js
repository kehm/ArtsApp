import React from 'react';
import { TouchableOpacity, Image,Text, View, ImageSourcePropType } from 'react-native';

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
      <TouchableOpacity onPress={onPress} style={[styles.container, borderStyle]}>
        {source && source.uri &&
          <Image collapsable={false} source={source} style={styles.image}/>
        }
        {(!source || !source.uri) &&
          <View style={styles.image} />
        }
      </TouchableOpacity>
    );
  }
}

export default ImageButton;
