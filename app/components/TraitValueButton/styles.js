import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#00FA1222',
    borderColor: '#00FA1288',
  },
  inActive: {
    backgroundColor: '#FF000022',
    borderColor: '#FF000044',
    opacity: 0.5,
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
    flex: 1,
    paddingRight: 5,
  },
  icon: {
    color: '#AAA'
  }
});
