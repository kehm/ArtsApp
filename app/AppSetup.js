/**
 * @file Adding different startup settings to application. -language -network -position
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import ArtsApp from "./ArtsApp";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SettingsAction from "./actions/SettingsAction";
import Geolocation from '@react-native-community/geolocation';
import AsyncStorageHandler from "./config/AsyncStorageHandler";

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
    this.state = {
      initialPosition: "unknown",
      lastPosition: "unknown",
      ready: false
    };
  }

  /**
   * Add event listeners for network connectivity and geolocation
   */
  componentDidMount = async () => {
    this.setAppLanguage().then(() => {
      this.setState({ ready: true }); // Render ArtsApp when language is set
    });
    NetInfo.fetch().then(conn => { this.props.actions.isOnline(conn.isConnected); }); // Fetch initial connectivity status
    NetInfo.addEventListener(conn => { this.props.actions.isOnline(conn.isConnected); }); // Add listener for future connectivity changes
    const useLocation = await this.requestLocationPermission(); // Request position
    if (useLocation) {
      this.watchID = Geolocation.watchPosition(position => {
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
    // TODO: Unsubscribe NetInfo listener
    if (this.watchID !== -1) {
      Geolocation.clearWatch(this.watchID);
    }
    Geolocation.stopObserving();
  }

  /**
   * Sets language "no" if no other language specified in AsyncStorage
   */
  async setAppLanguage() {
    this.props.actions.getLanguage().then((lang) => {
      if (lang !== undefined && typeof lang.value === 'string') {
        this.props.actions.setContentStrings(lang.value);
        this.props.actions.setLanguage(lang.value);
      } else {
        this.props.actions.setContentStrings("no");
        this.props.actions.setLanguage("no");
      }
    });
  }


  /**
   * Request Android/iOS location permissions
   */
  async requestLocationPermission() {
    if (Platform.OS !== "android") return Promise.resolve();
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "ArtsApp Location Permission",
          message: "ArtsApp needs access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  render() {
    if (this.state.ready) {
      return <ArtsApp />;
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSetup);
