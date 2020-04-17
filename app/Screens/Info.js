/**
 * @file Show information about the selected key
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  BackHandler,
  Dimensions,
  Alert,
  Modal
} from "react-native";
import {
  Container,
  StyleProvider,
  Spinner,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  H2,
  Grid,
  Col,
} from "native-base";
import { Actions } from "react-native-router-flux";
import HTMLView from "react-native-htmlview";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

// redux
import ImageConfig from "../config/network/ImageConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as KeyAction from "../actions/KeyAction";

import SubPageHeader from "../components/SubPageHeader";

const mapStateToProps = state => ({
  ...state.key,
  ...state.settings,
  ...state.nav
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...KeyAction }, dispatch)
  };
}

class Info extends React.PureComponent {
  constructor(props) {
    super(props);
    let isDownloaded = false;
    if (this.props.selectedKey.keyDownloaded > 0) {
      isDownloaded = true;
    }
    this.state = {
      isDownloaded: isDownloaded,
      isDownloading: false
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackModal", () => {
      if (this.props.keyDownloaded_LOADING) {
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackModal");
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
      Actions.pop();
    }
    if (isDownloading !== this.state.isDownloading) {
      this.setState({ isDownloading: isDownloading });
    }
  }

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
        [{
          text: "Cancel", style: "cancel"
        },
        {
          text: this.props.strings.ok, onPress: () => { this.downloadKey() }
        }],
        { cancelable: true }
      );
    }
  };

  /**
   * Download key if network connection is active
   */
  downloadKey = () => {
    if (this.props.isConnected === false) {
      new Alert.alert(
        this.props.strings.noNetwork,
        "",
        [{ text: this.props.strings.ok, onPress: () => { } }],
        { cancelable: false }
      );
    } else if (this.props.isConnected === true) {
      this.props.actions.downloadKey(this.props.selectedKey.keyWeb);
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
          <SubPageHeader title={this.props.selectedKey.title} onClick={this.onClickBack}
            rightIcon={this.state.isDownloaded ? <Icon name='paper-plane' onPress={() => { this.onClickUse() }} /> : undefined} />
          {this.state.isDownloaded ? (
            <View />
          ) : (
              <View style={styles.topContainer}>
                <Text style={styles.topText}>{this.props.strings.downloadHeader}</Text>
              </View>
            )}
          <Content>
            <Grid>
              <Col style={styles.container}>
                {this.props.selectedKey.image === 1 && (
                  <Image
                    style={
                      this.props.deviceTypeAndroidTablet
                        ? AndroidTabletStyles.image
                        : styles.image
                    }
                    source={
                      this.props.platform === "ios"
                        ? {
                          uri: ImageConfig.getInfoImg(this.props.chosenKey)
                        }
                        : {
                          uri:
                            "file://" +
                            ImageConfig.getInfoImg(this.props.chosenKey)
                        }
                    }
                  />
                )}
                <View style={styles.separator} />
                <View style={styles.textBox}>
                  <HTMLView
                    value={this.removeHtmlBr()}
                    stylesheet={
                      this.props.deviceTypeAndroidTablet
                        ? htmlstylesAndroidTablet
                        : htmlstyles
                    }
                  />
                </View>
              </Col>
            </Grid>
          </Content>
          {!this.state.isDownloaded ? (
            <Button transparent style={styles.downloadBtn} onPress={() => { this.onClickUse(); }}>
              <Text
                style={[
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.text3
                    : styles.text3,
                  styles.btnText
                ]}
              >
                {this.props.strings.download}
              </Text>
              <Icon name='cloud-download' style={styles.download} size={24} />
            </Button>
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
                <Text style={styles.modalText}>{this.props.strings.downloading}</Text>
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
    backgroundColor: 'white',
    position: 'absolute',
    top: 56,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    width: '100%'
  },
  topText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10
  },
  downloadBtn: {
    backgroundColor: '#f0a00c',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%'
  },
  btnText: {
    color: '#000',
    fontSize: 18,
  },
  download: {
    color: '#000',
    marginLeft: 20
  },
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
    fontSize: 30
  }
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
