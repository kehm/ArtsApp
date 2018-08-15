import React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { Container, StyleProvider, Header, Footer, Subtitle, FooterTab, Thumbnail, Title, Content, Button, Icon, ListItem, Left, Body, Right} from 'native-base';

import {connect} from 'react-redux';

// theme
import getTheme from '../../native-base-theme/components';
import common from '../../native-base-theme/variables/commonColor';
import androidTablet from '../../native-base-theme/variables/androidTablet';

import styles  from './styles.js';

import FrontpageHeader from '../../components/FrontpageHeader';

type Props = {
  title: String,
  deviceTypeAndroidTablet: Boolean,
  strings: Object,
}

type State = {
}

class Frontpage2 extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { strings } = this.props;
    return (
      <StyleProvider style={this.props.deviceTypeAndroidTablet ? getTheme(androidTablet) : getTheme(common)}>
        <Container>
          <FrontpageHeader
            title={strings.frontpageTitle}
            onInfo={this.onInfo}
          />
          <View style={styles.container} >
          </View>
        </Container>
      </StyleProvider>
    );
  }
}

function mapStateToProps({ key, settings }) {
  const {  deviceTypeAndroidTablet, strings } = settings;
  return {
    deviceTypeAndroidTablet,
    strings,
  };
};

function mapDispatchToProps(dispatch) {
  return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage2);

