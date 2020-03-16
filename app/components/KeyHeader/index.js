import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Button, Icon, Left, Body, Right} from 'native-base';
import styles  from './styles.js';

type Props = {
  title: String,
  closeTitle: String,
  onClose: Function,
  onInfo: Function
}
class KeyHeader extends React.Component<Props> {

  render() {
    const { title, closeTitle, onClose, onInfo } = this.props;

    return (
      <Header>
        <Left>
          <Button transparent onPress={onInfo}>
              <Icon
                name='ios-information-circle-outline'
                style={this.props.deviceTypeAndroidTablet ? {fontSize: 44} : {fontSize: 22}}
              />
            </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right style={{marginRight: 5}}>
          <Button transparent onPress={onClose}>
            <Icon
              name='ios-close'
              style={this.props.deviceTypeAndroidTablet ? {fontSize: 52} : {fontSize: 26}}
            />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default KeyHeader;
