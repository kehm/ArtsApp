import { StyleSheet } from 'react-native';
import * as Colors from '../../lib/colors';

export const styles = StyleSheet.create({
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
    height: 32,
    width: 32,
    borderRadius: 32 * 0.5,
    borderWidth: 2,
    borderColor: Colors.AAIconGreenL,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 32 - 3,
    width: 32 - 3,
    borderRadius: (32 - 3) * 0.5,
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

export const androidTabletStyles = StyleSheet.create({
  imageContainer: {
    marginLeft: 10,
    height: 44,
    width: 44,
    borderRadius: 44 * 0.5,
    borderWidth: 2,
    borderColor: Colors.AAIconGreenL,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 44 - 3,
    width: 44 - 3,
    borderRadius: (44 - 3) * 0.5,
  },
  text: {
    paddingTop: 2,
    fontSize: 18,
  },
  value: {
    paddingTop: 2,
    fontSize: 18,
  }
});
