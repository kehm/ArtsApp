/**
 * @file Select traits page
 */
import React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { Container, StyleProvider, Header, Title, Left, Right } from 'native-base';
import ImageView from "react-native-image-viewing";
import Icon from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';

import getTheme from '../../native-base-theme/components';
import common from '../../native-base-theme/variables/commonColor';
import androidTablet from '../../native-base-theme/variables/androidTablet';

import TraitPanel from '../../components/TraitPanel';
import TraitList from '../../components/TraitList';
import SpeciesPanel from '../../components/SpeciesPanel';
import TraitDialog from '../../components/TraitDialog';
import SubPageHeader from "../../components/SubPageHeader";

import * as KeyAction from '../../actions/KeyAction';
import * as SettingsAction from '../../actions/SettingsAction';
import * as ObservationAction from "../../actions/ObservationAction";

import styles from './styles.js';

type Props = {
  title: String,
}

type State = {
  isSpeciesPanelToggled: Boolean,
  isTraitDialogVisible: Boolean,
  selectedTrait: Object,
}

class Key extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isSpeciesPanelToggled: true,
      isTraitDialogVisible: false,
      selectedTrait: null,
      selectedSpeciesImages: [],
      openImages: false,
    };
  }

  /**
   * Get nearby observations based on current position
   */
  componentDidMount() {
    if (this.props.useLocation && this.props.latitude !== "undefined") {
      this.props.actions.updateNearbyList(this.props.selectedKey, this.props.latitude, this.props.longitude).then((payload) => {
        this.props.actions.setObservationLocation(payload.value.county, payload.value.municipality, payload.value.place);
        this.props.actions.getNearbyObservations(this.props.selectedKey.key_id);
      }).catch(() => { });
    }
  }

  setStateAnimated(callback: (state: State) => void) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(callback);
  }

  /**
   * Open image gallery
   */
  openImageGallery = (images) => {
    this.setState({
      selectedSpeciesImages: images,
      openImages: true
    })
  }

  onClickBack = () => {
    Actions.pop();
  }

  onClickClose = () => {
    Actions.pop();
  }

  toggleSpeciesPanel = () => {
    this.setStateAnimated((prevState) => ({
      ...prevState,
      isSpeciesPanelToggled: !prevState.isSpeciesPanelToggled
    }));
  }

  onSpeciesSelected = (species) => {
    Actions.Species({ nerby: 0, selectedSpecies: species });
  }

  onViewAllSpecies = () => {
    const { observationsNearby } = this.props;
    Actions.SpeciesLeft({ leftNerbyList: observationsNearby });
  }

  onValueSelected = (value) => {
    const { actions, keyId } = this.props;
    actions.selectTraitValue(keyId, value); // Update state
    this.onTraitSelected(undefined); // Hide dialog (not in state)
  }

  onValueInfo = (value) => {
    const { valueImages } = this.props;
    let images = valueImages.get(value.value_id);
    if (!images) images = [];
    Actions.ValueInfo({ valueInfo: value.valueInfo, title: value.valueText, images });
  }

  onTraitSelected = (trait) => {
    this.setStateAnimated((prevState) => ({
      ...prevState,
      isTraitDialogVisible: trait !== undefined,
      selectedTrait: trait,
    }));
  }

  onTraitReset = () => {
    const { keyId, title } = this.props;
    this.props.actions.setKey(keyId, title, true);
  }

  render() {
    const { title, traits, species, speciesImages, valueImages,
      chosenValues, totalSpecies, foundSpecies, chosenTraits, isFiltered,
      activeTraits, activeValues, observationsNearby, strings } = this.props;
    const { isSpeciesPanelToggled, isTraitDialogVisible, selectedTrait } = this.state;

    // Find selected value in selected trait (if dialog is visible)
    const selectedValue = selectedTrait ?
      selectedTrait.values.find(v => chosenValues.indexOf(v.value_id) > -1) : null;

    // Find used traits
    const unusedTraits = traits
      .filter(trait => chosenTraits.indexOf(trait.trait_id) === -1);

    // Find unused traits
    const usedTraits = traits.filter(trait => chosenTraits.indexOf(trait.trait_id) !== -1);

    return (
      <StyleProvider style={this.props.deviceTypeAndroidTablet ? getTheme(androidTablet) : getTheme(common)}>
        <Container>
          <ImageView
            images={this.state.selectedSpeciesImages}
            imageIndex={0}
            visible={this.state.openImages}
            onRequestClose={() => this.setState({ openImages: false })}
            backgroundColor='white'
          />
          <SubPageHeader title={title} onClick={this.onClickBack}
            rightIcon={<Icon name='cross' size={this.props.deviceTypeAndroidTablet ? 38 : 28} color='black' onPress={this.onClickClose} />} />
          <View style={styles.container} >
            <TraitPanel
              traits={usedTraits}
              chosenValues={chosenValues}
              onSelect={this.onTraitSelected}
              onReset={this.onTraitReset}
              valueImages={valueImages}
              header={strings.chosenTraits}
              emptyHeader={strings.chosenTraitsHeader}
              emptyDescription={strings.noTraitsSelected}
              resetTitle={strings.reset}
            />
            <TraitList
              traits={unusedTraits}
              activeTraits={activeTraits}
              activeValues={activeValues}
              onSelect={this.onTraitSelected}
            />
            <SpeciesPanel
              species={species}
              speciesImages={speciesImages}
              isCollapsed={isSpeciesPanelToggled}
              onToggleClick={this.toggleSpeciesPanel}
              onSpeciesClick={this.onSpeciesSelected}
              onViewAllClick={this.onViewAllSpecies}
              totalSpecies={totalSpecies}
              foundSpecies={foundSpecies}
              observationsNearby={observationsNearby}
              emptyDescription={strings.noSpeciesLeft}
              strings={strings}
              isFiltered={isFiltered}
            />
            <TraitDialog
              isVisible={isTraitDialogVisible}
              onCancelDialog={this.onTraitSelected}
              onValueSelected={this.onValueSelected}
              title={selectedTrait ? selectedTrait.traitText : ''}
              traitValues={selectedTrait ? selectedTrait.values : []}
              selectedValue={selectedValue}
              valueImages={valueImages}
              activeValues={activeValues}
              onInfo={this.onValueInfo}
              onOpenImages={this.openImageGallery}
            />
          </View>
        </Container>
      </StyleProvider>
    );

  }
}

