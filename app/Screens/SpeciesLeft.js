/**
 * @file Display list of species left after selection of traits. Sorts species into three categories: species left, species eliminated, species nearby
 * @author Kjetil Fossheim
 */
import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, StyleProvider, Content, Tabs, Tab, Spinner } from "native-base";
import Toast, { DURATION } from "react-native-easy-toast";
import ImageView from "react-native-image-viewing";
import Icon from 'react-native-vector-icons/Entypo';
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
import * as SettingsAction from "../actions/SettingsAction";

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
            { ...KeyAction, ...MenuAction, ...ObservationAction, ...SettingsAction },
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
            leftNotGeo: this.setNotNearby(props.nearbyList),
            openImages: false,
            openModal: false
        };
    }

    onClickBack = () => {
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
    setNotNearby(nearbyList) {
        let spList = this.props.chosenValues.length === 0 ? this.props.fullSpList : this.props.speciesLeft; let list = [];
        for (let i = 0; i < spList.length; i++) {
            let k = findIndex(nearbyList, { species_id: spList[i].species_id });
            if (k === -1) {
                list.push(spList[i]);
            }
        }
        return list;
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
     * Update list of locally observed species (based on current location)
     */
    updateObservedNearby = async () => {
        if (this.props.isConnected) {
            if (this.props.useLocation && this.props.latitude !== "undefined") {
                let k = this.props.keys[findIndex(this.props.keys, { key_id: this.props.chosenKey })];
                this.props.actions.updateNearbyList([k], this.props.latitude, this.props.longitude).then(() => {
                    this.props.actions.getNearbyObservations(k.key_id);
                    this.refs.toast.show(this.props.strings.updateSuccess);
                }).catch(() => {
                    this.refs.toast.show(this.props.strings.obsUpdateError);
                }).finally(() => {
                    this.setState({ openModal: false });
                });
            } else {
                this.refs.toast.show(this.props.strings.noLocation);
            }
        } else {
            this.refs.toast.show(this.props.strings.noNetwork);
        }
    };

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
                    <SubPageHeader title={this.props.strings.seeAllSpecies} onClick={this.onClickBack}
                        rightIcon={
                            <TouchableOpacity onPress={() => { this.setState({ openModal: true }); this.updateObservedNearby() }}>
                                <Icon name='cw' size={this.props.deviceTypeAndroidTablet ? 36 : 26} color='black' />
                            </TouchableOpacity>
                        } />
                    <ImageView
                        images={this.state.images}
                        imageIndex={0}
                        visible={this.state.openImages}
                        onRequestClose={() => this.setState({ openImages: false })}
                    />
                    <View style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.topContainer : styles.topContainer}>
                        <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.topText : styles.topText}>{this.props.strings.speciesViewAll} {this.props.strings.imageClickable}.</Text>
                    </View>
                    <Content style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tabStyle : styles.tabStyle}>
                        <Tabs>
                            <Tab heading={this.props.strings.possible} textStyle={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tabTextStyle : styles.tabTextStyle}
                                activeTextStyle={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tabTextStyle : styles.tabTextStyle}
                                activeTabStyle={this.props.deviceTypeAndroidTablet ? androidTabletStyles.activeTabStyle : styles.activeTabStyle}
                                tabStyle={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tab : undefined}>
                                <View style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tabContainer : undefined}>
                                    {this.state.leftNotGeo !== undefined && this.state.leftNotGeo.length !== 0 ? (
                                        <SpeciesLeftTab list={this.state.leftNotGeo} observations={this.props.nearbyList} onPress={this.onSpeciesSelected} onClickImage={this.onClickImage} />
                                    ) : (
                                            <Text style={this.props.deviceTypeAndroidTablet ? AndroidTabletStyles.text : styles.text} >{this.props.strings.noPossible}</Text>
                                        )}
                                </View>
                            </Tab>
                            <Tab heading={this.props.strings.eliminated} textStyle={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tabTextStyle : styles.tabTextStyle}
                                activeTextStyle={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tabTextStyle : styles.tabTextStyle}
                                activeTabStyle={this.props.deviceTypeAndroidTablet ? androidTabletStyles.activeTabStyle : styles.activeTabStyle}
                                tabStyle={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tab : undefined}>
                                <View style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.tabContainer : undefined}>

                                    {this.state.spElim !== undefined && this.state.spElim.length !== 0 ? (
                                        <SpeciesEliminatedTab list={this.state.spElim} observations={this.props.nearbyList} onPress={this.onSpeciesSelected} onClickImage={this.onClickImage} />
                                    ) : (
                                            <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.text : styles.text} >{this.props.strings.noElim}</Text>
                                        )}
                                </View>
                            </Tab>
                        </Tabs>
                    </Content>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.openModal}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.modalText : styles.modalText}>{this.props.strings.updateNearby}</Text>
                                <Spinner color="green" />
                            </View>
                        </View>
                    </Modal>
                    <Toast ref="toast" />
                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    activeTabStyle: {
        backgroundColor: '#f0a00c',
    },
    tabTextStyle: {
        color: 'black'
    },
    tabStyle: {
        top: 56,
        marginBottom: 50,
    },
    topContainer: {
        backgroundColor: '#E1ECDF',
        position: 'absolute',
        borderBottomWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        width: '100%',
        ...Platform.select({
            ios: {
                top: 84,
            },
            android: {
                top: 56,
            }
        })
    },
    topText: {
        fontSize: 14,
        textAlign: 'center',
        padding: 10
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
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold"
    },
    text: {
        padding: 5,
        fontSize: 15
    }
});

const androidTabletStyles = StyleSheet.create({
    tabStyle: {
        top: 70,
        marginBottom: 50,
    },
    activeTabStyle: {
        backgroundColor: '#f0a00c',
        height: 80,
    },
    tab: {
        height: 80
    },
    tabTextStyle: {
        color: 'black',
        fontSize: 24
    },
    topContainer: {
        backgroundColor: '#E1ECDF',
        position: 'absolute',
        top: 80,
        borderBottomWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        width: '100%'
    },
    topText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10
    },
    tabContainer: {
        marginTop: 50,
        marginBottom: 50
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22
    },
    text: {
        padding: 5,
        fontSize: 20
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpeciesLeft);
