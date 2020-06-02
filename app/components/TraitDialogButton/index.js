import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ImageButton from '../ImageButton';

import { mapToImageSource } from '../../utilities/image';

import { styles, androidTabletStyles } from './styles.js';
import { Button } from 'native-base';
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.nav
});

type Props = {
  value: Object,
  imagePath: String,
  selected: Boolean,
  isActive: Boolean,
  onPress: Function,
  onInfo: Function,
  onOpenImages: Function,
}

class TraitDialogButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSpeciesImages: []
    };
  }

  componentDidMount() {
    let imageList = this.props.imagePaths;
    if (imageList !== undefined) {
      this.setState({
        selectedSpeciesImages: imageList.map(image => {
          if (this.props.platform === "ios") {
            return { uri: image };
          } else {
            return { uri: "file://" + image };
          }
        })
      });
    }
  }

  /**
 * Open image gallery on image click
 */
  onClickImage = () => {
    if (this.state.selectedSpeciesImages.length !== 0) {
      this.props.onOpenImages(this.state.selectedSpeciesImages);
    }
  };

  onInfoPress = () => {
    const { value, onInfo } = this.props;
    onInfo && onInfo(value);
  }

  onClick = () => {
    const { value, isActive, selected, onPress } = this.props;
    (isActive || selected) && onPress && onPress(value);
  }

  render() {
    const { value, selected, imagePath, isActive } = this.props;
    const source = mapToImageSource(imagePath);
    const containerStyle = [styles.container];
    if (selected) containerStyle.push(styles.selected);
    if (!isActive) containerStyle.push(styles.inactive);
    const imageContainerStyle = [this.props.deviceTypeAndroidTablet ? androidTabletStyles.imageContainer : styles.imageContainer];
    if (selected) imageContainerStyle.push(styles.selectedImage);
    if (!isActive) imageContainerStyle.push(styles.inactiveImage);
    return (
      <View style={containerStyle} >
        <TouchableOpacity onPress={() => this.onClickImage()} style={imageContainerStyle}>
          {source && source.uri ? (
            <Image source={source} style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.image : styles.image} />
          ) : (
              <View />
            )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleIconContainer} onPress={this.onClick}>
          <Text style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.title : styles.title}>{value.valueText}</Text>
          <TouchableOpacity onPress={this.onInfoPress}>
            <Icon style={styles.icon} name='info-outline' size={this.props.deviceTypeAndroidTablet ? 38 : 30} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }

}

export default connect(mapStateToProps)(TraitDialogButton);
