import { StyleSheet } from 'react-native';

const size = 60;
const borderSize = 6;

export default StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size * 0.5,
    borderWidth: borderSize,
    borderColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    height: size - borderSize,
    width: size - borderSize,
    borderRadius: (size - borderSize) * 0.5,
  }
});
