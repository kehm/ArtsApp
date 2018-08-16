import React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';

import TraitListElement from '../TraitListElement';

import styles  from './styles.js';

type Props = {
  traits: Array,
  HeaderComponent: Component,
  activeTraits: Array,
  activeValues: Array,
  onSelect: Function,
}

class TraitList extends React.Component {

  onPress = (item) => {
    const { onSelect } = this.props;
    onSelect && onSelect(item);
  }

  renderItem = (item) => {
    const { activeTraits, activeValues } = this.props;
    const isTraitActive = activeTraits.indexOf(item) > -1;

    // Find number of values that are active
    let activeValueCount = item.values.length;
    if(isTraitActive) {
      if(activeValues.length > 0) {
        // Then we know something is filtered
        activeValueCount = item.values.reduce((ag, value) =>
          (activeValues.indexOf(value.value_id) > -1 ? 1 : 0) + ag, 0);
      }
    }
    else {
      activeValueCount = 0;
    }

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.onPress(item)}
      >
        <TraitListElement
          title={item.traitText}
          total={item.values.length}
          included={activeValueCount}
          activeValues={activeValues}
          isActive={isTraitActive}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { traits, HeaderComponent } = this.props;
    const traitPairs = this.reshape(traits, 2);

    return (
      <ScrollView style={styles.container}>
        {traitPairs.map( traitPair => (
          <View style={styles.row} key={traitPair[0].trait_id}>
            {this.renderItem(traitPair[0])}
            {traitPair.length == 2 && this.renderItem(traitPair[1])}
          </View>
        ))}
        <View style={styles.footer}/>
      </ScrollView>
    );
  }

  reshape = (arr, cols) => {
    var copy = arr.slice(0); // Copy all elements.
    const retVal = [];
    for (let r = 0; r < arr.length; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        if (i < copy.length) {
          row.push(copy[i]);
        }
      }
      retVal.push(row);
    }
    return retVal.filter(a => a.length > 0);
  };

}

export default TraitList;
