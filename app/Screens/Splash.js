/**
 * @file Show loading screen on startup while loading data and setting up the app
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from "react-native";
import { Spinner, Button } from "native-base";
import { Actions } from "react-native-router-flux";
import DbHelper from "../config/DB/DB_helper";
import KeyDownload from "../config/network/KeyDownload";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SettingsAction from "../actions/SettingsAction";

const mapStateToProps = state => ({
  ...state.settings
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...SettingsAction }, dispatch)
  };
}
/**
 * Strings of welcome text
 */
const introstrings = {
  a1: "Gjør ArtsApp klar",
  a2: "Gjør ArtsApp klar for dine arter",
  a3: "ArtsApp gleder seg til å hjelpe deg med artsidentifisering",
  a4: "Hvilken art har du i dag?",
  a5: "Artsidentifisering er gøy",
  a6: "ArtsApp, artsidentifisering rett i lomma",
  a7: "Snart er vi klar for artsidentifisering",
  a8: "La oss komme i gang med artsidentifisering",
  a9: "Straks er vi klar til artsidentifisering",
  a10: "ArtsApp er snart klar"
};

class Splash extends React.PureComponent {
  constructor(props) {
    super(props);
    this.DbHelper = new DbHelper();
    this.KeyDownload = new KeyDownload();
    this.state = {
      progress: [],
      text: introstrings["a" + this.getRandomInt()],
      openModal: false
    };
  }

  /**
   * Download list of available keys if app is started for the first time. Requires network.
   */
  componentDidMount() {
    this.initialize();
  }

  /**
   * Initialize key list and set last download timestamp
   */
  initialize() {
    this.DbHelper.testDatabase().then(() => {
      this.props.actions.getLastDownload().then((date) => {
        if (date.value === null) {
          if (this.props.isConnected) {
            this.setState({text: this.props.strings.firstStart});
            this.props.actions.getKeysFromAPI().then(() => {
              // Set last download timestamp after getting keys
              let date = new Date();
              let month = date.getMonth();
              if (month < 10) {
                month = "0" + month;
              }
              this.props.actions.setLastDownload(
                date.getFullYear() + "" + month + "" + date.getDate()
              );
              Actions.Frontpage(); // Redirect to frontpage
            }).catch(err => {
              this.setState({ openModal: true });
            });
          } else {
            this.setState({ openModal: true });
          }
        } else {
          Actions.Frontpage();
        }
      });
    });
  }

  /**
   * Get random integer between 1 and 10
   * 
   * @return {Integer} Random integer between 1 and 10
   */
  getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(11);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../images/AA_logo.png")}
          style={
            this.props.deviceTypeAndroidTablet
              ? AndroidTabletStyles.image
              : styles.image
          }
        />
        <Text
          style={
            this.props.deviceTypeAndroidTablet
              ? AndroidTabletStyles.subheading
              : styles.subheading
          }
        >
          {this.props.strings.introText}
        </Text>
        {this.props.lastDownloadDate === undefined && (
          <View>
            <Spinner color="green" />
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                paddingLeft: 5,
                paddingRight: 5,
                textAlign: "center",
                color: "#ffffff",
                fontSize: this.props.deviceTypeAndroidTablet ? 30 : 15
              }}
            >
              {this.state.text}
            </Text>
          </View>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.openModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.modalText : styles.modalText}>{this.props.strings.noNetWorkTitle}</Text>
              <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.modalText : styles.modalText}>{this.props.strings.firstNoNett}</Text>
              <TouchableOpacity style={styles.modalBtn} onPress={() => { this.setState({ openModal: false }, this.initialize()) }} >
                <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.modalText : styles.modalText}>{this.props.strings.tryAgain}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

Splash.defaultProps = {
  strings: {
    introText: ""
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000000"
  },
  image: {
    height: 350,
    width: 350,
    margin: 30,
    marginTop: 30,
    marginBottom: 0,
    justifyContent: "center"
  },
  subheading: {
    fontSize: 30,
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 5
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
    fontWeight: "bold",
  },
  modalBtn: {
    backgroundColor: '#f0a00c',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    borderRadius: 16,
  }
});

const AndroidTabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000000"
  },
  image: {
    height: 700,
    width: 700,
    margin: 60,
    marginTop: 100,
    marginBottom: 0,
    justifyContent: "center"
  },
  subheading: {
    fontSize: 60,
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
