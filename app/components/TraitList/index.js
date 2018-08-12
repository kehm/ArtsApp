import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';

import TraitElement from '../TraitElement';

import styles  from './styles.js';

type Props = {
  traits: Array,
  HeaderComponent: Component,
  activeTraits: Array,
  onSelect: Function
}

class TraitList extends React.Component {

  onPress = (item) => {
    const { onSelect } = this.props;
    onSelect && onSelect(item);
  }

  renderItem = ({ item }) => {
    const { activeTraits, inactiveTraits } = this.props;
    const isActive = activeTraits.indexOf(item) > -1;

    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.onPress(item)}
      >
        <TraitElement
          title={item.traitText}
          total={item.values.length}
          included={item.values.length}
          isActive={isActive}
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
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.trait_id}
        />
      </View>
    );
  }

}

export default TraitList;
