/**
 * @file List element for species in the species lists in SpeciesLeft.js
 * @author Kjetil Fossheim
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Platform, Image, TouchableOpacity } from "react-native";
import { Grid, Row, Col } from "native-base";
import ImageView from "react-native-image-viewing";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav,
  ...state.key
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

class SpeciesElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    if (typeof this.props.speciesImageList.get(this.props.species_id) !== "undefined") {
      this.setState({
        images: this.props.speciesImageList.get(this.props.species_id)
      });
    }
  }

  /**
   * @see SpeciesLeft.onClickSP
   */
  onClick() {
    this.props.onClick;
  }

  /**
   * renders a column with nearby observation, 3x icon + number
   * @return {View}
   */
  renderNerbyObservation() {
    if (this.props.noObs) {
      return (
        <Col
          size={0.45}
          style={{ marginLeft: 15, marginRight: 0, alignSelf: "flex-end" }}
        >
          <Row>
            <Image
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.image
                  : styles.image
              }
              source={require("../images/large.png")}
            />
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.obsLarge}
            </Text>
          </Row>
          <Row>
            <Image
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.image
                  : styles.image
              }
              source={require("../images/medium.png")}
            />
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.obsMedium}
            </Text>
          </Row>
          <Row>
            <Image
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.image
                  : styles.image
              }
              source={require("../images/small.png")}
            />
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text3
                  : styles.text3
              }
            >
              {this.props.obsSmall}
            </Text>
          </Row>
        </Col>
      );
    } else {
      return <Col>
        <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.rightColTxt : styles.rightColTxt}>
          {this.props.strings.noObsAvailable}
        </Text>
      </Col>;
    }
  }

  render() {
    return (
      <View>
        <Grid style={{ width: Dimensions.get("window").width }}>
          <ImageView
            images={this.state.selectedSpeciesImages}
            imageIndex={0}
            visible={this.state.openImages}
            onRequestClose={() => this.setState({ openImages: false })}
          />
          <TouchableOpacity onPress={() => this.props.onClickImage(this.state.images)}>
            <Image
              source={
                Platform.OS === "ios"
                  ? { uri: this.state.images[0] }
                  : { uri: "file://" + this.state.images[0] }
              }
              style={
                this.props.deviceTypeAndroidTablet
                  ? {
                    resizeMode: "contain",
                    height: 120,
                    width: 120,
                    marginRight: 5,
                    margin: 5
                  }
                  : {
                    resizeMode: "contain",
                    height: 70,
                    width: 70,
                    marginRight: 5,
                    margin: 5
                  }
              }
            />
          </TouchableOpacity>
          <Col size={1}>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <Text
                style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.text1
                    : styles.text1
                }
              >
                {this.props.localName}
              </Text>
              <Text
                style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.text2
                    : styles.text2
                }
              >
                {this.props.latinName}
              </Text>
            </TouchableOpacity>
          </Col>
          {this.renderNerbyObservation()}
        </Grid>
      </View>
    );
  }
}

SpeciesElement.defaultProps = {
  species_id: -99,
  latinName: "testLatin",
  localName: "TesteLocal",
  obsSmall: 22,
  obsMedium: 245,
  obsLarge: 344
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  text1: {
    fontSize: 15,
    margin: 5,
    color: "#000000"
  },
  text2: {
    fontSize: 12,
    marginLeft: 5,
    color: "#000000"
  },
  text3: {
    fontSize: 10,
    margin: 5,
    textAlign: "center",
    color: "#000000"
  },
  rightColTxt: {
    marginTop: 10,
  },
  image: {
    width: 20,
    height: 20,
    margin: 3
  }
});

const AndroidTabletStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  text1: {
    fontSize: 22,
    margin: 5,
    color: "#000000"
  },
  text2: {
    fontSize: 18,
    marginLeft: 6,
    color: "#000000"
  },
  text3: {
    fontSize: 18,
    margin: 10,
    textAlign: "center",
    color: "#000000"
  },
  image: {
    width: 40,
    height: 40,
    margin: 6
  },
  rightColTxt: {
    marginTop: 10,
    fontSize: 18
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeciesElement);
