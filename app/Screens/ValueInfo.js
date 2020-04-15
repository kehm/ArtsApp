/**
 * @file Render images and information about the selected value
 * @author Kjetil Fossheim
 */

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    Text,
    Dimensions,
    Alert
} from "react-native";
import {
    Container,
    StyleProvider,
    Header,
    Footer,
    FooterTab,
    Title,
    Spinner,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    H2,
    Grid,
    Col,
    Row
} from "native-base";
import { Actions } from "react-native-router-flux";
import HTMLView from "react-native-htmlview";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SubPageHeader from "../components/SubPageHeader";

const mapStateToProps = state => ({
    ...state.settings,
    ...state.nav
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

class ValueInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeImage: 0,
            images: this.props.navigation.getParam("images", []).map((item, i) => {
                if (this.props.platform === "ios") {
                    return { url: item };
                }
                return { url: "file://" + item };
            })
        };
    }

    onClickBack = () => {
        Actions.pop();
    };

    onClickImage = i => {
        this.setState({ activeImage: i });
    };

    /**
     * Cleans HTML removing <br>
     */
    removeHtmlBr = () => {
        if (this.props.navigation.getParam("valueInfo") === null) {
            return this.props.strings.noText;
        }
        return this.props.navigation
            .getParam("valueInfo")
            .replace(/(\n|<br>)/gm, "");
    };

    renderImagesRow() {
        return this.props.navigation.getParam("images", []).map((item, i) => {
            return (
                <TouchableHighlight
                    key={i}
                    onPress={this.onClickImage.bind(this, i)}
                    underlayColor={"#dedede"}
                >
                    <Image
                        style={
                            this.props.deviceTypeAndroidTablet
                                ? AndroidTabletStyles.imageSmall
                                : styles.imageSmall
                        }
                        source={
                            this.props.platform === "ios"
                                ? { uri: item }
                                : { uri: "file://" + item }
                        }
                    />
                </TouchableHighlight>
            );
        });
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
                <SubPageHeader title={this.props.strings.valueInfo} onClick={this.onClickBack} />
                    <Content>
                        <View style={styles.container}>
                            <View style={styles.container2}>
                                {this.props.navigation.getParam("images", []).length > 0 && (
                                    <View
                                        style={{
                                            marginTop: this.props.deviceTypeAndroidTablet ? 10 : 10
                                        }}
                                    >
                                        <Image
                                            style={
                                                this.props.deviceTypeAndroidTablet
                                                    ? AndroidTabletStyles.image
                                                    : styles.image
                                            }
                                            source={
                                                this.props.platform === "ios"
                                                    ? {
                                                        uri: this.props.navigation.getParam(
                                                            "images",
                                                            []
                                                        )[this.state.activeImage]
                                                    }
                                                    : {
                                                        uri:
                                                            "file://" +
                                                            this.props.navigation.getParam("images", [])[
                                                            this.state.activeImage
                                                            ]
                                                    }
                                            }
                                        />
                                    </View>
                                )}
                            </View>
                            <View style={styles.container3}>
                                <Row
                                    style={
                                        this.props.deviceTypeAndroidTablet
                                            ? AndroidTabletStyles.smallImageContainer
                                            : styles.smallImageContainer
                                    }
                                >
                                    {this.renderImagesRow()}
                                </Row>
                            </View>
                            <View style={styles.container3}>
                                <Text
                                    numberOfLines={3}
                                    style={
                                        this.props.deviceTypeAndroidTablet
                                            ? AndroidTabletStyles.text
                                            : styles.text
                                    }
                                >
                                    {this.props.navigation.getParam("title", "")}
                                </Text>
                                <HTMLView
                                    value={this.removeHtmlBr()}
                                    stylesheet={
                                        this.props.deviceTypeAndroidTablet
                                            ? htmlstylesAndroidTablet
                                            : htmlstyles
                                    }
                                />
                            </View>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    container2: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    container3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    image: {
        width: Dimensions.get("window").width - 50,
        height: 250,
        margin: 10,
        resizeMode: "contain",
        alignSelf: "center",
        padding: 20,
        backgroundColor: "#ffffff"
    },
    imageSmall: {
        width: 50,
        height: 50,
        margin: 5,
        borderColor: "#ababab",
        borderWidth: 1,
        resizeMode: "contain",
        padding: 5,
        backgroundColor: "#ffffff"
    },
    smallImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    separator: {
        height: 20,
        backgroundColor: "grey"
    },
    textBox: {
        flex: 1,
        margin: 0,
        marginTop: 20
    },
    text3: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: "center",
        color: "#000000"
    },
    text: {
        fontSize: 20,
        marginBottom: 5,
        paddingBottom: 5,
        textAlign: "center",
        fontWeight: "bold",
        color: "#000000"
    }
});

const htmlstyles = StyleSheet.create({
    br: {
        margin: 0,
        padding: 0
    },
    p: {
        fontSize: 15
    }
});

const htmlstylesAndroidTablet = StyleSheet.create({
    br: {
        margin: 0,
        padding: 0
    },
    p: {
        fontSize: 30
    }
});

const AndroidTabletStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    container2: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    container3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    image: {
        width: Dimensions.get("window").width - 50,
        height: 450,
        marginTop: 10,
        marginBottom: 5,
        alignSelf: "center",
        resizeMode: "contain",
        padding: 10
    },
    imageSmall: {
        width: 100,
        height: 100,
        margin: 10,
        borderColor: "#ababab",
        borderWidth: 1,
        resizeMode: "contain",
        padding: 10,
        backgroundColor: "#ffffff"
    },
    smallImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    separator: {
        height: 20,
        backgroundColor: "grey"
    },
    textBox: {
        flex: 1,
        marginTop: 20,
        margin: 10
    },
    text3: {
        fontSize: 30,
        marginBottom: 5,
        textAlign: "center",
        color: "#000000"
    },
    text: {
        flex: 1,
        fontSize: 40,
        marginBottom: 5,
        textAlign: "center",
        fontWeight: "bold",
        color: "#000000"
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ValueInfo);
