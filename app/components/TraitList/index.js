import React from 'react';
import { FlatList, View, Text } from 'react-native';

import TraitElement from '../TraitElement';

import styles  from './styles.js';

type Props = {
  data: Array,
  onSelect: Function
}
class TraitList extends React.Component {

  renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <TraitElement
          title={item.trait}
        />
      </View>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }

}

export default TraitList;
