import { StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";

export default StyleSheet.create({
  container: {
    alignItems: "stretch",
    borderTopColor: "#CCC",
    borderTopWidth: 1
  },
  panelHeader: {
    paddingLeft: 10,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: +(DeviceInfo.hasNotch() ? 25 : 0),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  emptyDescription: {
    padding: 10,
    height: 44,
    fontSize: 12
  },
  headerTitle: {
    padding: 10,
    alignSelf: "flex-start"
  },
  headerButton: {
    padding: 10,
    alignSelf: "flex-end"
  },
  progress: {
    marginBottom: 10 + (DeviceInfo.hasNotch() ? 25 : 0),
    paddingLeft: 10,
    paddingRight: 10
  },
  viewAllContainer: {
    marginRight: 10,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 120
  },
  viewAllIcon: {
    paddingTop: 12
  },
  viewAllText: {
    paddingTop: 14
  }
});
