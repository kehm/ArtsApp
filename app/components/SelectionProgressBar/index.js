import React from 'react';
import { LayoutAnimation, View } from 'react-native';

import styles  from './styles.js';

type Props = {
  totalCount: Number,
  matchingCount: Number,
  notInRangeCount: Number,
};

class SelectionProgressBar extends React.Component<Props> {

  constructor(props) {
    super(props);
    const { totalCount, matchingCount, notInRangeCount } = props;
    this.state = {
      totalCount, matchingCount, notInRangeCount
    };
  }
  componentWillReceiveProps(nextProps) {
    const { totalCount, matchingCount, notInRangeCount } = nextProps;
    this.setStateAnimated((prevState) => ({
      ...prevState,
      totalCount, matchingCount, notInRangeCount
    }));
  }

  setStateAnimated(callback: (state: State) => void) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(callback);
  }

  render() {
    const { totalCount, matchingCount, notInRangeCount } = this.state;
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
