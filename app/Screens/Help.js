/**
 * Screen for showing step-by-step instructions on how to use the app
 */
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StyleProvider, Container, Content } from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

import SubPageHeader from "../components/SubPageHeader";

const mapStateToProps = state => ({
    ...state.settings,
    ...state.nav
});

class Help extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            debugcount: 0
        };
    }

    onClickBack = () => {
        Actions.pop();
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
                    <SubPageHeader title={this.props.strings.helpHeader} onClick={this.onClickBack} />
                    <Content>
                        <View style={styles.container}>
                            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.headerText : styles.headerText}>
                                {this.props.strings.helpGeneral}
                            </Text>
                            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.text : styles.text}>
                                {this.props.strings.frontpageTopDescription + " " + this.props.strings.frontpageBottomDescription}
                            </Text>
                            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.text : styles.text}>
                                {this.props.strings.keyAbout}
                            </Text>
                            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.headerText : styles.headerText}>
                                {this.props.strings.helpUse}
                            </Text>
                            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.text : styles.text}>
                                {this.props.strings.help}
                            </Text>
                            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.headerText : styles.headerText}>
                                {this.props.strings.helpUpdate}
                            </Text>
                            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.text : styles.text}>
                                {this.props.strings.goToUpdate}
                            </Text>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10
    },
    headerText: {
        fontWeight: 'bold',
        marginTop: 10,
    }
});

const androidTabletStyles = StyleSheet.create({
    text: {
        fontSize: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    }
});

export default connect(mapStateToProps)(Help);
