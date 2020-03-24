/**
 * @file AppSetup.js
 * @author Kjetil Fossheim
 * Adding different startup settings to application. -language -network -position
 */
import React, { Component } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import ArtsApp from "./ArtsApp";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SettingsAction from "./actions/SettingsAction";
import AsyncStore from "./config/AsyncStore";

const mapStateToProps = state => ({
  ...state.settings
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...SettingsAction }, dispatch)
  };
}

class AppSetup extends Component {
  constructor(props) {
    super(props);
    this.AsyncStore = new AsyncStore();
    this.languagesetup();
    this.props.actions.getlastDownload();
    this.state = {
      initialPosition: "unknown",
      lastPosition: "unknown"
    };
  }

  /**
   * gets the stored language from AsyncStore and sets the app for that language.
   * @return {void} sets language value in reduxStore
   */
  languagesetup() {
    this.AsyncStore.getLanguage().then(value => {
      if (value === null) {
        this.props.actions.setContentStrings("no");
        this.props.actions.setLanguage("no");
      } else {
        this.props.actions.setContentStrings(value);
      }
    });
  }

  async requestLocationPermission() {
    if (Platform.OS !== "android") return Promise.resolve();
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log("location permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  /**
   * Added EventListeners to network and to position
   * @return {void} stores new network status and position to reduxStore
   */
  async componentDidMount() {
    // Fetch initial connectivity status
    NetInfo.fetch().then(conn => {
      this.props.actions.isOnline(conn.isConnected);
    })
    // Add listener for future connectivity changes
    NetInfo.addEventListener(conn => { this.props.actions.isOnline(conn.isConnected); })

    const useLocation = await this.requestLocationPermission();

    if (useLocation) {
      this.watchID = navigator.geolocation.watchPosition(position => {
        this.props.actions.setLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    } else {
      this.watchID = -1;
    }
  }
  /**
   * Removes listeners when component is killed.
   */
  componentWillUnmount() {
    if (this.watchID !== -1) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }

  render() {
    return <ArtsApp />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSetup);
