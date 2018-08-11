import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    borderTopColor: '#CCC',
    borderTopWidth: 1,
  },
  panelHeader: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  headerButton: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  progress: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  }
});
