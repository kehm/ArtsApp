/**
 * @file List element for species in the species lists in SpeciesLeft.js
 * @author Kjetil Fossheim
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Platform, Image, TouchableOpacity } from "react-native";
import { Grid, Row, Col } from "native-base";

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

  onClick() {
    this.props.onClick;
  }

  /**
   * Render a column with nearby observations
   */
  renderNearbyObservations() {
    if (this.props.noObs) {
      return (
        <View style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.obsRow : styles.obsRow}>
          <Image style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.image : styles.image}
            source={require("../images/small.png")}
          />
          <Text style={[this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.text3 : styles.text3, { color: 'green' }]}>
            {this.props.obsSmall}
          </Text>
          <Image style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.image : styles.image}
            source={require("../images/medium.png")}
          />
          <Text style={[this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.text3 : styles.text3, { color: 'orange' }]}>
            {this.props.obsMedium}
          </Text>
          <Image style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.image : styles.image}
            source={require("../images/large.png")}
          />
          <Text style={[this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.text3 : styles.text3, { color: 'black' }]}>
            {this.props.obsLarge}
          </Text>
        </View>
      );
    } else {
      return (
        <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.noObsText : styles.noObsText}>
          {this.props.strings.noObsAvailable}
        </Text>
      );
    }
  }

  render() {
    return (
      <View>
        <Grid style={{ width: Dimensions.get("window").width }}>
          <Col style={styles.imgCol}>
            <TouchableOpacity onPress={() => this.props.onClickImage(this.state.images)}>
              <Image
                source={
                  Platform.OS === "ios"
                    ? { uri: this.state.images[0] }
                    : { uri: "file://" + this.state.images[0] }
                }
                style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.imgStyle : styles.imgStyle}
              />
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <Row>
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text1
                      : styles.text1
                  }
                >
                  {this.props.localName}
                </Text>
              </Row>
              <Row>
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text2
                      : styles.text2
                  }
                >
                  {this.props.latinName}
                </Text>
              </Row>
              <Row>
                {this.renderNearbyObservations()}
              </Row>
            </TouchableOpacity>
          </Col>
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
    color: "#000000",
    marginTop: 6,
    fontWeight: 'bold'
  },
  text2: {
    fontSize: 12,
    color: "#000000"
  },
  text3: {
    fontSize: 10,
    marginTop: 6,
    marginLeft: 5,
    marginRight: 10,
    textAlign: "center",
    color: "#000000",
  },
  noObsText: {
    marginTop: 5,
    fontSize: 10
  },
  image: {
    width: 22,
    height: 22,
    marginTop: 3,
  },
  imgStyle: {
    resizeMode: "contain",
    height: 80,
    width: 80,
    marginRight: 5,
    marginLeft: 5
  },
  imgCol: {
    width: 80,
    marginRight: 20
  },
  obsRow: {
    flexDirection: 'row',
  }
});

const AndroidTabletStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  text1: {
    fontSize: 22,
    color: "#000000",
    marginLeft: 40
  },
  text2: {
    fontSize: 18,
    color: "#000000",
    marginLeft: 40
  },
  text3: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    textAlign: "center",
    color: "#000000"
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 6
  },
  noObsText: {
    marginTop: 5,
    fontSize: 16,
    marginLeft: 40
  },
  imgStyle: {
    resizeMode: "contain",
    height: 120,
    width: 120,
    marginRight: 5,
    marginLeft: 5,
  },
  obsRow: {
    flexDirection: 'row',
    marginLeft: 40
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeciesElement);
