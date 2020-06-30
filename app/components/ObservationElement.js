/**
 * @file List element representing an observation in Observation.js
 * @author Kjetil Fossheim
 */

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Grid, Row } from "native-base";
import { connect } from "react-redux";
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

class ObservationElement extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.itemContainer} onLongPress={() => this.menu.open()}>
        <Grid>
          {this.props.language === 'no' ? (
            <Row>
              <Text
                style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.headerTxt
                    : styles.headerTxt
                }
              >
                {this.props.localName}
              </Text>
              <Text
                style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.subHeaderTxt
                    : styles.subHeaderTxt
                }
              >
                {" (" + this.props.latinName + ")"}
              </Text>
            </Row>
          ) : (
              <Row>
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.headerTxt
                      : styles.headerTxt
                  }
                >
                  {this.props.latinName}
                </Text>
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.subHeaderTxt
                      : styles.subHeaderTxt
                  }
                >
                  {" (" + this.props.localName + ")"}
                </Text>
              </Row>
            )}
          <Row>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.place}
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
              {this.props.county + " "}
            </Text>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.obsLatitude !== 'undefined' ? (
                "(" + this.props.obsLatitude + ", ") : (
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
              {this.props.obsLongitude !== 'undefined' ? (
                this.props.obsLongitude + ")") : (
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
            <Menu ref={c => (this.menu = c)}>
              <MenuTrigger />
              <MenuOptions style={styles.dotMenu}>
                <MenuOption onSelect={() => { this.props.onSelectCoordinates(this.props.obsItem) }} >
                  <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.dotMenuTxt : styles.dotMenuTxt}>{this.props.strings.setCoordinates}</Text>
                </MenuOption>
                <MenuOption onSelect={() => { this.props.onDelete(this.props.obsItem.userObservation_id) }} >
                  <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.dotMenuTxt : styles.dotMenuTxt}>{this.props.strings.delete}</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </Row>
        </Grid>
      </TouchableOpacity >
    );
  }
}

const styles = StyleSheet.create({
  text3: {
    fontSize: 14,
    color: "black",
    paddingLeft: 10
  },
  headerTxt: {
    fontSize: 14,
    color: "black",
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10
  },
  subHeaderTxt: {
    fontSize: 14,
    color: "black",
    paddingTop: 10
  },
  itemContainer: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  dotMenuTxt: {
    color: '#000',
    fontSize: 16,
    padding: 10,
  },
});

const AndroidTabletStyles = StyleSheet.create({
  text3: {
    fontSize: 22,
    paddingLeft: 10,
    color: "black"
  },
  headerTxt: {
    fontSize: 22,
    color: "black",
    fontWeight: 'bold',
    paddingTop: 10
  },
  subHeaderTxt: {
    fontSize: 22,
    color: "black",
    paddingLeft: 10,
    paddingTop: 10
  },
  dotMenuTxt: {
    color: '#000',
    fontSize: 20,
    padding: 10,
  },
});

export default connect(mapStateToProps)(ObservationElement);
