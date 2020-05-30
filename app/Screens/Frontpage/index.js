import React from "react";
import { View, LayoutAnimation, Alert, Text, TouchableOpacity, TextInput, PermissionsAndroid, Platform, AppState } from "react-native";
import { Container, StyleProvider, Item, Left, Right } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/Entypo';
import Toast, { DURATION } from "react-native-easy-toast";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { SwipeListView } from 'react-native-swipe-list-view';
import Geolocation from '@react-native-community/geolocation';

// theme
import getTheme from "../../native-base-theme/components";
import common from "../../native-base-theme/variables/commonColor";
import androidTablet from "../../native-base-theme/variables/androidTablet";

import { styles, androidTabletStyles } from "./styles.js";

import * as KeyAction from "../../actions/KeyAction";
import * as MenuAction from "../../actions/MenuAction";
import * as ObservationAction from "../../actions/ObservationAction";
import * as SettingsAction from "../../actions/SettingsAction";

import FrontpageHeader from "../../components/FrontpageHeader";
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
      appState: AppState.currentState,
      init: false,
      keyList: [],
      selected: undefined,
      filter: '',
      openFilter: false,
    }
  }

  /**
   * Get location permission and set current position
   */
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    if (this.props.isLocation === undefined) {
      this.setGeolocationListener();
    }
  }

  /**
   * Remove listener
   */
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.watchId != null && Geolocation.clearWatch(this.watchId);
    Geolocation.stopObserving();
  }

  /**
   * Set initial keyList from props if empty
   */
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.init && this.props.keys.length !== 0) {
      this.setState({ init: true, keyList: this.props.keys, selected: this.props.keys[0].key_id })
    }
  }

  /**
  * If new props, trigger state update
  */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.init) {
      return {
        list: nextProps.keys
      }
    } else return null;
  }

  /**
   * Stop observing location if app is in the background
   */
  handleAppStateChange = (nextAppState) => {
    if ((this.state.appState === 'inactive' || this.state.appState === 'background') && nextAppState === 'active') {
      if (this.props.isLocation === true) {
        this.setGeolocationListener();
      }
    } else if ((nextAppState === 'inactive' || nextAppState === 'background') && this.state.appState === 'active') {
      this.watchId != null && Geolocation.clearWatch(this.watchId);
      Geolocation.stopObserving();
    }
    this.setState({ appState: nextAppState })
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
    if (this.state.openFilter && this.state.filter === '') {
      this.setState({ openFilter: false });
    }
    if (key === undefined) {
      this.state.keyList.filter(key => {
        if (key.key_id === this.state.selected) {
          this.props.setKey(key.key_id, key.title);
          if (key.keyDownloaded > 0) {
            Actions.Key({ selectedKey: key });
          } else {
            Actions.Info({ selectedKey: key, onKeyUpdate: this.onKeyUpdate, onKeyDelete: this.reInitKeyList });
          }
        }
      });
    } else {
      this.props.setKey(key.key_id, key.title);
      if (key.keyDownloaded > 0) {
        Actions.Key({ selectedKey: key });
      } else {
        Actions.Info({ selectedKey: key, onKeyUpdate: this.onKeyUpdate, onKeyDelete: this.reInitKeyList });
      }
    }
  };

  /**
   * Handle click on info button. Go to info page.
   */
  handleOnInfoClick = (key) => {
    this.props.setKey(key.key_id, key.title);
    Actions.Info({ selectedKey: key, onKeyUpdate: this.onKeyUpdate, onKeyDelete: this.reInitKeyList });
  }

  /**
   * Update swiper index
   */
  updateIndex = (key) => {
    if (this.state.openFilter && this.state.filter === '') {
      this.setState({ openFilter: false });
    }
    if (key.key_id !== this.state.selected) {
      this.setState({ selected: key.key_id })
    }
  }

  reInitKeyList = () => {
    this.props.setAllKeys().then(() => {
      this.setState({ init: false });
    });
  }

  /**
   * Trigger list re-render after key download
   */
  onKeyUpdate = () => {
    this.filterList('');
  }

  /**
   * Filter key list
   */
  filterList = (filter) => {
    let list = this.props.keys.filter(key => {
      if (key.title.toUpperCase().includes(filter.toUpperCase())) {
        return key;
      }
    });
    this.setState({
      filter: filter,
      keyList: list
    });
  }

  /**
   * Set geolocation listener if permission is granted
   */
  setGeolocationListener = async () => {
    this.requestLocationPermission().then((granted) => {
      if (granted) {
        this.watchId = Geolocation.watchPosition(position => {
          this.props.setLocation(
            position.coords.latitude.toFixed(4),
            position.coords.longitude.toFixed(4)
          );
        }, () => {
        }, { timeout: 20000, maximumAge: 20000, enableHighAccuracy: true });
      } else {
        this.watchId = -1;
      }
      this.props.useLocation(granted);
    });
  }

  /**
 * Request Android/iOS location permissions
 */
  async requestLocationPermission() {
    if (Platform.OS !== "android") return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "ArtsApp Location Permission",
          message: "ArtsApp needs access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
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
            title={this.state.openFilter ? undefined : strings.keysView}
            body={
              <TextInput
                placeholder={this.props.strings.search}
                autoFocus={true}
                style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.search : styles.search}
                onChangeText={(input) => this.filterList(input)}
                value={this.state.filter} />
            }
            onMenu={this.handleOnMenuClick}
            rightIcon={!this.state.openFilter ? (
              <Icon name='magnifying-glass' size={this.props.deviceTypeAndroidTablet ? 34 : 26} color={'black'} onPress={() => { this.setState({ openFilter: true, selected: this.props.keys[0].key_id }); }} />
            ) : (
                <Icon name='circle-with-cross' size={this.props.deviceTypeAndroidTablet ? 34 : 26} color={'black'} onPress={() => { this.setState({ openFilter: false, selected: this.props.keys[0].key_id }); this.filterList(''); }} />
              )
            }
          />
          <View style={styles.container}>
            {!this.state.openFilter ? (
              <View>
                <KeyPanel
                  keys={this.props.keys}
                  index={0}
                  selected={this.state.selected}
                  strings={strings}
                  onPress={this.handleOnPressKey}
                  onInfo={this.handleOnInfoClick}
                  onUpdate={this.updateIndex}
                />
                <View style={styles.headerContainer}>
                  <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.listHeader : styles.listHeader}>{this.props.strings.selectKey}</Text>
                  <Icon name="help-with-circle" size={this.props.deviceTypeAndroidTablet ? 28 : 16} onPress={() => { Actions.Help() }} />
                </View>
              </View>
            ) : (
                <View />
              )}
            <SwipeListView
              style={[styles.list, this.state.openFilter ? styles.filteredList : undefined]}
              useFlatList={true}
              data={this.state.keyList}
              extraData={this.state}
              renderItem={(item) =>
                <TouchableOpacity
                  style={[this.props.deviceTypeAndroidTablet ? androidTabletStyles.listItem : styles.listItem,
                  this.state.openFilter ? (undefined) : (item.item.key_id === this.state.selected ? styles.selected : undefined)]}
                  onPress={() => this.state.openFilter ? undefined : this.updateIndex(item.item)}>
                  {item.item.keyDownloaded > 0 ? (
                    <Icon style={styles.icon} name='align-bottom' size={this.props.deviceTypeAndroidTablet ? 42 : 26} color={'black'} />
                  ) : (
                      <View />
                    )}
                  <Text style={[this.props.deviceTypeAndroidTablet ? androidTabletStyles.listText : styles.listText, this.state.openFilter ? (undefined) : (item.item.key_id === this.state.selected ? styles.selectedText : undefined)]} >{item.item.title}</Text>
                  <Right>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.updateIndex(item.item); this.handleOnPressKey(item.item) }}>
                      <Icon style={styles.icon} name='chevron-right' size={this.props.deviceTypeAndroidTablet ? 42 : 28} color={'black'} />
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
          </View>
          <Toast ref="toast" />
        </Container>
      </StyleProvider>
    );
  }
}

function mapStateToProps({ key, settings }) {
  const { deviceTypeAndroidTablet, isConnected, strings, useLocation } = settings;
  return {
    keys: sortKeys(key.keys),
    deviceTypeAndroidTablet,
    isConnected,
    strings,
    isLocation: useLocation
  };
}

function mapDispatchToProps(dispatch) {
  const { setAllKeys, openMenu, setKey, downloadKey, getKeysFromAPI, setLastDownload, useLocation, setLocation } = bindActionCreators(
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
    setLastDownload,
    useLocation,
    setLocation
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frontpage);
