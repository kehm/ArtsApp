/**
 * Tab for displaying list of possible species after traits selection
 */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import SpeciesElement from "./SpeciesElement";

class SpeciesLeftTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <FlatList
                data={this.props.list}
                keyExtractor={item => item.species_id.toString()}
                renderItem={(item) =>
                    <SpeciesElement
                        key={item.item.species_id}
                        species_id={item.item.species_id}
                        latinName={item.item.latinName}
                        localName={item.item.localName}
                        obsSmall={0}
                        obsMedium={0}
                        obsLarge={0}
                        isAndroidTablet={this.props.deviceTypeAndroidTablet}
                        noObs={false}
                        onPress={() => this.props.onPress(item.item)}
                        onClickImage={(images) => this.props.onClickImage(images)}
                    />
                }
            />
        );
    }
}

export default SpeciesLeftTab;