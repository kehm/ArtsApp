/**
 * @file Tab for displaying description text about selected species.
 * @author Kjetil Fossheim
 */
import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import HTMLView from "react-native-htmlview";

export default class InfoTab extends Component {
  render() {
    return (
      <ScrollView>
        <HTMLView
          value={this.props.info !== null ? this.props.info.replace(/(\n|<br>)/gm, "") : ""}
          stylesheet={
            this.props.deviceTypeAndroidTablet
              ? htmlstylesAndroidTablet
              : htmlstyles
          }
        />
        <View style={{ height: 100 }} />
      </ScrollView>
    );
  }
}

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
  i: {
    fontSize: 20
  }
});