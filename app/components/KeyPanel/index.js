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
  onUpdate: Function,
};

class KeyPanel extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = ({
      currentIndex: 0,
      prevIndex: 0,
      currentKey: undefined,
    })
  }

  /**
  * Change visible swiper element on new list item selected
  */
  componentDidUpdate() {
    if (this.state.currentKey !== this.props.selected) {
      this.props.keys.some((key, i) => {
        if (key.key_id === this.props.selected) {
          if (i !== this.state.currentIndex) {
            this._swiper.scrollBy(i - this.state.currentIndex)
            this.setState({
              currentIndex: i,
              prevIndex: this.state.currentIndex,
              currentKey: key.key_id
            })
          }
          return key;
        }
      });
    }
  }

  /**
   * Change swiper index on swipe
   */
  handleIndexChanged = index => {
    if (this.props.selected !== this.props.keys[index].key_id) {
      this.setState({ currentKey: this.props.keys[index].key_id });
      this.props.onUpdate(this.props.keys[index]);
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
    const size = this.getElementSize();
    const containerSize = { height: size + 10 };
    const isAndroid = Platform.OS === "android";
    const dotStyle = isAndroid ? styles.dotStyleAndroid : styles.dotStyleIos;
    const activeDotStyle = isAndroid ? styles.activeDotStyleAndroid : styles.activeDotStyleIos;
    return (
      <View style={[styles.container, containerSize]}>
        <Swiper scrollEnabled={false}
          style={styles.swiper}
          dotStyle={dotStyle}
          activeDotStyle={activeDotStyle}
          showsPagination={false}
          onIndexChanged={this.handleIndexChanged}
          ref={swiper => {
            this._swiper = swiper;
          }}
        >
          {this.props.keys.map(k => this.renderItem(k, size))}
        </Swiper>
      </View>
    );
  }
}

export default KeyPanel;
