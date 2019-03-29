import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import Swiper from "react-native-swiper";

import HorizontalList from "../HorizontalList";
import KeyPanelElement from "../KeyPanelElement";

import styles from "./styles.js";

type Props = {
  keys: Array,
  strings: Object,
  onPress: Function
};

type State = {
  currentKeyId: Number
};

class KeyPanel extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
  }

  _currentKeyId: null;

  getElementSize = () => {
    const { width } = Dimensions.get("window");
    return Math.min(width - 60, 500);
  };

  handleIndexChanged = index => {
    const keyId = this.props.keys[index].key_id;
    if (keyId !== this._currentKeyId) {
      this._currentKeyId = keyId;
    }
  };

  renderItem = (item, size) => {
    const { strings, onPress } = this.props;

    return (
      <KeyPanelElement
        key={item.key_id}
        keyObject={item}
        strings={strings}
        size={size}
        onPress={onPress}
      />
    );
  };

  componentWillReceiveProps(nextProps) {
    if (this._currentKeyId !== null && this._swiper) {
      const oldIndex = this.props.keys.findIndex(
        k => k.key_id === this._currentKeyId
      );
      const newIndex = nextProps.keys.findIndex(
        k => k.key_id === this._currentKeyId
      );

      if (newIndex !== oldIndex) {
        const offset = newIndex - oldIndex;
        setTimeout(() => {
          this._swiper.scrollBy(offset, true);
        }, 500);
      }
    }
  }

  render() {
    const { keys } = this.props;
    const size = this.getElementSize();
    const containerSize = { height: size + 40 };
    const isAndroid = Platform.OS === "android";
    const dotStyle = isAndroid ? styles.dotStyleAndroid : styles.dotStyleIos;
    const activeDotStyle = isAndroid
      ? styles.activeDotStyleAndroid
      : styles.activeDotStyleIos;

    return (
      <View style={[styles.container, containerSize]}>
        <Swiper
          style={styles.swiper}
          dotStyle={dotStyle}
          activeDotStyle={activeDotStyle}
          onIndexChanged={this.handleIndexChanged}
          ref={swiper => {
            this._swiper = swiper;
          }}
        >
          {keys.map(k => this.renderItem(k, size))}
        </Swiper>
      </View>
    );
  }
}

export default KeyPanel;
