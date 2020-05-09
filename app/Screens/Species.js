/**
 * @file Show information about the selected species and prompt the user to save the observation
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { StyleProvider, Button, Container, Header, Content, Tabs, Tab, Row, Col, Left, Form, Picker } from "native-base";
import { Alert, StyleSheet, Text, View, TextInput, TouchableHighlight, Image, Modal } from "react-native";
import { Actions } from "react-native-router-flux";
import Toast, { DURATION } from "react-native-easy-toast";
import ImageView from "react-native-image-viewing";
import Icon from 'react-native-vector-icons/Entypo';
import InfoTab from "../components/InfoTab";
import DistributionTab from "../components/DistributionTab";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as KeyAction from "../actions/KeyAction";
import * as ObservationAction from "../actions/ObservationAction";

import SubPageHeader from "../components/SubPageHeader";
import { county } from "../config/county";

const mapStateToProps = state => ({
  ...state.key,
  ...state.observations,
  ...state.settings,
  ...state.nav
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...KeyAction, ...ObservationAction },
      dispatch
    )
  };
}

class Species extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      open: false,
      place: "",
      county: county.counties[0].name,
      images: [],
      selectedSpeciesImages: [],
      nerby: props.nerby,
      openImages: false,
      currentTab: 0,
      defaultImage: require("../images/AA_logo.png"),
      saved: false,
      countyItems: undefined,
      missingText: false
    };
  }

  componentDidMount() {
    let date = new Date();
    this.setState({
      obsDateTime:
        date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
    });
    let imageList = this.props.speciesImageList.get(this.props.selectedSpecies.species_id);
    if (imageList !== undefined) {
      this.setState({
        selectedSpeciesImages: imageList.map(image => {
          if (this.props.platform === "ios") {
            return { uri: image };
          } else {
            return { uri: "file://" + image };
          }
        })
      });
    }
  }

  onClickBack = () => {
    Actions.pop();
  };

  /**
   * Handle on click save observation
   */
  onClickNewObs = () => {
    if (this.state.place !== '' && this.state.county !== '') {
      this.setState({ open: false });
      this.saveNewObs();
    } else {
      this.setState({ missingText: true });
    }
  };

  /**
   * Open image gallery on image click
   */
  onClickImage = () => {
    if (this.state.selectedSpeciesImages.length !== 0) {
      this.setState({ openImages: true });
    }
  };

  /**
   * Create new observation object and save it to the DB
   */
  saveNewObs() {
    let longitude = 'undefined';
    let latitude = 'undefined';
    if (this.state.longitude !== '' && this.state.latitude !== '') {
      longitude = this.state.longitude;
      latitude = this.state.latitude;
    }
    this.props.actions.insertObservation({
      latinName: this.props.selectedSpecies.latinName,
      localName: this.props.selectedSpecies.localName,
      order: this.props.selectedSpecies.order,
      family: this.props.selectedSpecies.family,
      species_id: this.props.selectedSpecies.species_id,
      latitude: latitude,
      longitude: longitude,
      place: this.state.place,
      county: this.state.county,
      key_id: this.props.chosenKey,
      obsDateTime: this.state.obsDateTime
    });
    this.setState({ saved: true });
    this.refs.toast.show(this.props.strings.newObsAddeed);
  }

  /**
   * Set coordinates. Show dialog if position is unavailable.
   */
  getCoordinate = () => {
    if (this.props.latitude !== "undefined") {
      this.setState({
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        open: true,
        missingText: false
      });
    } else {
      new Alert.alert(
        this.props.strings.noLocationHeader,
        this.props.strings.noLocationDialog,
        [
          { text: this.props.strings.cancel, style: "cancel" },
          {
            text: this.props.strings.ok, onPress: () => {
              this.setState({
                latitude: '',
                longitude: '',
                open: true,
                missingText: false
              });
            }
          }
        ],
        { cancelable: true }
      );
    }
  };

  /**
   * Render modal dialog for saving new observation
   */
  renderModal() {
    let countyItems = county.counties.map((county) => {
      return (<Picker.Item key={county.id} value={county.name} label={county.name} />);
    });
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.open}
        onRequestClose={() => this.setState({ open: false })}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text
                style={{
                  fontSize: this.props.deviceTypeAndroidTablet ? 40 : 20,
                  marginBottom: 10,
                  textAlign: "center",
                  color: 'black',
                  marginBottom: 20,
                  fontWeight: 'bold'
                }}
              >
                {this.props.strings.newObs}
              </Text>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text3
                      : styles.text3
                  }
                >
                  {this.props.strings.species + ":   "}
                </Text>
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text3
                      : styles.text3
                  }
                >
                  {this.props.selectedSpecies.localName +
                    " (" +
                    this.props.selectedSpecies.latinName + ")"}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text3
                      : styles.text3
                  }
                >
                  {this.props.strings.date + ":   "}
                </Text>
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text3
                      : styles.text3
                  }
                >
                  {this.state.obsDateTime}
                </Text>
              </View>
              <Form>
                <Picker note
                  mode="dropdown"
                  selectedValue={this.state.county}
                  onValueChange={(value) => { this.setState({ county: value }) }}
                >
                  {countyItems}
                </Picker>
                <TextInput
                  placeholder={this.props.strings.place}
                  style={[styles.textInput, this.state.missingText ? styles.missingText : undefined]}
                  onChangeText={place => this.setState({ place: place })}
                  value={this.state.place}
                />
                <TextInput
                  placeholder={this.props.strings.latitude}
                  style={styles.textInput}
                  onChangeText={latitude => this.setState({ latitude: latitude })}
                  value={this.state.latitude}
                />
                <TextInput
                  placeholder={this.props.strings.longitude}
                  style={styles.textInput}
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
                  onPress={() => this.setState({ open: false })}
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
                  onPress={this.onClickNewObs}
                >
                  <Icon name="save" size={26} />
                  <Text
                    style={
                      this.props.deviceTypeAndroidTablet
                        ? AndroidTabletStyles.text3
                        : styles.text3
                    }
                  >
                    {this.props.strings.save}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  /**
   * render nearby observation if available.
   * @return {View} Nearby text view
   */
  renderNearby() {
    if (this.props.nerby !== 0) {
      return (
        <Row style={{ justifyContent: "center" }}>
          <Text
            style={
              this.props.deviceTypeAndroidTablet
                ? AndroidTabletStyles.containerSpecies
                : styles.containerSpecies
            }
          >
            {this.props.strings.nObs + this.props.nerby}
          </Text>
        </Row>
      );
    }
    return (
      <View />
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
          <ImageView
            images={this.state.selectedSpeciesImages}
            imageIndex={0}
            visible={this.state.openImages}
            onRequestClose={() => this.setState({ openImages: false })}
          />
          <SubPageHeader
            title={this.props.selectedSpecies.localName}
            subtitle={this.props.selectedSpecies.latinName}
            onClick={this.onClickBack}
            rightIcon={!this.state.saved ? (
              <Icon name="drive" style={styles.icon} size={28} onPress={this.getCoordinate} />
            ) : (
                <Icon name="home" style={styles.icon} size={28} onPress={() => Actions.Frontpage()} />
              )} />
          <Content scrollEnabled={false}>
            <TouchableHighlight
              underlayColor={"rgba(223, 223, 223, 0.14)"}
              onPress={this.onClickImage}
            >
              <View>
                <Image
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.image
                      : styles.image
                  }
                  source={this.state.selectedSpeciesImages.length !== 0 ? this.state.selectedSpeciesImages[0] : this.state.defaultImage}
                />
              </View>
            </TouchableHighlight>
            <View style={styles.topContainer} onPress={this.onClickImage}>
              <Text style={styles.topText}>{this.props.strings.imageClickable}</Text>
            </View>
            {this.renderNearby()}
            <Tabs>
              <Tab heading={this.props.strings.spInfo} textStyle={styles.tabTextStyle} activeTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}>
                <View
                  style={{
                    height: this.props.deviceTypeAndroidTablet ? 670 : 335,
                    margin: this.props.deviceTypeAndroidTablet ? 20 : 5,
                  }}
                >
                  <InfoTab
                    tablet={this.props.deviceTypeAndroidTablet}
                    style={styles.container}
                    info={this.props.selectedSpecies.speciesText}
                  />
                </View>
              </Tab>
              <Tab heading={this.props.strings.distribution} textStyle={styles.tabTextStyle} activeTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}>
                <View
                  style={{
                    height: this.props.deviceTypeAndroidTablet ? 670 : 335,
                    margin: this.props.deviceTypeAndroidTablet ? 20 : 5
                  }}
                >
                  <DistributionTab
                    distributionLocal={
                      this.props.selectedSpecies.distributionLocal
                    }
                    distributionCountry={
                      this.props.selectedSpecies.distributionCountry
                    }
                  />
                </View>
              </Tab>
            </Tabs>
          </Content>
          {this.renderModal()}
          <Toast ref="toast" />
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  containerSpecies: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    fontSize: 15
  },
  image: {
    alignSelf: "center",
    width: '100%',
    height: 180,
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
  activeTabStyle: {
    backgroundColor: '#f0a00c'
  },
  tabTextStyle: {
    color: 'black'
  },
  icon: {
    color: 'black'
  },
  overlayIcon: {
    color: 'white',
    position: 'absolute',
    top: 60,
    right: 0
  },
  topContainer: {
    backgroundColor: 'black',
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
    padding: 10,
    color: 'white'
  },
  text3: {
    color: 'black',
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  },
  missingText: {
    borderColor: "red",
  }
});

const AndroidTabletStyles = StyleSheet.create({
  text3: {
    fontSize: 30,
    marginBottom: 5,
    textAlign: "center",
    color: 'black'
  },
  containerSpecies: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    fontSize: 30
  },
  image: {
    alignSelf: "center",
    width: '100%',
    height: 180,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Species);
