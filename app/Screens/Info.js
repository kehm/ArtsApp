/**
 * @file Show information about the selected key
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Dimensions, Alert, Modal, TouchableOpacity } from "react-native";
import { Container, StyleProvider, Spinner, Content, Left, Grid, Col } from "native-base";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from "react-native-vector-icons/Entypo";
import { Actions } from "react-native-router-flux";
import HTMLView from "react-native-htmlview";
import ImageView from "react-native-image-viewing";
import deviceInfoModule from "react-native-device-info";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

// redux
import ImageConfig from "../config/network/ImageConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as KeyAction from "../actions/KeyAction";
import * as SettingsAction from "../actions/SettingsAction";

import SubPageHeader from "../components/SubPageHeader";

const mapStateToProps = state => ({
  ...state.key,
  ...state.settings,
  ...state.nav
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...KeyAction, ...SettingsAction }, dispatch)
  };
}

class Info extends React.PureComponent {
  constructor(props) {
    super(props);
    let isDownloaded = false;
    if (this.props.selectedKey.keyDownloaded > 0) {
      isDownloaded = true;
    }
    let imageSource = [];
    if (this.props.platform === "ios") {
      imageSource.push({ uri: ImageConfig.getInfoImg(this.props.chosenKey) });
    } else {
      imageSource.push({ uri: "file://" + ImageConfig.getInfoImg(this.props.chosenKey) });
    }
    this.state = {
      isDownloaded: isDownloaded,
      isDownloading: false,
      imageSource: imageSource,
      openImages: false
    }
  }

  /**
   * If new props, trigger state update
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.keyDownloaded_LOADING && !prevState.isDownloading) {
      return { isDownloading: true };
    } else if (prevState.isDownloading && !nextProps.keyDownloaded_LOADING) {
      if (nextProps.keyDownloaded_SUCCESS) {
        return {
          isDownloaded: true,
          isDownloading: false
        }
      } else {
        return {
          isDownloaded: false,
          isDownloading: false
        }
      }
    } else return null;
  }

  /**
   * Check if key download is successful
   */
  componentDidUpdate(prevProps, prevState) {
    const { isDownloaded, isDownloading } = prevState;
    if (isDownloaded !== this.state.isDownloaded) {
      this.setState({ isDownloaded: isDownloaded });
      this.props.onKeyUpdate();
      Actions.pop();
    }
    if (isDownloading !== this.state.isDownloading) {
      this.setState({ isDownloading: isDownloading });
    }
  }

  /**
   * Handle on click back
   */
  onClickBack = () => {
    Actions.pop();
  };

  /**
   * Go to key or open download dialog if key is not downloaded
   */
  onClickUse = () => {
    if (this.state.isDownloaded) {
      Actions.Key();
    } else {
      new Alert.alert(
        this.props.strings.download,
        this.props.strings.downloadDialog,
        [
          { text: this.props.strings.cancel, style: "cancel" },
          { text: this.props.strings.ok, onPress: () => { this.downloadKey() } }
        ],
        { cancelable: true }
      );
    }
  };

  /**
   * Handle on click delete event
   */
  onClickDelete = () => {
    new Alert.alert(
      this.props.strings.deleteKeyHeader,
      this.props.strings.deleteKey,
      [
        { text: this.props.strings.cancel, style: "cancel" },
        { text: this.props.strings.ok, onPress: () => { this.deleteKey() } }
      ],
      { cancelable: true }
    );
  }

  /**
   * Delete key from device and refresh frontpage
   */
  deleteKey = () => {
    this.props.actions.deletedata(this.props.selectedKey.key_id).then(() => {
      this.props.onKeyDelete();
      Actions.pop();
    });
  }

  /**
   * Download key if network connection is active
   */
  downloadKey = () => {
    if (this.props.isConnected === false) {
      new Alert.alert(
        "",
        this.props.strings.noNetwork,
        [
          { text: this.props.strings.ok, onPress: () => { } }
        ],
        { cancelable: false }
      );
    } else if (this.props.isConnected === true) {
      this.props.actions.downloadKey(this.props.selectedKey.keyWeb).catch((err) => {
        new Alert.alert(
          "",
          this.props.strings.noNetwork,
          [
            { text: this.props.strings.ok, onPress: () => { } }
          ],
          { cancelable: false }
        );
      });
    }
  }

  /**
   * Cleans HTML removing <br>
   */
  removeHtmlBr() {
    if (this.props.selectedKey.keyInfo === undefined || this.props.selectedKey.keyInfo === null) {
      return this.props.strings.noKeySelected;
    }
    return this.props.selectedKey.keyInfo.replace(/(\n|<br>)/gm, "");
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
          <ImageView
            images={this.state.imageSource}
            imageIndex={0}
            visible={this.state.openImages}
            onRequestClose={() => this.setState({ openImages: false })}
          />
          <SubPageHeader title={this.props.selectedKey.title} onClick={this.onClickBack}
            rightIcon={this.state.isDownloaded ?
              <Menu>
                <MenuTrigger>
                  <Icon name='dots-three-vertical' size={28} color={'black'} />
                </MenuTrigger>
                <MenuOptions style={styles.dotMenu}>
                  <MenuOption onSelect={() => { this.onClickUse() }} >
                    <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.dotMenuTxt : styles.dotMenuTxt}>{this.props.strings.useKey}</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => { this.onClickDelete() }}>
                    <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.dotMenuTxt : styles.dotMenuTxt}>{this.props.strings.deleteKeyHeader}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
              : undefined} />
          {this.state.isDownloaded ? (
            <View />
          ) : (
              <View style={[
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.topContainer
                  : styles.topContainer,
                deviceInfoModule.getModel().includes("iPhone 11") ? { "top": 128 } : undefined]
              }>
                <Text style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.topText
                    : styles.topText
                }>{this.props.strings.downloadHeader}</Text>
              </View>
            )}
          <Content>
            <Grid>
              <Col style={styles.container}>
                {this.props.selectedKey.image === 1 && (
                  <TouchableOpacity onPress={() => this.setState({ openImages: true })}>
                    <Image
                      style={
                        this.props.deviceTypeAndroidTablet
                          ? AndroidTabletStyles.image
                          : styles.image
                      }
                      source={this.state.imageSource.length !== 0 ? this.state.imageSource[0] : undefined}
                    />
                  </TouchableOpacity>
                )}
                <View style={styles.separator} />
                <View style={styles.textBox}>
                  <HTMLView value={this.removeHtmlBr()} stylesheet={this.props.deviceTypeAndroidTablet ? htmlstylesAndroidTablet : htmlstyles} />
                </View>
              </Col>
            </Grid>
          </Content>
          {!this.state.isDownloaded ? (
            <TouchableOpacity style={[this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.downloadBtn : styles.downloadBtn,
            this.props.keyDownloaded_LOADING ? styles.loading : undefined,
            deviceInfoModule.getModel().includes("iPhone 11") ? { "height": 64 } : undefined]} onPress={() => { this.onClickUse(); }}>
              <Text
                style={[
                  this.props.deviceTypeAndroidTablet ?
                    AndroidTabletStyles.btnText :
                    styles.btnText
                ]}
              >
                {this.props.strings.download}
              </Text>
              <Icon name='download' style={styles.download} size={24} />
            </TouchableOpacity>
          ) : (
              <View />
            )}
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.props.keyDownloaded_LOADING}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.modalText : styles.modalText}>{this.props.strings.downloading}</Text>
                <Spinner color="green" />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 80
  },
  image: {
    width: Dimensions.get("window").width - 50,
    height: 250,
    margin: 20,
    resizeMode: "contain",
    padding: 20
  },
  separator: {
    height: 20,
    backgroundColor: "grey"
  },
  textBox: {
    margin: 10,
    paddingBottom: 20
  },
  text3: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: "center",
    color: "#000000"
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000"
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
  topContainer: {
    backgroundColor: '#E1ECDF',
    position: 'absolute',
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    width: '100%',
    ...Platform.select({
      ios: {
        top: 84,
      },
      android: {
        top: 56,
      }
    })
  },
  topText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10
  },
  downloadBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f0a00c',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 50
  },
  btnText: {
    color: '#000',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 5,
  },
  download: {
    color: '#000',
    marginLeft: 20
  },
  dotMenuTxt: {
    color: '#000',
    fontSize: 16,
    padding: 10,
  },
  loading: {
    backgroundColor: '#ccc'
  }
});

