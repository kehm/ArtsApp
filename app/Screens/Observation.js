/**
 * @file Display list of saved observations
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import {
  StyleProvider,
  Container,
  Header,
  Title,
  Content,
  List,
  ListItem,
  Button,
  Left,
  Right,
  Body
} from "native-base";
import ObservationElement from "../components/ObservationElement";
import Icon from 'react-native-vector-icons/Entypo';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ObservationAction from "../actions/ObservationAction";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

import FrontpageHeader from "../components/FrontpageHeader";
import * as MenuAction from "../actions/MenuAction";

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

class Observation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deleteobsNr: -1
    };
  }

  componentDidMount() {
    this.props.actions.getObservations();
  }

  /**
  * Handle menu icon click
  */
  handleOnMenuClick = () => {
    this.props.openMenu();
  };

  /**
   * Show Delete dialog, and deletes entry if yes is selected.
   * @param {integer} i id of selected observation
   */
  onClickDelete = i => {
    Alert.alert(
      this.props.strings.deleteObsTitle,
      this.props.strings.deleteObs + " ",
      [
        { text: this.props.strings.cancel, onPress: () => { }, style: "cancel" },
        {
          text: this.props.strings.accept,
          onPress: () => this.props.actions.deleteObservation(i)
        }
      ],
      { cancelable: true }
    );
    // this.setState({open: true, deleteobsNr: i,});
  };

  /**
   * Renders list of all user observations.
   * @return {array} list of Listitems of user observations
   */
  renderList() {
    ret = [];
    for (let i = 0; i < this.props.obsevationsList.length; i++) {
      ret.push(
        <ListItem key={this.props.obsevationsList.item(i).userObservation_id}>
          <ObservationElement
            latinName={this.props.obsevationsList.item(i).latinName}
            localName={this.props.obsevationsList.item(i).localName}
            place={this.props.obsevationsList.item(i).place}
            county={this.props.obsevationsList.item(i).county}
            latitude={this.props.obsevationsList.item(i).latitude}
            longitude={this.props.obsevationsList.item(i).longitude}
            obsDateTime={this.props.obsevationsList.item(i).obsDateTime}
          />
          <Button
            style={
              this.props.deviceTypeAndroidTablet ? { alignSelf: "center" } : {}
            }
            transparent
            onPress={this.onClickDelete.bind(
              this,
              this.props.obsevationsList.item(i).userObservation_id
            )}
          >
            <Icon
              style={
                this.props.deviceTypeAndroidTablet
                  ? { fontSize: 50, alignSelf: "center" }
                  : {}
              }
              name="trash" size={22}
            />
          </Button>
        </ListItem>
      );
    }
    return ret;
  }

  renderEmpty() {
    return (
      <View style={styles.topContainer}>
        <Text style={styles.topText}>{this.props.strings.noObservations}</Text>
      </View>
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
          <FrontpageHeader
            title={this.props.strings.myObs}
            onMenu={this.handleOnMenuClick}
          />
          {this.props.obsevationsList.length === 0 ? (
            this.renderEmpty()
          ) : (
              <Content>
                <List>
                  <List>{this.renderList()}</List>
                </List>
              </Content>
            )}

        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#ffffff",
    fontSize: 20,
    color: "#999999"
  },
  text3: {
    marginBottom: 20,
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
    color: "#000000"
  },
  container: {
    flex: 1
  },
  modal: {
    position: "absolute",
    marginTop: 50,
    left: 0,
    top: 0
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
});

const AndroidTabletStyles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#ffffff",
    fontSize: 40,
    color: "#999999"
  },
  text3: {
    marginBottom: 20,
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
    color: "#000000"
  },
  container: {
    flex: 1
  },
  modal: {
    position: "absolute",
    marginTop: 50,
    left: 0,
    top: 0
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Observation);
