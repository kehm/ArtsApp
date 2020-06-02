/**
 * @file Adding different startup settings to application. -language -network -position
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import NetInfo from "@react-native-community/netinfo";
import ArtsApp from "./ArtsApp";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SettingsAction from "./actions/SettingsAction";
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
      ready: false,
      netInfo: undefined
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
    this.setState({ netInfo: NetInfo.addEventListener(conn => { this.props.actions.isOnline(conn.isConnected); }) }) // Add listener for future connectivity changes
  }

  /**
   * Removes listeners when component is killed.
   */
  componentWillUnmount() {
    this.state.netInfo(); // unsubscribe NetInfo event listener
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
