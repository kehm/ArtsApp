import { StyleSheet } from 'react-native';

const statusbarHeight = 28;

export default StyleSheet.create({
  container: {
    height: 85,
    paddingTop: statusbarHeight,
    alignItems: 'flex-end',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
  },
  titleContainer: {
    paddingTop: statusbarHeight,
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
