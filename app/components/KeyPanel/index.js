/**
 * Front page key panel
 */
import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import Swiper from "react-native-swiper";
import HorizontalList from "../HorizontalList";
import KeyPanelElement from "../KeyPanelElement";
import styles from "./styles.js";

type Props = {
  keys: Array,
  index: String,
  prevIndex: String,
  strings: Object,
  onPress: Function,
  onInfo: Function,
  onUpdateIndex: Function,
};

type State = {
  currentKeyId: Number
};

class KeyPanel extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
  }

  _currentKeyId: null;

  /**
  * Change visible swiper element on new index selected
  */
  componentDidUpdate() {
    if (this.props.index !== this.props.prevIndex) {
      let diff = this.props.index - this.props.prevIndex;
      this._swiper.scrollBy(diff);
    }
  }

  handleIndexChanged = index => {
    const keyId = this.props.keys[index].key_id;
    if (keyId !== this._currentKeyId) {
      this._currentKeyId = keyId;
    }
  };

  getElementSize = () => {
    const { width } = Dimensions.get("window");
    return Math.min(width - 60, 500);
  };

  renderItem = (item, size) => {
    const { strings, onPress, onInfo } = this.props;
    return (
      <KeyPanelElement
        key={item.key_id}
        keyObject={item}
        strings={strings}
        size={size}
        onPress={onPress}
        onInfo={onInfo}
      />
    );
  };

  render() {
    const { keys } = this.props;
    const size = this.getElementSize();
    const containerSize = { height: size + 10 };
    const isAndroid = Platform.OS === "android";
    const dotStyle = isAndroid ? styles.dotStyleAndroid : styles.dotStyleIos;
    const activeDotStyle = isAndroid ? styles.activeDotStyleAndroid : styles.activeDotStyleIos;
    return (
      <View style={[styles.container, containerSize]}>
        <Swiper
          style={styles.swiper}
          dotStyle={dotStyle}
          activeDotStyle={activeDotStyle}
          showsPagination={false}
          scrollEnabled={false}
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
