import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 10,
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
    backgroundColor: '#65C86012'
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
  search: {
    backgroundColor: '#E1ECDF',
    paddingLeft: 20,
    paddingRight: 20,
    color: 'black',
    height: 40,
    width: '100%'
  },
  clearIcon: {
    position: 'absolute',
    right: 12,
    bottom: 8
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold"
  },
});
