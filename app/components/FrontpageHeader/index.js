import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, StyleProvider, Header, Footer, Subtitle, FooterTab, Thumbnail, Title, Content, Button, Icon, ListItem, Left, Body, Right} from 'native-base';
import styles  from './styles.js';

type Props = {
  title: String,
  onInfo: Function
}
class FrontpageHeader extends React.Component<Props> {

  render() {
    const { title, onInfo } = this.props;

    return (
      <Header>
        <Left>
          {/* <Button transparent onPress={onInfo}>
              <Icon
                name='ios-information-circle-outline'
                style={this.props.deviceTypeAndroidTablet ? {fontSize: 44} : {fontSize: 22}}
              />
            </Button> */}
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
