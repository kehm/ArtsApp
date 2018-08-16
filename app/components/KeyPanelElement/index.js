import React from 'react';
import { View, Text } from 'react-native';

import styles  from './styles.js';
import TraitImageButton from '../TraitImageButton';
import { setContentStrings } from '../../actions/SettingsAction.js';

type Props = {
  size: Number,
  isBeta: Boolean,
  betaTitle: String,
  isDownloaded: Boolean,
  title: String,
  imagePath: String,
  onPress: Function,
  onDownload: Function,
  strings: Object,
};

class KeyPanelElement extends React.Component<Props> {

  render() {
    const { size, isBeta, betaTitle, isDownloaded, title, imagePath, onPress, onDownload } = this.props;
    // const dim = { height: size, width: size };
    const dim = { height: 250, width: 250 };

    return (
      <View style={[styles.outerContainer, dim]}>
        <View style={[styles.innerContainer, dim]}>
          {isBeta && <Text style={styles.beta}>{betaTitle}</Text>}
          {/* <TraitImageButton imagePath={imagePath} onPress={onPress} />
          <Text
            style={styles.text}
            numberOfLines={1}
            ellipsizeMode='tail'
          >{trait.traitText}
          </Text>
          <Text
            style={styles.value}
            numberOfLines={1}
            ellipsizeMode='tail'
          >{selectedValue && selectedValue.valueText}
          </Text> */}
        </View>
      </View>
    );
  }

}

export default KeyPanelElement;
