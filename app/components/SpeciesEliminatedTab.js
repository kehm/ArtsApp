/**
 * Tab for displaying list of eliminated species after traits selection
 */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import SpeciesElement from "./SpeciesElement";
import { findIndex } from "lodash";

class SpeciesEliminatedTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <FlatList
                data={this.props.list}
                keyExtractor={item => item.species_id.toString()}
                renderItem={(item) => {
                    let obs = this.props.observations[findIndex(this.props.observations, { species_id: item.item.latinName })];
                    return (
                        <SpeciesElement
                            key={item.item.species_id}
                            species_id={item.item.species_id}
                            latinName={item.item.latinName}
                            localName={item.item.localName}
                            obsSmall={obs === undefined ? 0 : obs.obsSmall}
                            obsMedium={obs === undefined ? 0 : obs.obsMedium}
                            obsLarge={obs === undefined ? 0 : obs.obsLarge}
                            isAndroidTablet={this.props.deviceTypeAndroidTablet}
                            noObs={obs === undefined ? false : true}
                            onPress={() => this.props.onPress(item.item)}
                            onClickImage={(images) => this.props.onClickImage(images)}
                        />)
                }
                }
            />
        );
    }
}

export default SpeciesEliminatedTab;
