/**
 * @file Screen with information about the application. Contains a hidden button that takes you to the debug-page.
 * @author Kjetil Fossheim
 */

import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  StyleProvider,
  Container,
  Header,
  Title,
  Content,
  Left,
  Body,
  Right,
  Button,
  Icon
} from "native-base";
import HTMLView from "react-native-htmlview";
import Toast, { DURATION } from "react-native-easy-toast";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { aboutNO, aboutEN } from "../config/aboutText";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

import SubPageHeader from "../components/SubPageHeader";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

class About extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      debugcount: 0
    };
  }

  onClickBack = () => {
    Actions.pop();
  };

  /**
   * Function that counts clicks on the invisible button and goes to debug-page if clicked 20 times.
   */
  onClickDebug = () => {
    if (this.state.debugcount === 20) {
      Actions.Debug();
    } else {
      this.setState({ debugcount: this.state.debugcount + 1 });
      if (this.state.debugcount > 14) {
        this.refs.toast.show(
          this.props.strings.enableDebug +
          (20 - this.state.debugcount) +
          this.props.strings.enableDebug2,
          1500
        );
      }
    }
  };

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
          <SubPageHeader title={this.props.strings.about} onClick={this.onClickBack}/>
          <Content>
            <View style={styles.container}>
              <Image
                source={require("../images/AA_logo.png")}
                style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.image
                    : styles.image
                }
              />
              <HTMLView
                style={{ margin: 10 }}
                value={this.props.language === "no" ? aboutNO : aboutEN}
                stylesheet={
                  this.props.deviceTypeAndroidTablet
                    ? htmlstylesAndroidTablet
                    : htmlstyles
                }
              />
            </View>
            <Button transparent block onPress={this.onClickDebug} />
          </Content>
          <Toast ref="toast" />
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    height: 180,
    width: 200,
    margin: 30,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: "center"
  }
});

const AndroidTabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    height: 300,
    width: 300,
    margin: 30,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: "center"
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
    fontSize: 30
  },
  li: { fontSize: 30, margin: 10 },
  h5: { marginBottom: 10, marginTop: 50, fontSize: 40 },
  h6: { marginBottom: 10, marginTop: 30, fontSize: 35 },
  div: { fontSize: 30 }
});

export default connect(mapStateToProps)(About);
