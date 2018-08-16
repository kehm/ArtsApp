import { StyleSheet } from 'react-native';

import * as Colors from '../../lib/colors';

export default StyleSheet.create({
  container: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
  },
  elementContainer: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    height: 44,
    margin: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  all: {
    backgroundColor: Colors.AAIconGreen + '22',
    borderColor: Colors.AAIconGreenD + '22',
  },
  reduced: {
    backgroundColor: Colors.AAIconBrown + '22',
    borderColor: Colors.AAIconBrownL + '44',
  },
  empty: {
    backgroundColor: '#FF000022',
    borderColor: '#FF000022',
  },
  text: {
    flex: 1,
    paddingRight: 5,
  },
  numbers: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  numberBadge: {
    width: 30,
    height: 30,
    borderRadius: 17,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  numberBadgeFull: {
    backgroundColor: Colors.AAIconGreen,
  },
  numberBadgeReduced: {
    backgroundColor: Colors.AAIconBrown,
  },
  numberBadgeEmpty: {
    backgroundColor: '#AA0000',
  }
});
