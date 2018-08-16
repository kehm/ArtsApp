import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';

type Props = {
  title: String,
  total: Number,
  activeValues: Array,
  isActive: Boolean,
  included: Number,
}

class TraitElement extends React.Component<Props> {

  render() {
    const { title, total, included, isActive } = this.props;
    const activeStyle = isActive ? included < total ? styles.reduced : styles.all : styles.empty;

    let numberBadgeStyle = styles.numberBadgeFull;
    if(included === 0) numberBadgeStyle = styles.numberBadgeEmpty;
    else if(included < total) numberBadgeStyle = styles.numberBadgeReduced;

    return (
      <View style={styles.container}>
        <View style={[styles.elementContainer, activeStyle]}>
          <Text
            style={styles.text}
            numberOfLines={1}
            ellipsizeMode='tail'
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
      </View>
    );
  }

}

export default TraitElement;
