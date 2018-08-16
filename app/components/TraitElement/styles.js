import { StyleSheet } from 'react-native';

import * as Colors from '../../lib/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FF000022',
    borderColor: '#FF000044',
    borderWidth: 1,
    borderRadius: 22,
    height: 44,
    padding: 16,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  active: {
    backgroundColor: Colors.AAIconBrownLX,
    borderColor: Colors.AAIconBrownL,
  },
  text: {
    flex: 1,
    paddingRight: 5,
  },
  numbers: {

  }
});
