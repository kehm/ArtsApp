import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAAAAA77',
  },
  dialogBorder: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.6,
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#AAA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  dialogHeaderContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
  },
  dialogHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  valuesContainer: {
    flex: 1,
  }
});
