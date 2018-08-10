import React from 'react';

import localStyles  from './styles.js';
import IconButton from '../IconButton';
import { mapToImageSource } from '../../utilities/image';

type Props = {
  imagePath: String,
  onPress: Function,
};

class SpeciesIconButton extends React.Component<Props> {
  render() {
    const { imagePath, onPress } = this.props;
    const source = mapToImageSource(imagePath);

    return (
      <IconButton source={source} onPress={onPress} />
    );
  }
}

export default SpeciesIconButton;
