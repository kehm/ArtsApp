import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 10,
    marginTop: 10
  },
  dotMenu: {
    backgroundColor: '#eee',
  },
  dotMenuTxt: {
    color: '#000',
    fontSize: 16,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  list: {
    minHeight: 200,
    color: 'black',
    borderTopColor: 'black',
    borderTopWidth: 1,
    backgroundColor: '#65C86012',
    marginTop: 30
  },
  filteredList: {
    borderTopWidth: 0,
    marginTop: -8
  },
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 40,
  },
  selected: {
    backgroundColor: '#f0a00c',
  },
  listText: {
    fontSize: 14,
    color: '#3079b6',
    marginTop: 8,
    paddingLeft: 8,
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#3079b6'
  },
  listHeader: {
    textAlign: 'center',
    paddingBottom: 6,
    fontWeight: 'bold',
    paddingRight: 4
  },
  icon: {
    marginTop: 4,
  },
  iconContainer: {
    paddingLeft: 20,
    paddingRight: 10
  },
  clearIcon: {
    position: 'absolute',
    right: 12,
    bottom: 8
  },
  search: {
    maxWidth: '80%',
    marginTop: 6,
    paddingRight: 20,
    color: 'black',
    height: 40,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  clearIcon: {
    marginTop: 8
  },
});

export const androidTabletStyles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 60,
  },
  listText: {
    fontSize: 22,
    color: '#3079b6',
    marginTop: 8,
    paddingLeft: 8,
  },
  listHeader: {
    textAlign: 'center',
    paddingBottom: 6,
    fontWeight: 'bold',
    paddingRight: 4,
    fontSize: 22
  },
  search: {
    maxWidth: '80%',
    marginTop: 6,
    paddingRight: 20,
    color: 'black',
    height: 60,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 26,
  },
});