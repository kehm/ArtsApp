import { Platform, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  container: {
    paddingHorizontal: DeviceInfo.isTablet() ? 80 : 20,
    alignItems: 'center',
  },
  description: {
    fontSize: DeviceInfo.isTablet() ? 16 : 11,
    textAlign: 'center',
  }
});
