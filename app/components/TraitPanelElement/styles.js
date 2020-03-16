import { StyleSheet } from 'react-native';
import * as Colors from '../../lib/colors';

const imageSize = 32;

export default StyleSheet.create({
  container: {

  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
    marginRight: 10,
  },
  imageContainer: {
    marginLeft: 10,
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize * 0.5,
    borderWidth: 2,
    borderColor: Colors.AAIconGreenL,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: imageSize - 3,
    width: imageSize - 3,
    borderRadius: (imageSize - 3) * 0.5,
  },
  textContainer: {
    justifyContent: 'center',
  },
  text: {
    paddingTop: 2,
  },
  value: {
    paddingTop: 2,
    fontSize: 11,
  }
});
