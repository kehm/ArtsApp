import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import SpeciesImageButton from '../SpeciesImageButton';

import * as Colors from '../../lib/colors';

type Props = {
  species: Object,
  imagePath: String,
  state: String,
  onPress: Function,
};

class SpeciesPanelElement extends React.Component<Props> {

  onSpeciesSelected = () => {
    const { species, onPress } = this.props;
    onPress && onPress(species);
  }
  render() {
    const { species, imagePath, state, onPress } = this.props;

    const elementColor = state === 'match' ?
      Colors.AAIconGreenL : state === 'nearby' ?
      Colors.AAIconGreen : Colors.AAIconBrown;

    return (
      <View style={styles.container}>
        <SpeciesImageButton
          imagePath={imagePath}
          onPress={this.onSpeciesSelected}
          borderColor={elementColor}
        />
        <Text
          style={styles.name}
          numberOfLines={1}
          ellipsizeMode='tail'
          textColor={elementColor}
        >{species.localName}
        </Text>
      </View>
    );
  }

}

export default SpeciesPanelElement;
