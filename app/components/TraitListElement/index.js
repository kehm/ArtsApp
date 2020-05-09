import React from 'react';
import { Platform, Dimensions, Easing, Animated, View, Text } from 'react-native';

import styles  from './styles.js';

type Props = {
  title: String,
  total: Number,
  activeValues: Array,
  isActive: Boolean,
  included: Number,
}

class TraitListElement extends React.Component<Props> {

  _animation = new Animated.Value(0);

  componentDidMount() {
    const { index } = this.props;

    Animated.timing(this._animation, {
      toValue: 1.0,
      duration: 350,
      delay: index * 45,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true
    }).start();
  }

  render() {
    const { title, total, included, isActive } = this.props;
    const activeStyle = isActive ? included < total ? styles.reduced : styles.all : styles.empty;
    let numberBadgeStyle = styles.numberBadgeFull;
    if(included === 0) numberBadgeStyle = styles.numberBadgeEmpty;
    else if(included < total) numberBadgeStyle = styles.numberBadgeReduced;

    const transformStyle = Platform.OS === 'ios' ? { transform: [{ scale: this._animation }]} : {};

    return (
      <Animated.View style={[styles.container, transformStyle]}>
        <View style={[styles.elementContainer, activeStyle]}>
          <Text
            style={styles.text}
            numberOfLines={2}
            ellipsizeMode={'tail'}
          >
            {title}
          </Text>
        </View>
        <View style={[styles.numberBadge, numberBadgeStyle]}>
          <Text
            style={styles.numbers}
            numberOfLines={1}
          >
            {included}/{total}
          </Text>
        </View>
      </Animated.View>
    );
  }

}

export default TraitListElement;
