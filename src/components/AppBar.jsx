import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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



});
//HUOM! "ScrollView" -component
const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <AppBarTab buttonName="SignIn" linkTo="/signIn" />
                <AppBarTab buttonName="Repositories" linkTo="/" />
            </ScrollView>
        </View>
    );

};

export default AppBar;