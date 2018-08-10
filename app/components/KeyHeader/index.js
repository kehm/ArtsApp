import React from 'react';
import { View, Text } from 'react-native';
import styles  from './styles.js';

type Props = {
  title: String,
  closeButtonTitle: String,
  onClose: String,
}
class KeyHeader extends React.Component<Props> {

  render() {
    const { title, closeButtonTitle, onClose } = this.props;
    
    return (
      <View style={styles.container}>
        <Text>KeyHeader</Text>
      </View>
    );
  }
}

export default KeyHeader;
