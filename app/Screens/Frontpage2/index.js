import React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { Container, StyleProvider } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// theme
import getTheme from '../../native-base-theme/components';
import common from '../../native-base-theme/variables/commonColor';
import androidTablet from '../../native-base-theme/variables/androidTablet';

import styles  from './styles.js';

import * as KeyAction from '../../actions/KeyAction';
import * as MenuAction from '../../actions/MenuAction';
import * as ObservationAction from '../../actions/ObservationAction';
import * as SettingsAction from '../../actions/SettingsAction';

import FrontpageHeader from '../../components/FrontpageHeader';
import Explanation from '../../components/Explanation';
import KeyPanel from '../../components/KeyPanel';

import { sortKeys } from '../../utilities/keys';

type Props = {
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

  componentDidMount() {
    this.props.loadAllKeys();
  }

  handleOnPressKey = (key) => {
    this.props.setKey(key.key_id, key.title);
    if (key.keyDownloaded) {
      Actions.Key();
    }
    else {
      Actions.Info({showDownload: true});
    }
  }

  render() {
    const { keys, strings } = this.props;
    return (
      <StyleProvider style={this.props.deviceTypeAndroidTablet ? getTheme(androidTablet) : getTheme(common)}>
        <Container>
          <FrontpageHeader
              title={strings.frontpageTitle}
              onInfo={this.onInfo}
          />
          <View style={styles.container} >
            <Explanation
              title={strings.frontpageTopTitle}
              description={strings.frontpageTopDescription}
            />
            <KeyPanel keys={keys} strings={strings} onPress={this.handleOnPressKey} />
            <Explanation
              title={strings.frontpageBottomTitle}
              description={strings.frontpageBottomDescription}
            />
          </View>
        </Container>
      </StyleProvider>
    );
  }
}

function mapStateToProps({ key, settings }) {
  const { deviceTypeAndroidTablet, strings } = settings;
  return {
    keys: sortKeys(key.keys),
    deviceTypeAndroidTablet,
    strings,
  };
};

function mapDispatchToProps(dispatch) {
  const { setAllKeys, setKey } = bindActionCreators({ ...KeyAction, ...MenuAction, ...ObservationAction, ...SettingsAction }, dispatch);

  return {
    loadAllKeys: setAllKeys,
    setKey,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage2);

