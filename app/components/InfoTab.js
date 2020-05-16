/**
 * @file Tab for displaying description text about selected species.
 * @author Kjetil Fossheim
 */
import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';

export default class InfoTab extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={{ fontSize: (this.props.tablet ? 20 : 15) }}> {this.props.info}
        </Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    );
  }
}
