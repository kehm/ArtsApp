import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    backgroundColor: "#65C86012"
  },
  emptyContainer: {
    alignItems: "center",
    padding: 16
  },
  label: {
    fontWeight: "bold"
  },
  header: {
    fontWeight: "bold"
  },
  description: {
    paddingTop: 8
  },
  headerContainer: {
    padding: 12
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    marginBottom: 12
  },
  resetButtonImage: {
    width: 34,
    height: 34,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#BBB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  resetButtonIcon: {},
  resetButtonText: {
    paddingLeft: 8,
    paddingRight: 10
  }
});
