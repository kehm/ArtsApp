import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    // borderColor: 'orange',
    // borderWidth: 2,
    alignItems: 'stretch',
  },
  panelHeader: {
    // borderColor: 'red',
    // borderWidth: 2,
    // height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    // flex: auto,
    justifyContent: 'space-between',
  },
  headerTitle: {
    alignSelf: 'flex-start',
  },
  headerButton: {
    alignSelf: 'flex-end',
  }

});
