import React from 'react';
import { Pressable, StyleSheet, Alert, Text, View } from 'react-native';
import theme from '../theme';
//import AppBar from '.AppBar';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
//import SignIn from './SignIn';


const styles = StyleSheet.create({

    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    wrapperCustom: {
        borderRadius: 0,
        padding: 20,
        backgroundColor: '#24292e'
    },
    text: {
        fontSize: 30,
        color: 'white'
    },
    buttonColor: {
        color: theme.colors.backgroundColor
    }

});

const AppBarTab = ({ buttonName, linkTo }) => {
    console.log('LINKTO', linkTo);
    return (
        <Link to={`${linkTo}`}>
            <Text style={[
                styles.wrapperCustom,
                styles.text
            ]}>{buttonName}
            </Text>
        </Link>

    );
};


/*
//Napin toiminnallisuus
const AppBarTab = ({ buttonName, linkTo }) => {
    console.log('LINKTO', linkTo);
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'red'
                        : styles.buttonColor.color
                },
                styles.wrapperCustom
            ]}
            onPress={() => <Link to="/signIn" />}>
            <Text style={styles.text}>{buttonName}</Text>
        </Pressable>

    );
};
*/

export default AppBarTab;