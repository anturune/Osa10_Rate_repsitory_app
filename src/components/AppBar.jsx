import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
//import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';

//import { Link } from "react-router-native";
//import theme from '../theme';
import { GET_LOGGED_IN_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';



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
    //HAetaan käyttäjä
    const { data, loading } = useQuery(GET_LOGGED_IN_USER);
    //Odottaa haun ajan
    if (loading) {
        return (
            <View style={
                [
                    {
                        width: '100%',
                        height: '100%',
                        //backgroundColor: 'blue',
                        alignItems: 'center',
                        justifyContent: 'center'


                    },
                ]}>
                <Text style={[
                    {
                        fontSize: 30,
                        color: 'black',
                    }

                ]}>Loading...</Text>
            </View>);
    }
    console.log('LOGGED IN USER FROM APPBAR TAB', data.authorizedUser, 'dataLoading', loading);

    //Jos käyttäjä loggautunut
    if (data.authorizedUser) {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <SignOutTab />
                    <AppBarTab buttonName="Create a review" linkTo="/reviewRepo" />
                    <AppBarTab buttonName="Repositories" linkTo="/" />
                </ScrollView>
            </View>
        );
    }
    //Jos käyttäjä ei loggautunut
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

//<SignOutTab buttonName="SignOut" linkTo="/signOut" />