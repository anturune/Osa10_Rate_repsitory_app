import React from 'react';
import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { Link } from "react-router-native";
import theme from '../theme';


const styles = StyleSheet.create({
    container: {
        //paddingTop: Constants.statusBarHeight,
        flex: 0,
        //flexWrap: "wrap",
        flexDirection: 'row',
        //flexGrow: 1,
        //flexShrink: 1,
    },

    text: {
        fontSize: 30,
        color: 'white'
    },
    wrapperCustom: {
        borderRadius: 0,
        padding: 6,
        backgroundColor: 'black'
    },
    buttonColor: {
        color: theme.colors.backgroundColor
    }

});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab buttonName="SignIn" linkTo="/signIn" />
            <AppBarTab buttonName="Repositories" linkTo="/" />
        </View>
    );

};

export default AppBar;