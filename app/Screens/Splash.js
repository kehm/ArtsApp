/**
 * @file Show loading screen on startup while loading data and setting up the app
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Spinner } from "native-base";
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
      text: introstrings["a" + this.getRandomInt()]
    };
  }

  /**
   * Download list of available keys if app is started for the first time. Requires network.
   */
  componentDidMount() {
    this.DbHelper.testDatabase().then(() => {
      this.props.actions.getLastDownload().then((date) => {
        if (date.value === null) {
          if (this.props.isConnected) {
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
            });
          } else {
            Alert.alert(
              this.props.strings.noNetWorkTitle,
              this.props.strings.firstNoNett + " ",
              [{ text: this.props.strings.ok, onPress: () => BackHandler.exitApp() }]
            );
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
        {this.props.lastDownloadDate === -1 && (
          <View>
            <Spinner color="green" />
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                textAlign: "center",
                color: "#ffffff",
                fontSize: this.props.deviceTypeAndroidTablet ? 30 : 15
              }}
            >
              {this.state.text}
            </Text>
          </View>
        )}
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
    marginTop: 70,
    marginBottom: 0,
    justifyContent: "center"
  },
  subheading: {
    fontSize: 30,
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 5
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
