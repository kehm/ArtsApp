import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 8,
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
