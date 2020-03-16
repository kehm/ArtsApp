import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Button, Icon, Left, Body, Right} from 'native-base';
import styles  from './styles.js';

type Props = {
  title: String,
  onMenu: Function,
}
class FrontpageHeader extends React.Component<Props> {

  render() {
    const { title, onInfo, onMenu } = this.props;

    return (
      <Header>
        <Left>
          <Button transparent onPress={onMenu}>
              <Icon name='ios-menu' />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right style={{marginRight: 5}}>
        </Right>
      </Header>
    );
  }
}

export default FrontpageHeader;
