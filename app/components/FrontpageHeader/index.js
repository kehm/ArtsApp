import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import { styles, androidTabletStyles } from './styles.js';

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

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
            <Icon size={this.props.deviceTypeAndroidTablet ? 38 : 28} name='menu' />
          </TouchableOpacity>
        </Left>
        <Body style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.body : styles.body}>
          {title !== undefined ? (
            <Title style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.title : styles.title}>{title}</Title>
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

export default connect(mapStateToProps)(FrontpageHeader);
