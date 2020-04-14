/**
 * Render header with basic back button and title
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Title, Button, Icon, Left, Body, Right, Subtitle } from 'native-base';
import styles from './styles.js';

type Props = {
    title: String,
    subtitle: String,
    onClick: Function,
}
class SubPageHeader extends React.Component<Props> {

    render() {
        const { title, subtitle, onClick } = this.props;
        return (
            <Header style={styles.headerContainer}>
                <Left style={styles.left}>
                    <Button transparent onPress={onClick}>
                        <Icon style={styles.icon} name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>{title}</Title>
                    {subtitle !== undefined ? (
                        <Subtitle>{subtitle}</Subtitle>
                    ) : (
                            <View />
                        )}
                </Body>
                <Right />
            </Header>
        );
    }
}

export default SubPageHeader;
