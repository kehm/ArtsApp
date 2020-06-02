import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  selected: {
    backgroundColor: '#00FA1222',
    borderColor: '#00FA1288',
  },
  inactive: {
    backgroundColor: '#FF000022',
    borderColor: '#FF000044',
    opacity: 0.5,
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 20,
  },
  selectedImage: {
    borderColor: '#00A212',
  },
  inactiveImage: {
    borderColor: '#A2000022',
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

export const androidTabletStyles = StyleSheet.create({
  title: {
    flex: 1,
    paddingRight: 5,
    fontSize: 18
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 20,
  },
});
