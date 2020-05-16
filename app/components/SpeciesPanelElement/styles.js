import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 120,
    width: 120,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  name: {
    maxWidth: 120,
    paddingTop: 2,
  },
  latinName: {
    maxWidth: 120,
    paddingTop: 2,
    fontSize: 11,
  },
});

export const androidTabletStyles = StyleSheet.create({
  name: {
    maxWidth: 120,
    paddingTop: 2,
    fontSize: 18
  },
});
