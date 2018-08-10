import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 70,
    paddingTop: 22,
    alignItems: 'flex-end',
  },
  titleContainer: {
    paddingTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 8,
  },
  button: {
    fontSize: 12,
    color: 'blue',
  }
});
