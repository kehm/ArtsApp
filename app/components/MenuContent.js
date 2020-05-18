/**
 * @file Content render for the drawer menu
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { Image, Platform, Dimensions, Alert } from "react-native";
import { StyleProvider, Text, List, ListItem, View, Container, Button, Left, Content } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/Entypo';
import Flag from 'react-native-flags-typescript';

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MenuAction from "../actions/MenuAction";
import * as SettingsAction from "../actions/SettingsAction";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.menu,
  ...state.nav
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...MenuAction, ...SettingsAction }, dispatch)
  };
}
const drawerImage = require("../images/AA_logo.png");

class MenuContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      frontSelect: true,
      obsSelect: false,
    };
  }

  /**
   * Find active scene and set matching menu ekement selected
   */
  componentDidUpdate() {
    switch (Actions.currentScene) {
      case (Actions.Frontpage.name):
        this.setState({ frontSelect: true, obsSelect: false });
        break;
      case (Actions.Observation.name):
        this.setState({ frontSelect: false, obsSelect: true });
        break;
    }
  }

  /**
   * Change language
   */
  onClickSelectLanguage(lang) {
    switch (lang) {
      case this.props.strings.en:
        if (this.props.language !== "en") {
          this.props.actions.closeMenu();
          this.props.actions.setLanguage("en");
          this.props.actions.setContentStrings("en");
        }
        break;
      case this.props.strings.no:
        if (this.props.language !== "no") {
          this.props.actions.closeMenu();
          this.props.actions.setLanguage("no");
          this.props.actions.setContentStrings("no");
        }
        break;
    }
  }

  /**
 * closes menu and
 * opens the user observation page.(Observation.js)
 * @return {void} [description]
 */
  onClickKeys = () => {
    this.props.actions.closeMenu();
    Actions.Frontpage();
  };


  /**
   * closes menu and
   * opens the user observation page.(Observation.js)
   * @return {void} [description]
   */
  onClickObs = () => {
    this.props.actions.closeMenu();
    Actions.Observation();
  };

  /**
   * closes menu and
   * opens the key info page(Info.js), not usable if user is currently on the front-page.
   * @return {void} [description]
   */
  onClickInfo = () => {
    if (this.props.scene.name !== "Frontpage") {
      this.props.actions.closeMenu();
      Actions.Info();
    }
  };

  /**
   * closes menu and
   * opens the about page(About.js)
   * @return {void} [description]
   */
  onClickAbout = () => {
    this.props.actions.closeMenu();
    Actions.About();
  };

  /**
   * Show select language dialog
   */
  onClickLang = () => {
    new Alert.alert(
      this.props.strings.langSelect,
      this.props.strings.langText,
      [
        { text: this.props.strings.cancel, style: "cancel" },
        { text: this.props.strings.en, onPress: () => this.onClickSelectLanguage(this.props.strings.en) },
        { text: this.props.strings.no, onPress: () => this.onClickSelectLanguage(this.props.strings.no) }
      ],
      { cancelable: true }
    );
  };

  renderList() {
    return (
      <List keyi={this.props.debugMode}>
        <ListItem button noBorder onPress={this.onClickKeys} style={this.state.frontSelect ? styles.selectedElement : null}>
          <Left style={this.props.deviceTypeAndroidTablet ? stylesAndroidTablet.leftIcon : styles.leftIcon}>
            <Icon name="map" size={this.props.deviceTypeAndroidTablet ? 36:  26} />
          </Left>
          <Text
            style={
              this.props.deviceTypeAndroidTablet
                ? stylesAndroidTablet.text
                : styles.text
            }
          >
            {this.props.strings.keysView}
          </Text>
        </ListItem>
        <ListItem button noBorder onPress={this.onClickObs} style={this.state.obsSelect ? styles.selectedElement : null}>
          <Left style={this.props.deviceTypeAndroidTablet ? stylesAndroidTablet.leftIcon : styles.leftIcon}>
            <Icon name="drive" size={this.props.deviceTypeAndroidTablet ? 36:  26} />
          </Left>
          <Text
            style={
              this.props.deviceTypeAndroidTablet
                ? stylesAndroidTablet.text
                : styles.text
            }
          >
            {this.props.strings.myObs}
          </Text>
        </ListItem>
      </List>
    );
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
          <View style={styles.menu}>
            <Image square style={styles.drawerCover} source={drawerImage} />
            {this.renderList()}
            <Button
              style={
                this.props.deviceTypeAndroidTablet
                  ? stylesAndroidTablet.about
                  : styles.about
              }
              block
              transparent
              onPress={this.onClickAbout}
            >
              <Image
                style={
                  this.props.deviceTypeAndroidTablet
                    ? stylesAndroidTablet.logoImg
                    : styles.logoImg
                }
                source={require("../images/AA_icon.png")}
              />
              <Text
                style={
                  this.props.deviceTypeAndroidTablet
                    ? stylesAndroidTablet.textAbout
                    : styles.textAbout
                }
              >
                {this.props.strings.about}
              </Text>
            </Button>
            <Button transparent style={styles.lang} onPress={this.onClickLang} >
              <Text style={this.props.deviceTypeAndroidTablet ? stylesAndroidTablet.langTxt : styles.langTxt}>
                {this.props.strings.language + ":"}
              </Text>
              {this.props.language === 'no' ? (
                <Flag style={styles.flag} code="GB" type="flat" size={this.props.deviceTypeAndroidTablet ? 48 : 32} />
              ) : (
                  <Flag style={styles.flag} code="NO" type="flat" size={32} />
                )}
            </Button>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}

MenuContent.defaultProps = {
  strings: {
    about: "",
    language: "",
    keyInfo: "",
    updateLocation: "",
    myObs: ""
  }
};

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = {
  menu: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 1,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#553917"
  },
  logoImg: {
    resizeMode: "contain",
    width: 37,
    height: 37,
    marginBottom: 20
  },
  drawerCover: {
    backgroundColor: "#553917",
    resizeMode: "contain",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  about: {
    position: "absolute",
    backgroundColor: "transparent",
    justifyContent: "center",
    bottom: 50,
    right: 0
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  textAbout: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 20,
    marginLeft: 10,
    paddingBottom: 20 - 20 * 0.75,
    color: '#553917'
  },
  textKeyInfo: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20,
    color: "#ababab"
  },
  selectedElement: {
    backgroundColor: '#f0a00c'
  },
  leftIcon: {
    maxWidth: 30,
    marginLeft: 20
  },
  lang: {
    position: "absolute",
    right: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...Platform.select({
      ios: {
        bottom: 15,
      },
      android: {
        bottom: 5,
      }
    })
  },
  langTxt: {
    marginTop: 10,
    color: 'black'
  },
  flag: {
    padding: 20,
    marginLeft: 5
  }
};

const stylesAndroidTablet = {
  menu: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 1,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#553917"
  },
  logoImg: {
    resizeMode: "contain",
    width: 76,
    height: 76,
    marginBottom: 100
  },
  drawerCover: {
    backgroundColor: "#553917",
    resizeMode: "contain",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  about: {
    height: 80,
    position: "absolute",
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    bottom: 20
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 26,
    marginLeft: 20
  },
  textAbout: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 26,
    marginLeft: 20,
    paddingBottom: 80,
    color: '#553917'
  },
  textKeyInfo: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 32,
    marginLeft: 20,
    color: "#ababab"
  },
  leftIcon: {
    maxWidth: 40,
    marginLeft: 20
  },
  langTxt: {
    marginTop: 10,
    color: 'black',
    fontSize: 24
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuContent);
