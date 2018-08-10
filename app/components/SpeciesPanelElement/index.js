import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import SpeciesIconButton from '../SpeciesIconButton';

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
        <SpeciesIconButton imagePath={imagePath} onPress={onPress} />
        <Text>Cystopteris</Text>
        <Text>Sudetlok</Text>
      </View>
    );
  }

}

export default SpeciesPanelElement;
