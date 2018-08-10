import React from 'react';

import localStyles  from './styles.js';
import ImageButton from '../ImageButton';
import { mapToImageSource } from '../../utilities/image';

type Props = {
  imagePath: String,
  onPress: Function,
};

class SpeciesImageButton extends React.Component<Props> {
  render() {
    const { imagePath, onPress } = this.props;
    const source = mapToImageSource(imagePath);

    return (
      <ImageButton source={source} onPress={onPress} />
    );
  }
}

export default SpeciesImageButton;
