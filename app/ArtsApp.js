/**
 * @file Application entry point. Wrap Redux wrapper and menu drawer to undelying scenes.
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { BackHandler, ToastAndroid, Platform, UIManager } from "react-native";
import { connect } from "react-redux";
import { Drawer } from "native-base";
import { Router, Scene, ActionConst, Actions } from "react-native-router-flux";
import { bindActionCreators } from "redux";
import * as MenuAction from "./actions/MenuAction";
import MenuContent from "./components/MenuContent";
import Frontpage from "./Screens/Frontpage";
import Key from "./Screens/Key";
import Observation from "./Screens/Observation";
import Species from "./Screens/Species";
import Splash from "./Screens/Splash";
import Debug from "./Screens/Debug";
import About from "./Screens/About";
import Info from "./Screens/Info";
import UpdateLocation from "./Screens/UpdateLocation";
import UpdateKeys from "./Screens/UpdateKeys";

const mapStateToProps = state => ({
  ...state.nav,
  ...state.menu,
  ...state.settings
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...MenuAction }, dispatch)
  };
}

const RouterWithRedux = connect()(Router);

/**
 * Collection off all scenes for ArtsApp
 */
const scenes = Actions.create(
  <Scene key="root">
    <Scene
      key="splash"
      component={Splash}
      title="Splash"
      panHandlers={null}
      hideNavBar
      initial
    />
    <Scene
      key="Frontpage"
      component={Frontpage}
      panHandlers={null}
      hideNavBar
      type={ActionConst.RESET}
    />
    <Scene key="Key" hideNavBar panHandlers={null} component={Key} />
    <Scene key="About" hideNavBar panHandlers={null} component={About} />
    <Scene key="Info" hideNavBar panHandlers={null} component={Info} />
    <Scene
      key="UpdateLocation"
      hideNavBar
      panHandlers={null}
      component={UpdateLocation}
    />
    <Scene
      key="UpdateKeys"
      hideNavBar
      panHandlers={null}
      component={UpdateKeys}
    />
    <Scene key="Species" hideNavBar component={Species} panHandlers={null} />
    <Scene
      key="Observation"
      hideNavBar
      component={Observation}
      panHandlers={null}
    />
    <Scene key="Debug" hideNavBar component={Debug} panHandlers={null} />
  </Scene>
);

class ArtsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exit: 0
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  /**
   * Handle back button press
   */
  handleBackPress = () => {
    try {
      Actions.pop();
      return true;
    } catch (err) {
      ToastAndroid.show(this.props.strings.exit, ToastAndroid.SHORT);
      if (this.state.exit === 1) {
        BackHandler.exitApp();
      }
      this.setState({ exit: 1 });
      return true;
    }
  }

  /**
   * Controll of the opening and clsing of the Menu
   * @return {void}
   */
  componentDidUpdate() {
    if (this.props.menuOpen === true) {
      this.openDrawer();
    } else if (this.props.menuOpen === false) {
      this.closeMenu();
    }
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeMenu() {
    this._drawer._root.close();
  }

  closeDrawer() {
    if (this.props.menuOpen === true) {
      this._drawer._root.close();
      this.props.actions.closeMenu();
    }
  }

  render() {
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<MenuContent />}
        tapToClose
        type="overlay"
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.35}
        panCloseMask={0.35}
        styles={{
          drawer: {
            marginTop: Platform.OS === "ios" ? 20 : 0,
            marginBottom: 20,
            shadowColor: "#000000",
            shadowOpacity: 0.8,
            shadowRadius: 3
          }
        }}
      >
        <RouterWithRedux hideNavBar={true} scenes={scenes} />
      </Drawer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtsApp);
