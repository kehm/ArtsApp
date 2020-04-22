import React from "react";
import { View, LayoutAnimation, Alert, Text } from "react-native";
import { Container, StyleProvider } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/Entypo';
import Toast, { DURATION } from "react-native-easy-toast";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// theme
import getTheme from "../../native-base-theme/components";
import common from "../../native-base-theme/variables/commonColor";
import androidTablet from "../../native-base-theme/variables/androidTablet";

import styles from "./styles.js";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import * as KeyAction from "../../actions/KeyAction";
import * as MenuAction from "../../actions/MenuAction";
import * as ObservationAction from "../../actions/ObservationAction";
import * as SettingsAction from "../../actions/SettingsAction";

import FrontpageHeader from "../../components/FrontpageHeader";
import Explanation from "../../components/Explanation";
import KeyPanel from "../../components/KeyPanel";

import { sortKeys } from "../../utilities/keys";

type Props = {
  deviceTypeAndroidTablet: Boolean,
  strings: Object
};

type State = {};

class Frontpage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadAllKeys();
  }

  /**
   * Handle menu icon click
   */
  handleOnMenuClick = () => {
    this.props.openMenu();
  };

  /**
   * Handle click on key panel. Go directly to key page if key is already downloaded else go to info page.
   */
  handleOnPressKey = (key) => {
    this.props.setKey(key.key_id, key.title);
    if (key.keyDownloaded > 0) {
      Actions.Key();
    } else {
      Actions.Info({ selectedKey: key });
    }
  };

  /**
   * Handle click on info button. Go to info page.
   */
  handleOnInfoClick = (key) => {
    this.props.setKey(key.key_id, key.title);
    Actions.Info({ selectedKey: key });
  }

  /**
   * Update key list
   */
  handleOnPressUpdate = () => {
    this.refs.toast.show(this.props.strings.updateFailed);
    //this.refs.toast.show(this.props.strings.updateSuccess);
    //TODO
  }

  render() {
    const { keys, strings } = this.props;
    return (
      <StyleProvider
        style={
          this.props.deviceTypeAndroidTablet
            ? getTheme(androidTablet)
            : getTheme(common)
        }
      >
        <Container>
          <FrontpageHeader
            title={strings.keysView}
            onMenu={this.handleOnMenuClick}
            rightIcon={
              <Menu>
                <MenuTrigger>
                  <Icon name='dots-three-vertical' size={28} color={'black'} />
                </MenuTrigger>
                <MenuOptions style={styles.dotMenu}>
                  <MenuOption onSelect={() => { this.handleOnPressUpdate() }} >
                    <Text style={styles.dotMenuTxt}>{this.props.strings.lookForUpdates}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            }
          />
          <View style={styles.container}>
            <Explanation description={strings.frontpageTopDescription + " " + strings.frontpageBottomDescription} />
            <KeyPanel
              keys={keys}
              strings={strings}
              onPress={this.handleOnPressKey}
              onInfo={this.handleOnInfoClick}
            />
            <Explanation description={this.props.strings.keyAbout} />
          </View>
          <Toast ref="toast" />
        </Container>
      </StyleProvider>
    );
  }
}

function mapStateToProps({ key, settings }) {
  const { deviceTypeAndroidTablet, isConnected, strings } = settings;
  return {
    keys: sortKeys(key.keys),
    deviceTypeAndroidTablet,
    isConnected,
    strings
  };
}

function mapDispatchToProps(dispatch) {
  const { setAllKeys, openMenu, setKey, downloadKey } = bindActionCreators(
    {
      ...KeyAction,
      ...MenuAction,
      ...ObservationAction,
      ...SettingsAction
    },
    dispatch
  );

  return {
    loadAllKeys: setAllKeys,
    setKey,
    downloadKey,
    openMenu
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frontpage);
