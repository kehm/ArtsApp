import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#f0a00c'
    },
    title: {
        color: '#000'
    },
    icon: {
        color: '#000'
    },
    left: {
        maxWidth: 50
    },
    rightCol: {
        marginRight: 5
    },
    body: {
        minWidth: 40
    }
});

export const androidTabletStyles = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 26
    },
    body: {
        minWidth: 40,
        marginLeft: 20
    },
    subTitle: {
        fontSize: 20
    }
});
