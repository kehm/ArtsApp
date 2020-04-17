import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Button, Icon, Left, Body, Right } from 'native-base';
import styles from './styles.js';

type Props = {
  title: String,
  rightCol: String,
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
            <Icon style={styles.icon} name='menu' />
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
