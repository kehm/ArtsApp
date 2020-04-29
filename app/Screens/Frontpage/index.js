import React from "react";
import { View, LayoutAnimation, Alert, Text, TouchableOpacity, TextInput, BackHandler, Modal } from "react-native";
import { Container, StyleProvider, Item, Left, Right, Spinner } from "native-base";
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
    this.props.setAllKeys();
    this.state = {
      init: false,
      keyList: [],
      selected: undefined,
      filter: '',
      openModal: false
    }
  }

  /**
   * Add back button listener
   */
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackModal", () => { this.filterList(''); });
  }

  /**
   * Remove back button listener
   */
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackModal", () => { this.filterList(''); });
  }

  /**
   * Set initial keyList from props if empty
   */
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.init && this.props.keys.length !== 0) {
      this.setState({ init: true, keyList: this.props.keys, selected: this.props.keys[0].key_id })
    }
  }

  /**
  * If new props, trigger state update
  */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.init && nextProps.keys !== prevState.keyList) {
      return {
        keyList: nextProps.keys
      }
    } else return null;
  }

  /**
   * Handle menu icon click
   */
  handleOnMenuClick = () => {
    this.props.openMenu();
  };

  /**
   * Handle click on key panel and list. Go directly to key page if key is already downloaded else go to info page.
   */
  handleOnPressKey = (key) => {
    if (key === undefined) {
      key = this.state.keyList.filter(key => {
        if (key.key_id === this.state.selected) {
          this.props.setKey(key.key_id, key.title);
          if (key.keyDownloaded > 0) {
            Actions.Key();
          } else {
            Actions.Info({ selectedKey: key });
          }
        }
      });
    } else {
      this.props.setKey(key.key_id, key.title);
      if (key.keyDownloaded > 0) {
        Actions.Key();
      } else {
        Actions.Info({ selectedKey: key });
      }
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
   * Look for updated keys
   */
  handleOnPressUpdate = () => {
    if (this.props.isConnected) {
      this.props.getKeysFromAPI().then(() => {
        // Set last download timestamp after getting keys
        let date = new Date();
        let month = date.getMonth();
        if (month < 10) {
          month = "0" + month;
        }
        this.props.setLastDownload(
          date.getFullYear() + "" + month + "" + date.getDate()
        );
        this.props.keys.map((key) => {
          console.log(key)
        })
        this.setState({ openModal: false });
        this.refs.toast.show(this.props.strings.updateSuccess);
      });
    } else {
      this.refs.toast.show(this.props.strings.disNoNetwork);
    }
  }

  /**
   * Update swiper index
   */
  updateIndex = (key) => {
    if (key.key_id !== this.state.selected) {
      this.setState({ selected: key.key_id })
    }
  }

  filterList = (filter) => {
    this.setState({
      filter: filter,
      keyList: this.props.keys.filter(key => {
        if (key.title.toUpperCase().includes(filter.toUpperCase())) {
          return key;
        }
      })
    })
  }

  render() {
    const { strings } = this.props;
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
                  <MenuOption onSelect={() => { this.setState({ openModal: true }); this.handleOnPressUpdate() }} >
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
              keys={this.props.keys}
              list={this.state.keyList}
              index={0}
              selected={this.state.selected}
              strings={strings}
              onPress={this.handleOnPressKey}
              onInfo={this.handleOnInfoClick}
              onUpdate={this.updateIndex}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.listHeader}>{this.props.strings.selectKey}</Text>
              <Icon name="help-with-circle" size={16} onPress={() => { Actions.Help() }} />
            </View>
            <SwipeListView
              style={styles.list}
              useFlatList={true}
              data={this.state.keyList}
              extraData={this.state}
              renderItem={(item) =>
                <TouchableOpacity style={[styles.listItem, item.item.key_id === this.state.selected ? styles.selected : undefined]} onPress={() => this.updateIndex(item.item)}>
                  <Text style={[styles.listText, item.item.key_id === this.state.selected ? styles.selectedText : undefined]} >{item.item.title}</Text>
                  <Right>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.updateIndex(item.item); this.handleOnPressKey(item.item) }}>
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
                this.updateIndex(rowMap[rowKey].props.item);
                this.handleOnPressKey(rowMap[rowKey].props.item);
              }}
            />
            <View style={styles.searchContainer}>
              <TextInput
                placeholder={this.props.strings.search}
                style={styles.search}
                onChangeText={(input) => this.filterList(input)}
                value={this.state.filter} />
              <TouchableOpacity style={styles.clearIcon} onPress={() => { this.filterList("") }}>
                <Icon name="circle-with-cross" size={22} ></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.openModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{this.props.strings.lookingForUpdates}</Text>
                <Spinner color="green" />
              </View>
            </View>
          </Modal>
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
  const { setAllKeys, openMenu, setKey, downloadKey, getKeysFromAPI, setLastDownload } = bindActionCreators(
    {
      ...KeyAction,
      ...MenuAction,
      ...ObservationAction,
      ...SettingsAction
    },
    dispatch
  );

  return {
    setAllKeys,
    setKey,
    downloadKey,
    openMenu,
    getKeysFromAPI,
    setLastDownload
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frontpage);
