import React from 'react';
import { FlatList } from 'react-native';

import styles  from './styles.js';

type Props =  {
  data: Object,
  renderItem: Function,
}

class HorizontalList extends React.Component<Props> {

  render() {
    const { data, renderItem } = this.props;
    return (
      <FlatList
        style={styles.list}
        horizontal
        data={data}
        extraData={this.props}
        renderItem={renderItem}
      />
    );
  }

}

export default HorizontalList;