const htmlstyles = StyleSheet.create({
  br: {
    margin: 0,
    padding: 0
  },
  p: {
    fontSize: 15
  }
});

const htmlstylesAndroidTablet = StyleSheet.create({
  br: {
    margin: 0,
    padding: 0
  },
  p: {
    fontSize: 22
  },
  i: {
    fontSize: 20
  },
});

const AndroidTabletStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  image: {
    width: Dimensions.get("window").width - 50,
    height: 500,
    margin: 20,
    resizeMode: "contain",
    padding: 20
  },
  separator: {
    height: 20,
    backgroundColor: "grey"
  },
  textBox: {
    margin: 10,
    paddingBottom: 20
  },
  text3: {
    fontSize: 30,
    marginBottom: 5,
    textAlign: "center",
    color: "#000000"
  },
  text: {
    fontSize: 40,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22
  },
  topContainer: {
    backgroundColor: '#E1ECDF',
    position: 'absolute',
    top: 80,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    width: '100%'
  },
  topText: {
    fontSize: 22,
    textAlign: 'center',
    padding: 10
  },
  downloadBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f0a00c',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 60
  },
  btnText: {
    color: '#000',
    fontSize: 28,
    marginTop: 14,
  },
  dotMenuTxt: {
    color: '#000',
    fontSize: 20,
    padding: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
