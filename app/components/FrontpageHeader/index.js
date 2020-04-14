import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Button, Icon, Left, Body, Right } from 'native-base';
import styles from './styles.js';

type Props = {
  title: String,
  onMenu: Function,
}
class FrontpageHeader extends React.Component<Props> {

  render() {
    const { title, rightCol, onMenu } = this.props;

    return (
      <Header>
        <Left style={styles.left}>
          <Button transparent onPress={onMenu}>
            <Icon name='ios-menu' />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right style={styles.rightCol} />
      </Header>
    );
  }
}

export default FrontpageHeader;
