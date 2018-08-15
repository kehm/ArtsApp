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
    const eliminatedStyle = matchingCount === 0 && notInRangeCount === 0 ?
      styles.notFiltered : styles.eliminated;

    return (
      <View style={styles.bar}>
        <View style={[styles.matching, { flex: matchingCount }]} />
        <View style={[styles.notInRange, { flex: notInRangeCount }]} />
        <View style={[eliminatedStyle, { flex: eliminatedCount }]} />
      </View>
    );
  }

}

export default SelectionProgressBar;
