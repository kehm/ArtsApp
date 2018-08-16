import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';

type Props = {
  title: String,
  description: String
}
class Explanation extends React.Component<Props> {

  render() {
    const { title, description } = this.props;
    const hasTitle = !!(title && title.length > 0);

    return (
      <View style={styles.container}>
        {hasTitle &&
        <Text style={styles.title}>{title}</Text>
        }
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
}

export default Explanation;
