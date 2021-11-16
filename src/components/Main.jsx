//import React, { useState } from 'react';
import React from 'react';
//import Constants from 'expo-constants';
//import { View, LogBox } from 'react-native';
import { View, StyleSheet } from 'react-native';
//import { Pressable, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
//import theme from '../theme';
//import AppBar from './AppBar';
//import AppBarTab from './AppBarTab';
import AppBar from './AppBar';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './SignIn';
import SignOutTab from './SignOutTab';
import SingleRepository from './SingleRepositoryView';
import ReviewRepo from './ReviewRepositoryForm';



//Tällä saadaan pois herja "Remote debugger is in a background tab which may cause jne..."
//Herjaa näkyy myös command promptissa
//Vaatii "import { View, LogBox } from 'react-native';"
//LogBox.ignoreLogs(['Remote debugger']);

const styles = StyleSheet.create({
    container: {
        //backgroundColor: theme.colors.mainBackground,
        backgroundColor: 'white',
        flexGrow: 1,
        flexShrink: 1,
        //alignItems: 'stretch',
        flexDirection: 'column',

    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/signIn">
                    <SignIn />
                </Route>
                <Route path="/signOut">
                    <SignOutTab />
                </Route>
                <Route path="/singleRepsoitory/:id">
                    <SingleRepository />
                </Route>
                <Route path="/reviewRepo">
                    <ReviewRepo />
                </Route>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>

    );
};

export default Main;