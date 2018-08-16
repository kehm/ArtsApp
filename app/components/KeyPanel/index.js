import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import HorizontalList from '../HorizontalList';
import KeyPanelElement from '../KeyPanelElement';

import styles  from './styles.js';
// import KeySwiper from '../KeySwiper';

type Props = {
  keys: Array,
  strings: Object,
}

class KeyPanel extends React.Component<Props> {

  // handleTraitSelected = (trait) => {
  //   const { onSelect } = this.props;
  //   onSelect && onSelect(trait);
  // }
  getElementSize = () => {
    const { width } = Dimensions.get('window');
    return width - 80;
  }

  renderItem = (item, size) => {
    const { strings } = this.props;
    // const { valueImages, chosenValues } = this.props;

    // const selectedValue = item.values.find(val => chosenValues.indexOf(val.value_id) > -1);

    // const imagePaths = valueImages.get(selectedValue.value_id);
    // let imagePath = null;
    // if (imagePaths) imagePath = imagePaths[0];

    // return (
    //   <TraitPanelElement
    //     trait={item}
    //     selectedValue={selectedValue}
    //     imagePath={imagePath}
    //     onPress={() => this.handleTraitSelected(item)}
    //   />
    // );
    return (
      <KeyPanelElement
        key={item.key_id}
        keyObject={item}
        strings={strings}
        size={size}
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
