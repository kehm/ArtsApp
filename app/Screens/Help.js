/**
 * Screen for showing step-by-step instructions on how to use the app
 */
import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import {
    StyleProvider,
    Container,
    Content,
    Button,
} from "native-base";
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
                            <Text>{this.props.strings.help}</Text>
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
});

export default connect(mapStateToProps)(Help);
