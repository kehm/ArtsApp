import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bar: {
    flexDirection: 'row',
    width: 400,
    height: 20,
    backgroundColor: '#0002',
  },
  matching: {
    backgroundColor: 'green',
  },
  notInRange: {
    backgroundColor: 'yellow',
  },
  eliminated: {
    backgroundColor: 'orange',
  }
});
