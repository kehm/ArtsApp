import { Dimensions, StyleSheet } from 'react-native';

import * as Colors from '../../lib/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: (Dimensions.get('window').width * 0.5) - 10,
  },
  elementContainer: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginTop: 16,
    marginRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  all: {
    backgroundColor: '#E1ECDF',
    borderColor: Colors.AAIconGreenD + '22',
  },
  reduced: {
    backgroundColor: '#F4E9D7',
    borderColor: Colors.AAIconBrownL + '44',
  },
  empty: {
    backgroundColor: '#F6D5D5',
    borderColor: '#FF000022',
  },
  text: {
    flex: 1,
    paddingRight: 5,
    textAlign: 'center',
    maxHeight: 70,
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
    right: 14,
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

export const androidTabletStyles = StyleSheet.create({
  text: {
    flex: 1,
    paddingRight: 5,
    textAlign: 'center',
    maxHeight: 70,
    fontSize: 20
  },
  numbers: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 17,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 14,
    top: 0,
  },
});