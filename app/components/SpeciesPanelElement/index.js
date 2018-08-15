import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import SpeciesImageButton from '../SpeciesImageButton';

type Props = {
  species: Object,
  imagePath: String,
  onPress: Function,
};

class SpeciesPanelElement extends React.Component<Props> {

  render() {
    const { species, imagePath, onPress } = this.props;

    return (
      <View style={styles.container}>
        <SpeciesImageButton imagePath={imagePath} onPress={onPress} />
        <Text
          style={styles.name}
          numberOfLines={1}
          ellipsizeMode='tail'
        >{species.localName}
        </Text>
        <Text
          style={styles.latinName}
          numberOfLines={1}
          ellipsizeMode='tail'
        >{species.latinName}
        </Text>
      </View>
    );
  }

}

export default SpeciesPanelElement;
