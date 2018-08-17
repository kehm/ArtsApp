import React from 'react';

import localStyles  from './styles.js';
import ImageButton from '../ImageButton';
import { mapToImageSource } from '../../utilities/image';

type Props = {
  imagePath: String,
  borderColor: String,
  onPress: Function,
};

class SpeciesImageButton extends React.Component<Props> {
  render() {
    const { imagePath, borderColor, onPress } = this.props;
    const source = mapToImageSource(imagePath);

    return (
      <ImageButton
        source={source}
        borderColor={borderColor}
        onPress={onPress}
      />
    );
  }
}

export default SpeciesImageButton;
