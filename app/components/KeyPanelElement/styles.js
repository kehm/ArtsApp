import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  innerContainer: {
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  beta: {
    backgroundColor: '#B8E986',
    position: 'absolute',
    top: 25,
    right: -68,
    transform: [{ rotate: '45deg'}],
    width: 200,    
    textAlign: 'center',
    alignSelf: 'flex-end',
    fontWeight: '100',
  },
  title: {
    position: 'absolute',
    top: 16,
  },
  imageContainer: {
    paddingTop: 10,
  },
  downloadContainer: {
    position: 'absolute',
    bottom: 6,
    flexDirection: 'row'
  },
  download: {
    color: '#999999'
  },
  info: {
    fontSize: 30,
  },
  downloadSpinner: {
    position: 'absolute',
    bottom: 6,
    width: 32,
    height: 32,
  },
});

export const androidTabletStyles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 16,
    fontSize: 22
  },
});