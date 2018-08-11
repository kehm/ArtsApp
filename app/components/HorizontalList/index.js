import React from 'react';
import { FlatList } from 'react-native';

import styles  from './styles.js';

type Props =  {
  data: Object,
  renderItem: Function,
  keyExtractor: Function,
}

class HorizontalList extends React.Component<Props> {

  render() {
    const { data, renderItem, keyExtractor } = this.props;
    return (
      <FlatList
        style={styles.list}
        horizontal
        data={data}
        extraData={this.props}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    );
  }

}

export default HorizontalList;
