/**
 * @file Display list of saved observations
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { StyleProvider, Container, Content, List, ListItem, Button } from "native-base";
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
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
import { TouchableOpacity } from "react-native-gesture-handler";

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
      deleteobsNr: -1,
      obsList: [],
      obsFunc: [],
      fullList: [],
      filter: '',
      openFilter: false
    };
    this.props.actions.getObservations();
  }

  /**
   * If new props, trigger state update
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.observationsList !== prevState.observationsList) {
      return {
        observationsList: nextProps.observationsList,
      }
    } else return null;
  }

  /**
   * Set new state if observations list is updated
   */
  componentDidUpdate(prevProps, prevState) {
    const { observationsList } = prevState;
    if (observationsList !== this.state.obsFunc) {
      let arr = this.makeArray(observationsList);
      if (this.state.filter === '') {
        this.setState({ obsFunc: observationsList, fullList: arr, obsList: arr });
      } else {
        this.setState({ obsFunc: observationsList, fullList: arr });
      }
    }
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
    let ret = [];
    for (let i = 0; i < this.state.obsList.length; i++) {
      ret.push(
        <ListItem key={this.state.obsList[i].userObservation_id} onLongPress={() => { this.menu.open() }}>
          <ObservationElement
            latinName={this.state.obsList[i].latinName}
            localName={this.state.obsList[i].localName}
            place={this.state.obsList[i].place}
            county={this.state.obsList[i].county}
            latitude={this.state.obsList[i].latitude}
            longitude={this.state.obsList[i].longitude}
            obsDateTime={this.state.obsList[i].obsDateTime}
          />
          <Menu ref={c => (this.menu = c)}>
            <MenuTrigger />
            <MenuOptions style={styles.dotMenu}>
              <MenuOption onSelect={() => { this.onClickDelete(this.state.obsList[i].userObservation_id) }} >
                <Text style={styles.dotMenuTxt}>{this.props.strings.delete}</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </ListItem>
      );
    }
    return ret;
  }

  /**
   * Filter observations list
   */
  filterList = (filter) => {
    let list = [];
    if (filter === '') {
      list = this.state.fullList;
    } else {
      for (let i = 0; i < this.state.fullList.length; i++) {
        if (this.state.fullList[i].localName.toUpperCase().includes(filter.toUpperCase())) {
          list.push(this.state.fullList[i]);
        }
      }
    }
    this.setState({
      filter: filter,
      obsList: list
    });
  }

  /**
   * Convert functions object into array
   */
  makeArray = (f) => {
    let list = [];
    for (let i = 0; i < f.length; i++) {
      list.push(f.item(i));
    }
    return list;
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
            title={this.state.openFilter ? undefined : this.props.strings.myObs}
            body={
              <TextInput
                placeholder={this.props.strings.search}
                autoFocus={true}
                style={styles.search}
                onChangeText={(input) => this.filterList(input)}
                value={this.state.filter} />
            }
            onMenu={this.handleOnMenuClick}
            rightIcon={!this.state.openFilter ? (
              <Icon name='magnifying-glass' size={26} color={'black'} onPress={() => { this.setState({ openFilter: true }) }} />
            ) : (
                <Icon name='circle-with-cross' size={26} color={'black'} onPress={() => { this.setState({ openFilter: false }); this.filterList(''); }} />
              )
            }
          />
          {this.state.obsList.length === 0 ? (
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
  dotMenu: {
    backgroundColor: '#eee',
  },
  dotMenuTxt: {
    color: '#000',
    fontSize: 16,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  search: {
    maxWidth: '80%',
    marginTop: 6,
    paddingRight: 20,
    color: 'black',
    height: 40,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  clearIcon: {
    marginTop: 8
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
