import React from 'react';
import { View, Text } from 'react-native';
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

  renderItem = (item) => {
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
        size={250}
      />
    );
  }
  render() {
    const { keys } = this.props;
    // const { traits, emptyHeader, emptyDescription } = this.props;

    return (
      <View style={styles.container}>
        <Swiper style={styles.swiper}>
          {keys.map(k => this.renderItem(k))}
        </Swiper>
      </View>
    );
  }

}

export default KeyPanel;
