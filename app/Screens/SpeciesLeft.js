/**
 * @file Display list of species left after selection of trat values. Sorts the species(SP) into three categories, SP left, SP left locally, SP eliminated
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import { List, ListItem } from "native-base";
import { Button, Icon, Container, StyleProvider, Header, Title, Content, Left, Right, Tabs, Tab } from "native-base";
import SpeciesElement from "../components/SpeciesElement";
import Toast, { DURATION } from "react-native-easy-toast";
import ImageView from "react-native-image-viewing";
import { findIndex } from "lodash";
import SpeciesLeftTab from "../components/SpeciesLeftTab";
import SpeciesEliminatedTab from "../components/SpeciesEliminatedTab";

// theme
import getTheme from "../native-base-theme/components";
import common from "../native-base-theme/variables/commonColor";
import androidTablet from "../native-base-theme/variables/androidTablet";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as KeyAction from "../actions/KeyAction";
import * as MenuAction from "../actions/MenuAction";
import * as ObservationAction from "../actions/ObservationAction";

import SubPageHeader from "../components/SubPageHeader";

const mapStateToProps = state => ({
    ...state.key,
    ...state.nav,
    ...state.menu,
    ...state.observations,
    ...state.settings
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            { ...KeyAction, ...MenuAction, ...ObservationAction },
            dispatch
        )
    };
}

class SpeciesLeft extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            latitude: "",
            longitude: "",
            count: 0,
            loading: false,
            spElim: this.setElimList(),
            leftNerbyList: props.navigation.getParam("leftNerbyList", []),
            leftNotGeo: this.setNotNerby(props.nerbyList),
            openImages: false
        };
    }

    /**
     * componentWillReceiveProps monitors the nextProps and nextState for updates.
     * Handles updates of the nearby observed list, and sorts species thereafter. Also handles update errors.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @return {void}
     */
    componentWillReceiveProps(nextProps, nextState) {
        if (
            nextProps.getGerbyList &&
            nextProps.nerbyList.length !== this.props.nerbyList.length
        ) {
            l = [];
            if (nextProps.nerbyList.length !== 0) {
                if (nextProps.speciesLeft.length !== 0) {
                    for (let i = 0; i < nextProps.nerbyList.length; i++) {
                        k = findIndex(nextProps.speciesLeft, {
                            species_id: nextProps.nerbyList[i].species_id
                        });
                        if (k !== -1) {
                            l.push(nextProps.speciesLeft[k]);
                        }
                    }
                } else if (nextProps.chosenValues.length === 0) {
                    for (let i = 0; i < nextProps.nerbyList.length; i++) {
                        k = findIndex(nextProps.fullSpList, {
                            species_id: nextProps.nerbyList[i].species_id
                        });
                        if (k !== -1) {
                            l.push(nextProps.fullSpList[k]);
                        }
                    }
                }
            }
            this.setState({
                leftNerbyList: l ? l : [],
                leftNotGeo: this.setNotNerby(nextProps.nerbyList)
            });
        }

        if (nextProps.nerby_updated) {
            if (nextProps.modalOpen) {
                this.props.actions.changeModal();
            }
            this.refs.toast.show(this.props.strings.updateSuccess, 1500);
            this.props.actions.changeUpdateSuccess();
            this.props.actions.setSpNerby(this.props.chosenKey);
        } else if (nextProps.nerby_updatedErrorBool) {
            this.props.actions.updateReset();
            alert(this.props.strings.updateUnavailableError);
        }
    }

    onClickMenu = () => {
        this.props.actions.openMenu();
    };

    onClickHome = () => {
        Actions.popTo("Frontpage");
    };

    onClickBack = () => {
        this.getSections();

        Actions.pop();
    };

    onClickSP = (sp, nerBy) => {
        Actions.Species({ nerby: nerBy, selectedSpecies: sp });
    };

    /**
     * Handle on species selected
     */
    onSpeciesSelected = (species) => {
        Actions.Species({ nerby: 0, selectedSpecies: species });
    }

    /**
     * used for setting the state of the list of all species that is left in collection, but not have any observations locally.
     * @param {array} nerbyList list of species that has observations locally
     * @return {array}
     */
    setNotNerby(nerbyList) {
        let spList =
            this.props.chosenValues.length === 0
                ? this.props.fullSpList
                : this.props.speciesLeft;
        l = [];
        for (let i = 0; i < spList.length; i++) {
            k = findIndex(nerbyList, { species_id: spList[i].species_id });
            if (k === -1) {
                l.push(spList[i]);
            }
        }
        return l;
    }

    /**
     * used for making a list of all eliminated species
     * @return {array}
     */
    setElimList() {
        if (this.props.chosenValues.length === 0) {
            return [];
        }
        return this.props.fullSpList.filter(
            x => findIndex(this.props.speciesLeft, { species_id: x.species_id }) == -1
        );
    }

    /**
     * if connected to internett will it update the list of locally observed species to current location.
     * @return {void}
     */
    geoOnPress = () => {
        if (this.props.isConnected) {
            if (this.props.latitude !== "undefined") {
                k = this.props.keys[
                    findIndex(this.props.keys, { key_id: this.props.chosenKey })
                ];
                this.props.actions.updateNerbyList(
                    [k],
                    this.props.latitude,
                    this.props.longitude
                );
            } else if (this.props.latitude === "undefined") {
                alert(this.props.strings.noLocation);
            } else if (!this.props.isConnected) {
                this.refs.toast.show(this.props.strings.noNetwork, 1500);
            }
        }
    };

    /**
     * set selections lists with data
     * @return {void}
     */
    getSections() {
        let ret = [];
        if (this.state.leftNerbyList.length !== 0) {
            ret.push({ data: this.state.leftNerbyList, key: "geo" });
        }
        if (this.state.leftNotGeo.length !== 0) {
            ret.push({ data: this.state.leftNotGeo, key: "left" });
        }
        if (this.state.spElim.length !== 0) {
            ret.push({ data: this.state.spElim, key: "elim" });
        }
        return ret;
    }

    /**
     * Open image gallery on image click
     */
    onClickImage = (imageList) => {
        if (imageList.length !== 0) {
            this.setState({
                images: imageList.map(image => {
                    if (this.props.platform === "ios") {
                        return { uri: image };
                    } else {
                        return { uri: "file://" + image };
                    }
                }),
                openImages: true
            });
        }
    };

    renderSectionHeader = ({ section }) => {
        switch (section.key) {
            case "geo":
                return (
                    <View
                        style={{
                            padding: this.props.deviceTypeAndroidTablet ? 10 : 5,
                            backgroundColor: "#c9c9c9"
                        }}
                    >
                        <Text
                            style={{ fontSize: this.props.deviceTypeAndroidTablet ? 26 : 13 }}
                        >
                            {this.props.strings.leftGeo}
                        </Text>
                    </View>
                );
                break;
            case "left":
                if (this.props.nerbyList.length === 0) {
                    return (
                        <View
                            style={{
                                padding: this.props.deviceTypeAndroidTablet ? 4 : 2,
                                marginTop: -1,
                                backgroundColor: "#c9c9c9"
                            }}
                        />
                    );
                }
                return (
                    <View
                        style={{
                            padding: this.props.deviceTypeAndroidTablet ? 10 : 5,
                            marginTop: -1,
                            backgroundColor: "#c9c9c9"
                        }}
                    >
                        <Text
                            style={{ fontSize: this.props.deviceTypeAndroidTablet ? 26 : 13 }}
                        >
                            {this.props.strings.leftNotGeo}
                        </Text>
                    </View>
                );
                break;
            case "elim":
                return (
                    <View>
                        <Title
                            style={{
                                color: "#F8F8F8",
                                backgroundColor: "#F0A00C",
                                padding: this.props.deviceTypeAndroidTablet ? 20 : 10
                            }}
                        >
                            {this.props.strings.eliminated}
                        </Title>
                    </View>
                );
                break;
            default:
                return (
                    <View>
                        <Title
                            style={{ padding: this.props.deviceTypeAndroidTablet ? 20 : 10 }}
                        >
                            {this.props.strings.eliminated}
                        </Title>
                        <ListItem itemDivider style={{ marginTop: -1 }}>
                            <Text
                                style={{
                                    fontSize: this.props.deviceTypeAndroidTablet ? 30 : 15
                                }}
                            >
                                {this.props.strings.eliminated}
                            </Text>
                        </ListItem>
                    </View>
                );
        }
    };

    /**
     * renders item, sorts after if locally found.
     * @param {Object} item Secies object
     * @return {View} Species list item view
     */
    renderItem = ({ item }) => {
        let t = this.props.nerbyList[
            findIndex(this.props.nerbyList, { species_id: item.species_id })
        ];
        if (this.props.nerbyList.length !== 0 && typeof t !== "undefined") {
            return (
                <ListItem
                    button
                    key={item.species_id}
                    onPress={this.onClickSP.bind(this, item, t.obsSmall)}
                >
                    <SpeciesElement
                        key={item.species_id}
                        species_id={item.species_id}
                        latinName={item.latinName}
                        localName={item.localName}
                        obsSmall={t.obsSmall}
                        obsMedium={t.obsMedium}
                        obsLarge={t.obsLarge}
                        isAndroidTablet={this.props.deviceTypeAndroidTablet}
                        noObs={this.props.nerbyList.length === 0 ? false : true}
                    />
                </ListItem>
            );
        }
        return (
            <ListItem
                button
                key={item.species_id}
                onPress={this.onClickSP.bind(this, item, 0)}
            >
                <SpeciesElement
                    key={item.species_id}
                    species_id={item.species_id}
                    latinName={item.latinName}
                    localName={item.localName}
                    obsSmall={0}
                    obsMedium={0}
                    obsLarge={0}
                    isAndroidTablet={this.props.deviceTypeAndroidTablet}
                    noObs={this.props.nerbyList.length === 0 ? false : true}
                />
            </ListItem>
        );
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
                    <SubPageHeader title={this.props.strings.seeAllSpecies} onClick={this.onClickBack} />
                    <ImageView
                        images={this.state.images}
                        imageIndex={0}
                        visible={this.state.openImages}
                        onRequestClose={() => this.setState({ openImages: false })}
                    />
                    <View style={styles.topContainer}>
                        <Text style={styles.topText}>{this.props.strings.speciesViewAll} {this.props.strings.imageClickable}.</Text>
                    </View>
                    <Content style={styles.tabStyle}>
                        <Tabs>
                            <Tab heading={this.props.strings.possible} textStyle={styles.tabTextStyle} activeTextStyle={styles.tabTextStyle}
                                activeTabStyle={styles.activeTabStyle}>
                                {this.state.leftNotGeo.length !== 0 ? (
                                    <SpeciesLeftTab list={this.state.leftNotGeo} onPress={this.onSpeciesSelected} onClickImage={this.onClickImage} />
                                ) : (
                                        <View />
                                    )}
                            </Tab>
                            <Tab heading={this.props.strings.eliminated} textStyle={styles.tabTextStyle} activeTextStyle={styles.tabTextStyle}
                                activeTabStyle={styles.activeTabStyle}>
                                {this.state.spElim.length !== 0 ? (
                                    <SpeciesEliminatedTab list={this.state.spElim} onPress={this.onSpeciesSelected} onClickImage={this.onClickImage} />
                                ) : (
                                        <View />
                                    )}
                            </Tab>
                        </Tabs>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    activeTabStyle: {
        backgroundColor: '#f0a00c'
    },
    tabTextStyle: {
        color: 'black'
    },
    tabStyle: {
        top: 56,
        marginBottom: 50
    },
    topContainer: {
        backgroundColor: '#E1ECDF',
        position: 'absolute',
        top: 56,
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
        padding: 10
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpeciesLeft);
