/**
 * @file Display list of saved observations
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Alert, FlatList, Modal, Platform } from "react-native";
import { StyleProvider, Container, Content, Form, Button } from "native-base";
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
      obsList: [],
      obsFunc: [],
      fullList: [],
      filter: '',
      openFilter: false,
      openCoordinates: false,
      selected: undefined,
      latitude: '',
      longitude: '',
      missingLatitude: false,
      missingLongitude: false
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
          onPress: () => {
            this.props.actions.deleteObservation(i).then(() => {
              this.props.actions.getObservations();
            })
          }
        }
      ],
      { cancelable: true }
    );
  };

  /**
   * Show modal to select coordinates
   */
  onSelectCoordinates = (item) => {
    let longitude = '';
    let latitude = '';
    if (item.longitude !== 'undefined' && item.latitude !== 'undefined') {
      longitude = item.longitude;
      latitude = item.latitude;
    }
    this.setState({ openCoordinates: true, selected: item, longitude: longitude, latitude: latitude, missingLatitude: false, missingLongitude: false });
  }

  /**
   * Save new coordinates for selected observation
   */
  setCoordinates = () => {
    if (this.state.latitude === '') {
      this.setState({ missingLatitude: true });
    } else if (this.state.longitude === '') {
      this.setState({ missingLongitude: true });
    } else {
      this.props.actions.updateObservationCoordinates(this.state.selected.userObservation_id, this.state.latitude, this.state.longitude).then(() => {
        this.props.actions.getObservations().then(() => {
          this.setState({ openCoordinates: false });
        })
      });
    }
  }

  /**
   * Set current coordinates if location is available
   */
  getCoordinates = () => {
    if (this.props.latitude === 'undefined') {
      Alert.alert(
        this.props.strings.noLocationHeader,
        this.props.strings.noLocation + " ",
        [
          { text: this.props.strings.ok },
        ],
        { cancelable: true }
      );
    } else {
      this.setState({ longitude: this.props.longitude, latitude: this.props.latitude });
    }
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

  /**
   * Render if list is empty
   */
  renderEmpty() {
    return (
      <View style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.topContainer : styles.topContainer}>
        <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.topText : styles.topText}>{this.props.strings.noObservations}</Text>
      </View>
    );
  }

  /**
   * Render observations list
   */
  renderObservations() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.obsList}
        extraData={this.state}
        keyExtractor={item => item.userObservation_id.toString()}
        renderItem={(item) =>
          <ObservationElement
            latinName={item.item.latinName}
            localName={item.item.localName}
            place={item.item.place}
            county={item.item.county}
            obsLatitude={item.item.latitude}
            obsLongitude={item.item.longitude}
            obsDateTime={item.item.obsDateTime}
            obsItem={item.item}
            onDelete={this.onClickDelete}
            onSelectCoordinates={this.onSelectCoordinates}
          />
        }
      />
    )
  }

  /**
   * Render modal dialog for saving new coordinates
   */
  renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.openCoordinates}
        onRequestClose={() => this.setState({ openCoordinates: false })}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View>
                <Text
                  style={{
                    fontSize: this.props.deviceTypeAndroidTablet ? 30 : 20,
                    textAlign: "center",
                    color: 'black',
                    fontWeight: 'bold'
                  }}
                >
                  {this.state.selected !== undefined ? this.state.selected.localName : undefined}
                </Text>
                <Text style={{
                  marginBottom: 20,
                  color: 'black',
                  textAlign: "center"
                }}>
                  {this.state.selected !== undefined ? this.state.selected.obsDateTime : undefined}
                </Text>
                <Text>{this.props.strings.saveCoordinates}</Text>
                <Button
                  iconLeft
                  style={{ padding: 10 }}
                  transparent
                  onPress={this.getCoordinates}
                >
                  <Icon name="location-pin" size={26} />
                  <Text
                    style={
                      this.props.deviceTypeAndroidTablet
                        ? AndroidTabletStyles.text3
                        : styles.text3
                    }
                  >
                    {this.props.strings.curCoor}
                  </Text>
                </Button>
              </View>
              <Form>
                <TextInput
                  placeholder={this.props.strings.latitude}
                  style={[this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.textInput : styles.textInput, this.state.missingLatitude ? styles.missingText : undefined]}
                  onChangeText={latitude => this.setState({ latitude: latitude })}
                  value={this.state.latitude}
                />
                <TextInput
                  placeholder={this.props.strings.longitude}
                  style={[this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.textInput : styles.textInput, this.state.missingLongitude ? styles.missingText : undefined]}
                  onChangeText={longitude => this.setState({ longitude: longitude })}
                  value={this.state.longitude}
                />
              </Form>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  marginTop: 20
                }}
              >
                <Button
                  iconLeft
                  style={{ padding: 10 }}
                  transparent
                  onPress={() => this.setState({ openCoordinates: false })}
                >
                  <Icon name="chevron-left" size={26} />
                  <Text
                    style={
                      this.props.deviceTypeAndroidTablet
                        ? AndroidTabletStyles.text3
                        : styles.text3
                    }
                  >
                    {this.props.strings.cancel}
                  </Text>
                </Button>
                <Button
                  transparent
                  iconLeft
                  onPress={this.setCoordinates}
                >
                  <Icon name="cycle" size={26} />
                  <Text
                    style={
                      this.props.deviceTypeAndroidTablet
                        ? AndroidTabletStyles.text3
                        : styles.text3
                    }
                  >
                    {this.props.strings.update}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal >
    )
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
                style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.search : styles.search}
                onChangeText={(input) => this.filterList(input)}
                value={this.state.filter} />
            }
            onMenu={this.handleOnMenuClick}
            rightIcon={!this.state.openFilter ? (
              <Icon name='magnifying-glass' size={this.props.deviceTypeAndroidTablet ? 38 : 26} color={'black'} onPress={() => { this.setState({ openFilter: true }) }} />
            ) : (
                <Icon name='circle-with-cross' size={this.props.deviceTypeAndroidTablet ? 38 : 26} color={'black'} onPress={() => { this.setState({ openFilter: false }); this.filterList(''); }} />
              )
            }
          />
          {this.state.obsList.length === 0 ? (
            this.renderEmpty()
          ) : (
              this.renderObservations()
            )}
          {this.renderModal()}
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
  list: {
    backgroundColor: '#65C86012',
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
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginTop: 20,
  },
  missingText: {
    borderColor: "red",
  },
  text3: {
    color: 'black',
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
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  topContainer: {
    backgroundColor: 'white',
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
  search: {
    maxWidth: '80%',
    marginTop: 6,
    paddingRight: 20,
    color: 'black',
    height: 60,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 30,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Observation);
