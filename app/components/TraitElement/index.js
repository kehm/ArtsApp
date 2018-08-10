import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';

type Props = {
  title: String,
  total: Number,
  included: Number,
}

class TraitElement extends React.Component<Props> {

  render() {
    const { title, total, included } = this.props;
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{included}/{total}</Text>
      </View>
    );
  }

}

export default TraitElement;
