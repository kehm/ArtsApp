/**
 * @file Screen for updating location information about species.
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  BackHandler,
  TextInput,
  Dimensions,
  Text,
  Modal
} from "react-native";
import {
  StyleProvider,
  Container,
  Header,
  FooterTab,
  Footer,
  List,
  Input,
  Spinner,
  CheckBox,
  Body,
  InputGroup,
  Left,
  Right,
  ListItem,
  Title,
  Content,
  Button,
  Icon,
  H1,
  H2,
  H3,
  Grid,
  Col,
  Row
} from "native-base";
import Toast, { DURATION } from "react-native-easy-toast";
import { Actions } from "react-native-router-flux";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ObservationAction from "../actions/ObservationAction";
import * as MenuAction from "../actions/MenuAction";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";
import { findIndex } from "lodash";

import FrontpageHeader from "../components/FrontpageHeader";

const mapStateToProps = state => ({
  ...state.key,
  ...state.observations,
  ...state.settings,
  ...state.nav
});

function mapDispatchToProps(dispatch) {
  const { openMenu } = bindActionCreators({ ...MenuAction }, dispatch);
  return {
    actions: bindActionCreators({ ...ObservationAction }, dispatch),
    openMenu
  };
}

class UpdateLocation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chosenKeys: [],
      open: false,
      latitude: "",
      longitude: "",
      disableAll: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackModal", () => {
      if (this.props.nerby_updated_loading) {
        return true;
      }
      if (this.props.modalOpen) {
        this.props.actions.changeModal();
        return true;
      }
      return false;
    });
  }

  /**
   * Waithing for location to be updated. If already inside a key, it updates that keys data, if not return to frontpage. Shows error toast.
   * @see this.showToast
   * @param {Object} newProps received props
   * @return {void}
   */
  componentWillReceiveProps(newProps) {
    if (newProps.nerby_updatedErrorBool) {
      this.showToast(newProps);
    } else if (newProps.nerby_updated) {
      setTimeout(() => {
        this.props.actions.changeUpdateSuccess();
        if (this.props.lastPage !== "Frontpage") {
          this.props.actions.setSpNerby(this.props.chosenKey);
        }
        Actions.pop();
      }, 500);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackModal");
  }

  /**
   * shows toast for update errors, -noNetwork, -update Unavailable for selected key, -generic error, -no species in close vicinity.
   * @param {Object} newProps the newly received props
   * @return {void} shows toast
   */
  showToast(newProps) {
    if (typeof newProps.nerby_updatedError !== "undefined") {
      if (typeof newProps.nerby_updatedError.message !== "undefined") {
        s = this.props.nerby_updatedError.message.toLowerCase();
        s = s.substr(0, 3);
        if (s === "net") {
          this.refs.uptoast.show(this.props.strings.noNetwork, 1500);
          this.props.actions.changeModal();
        } else if (s === "une") {
          this.props.actions.changeModal();
          this.refs.uptoast.show(this.props.strings.updateUnavailable, 2000);
        } else if (s === "syn") {
          this.props.actions.changeModal();
          this.refs.uptoast.show(this.props.strings.updateError, 2000);
        } else {
          this.props.actions.changeModal();
          this.refs.uptoast.show(this.props.strings.updateError, 1500);
        }
        this.props.actions.updateReset();
      } else {
        if (newProps.nerby_updatedError === "err_null_sp") {
          this.props.actions.changeModal();
          this.refs.uptoast.show(this.props.strings.updateZeroError, 2000);
          this.props.actions.updateReset();
        } else {
          this.props.actions.changeModal();
          this.refs.uptoast.show(this.props.strings.updateError, 2000);
          this.props.actions.updateReset();
        }
      }
    } else {
      this.props.actions.changeModal();
      this.refs.uptoast.show(this.props.strings.updateError, 1500);
      this.props.actions.updateReset();
    }
  }

  onClickUpdate = () => {
    this.props.actions.changeModal();
    this.setState({ open: true });
  };

  /**
   * Handle menu icon click
   */
  handleOnMenuClick = () => {
    this.props.openMenu();
  };

  /**
   * checks for internet connection if true, downloads the observations data for species to selected keys, to position.
   * @return {void} downloads observations data.
   * @see ObservationAction.updateNerbyList
   */
  updateObsetvations = () => {
    if (this.props.isConnected) {
      ret = [];
      for (let i = 0; i < this.state.chosenKeys.length; i++) {
        keys = this.props.keys;
        k = keys[findIndex(keys, { key_id: this.state.chosenKeys[i] })];
        if (k.keyWeb !== null) {
          ret.push(k);
        }
      }
      if (this.state.latitude !== "") {
        this.props.actions.updateNerbyList(
          ret,
          this.state.latitude,
          this.state.longitude
        );
      }
    } else {
      this.refs.uptoast.show(this.props.strings.noNetwork, 1500);
    }
  };

  /**
   * adds and removes keys from selectedkeys list.
   * @param {integer} i id of selected key
   * @return {void}
   */
  refreshList = i => {
    j = this.state.chosenKeys.indexOf(i);
    if (j === -1) {
      this.setState({ chosenKeys: this.state.chosenKeys.concat([i]) });
    } else if (this.state.chosenKeys.length === 1 && j !== -1) {
      this.setState({ chosenKeys: [] });
    } else {
      let a = this.state.chosenKeys;
      a.splice(j, 1);
      this.setState({ chosenKeys: a });
    }
  };

  /**
   * makes string list of selected key names for download of data.
   * @return {Array} array of keys to be updated to location
   */
  makeKeyString() {
    ret = [];
    keys = this.props.keys;
    for (let i = 0; i < this.state.chosenKeys.length; i++) {
      ret.push(
        keys[findIndex(keys, { key_id: this.state.chosenKeys[i] })].title + ", "
      );
    }
    if (ret.length === 0) {
      return this.props.strings.noKey;
    }
    return ret;
  }

  /**
   * checks for position data
   * @return {void} sets state to position
   */
  getCoordinate = () => {
    if (this.props.latitude === "undefined") {
      alert(this.props.strings.noLocation);
    } else {
      this.setState({
        latitude: this.props.latitude + "",
        longitude: this.props.longitude + ""
      });
    }
  };

  /**
   * renders list of downloaded relevant keys for location data update.
   * @return {[type]} [description]
   */
  renderList() {
    ret = [];
    for (let i = 0; i < this.props.keys.length; i++) {
      if (this.props.keys[i].keyDownloaded === 1) {
        ret.push(
          <ListItem
            icon
            key={this.props.keys[i].key_id}
            style={{
              margin: this.props.deviceTypeAndroidTablet ? 10 : 0,
              height: this.props.deviceTypeAndroidTablet ? 60 : null
            }}
            onPress={this.refreshList.bind(this, this.props.keys[i].key_id)}
          >
            <Col>
              <Row
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.textkey
                      : styles.textkey
                  }
                >
                  {this.props.keys[i].title}
                </Text>
                <Icon
                  style={{
                    marginRight: 10,
                    paddingTop: 5,
                    alignSelf: "center"
                  }}
                  name={
                    this.state.chosenKeys.some(a => {
                      return a === this.props.keys[i].key_id;
                    })
                      ? "ios-radio-button-on"
                      : "ios-radio-button-off"
                  }
                />
              </Row>
              <View style={styles.seperator} />
            </Col>
          </ListItem>
        );
      }
    }
    return ret;
  }

  render() {
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
            title={this.props.strings.updateLocation}
            onMenu={this.handleOnMenuClick}
          />
          <View style={styles.container}>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text1
                  : styles.text1
              }
            >
              {this.props.strings.updateEx}
            </Text>
            <View
              key="divider"
              style={{ height: 2, backgroundColor: "#dadada" }}
            />
          </View>
          <Content>{this.renderList()}</Content>
          <Footer>
            <FooterTab>
              <Button
                block
                transparent
                disabled={
                  this.props.modalOpen || this.state.disableAll ? true : false
                }
                onPress={this.onClickUpdate}
              >
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.textbutton
                      : styles.textbutton
                  }
                >
                  {this.props.strings.updateLocation}
                </Text>
                <Icon name="md-download" />
              </Button>
            </FooterTab>
          </Footer>
          <Toast ref="uptoast" />
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.props.modalOpen}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text
                    style={{
                      fontSize: this.props.deviceTypeAndroidTablet ? 40 : 20,
                      marginBottom: 10,
                      textAlign: "center"
                    }}
                  >
                    {this.props.strings.updateLocation}
                  </Text>
                  <View
                    key="divider"
                    style={{ height: 2, backgroundColor: "#dadada" }}
                  />
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={
                        this.props.deviceTypeAndroidTablet
                          ? AndroidTabletStyles.text3
                          : styles.text3
                      }
                    >
                      {this.props.strings.selectedKeys + " "}
                    </Text>
                    <Text
                      style={[
                        this.props.deviceTypeAndroidTablet
                          ? AndroidTabletStyles.keyText
                          : styles.keyText,
                        { textAlign: "center" }
                      ]}
                    >
                      {this.makeKeyString()}
                    </Text>
                    <Text
                      style={
                        this.props.deviceTypeAndroidTablet
                          ? AndroidTabletStyles.text3
                          : styles.text3
                      }
                    >
                      {this.props.strings.withCoor + " "}
                    </Text>
                    <TextInput
                      disabled={
                        this.props.keysUpdated_loading || this.state.disableAll
                      }
                      placeholder={this.props.strings.latitude}
                      style={{
                        height: this.props.deviceTypeAndroidTablet ? 70 : 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        margin: 5,
                        marginBottom: 1,
                        fontSize: this.props.deviceTypeAndroidTablet ? 30 : 15
                      }}
                      onChangeText={latitude => this.setState({ latitude })}
                      value={this.state.latitude}
                      autoCorrect={false}
                      keyboardType="numeric"
                    />
                    <TextInput
                      disabled={
                        this.props.keysUpdated_loading || this.state.disableAll
                      }
                      placeholder={this.props.strings.longitude}
                      style={{
                        height: this.props.deviceTypeAndroidTablet ? 70 : 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        margin: 5,
                        marginTop: 1,
                        fontSize: this.props.deviceTypeAndroidTablet ? 30 : 15
                      }}
                      onChangeText={longitude => this.setState({ longitude })}
                      value={this.state.longitude}
                      autoCorrect={false}
                      keyboardType="numeric"
                    />
                    <Button
                      primary
                      rounded
                      bordered
                      disabled={this.props.nerby_updated_loading ? true : false}
                      onPress={this.getCoordinate}
                      style={{ alignSelf: "center", marginBottom: 10 }}
                    >
                      <Text
                        style={
                          this.props.deviceTypeAndroidTablet
                            ? AndroidTabletStyles.text1
                            : styles.text1
                        }
                      >
                        {this.props.strings.curCoor}
                      </Text>
                    </Button>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      rounded
                      bordered
                      disabled={this.props.nerby_updated_loading ? true : false}
                      onPress={() => this.props.actions.changeModal()}
                    >
                      <Icon name="md-close" />
                      <Text
                        style={
                          this.props.deviceTypeAndroidTablet
                            ? AndroidTabletStyles.text1
                            : styles.text1
                        }
                      >
                        {this.props.strings.cancel}
                      </Text>
                    </Button>
                    {this.props.nerby_updated_loading ? (
                      <Spinner color="green" />
                    ) : null}
                    <Button
                      rounded
                      bordered
                      disabled={
                        this.state.chosenKeys.length === 0 ||
                          this.state.latitude === "" ||
                          this.props.nerby_updated_loading
                          ? true
                          : false
                      }
                      onPress={this.updateObsetvations}
                    >
                      <Text
                        style={
                          this.props.deviceTypeAndroidTablet
                            ? AndroidTabletStyles.text1
                            : styles.text1
                        }
                      >
                        {this.props.strings.update}
                      </Text>
                    </Button>
                  </View>
                </View>
                <Toast ref="toast" />
              </View>
            </View>
          </Modal>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff"
  },
  keyText: {
    fontStyle: "italic",
    color: "#6b6b6b"
  },
  text1: {
    fontSize: 15,
    margin: 10,
    textAlign: "center",
    color: "#000000"
  },
  textbutton: {
    fontSize: 15,
    margin: 0,
    textAlign: "center",
    color: "#000000"
  },
  textkey: {
    fontSize: 15,
    marginLeft: 30,
    textAlign: "center",
    color: "#000000"
  },
  text3: {
    fontSize: 15,
    margin: 3,
    textAlign: "center",
    color: "#000000"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  seperator: {
    alignSelf: "flex-end",
    height: 1,
    marginTop: 5,
    marginRight: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    width: Dimensions.get("window").width - 50
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
  }
});

const AndroidTabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff"
  },
  keyText: {
    fontSize: 30,
    fontStyle: "italic",
    color: "#6b6b6b"
  },
  text1: {
    fontSize: 30,
    margin: 10,
    textAlign: "center",
    color: "#000000"
  },
  textbutton: {
    fontSize: 30,
    margin: 10,
    textAlign: "center",
    color: "#000000"
  },
  textkey: {
    fontSize: 30,
    marginLeft: 40,
    textAlign: "center",
    color: "#000000"
  },
  text3: {
    fontSize: 30,
    margin: -7,
    textAlign: "center",
    color: "#000000"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateLocation);
