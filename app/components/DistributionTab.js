/**
 * @file Tab in Species.js for showing distribution map of the selected species if available
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";

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
    let local = true;
    let country = true;
    if (this.props.distributionLocal === "undefined" || this.props.distributionLocal === null || this.props.distributionLocal === undefined) {
      local = false;
    } else if (this.props.longitude === "undefined" || this.props.latitude === "undefined") {
      local = false;
    }
    if (this.props.distributionCountry === "undefined" || this.props.distributionCountry === null || this.props.distributionCountry === undefined) {
      country = false;
    }
    this.state = {
      showLocal: local,
      showCountry: country,
      localImg: this.props.distributionLocal + "&lon=" + this.props.longitude + "&lat=" + this.props.latitude,
      countryImg: this.props.distributionCountry + "&lon=" + this.props.longitude + "&lat=" + this.props.latitude,
    };
  }

  render() {
    return (
      <ScrollView>
        {this.state.showCountry && (
          <View>
            <TouchableOpacity onPress={() => this.props.onClickMap(this.state.countryImg)}>
              <Image
                source={{
                  uri:
                    this.state.countryImg
                }}
                style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.image
                    : styles.image
                }
              />
            </TouchableOpacity>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text
                  : styles.text
              }
            >
              {this.props.strings.nationalDistribution}
            </Text>
          </View>
        )}

        {this.state.showLocal && (
          <View>
            <TouchableOpacity onPress={() => this.props.onClickMap(this.state.localImg)}>
              <Image
                source={{
                  uri:
                    this.state.localImg
                }}
                style={
                  this.props.deviceTypeAndroidTablet
                    ? AndroidTabletStyles.image
                    : styles.image
                }
              />
            </TouchableOpacity>
            <Text
              style={
                this.props.deviceTypeAndroidTablet
                  ? AndroidTabletStyles.text
                  : styles.text
              }
            >
              {this.props.strings.regionalDistribution}
            </Text>
          </View>
        )}
        {!this.state.showCountry && !this.state.showLocal && (
          <Text
            style={
              this.props.deviceTypeAndroidTablet
                ? AndroidTabletStyles.text
                : styles.text
            }
          >
            {this.props.strings.noDistribution}
          </Text>
        )}
        {this.state.showCountry && !this.state.showLocal && (
          <Text
            style={
              this.props.deviceTypeAndroidTablet
                ? AndroidTabletStyles.text
                : styles.text
            }
          >
            {this.props.strings.regionalPosition}
          </Text>
        )}
      </ScrollView>
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
  },
  text: {
    marginBottom: 10
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
