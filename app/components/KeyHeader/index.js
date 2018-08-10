import React from 'react';
import { View, Text, Button } from 'react-native';
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
        <Text style={styles.title}>{title}</Text>
        <Button title={closeTitle} onPress={onClose} />
      </View>
    );
  }
}

export default KeyHeader;
