import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#EE00FF',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#CCC',
  },
  titleIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    flex: 1,
  },
  title: {

  },
  icon: {
    color: '#333'
  }
});
