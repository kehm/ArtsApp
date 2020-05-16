/**
 * @file Tab in Species.js for showing distribution map of the selected species if available
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

class DistributionTab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      noDistribution: false
    };
  }

  componentDidMount() {
    if (this.props.distributionLocal === "undefined" || this.props.longitude === "undefined" || this.props.latitude === "undefined") {
      this.setState({ noDistribution: true });
    }
  }

  render() {
    return (
      <View>
        {this.props.isConnected ? (
          <ScrollView>
            {!this.state.noDistribution ? (
              <View>
                <Image
                  source={{
                    uri:
                      this.props.distributionCountry +
                      "&lon=" +
                      this.props.longitude +
                      "&lat=" +
                      this.props.latitude
                  }}
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.image
                      : styles.image
                  }
                />
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text
                      : null
                  }
                >
                  {this.props.strings.nationalDistrubution +
                    this.state.latitude}
                </Text>
                <Image
                  source={{
                    uri:
                      this.props.distributionLocal +
                      "&lon=" +
                      this.props.longitude +
                      "&lat=" +
                      this.props.latitude
                  }}
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.image
                      : styles.image
                  }
                />
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text
                      : null
                  }
                >
                  {this.props.strings.regonalDistrubution}
                </Text>
                <View
                  style={{
                    height: this.props.deviceTypeAndroidTablet ? 100 : 50
                  }}
                />
              </View>
            ) : (
                <Text
                  style={
                    this.props.deviceTypeAndroidTablet
                      ? AndroidTabletStyles.text
                      : null
                  }
                >
                  {this.props.strings.noDistribution}
                </Text>
              )}
          </ScrollView>
        ) : (
            <Text style={{ margin: 10, textAlign: "center" }}>
              {this.props.strings.disNoNetwork}
            </Text>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  image: {
    borderWidth: 1,
    borderColor: "black",
    width: 340,
    height: 300,
    margin: 10,
    marginTop: 10,
    marginBottom: 0,
    resizeMode: "stretch",
    alignSelf: "center"
  }
});

const AndroidTabletStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  image: {
    borderWidth: 2,
    borderColor: "black",
    width: 680,
    height: 600,
    margin: 20,
    marginTop: 20,
    marginBottom: 0,
    resizeMode: "stretch",
    alignSelf: "center"
  },
  text: {
    borderWidth: 1,
    borderColor: "black",
    width: 680,
    marginTop: 0,
    marginBottom: 30,
    padding: 10,
    fontSize: 20,
    alignSelf: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributionTab);
