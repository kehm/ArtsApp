/**
 * Screen for showing step-by-step instructions on how to use the app
 */
import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
    StyleProvider,
    Container,
    Header,
    Title,
    Content,
    Left,
    Body,
    Right,
    Button,
    Icon
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
                    <SubPageHeader title={this.props.strings.help} onClick={this.onClickBack} />
                    <Content>

                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

export default connect(mapStateToProps)(Help);
