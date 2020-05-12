/**
 * Render header with basic back button and title
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Icon, Left, Body, Right, Subtitle } from 'native-base';
import styles from './styles.js';

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
                        <Icon style={styles.icon} name="arrow-back" />
                    </TouchableOpacity>
                </Left>
                <Body style={styles.body}>
                    <Title style={styles.title}>{title}</Title>
                    {subtitle !== undefined ? (
                        <Subtitle>{subtitle}</Subtitle>
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

export default SubPageHeader;
