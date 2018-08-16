import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';

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

  renderItem = ({ item }) => {
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
        style={styles.row}
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
    return (
      <View style={styles.container}>
        <FlatList
          data={traits}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={() => <View style={styles.footer}/>}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.trait_id}
          numColumns={2}
          columnWrapperStyle={styles.rowWrapper}
        />
      </View>
    );
  }

}

export default TraitList;
