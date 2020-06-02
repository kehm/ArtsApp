import React from 'react';
import { Dimensions, Animated, Easing, TouchableOpacity, Image, View, Text } from 'react-native';

import { styles, androidTabletStyles } from './styles.js';
import TraitImageButton from '../TraitImageButton';

import { mapToImageSource } from '../../utilities/image';

import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

type Props = {
  trait: Object,
  selectedValue: Object,
  imagePath: String,
  truncate: Boolean,
  onPress: Function,
};

class TraitPanelElement extends React.Component<Props> {

  _animation = new Animated.Value(Dimensions.get('window').width);

  componentDidMount() {
    Animated.timing(this._animation, {
      toValue: 0,
      duration: 350,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true
    }).start();
  }

  render() {
    const { trait, imagePath, selectedValue, truncate, onPress } = this.props;
    const source = mapToImageSource(imagePath);
    const truncateStyle = truncate ? { maxWidth: 140 } : {};

    return (
      <Animated.View style={[styles.container, { transform: [{ translateX: this._animation }] }]}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <View style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.imageContainer : styles.imageContainer}>
            {source && source.uri &&
              <Image
                collapsable={false}
                source={source}
                style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.image : styles.image} />
            }
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[this.props.deviceTypeAndroidTablet ? androidTabletStyles.text : styles.text, truncateStyle]}
              numberOfLines={truncate ? 1 : 0}
              ellipsizeMode={'tail'}
            >{trait.traitText}
            </Text>
            <Text
              style={[this.props.deviceTypeAndroidTablet ? androidTabletStyles.value : styles.value, truncateStyle]}
              numberOfLines={truncate ? 1 : 0}
              ellipsizeMode={'tail'}
            >{selectedValue && selectedValue.valueText}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

}

export default connect(mapStateToProps)(TraitPanelElement);
