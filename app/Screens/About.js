/**
 * @file Screen with information about the application. Contains a hidden button that takes you to the debug-page.
 * @author Kjetil Fossheim
 */

import React, { Component } from "react";
import { View, StyleSheet, Image, Modal, Text } from "react-native";
import { StyleProvider, Container, Content, Button, Spinner } from "native-base";
import HTMLView from "react-native-htmlview";
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Entypo';
import Toast, { DURATION } from "react-native-easy-toast";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { aboutNO, aboutEN } from "../config/aboutText";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

import * as SettingsAction from "../actions/SettingsAction";
import SubPageHeader from "../components/SubPageHeader";
import AsyncStorageHandler from "../config/AsyncStorageHandler";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

function mapDispatchToProps(dispatch) {
  const { getKeysFromAPI, setLastDownload } = bindActionCreators(
    {
      ...SettingsAction
    },
    dispatch
  );
  return { getKeysFromAPI, setLastDownload };
}

class About extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      debugcount: 0,
      openModal: false
    };
  }

  onClickBack = () => {
    Actions.pop();
  };

  /**
 * Look for updated keys
 */
  handleOnPressUpdate = () => {
    if (this.props.isConnected) {
      this.props.getKeysFromAPI().then(() => {
        // Set last download timestamp after getting keys
        let date = new Date();
        let month = date.getMonth();
        if (month < 10) {
          month = "0" + month;
        }
        this.props.setLastDownload(
          date.getFullYear() + "" + month + "" + date.getDate()
        );
        this.refs.toast.show(this.props.strings.updateSuccess);
      });
    } else {
      this.refs.toast.show(this.props.strings.disNoNetwork);
    }
    this.setState({ openModal: false });
  }

  /**
   * Function that counts clicks on the invisible button and goes to debug-page if clicked 20 times.
   */
  onClickDebug = () => {
    if (this.state.debugcount === 20) {
      Actions.Debug();
    } else {
      this.setState({ debugcount: this.state.debugcount + 1 });
      if (this.state.debugcount > 14) {
        this.refs.toast.show(
          this.props.strings.enableDebug +
          (20 - this.state.debugcount) +
          this.props.strings.enableDebug2,
          1500
        );
      }
    }
  };

  render() {
    return (
      <StyleProvider
        style={
          this.props.deviceTypeAndroidTablet
            ? getTheme(androidTablet)
            : getTheme(common)
        }
      >
        <Container>
          <SubPageHeader title={this.props.strings.about} onClick={this.onClickBack}
            rightIcon={
              <Menu>
                <MenuTrigger>
                  <Icon name='dots-three-vertical' size={28} color={'black'} />
                </MenuTrigger>
                <MenuOptions style={styles.dotMenu}>
                  <MenuOption onSelect={() => { this.setState({ openModal: true }); this.handleOnPressUpdate() }} >
                    <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.dotMenuTxt : styles.dotMenuTxt}>{this.props.strings.lookForUpdate}</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => { Actions.Help() }} >
                    <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.dotMenuTxt :styles.dotMenuTxt}>{this.props.strings.helpHeader}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            } />
          <Content>
            <View style={styles.container}>
              <Image
                source={require("../images/AA_logo.png")}
                style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.image
                    : styles.image
                }
              />
              <HTMLView
                style={{ margin: 10 }}
                value={this.props.language === "no" ? aboutNO : aboutEN}
                stylesheet={
                  this.props.deviceTypeAndroidTablet
                    ? htmlstylesAndroidTablet
                    : htmlstyles
                }
              />
            </View>
            <Button transparent block onPress={this.onClickDebug} />
          </Content>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.openModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.modalText : styles.modalText}>{this.props.strings.lookingForUpdates}</Text>
                <Spinner color="green" />
              </View>
            </View>
          </Modal>
          <Toast ref="toast" />
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    height: 180,
    width: 200,
    margin: 30,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold"
  },
  dotMenuTxt: {
    color: '#000',
    fontSize: 16,
    padding: 10,
  },
});

const AndroidTabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    height: 300,
    width: 300,
    margin: 30,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: "center"
  },
  dotMenuTxt: {
    color: '#000',
    fontSize: 20,
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22
  },
});

const htmlstyles = StyleSheet.create({
  br: {
    margin: 0,
    padding: 0
  },
  p: {
    fontSize: 15
  }
});

const htmlstylesAndroidTablet = StyleSheet.create({
  br: {
    margin: 0,
    padding: 0
  },
  p: {
    fontSize: 22
  },
  li: { fontSize: 22, margin: 10 },
  h5: { marginBottom: 10, marginTop: 50, fontSize: 28 },
  h6: { marginBottom: 10, marginTop: 30, fontSize: 24 },
  div: { fontSize: 22 }
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
