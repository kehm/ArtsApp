import React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import TraitListElement from '../TraitListElement';
import { arraysDiffer, reshape } from '../../utilities/array';
import styles  from './styles.js';

type Props = {
  traits: Array,
  HeaderComponent: Component,
  activeTraits: Array,
  activeValues: Array,
  onSelect: Function,
}

class TraitList extends React.Component {

  shouldComponentUpdate(nextProps) {
    return arraysDiffer(this.props.traits, nextProps.traits,
      (a,b) => a.trait_id === b.trait_id) ||
      arraysDiffer(this.props.activeValues, nextProps.activeValues,
        (a, b) => a.value_id === b.value_id);
  }

  componentDidUpdate() {
    this._scrollView.scrollTo({x: 0, y: 0, animated: false});
  }

  onPress = (item) => {
    const { onSelect } = this.props;
    onSelect && onSelect(item);
  }

  renderItem = (item) => {
    const { traits, activeTraits, activeValues } = this.props;
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
          index={traits.indexOf(item)}
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
    const traitPairs = reshape(traits, 2);
    return (
      <ScrollView style={styles.container} ref={(ref) => this._scrollView = ref}>
        {traitPairs.map( traitPair => (
          <View collapsable={false} style={styles.row} key={traitPair[0].trait_id}>
            {this.renderItem(traitPair[0])}
            {traitPair.length == 2 && this.renderItem(traitPair[1])}
          </View>
        ))}
        <View style={styles.footer}/>
      </ScrollView>
    );
  }

}

export default TraitList;
