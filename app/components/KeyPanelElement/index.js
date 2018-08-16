import React from 'react';
import { View, Text, Image } from 'react-native';

import styles  from './styles.js';
import TraitImageButton from '../TraitImageButton';
import { setContentStrings } from '../../actions/SettingsAction.js';

import {
  getKeyThumbImageSource,
  getKeyInfoImageSource
} from '../../utilities/image';

type Props = {
  size: Number,
  keyObject: Object,
  isDownloaded: Boolean,
  title: String,
  imageSource: Object,
  onPress: Function,
  onDownload: Function,
  strings: Object,
};

const mapKey = key => {
  const imageSource = (key.image === 1)
    ? getKeyInfoImageSource(key.key_id)
    : getKeyThumbImageSource(key.key_id);

  return {
    isBeta: key.keyStatus === 'beta',
    isDownloaded: key.keyDownloaded > 0,
    title: key.title,
    imageSource,
  };
};

class KeyPanelElement extends React.Component<Props> {

  render() {
    const { keyObject, size, strings, onPress, onDownload } = this.props;
    const { isBeta, isDownloaded, title, imageSource } = mapKey(keyObject);
    // const dim = { height: size, width: size };
    const dim = { height: 250, width: 250 };

    return (
      <View style={[styles.outerContainer, dim]}>
        <View style={[styles.innerContainer, dim]}>
          {isBeta && <Text style={styles.beta}>{strings.beta}</Text>}
          <Image source={imageSource} resizeMode='contain' style={styles.image} />
        </View>
      </View>
    );
  }

}

export default KeyPanelElement;
