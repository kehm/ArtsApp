import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';

type Props = {
  description: String
}
class Explanation extends React.Component<Props> {

  render() {
    const { description } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
}

export default Explanation;
