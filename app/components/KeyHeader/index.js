import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles  from './styles.js';

type Props = {
  title: String,
  closeTitle: String,
  onClose: String,
}
class KeyHeader extends React.Component<Props> {

  render() {
    const { title, closeTitle, onClose } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={onClose}
        >
          <Text style={styles.button}>{closeTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default KeyHeader;
