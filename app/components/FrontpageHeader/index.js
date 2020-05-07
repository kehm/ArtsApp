import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles.js';
import { TextInput } from 'react-native-gesture-handler';

type Props = {
  title: String,
  body: Function,
  onMenu: Function,
  rightIcon: Icon,
  showTitle: Boolean,
}
class FrontpageHeader extends React.Component<Props> {

  render() {
    const { title, body, onMenu, rightIcon } = this.props;
    return (
      <Header style={styles.headerContainer}>
        <Left style={styles.left}>
          <TouchableOpacity onPress={onMenu}>
            <Icon size={28} name='menu' />
          </TouchableOpacity>
        </Left>
        <Body style={styles.body}>
          {title !== undefined ? (
            <Title style={styles.title}>{title}</Title>
          ) : (
              body
            )}
        </Body>
        <Right style={styles.rightCol}>
          {rightIcon}
        </Right>
      </Header>
    );
  }
}

export default FrontpageHeader;
