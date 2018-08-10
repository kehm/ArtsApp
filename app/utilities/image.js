import { Platform } from 'react-native';

export function mapToImageSource(imagePath) {
  return Platform.OS === 'ios'
    ? { uri: imagePath}
    : { uri: 'file://' + imagePath };
}
