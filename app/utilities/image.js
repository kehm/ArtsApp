import { Platform } from 'react-native';

import ImageConfig from '../config/network/ImageConfig';

export function mapToImageSource(imagePath) {
  return Platform.OS === 'ios'
    ? { uri: imagePath}
    : { uri: 'file://' + imagePath };
}

export function getKeyThumbImageSource(id) {
  return mapToImageSource(ImageConfig.getkeyThumbs(id));
}

export function getKeyInfoImageSource(id) {
  return mapToImageSource(ImageConfig.getInfoImg(id));
}
