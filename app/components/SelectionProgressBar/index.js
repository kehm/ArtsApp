import React from 'react';
import { LayoutAnimation, View } from 'react-native';
import styles from './styles.js';

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

  /**
   * If new props, trigger state update
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { totalCount, matchingCount, notInRangeCount } = nextProps;
    if (totalCount !== prevState.totalCount && matchingCount !== prevState.matchingCount && notInRangeCount !== prevState.notInRangeCount) {
      return {
        totalCount: totalCount,
        matchingCount: matchingCount,
        notInRangeCount: notInRangeCount
      }
    } else return null;
  }

  /**
   * Set new state
   */
  componentDidUpdate(prevProps, prevState) {
    const { totalCount, matchingCount, notInRangeCount } = prevState;
    if (totalCount !== this.state.totalCount && matchingCount !== this.state.matchingCount && notInRangeCount !== this.state.notInRangeCount) {
      this.setStateAnimated((prevState) => ({
        ...prevState,
        totalCount, matchingCount, notInRangeCount
      }));
    }
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
