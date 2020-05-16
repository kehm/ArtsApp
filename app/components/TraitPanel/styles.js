import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

export const androidTabletStyles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 20
  },
  description: {
    fontSize: 18
  },
  label: {
    fontWeight: "bold",
    fontSize: 18
  },
  resetButtonText: {
    paddingLeft: 8,
    paddingRight: 10,
    fontSize: 18
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    marginBottom: 12,
    minWidth: 40
  },
  resetButtonImage: {
    width: 44,
    height: 44,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#BBB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
});
