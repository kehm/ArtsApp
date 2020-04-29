/**
 * @file List element representing an observation in Observation.js
 * @author Kjetil Fossheim
 */

import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { Content, Grid, Row } from "native-base";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

class ObservationElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Content>
        <Grid>
          <Row>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.headerTxt
              }
            >
              {this.props.localName + " ("}
            </Text>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.headerTxt
              }
            >
              {this.props.latinName + ")"}
            </Text>
          </Row>
          <Row>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.place + ", "}
            </Text>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.county + " "}
            </Text>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.latitude !== 'undefined' ? (
                "(" + this.props.latitude + ", ") : (
                  ""
                )}
            </Text>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.longitude !== 'undefined' ? (
                this.props.longitude + ")") : (
                  ""
                )}
            </Text>
          </Row>
          <Row>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.obsDateTime}
            </Text>
          </Row>
        </Grid>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  text3: {
    fontSize: 14,
    marginBottom: 5,
    color: "black"
  },
  headerTxt: {
    fontSize: 14,
    marginBottom: 5,
    color: "black",
    fontWeight: 'bold'
  }
});

const AndroidTabletStyles = StyleSheet.create({
  text3: {
    fontSize: 24,
    marginBottom: 5,
    color: "black"
  }
});

export default connect(mapStateToProps)(ObservationElement);
