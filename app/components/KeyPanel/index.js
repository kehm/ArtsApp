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
  selected: Number,
  strings: Object,
  onPress: Function,
  onInfo: Function,
};

type State = {
  currentKeyId: Number
};

class KeyPanel extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = ({
      currentIndex: 0,
      prevIndex: 0,
    })
  }

  _currentKeyId: null;

  /**
  * Change visible swiper element on new index selected
  */
  componentDidUpdate() {
    this.props.keys.some((key, i) => {
      if (key.key_id === this.props.selected) {
        if (i !== this.state.currentIndex) {
          this._swiper.scrollBy(i - this.state.currentIndex)
          this.setState({
            currentIndex: i,
            prevIndex: this.state.currentIndex
          })
        }
        return key;
      }
    })
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
