import React from 'react';
import { View } from 'react-native';

import styles  from './styles.js';

type Props = {
  totalCount: Number,
  matchingCount: Number,
  notInRangeCount: Number,
};

class SelectionProgressBar extends React.Component<Props> {

  render() {
    const { totalCount, matchingCount, notInRangeCount } = this.props;
    const eliminatedCount = totalCount - notInRangeCount - matchingCount;
    return (
      <View style={styles.bar}>
        <View style={[styles.matching, { flex: matchingCount }]} />
        <View style={[styles.notInRange, { flex: notInRangeCount }]} />
        <View style={[styles.eliminated, { flex: eliminatedCount }]} />
      </View>
    );
  }

}

export default SelectionProgressBar;
