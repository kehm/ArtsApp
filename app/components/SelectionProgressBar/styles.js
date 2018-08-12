import { StyleSheet } from 'react-native';

import * as Colors from '../../lib/colors';

export default StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 8,
    backgroundColor: '#0002',
  },
  notFiltered: {
    backgroundColor: '#CCC',
  },
  matching: {
    backgroundColor: Colors.AAIconGreen,
  },
  notInRange: {
    backgroundColor: Colors.AAIconBlue,
  },
  eliminated: {
    backgroundColor: Colors.AAIconBrown,
  }
});
