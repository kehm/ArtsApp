import React from "react";
import { View, LayoutAnimation, Alert, Text, TouchableOpacity, TextInput } from "react-native";
import { Container, StyleProvider, Item, Left, Right } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/Entypo';
import Toast, { DURATION } from "react-native-easy-toast";
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { SwipeListView } from 'react-native-swipe-list-view';

// theme
import getTheme from "../../native-base-theme/components";
import common from "../../native-base-theme/variables/commonColor";
import androidTablet from "../../native-base-theme/variables/androidTablet";

import styles from "./styles.js";

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
    this.state = {
      index: 0,
      prevIndex: 0
    }
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
    if (key === undefined) {
      key = this.props.keys[this.state.index];
      console.log(key)
    }
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

  /**
   * Update swiper index
   */
  updateIndex = (index) => {
    if (index !== this.state.index) {
      this.setState({ index: index, prevIndex: this.state.index })
    }
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
                    <Text style={styles.dotMenuTxt}>{this.props.strings.lookForUpdate}</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => { Actions.Help() }} >
                    <Text style={styles.dotMenuTxt}>{this.props.strings.helpHeader}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            }
          />
          <View style={styles.container}>
            <KeyPanel
              keys={keys}
              index={this.state.index}
              prevIndex={this.state.prevIndex}
              strings={strings}
              onPress={this.handleOnPressKey}
              onInfo={this.handleOnInfoClick}
              onUpdateIndex={this.updateIndex}
            />
            <Text style={styles.listHeader}>{this.props.strings.selectKey}:</Text>
            <SwipeListView
              style={styles.list}
              useFlatList={true}
              data={keys}
              renderItem={(item) =>
                <TouchableOpacity style={[styles.listItem, item.index === this.state.index ? styles.selected : undefined]} onPressIn={() => this.updateIndex(item.index)}>
                  <Text style={[styles.listText, item.index === this.state.index ? styles.selectedText : undefined]} >{item.item.title}</Text>
                  <Right>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.updateIndex(item.index); this.handleOnPressKey(item.item) }}>
                      <Icon style={styles.icon} name='chevron-right' size={28} color={'black'} />
                    </TouchableOpacity>
                  </Right>
                </TouchableOpacity>
              }
              renderHiddenItem={(rowData, rowMap) => (
                <View />
              )}
              keyExtractor={(key) => key.key_id.toString()}
              leftOpenValue={75}
              rightOpenValue={-75}
              onRowOpen={(rowKey, rowMap, toValue) => {
                rowMap[rowKey].closeRow();
                this.handleOnPressKey();
              }}
            />
            <TextInput placeholder={this.props.strings.search} style={styles.search} />
          </View>
          <Toast ref="toast" />
        </Container>
      </StyleProvider>
    );
  }
}
//<Explanation description={strings.frontpageTopDescription + " " + strings.frontpageBottomDescription} />
//<Explanation description={this.props.strings.keyAbout} />

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
