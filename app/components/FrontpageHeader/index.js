import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Button, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles.js';

type Props = {
  title: String,
  onMenu: Function,
  rightIcon: Icon,
}
class FrontpageHeader extends React.Component<Props> {

  render() {
    const { title, onMenu, rightIcon } = this.props;
    return (
      <Header style={styles.headerContainer}>
        <Left style={styles.left}>
          <Button transparent onPress={onMenu}>
            <Icon size={28} name='menu' />
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>{title}</Title>
        </Body>
        <Right>
          {rightIcon}
        </Right>
      </Header>
    );
  }
}

export default FrontpageHeader;
