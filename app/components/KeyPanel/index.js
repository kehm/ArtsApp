import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import HorizontalList from '../HorizontalList';
import KeyPanelElement from '../KeyPanelElement';

import styles  from './styles.js';

type Props = {
  keys: Array,
  strings: Object,
  onPress: Function,
  onDownload: Function,
}

class KeyPanel extends React.Component<Props> {

  getElementSize = () => {
    const { width } = Dimensions.get('window');
    return width - 80;
  }

  renderItem = (item, size) => {
    const { strings, onPress, onDownload } = this.props;

    return (
      <KeyPanelElement
        key={item.key_id}
        keyObject={item}
        strings={strings}
        size={size}
        onPress={onPress}
        onDownload={onDownload}
      />
    );
  }

  render() {
    const { keys } = this.props;
    const size = this.getElementSize();
    const containerSize = { height: size + 40 };

    return (
      <View style={[styles.container, containerSize]}>
        <Swiper style={styles.swiper} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDot}>
          {keys.map(k => this.renderItem(k, size))}
        </Swiper>
      </View>
    );
  }
}

export default KeyPanel;