function mapStateToProps({ key, settings, observations }) {
  const isUnfiltered = key.speciesLeft.length === 0 && key.chosenValues.length === 0;
  return ({
    keyId: key.chosenKey,
    useLocation: settings.useLocation,
    latitude: settings.latitude,
    longitude: settings.longitude,
    species: isUnfiltered ? key.fullSpList : key.speciesLeft,
    totalSpecies: key.fullSpList.length,
    foundSpecies: key.speciesLeft.length,
    title: key.chosenKeyTitle,
    traits: key.traitValueCombo,
    speciesImages: key.speciesImageList,
    valueImages: key.valueImages,
    chosenValues: key.chosenValues,
    chosenTraits: key.chosenTraits,
    activeTraits: isUnfiltered ? key.traitValueCombo : key.relevant,
    activeValues: key.spValues,
    strings: settings.strings,
    deviceTypeAndroidTablet: settings.deviceTypeAndroidTablet,
    isFiltered: !isUnfiltered,
    observationsNearby: observations.nearbyList
      .filter(obs => isUnfiltered ?
        key.fullSpList.find(s => obs.species_id === s.species_id) :
        key.speciesLeft.find(s => obs.species_id === s.species_id))
      .map(obs => key.fullSpList.find(s => s.species_id === obs.species_id)),
  });
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...KeyAction, ...SettingsAction, ...ObservationAction }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Key);
