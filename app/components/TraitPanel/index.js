import React from 'react';
import { View, Text } from 'react-native';

import HorizontalList from '../HorizontalList';
import TraitPanelElement from '../TraitPanelElement';

import styles  from './styles.js';

type Props = {
  traits: Array,
  traitImages: Map,
  chosenValues: Array,
  onSelect: Function,
  emptyHeader: String,
  emptyDescription: String,
}

class TraitPanel extends React.Component<Props> {

  handleTraitSelected = (trait) => {
    const { onSelect } = this.props;
    onSelect && onSelect(trait);
  }

  renderItem = (item) => {
    const { chosenValues } = this.props;

    const imagePath = null;
    const selectedValue = item.values.find(val => chosenValues.indexOf(val.value_id) > -1);

    return (
      <TraitPanelElement
        trait={item}
        selectedValue={selectedValue}
        imagePath={imagePath}
        onPress={() => this.handleTraitSelected(item)}
      />
    );
  }

  render() {
    const { traits, emptyHeader, emptyDescription } = this.props;

    return (
      <View style={styles.container}>
        {traits.length === 0 &&
        <View style={styles.emptyContainer}>
          <Text style={styles.header}>{emptyHeader}</Text>
          <Text style={styles.description}>{emptyDescription}</Text>
        </View>
        }
        {traits.length > 0 &&
          <HorizontalList
            data={traits}
            keyExtractor={(item) => item.trait_id}
            renderItem={({item}) => this.renderItem(item)}
          />
        }
      </View>
    );
  }

}

export default TraitPanel;
