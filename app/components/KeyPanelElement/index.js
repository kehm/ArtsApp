import React from 'react';
import { TouchableOpacity, View, Text, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles.js';
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
  constructor(props) {
    super(props);
    this.state = {
      defaultImage: false,
      defaultImagePath: require("../../images/AA_logo.png")
    };
  }

  render() {
    const { keyObject, size, strings, onPress, onDownload } = this.props;
    const { isBeta, isDownloaded, title, imageSource } = mapKey(keyObject);
    const containerSize = { height: size, width: size };
    const imageMarginH = isBeta ? 50 : 20;
    const imageMarginV = isBeta ? 50 : 40;
    const imageSize = { height: size - 2 * imageMarginV, width: size - 2 * imageMarginH };

    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(keyObject)}>
        <View style={[styles.outerContainer, containerSize]}>
          <View style={[styles.innerContainer, containerSize]}>
            {isBeta && <Text style={styles.beta}>{strings.beta}</Text>}
            <Text style={styles.title}>{title}</Text>
            <View style={styles.imageContainer}>
              <Image source={this.state.defaultImage ? this.state.defaultImagePath : imageSource}
                resizeMode='contain' style={[styles.image, imageSize]} onError={() => { this.setState({ defaultImage: true }) }} />
            </View>
            {!isDownloaded &&
              <View style={styles.downloadContainer}>
                <Icon name='cloud-download' style={styles.download} size={24} />
              </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default KeyPanelElement;
