/**
 * Render header with basic back button and title
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Left, Body, Right, Subtitle } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from "react-redux";
import { styles, androidTabletStyles } from './styles.js';

const mapStateToProps = state => ({
    ...state.settings,
    ...state.nav
});

type Props = {
    title: String,
    subtitle: String,
    onClick: Function,
    rightIcon: Icon,
}
class SubPageHeader extends React.Component<Props> {

    render() {
        const { title, subtitle, onClick, rightIcon } = this.props;
        return (
            <Header style={styles.headerContainer}>
                <Left style={styles.left}>
                    <TouchableOpacity onPress={onClick}>
                        <Icon style={styles.icon} name="arrowleft" size={this.props.deviceTypeAndroidTablet ? 38 : 28} />
                    </TouchableOpacity>
                </Left>
                <Body style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.body : styles.body}>
                    <Title style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.title : styles.title}>{title}</Title>
                    {subtitle !== undefined ? (
                        <Subtitle style={this.props.deviceTypeAndroidTablet ? androidTabletStyles.subTitle : undefined} >{subtitle}</Subtitle>
                    ) : (
                            <View />
                        )}
                </Body>
                <Right style={styles.rightCol}>
                    {rightIcon}
                </Right>
            </Header>
        );
    }
}

export default connect(mapStateToProps)(SubPageHeader);
