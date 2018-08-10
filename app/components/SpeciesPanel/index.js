import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import IconButton from '../IconButton';
import SpeciesPanelElement from '../SpeciesPanelElement';
import SelectionProgressBar from '../SelectionProgressBar';

type Props = { };
type State = {
  isCollapsed: Boolean,
}

class SpeciesPanel extends React.Component<Props,State> {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }
  handleToggleCollapsed = () => {
    const isCollapsed = !this.state.isCollapsed;
    this.setState({ isCollapsed });
  }
  handleSpeciesOnPress = species => {
    console.log('Species pressed');
  }
  render() {
    const { isCollapsed } = this.state;
    const imagePath = 'https://www.artsdatabanken.no/Media/F24913?mode=80x80';

    return (
      <View style={styles.container}>
        <View style={styles.panelHeader}>
          <Text>45 mulige arter, 14 i nærheten av 49 totalt</Text>

          {isCollapsed && <IconButton icon='chevron-small-up' onPress={this.handleToggleCollapsed} />}
          {!isCollapsed && <IconButton icon='chevron-small-down' onPress={this.handleToggleCollapsed} />}
        </View>
        {!isCollapsed && <SpeciesPanelElement imagePath={imagePath} onPress={this.handleSpeciesOnPress} />}
        <SelectionProgressBar totalCount={49} matchingCount={13} notInRangeCount={7} />
      </View>
    );
  }
}

export default SpeciesPanel;
