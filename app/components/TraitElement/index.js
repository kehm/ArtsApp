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
        <Text
          style={styles.text}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {title}
        </Text>
        <Text
          style={styles.numbers}
          numberOfLines={1}
        >
          {included}/{total}
        </Text>
      </View>
    );
  }

}

export default TraitElement;
