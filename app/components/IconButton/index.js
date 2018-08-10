import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import styles  from './styles.js';

type Props = {
  icon: String,
  label: String,
  onPress: Function,
};

class IconButton extends React.Component<Props> {

  render() {
    const { icon, label, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name={icon} size={30} />
        {label && <Text>{label}</Text>}
      </TouchableOpacity>
    );
  }
}

export default IconButton;
