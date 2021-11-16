import React from 'react';
import { Pressable, StyleSheet, Text, } from 'react-native';
import theme from '../theme';
//import AppBar from '.AppBar';
import Constants from 'expo-constants';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useHistory } from "react-router-native";
import { GET_LOGGED_IN_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import useSignOut from '../hooks/useSignOut';



const styles = StyleSheet.create({

    wrapperCustom: {
        borderRadius: 0,
        //padding: 20,
        backgroundColor: '#24292e'
    },
    text: {
        fontSize: 25,
        color: 'white',
        paddingTop:40,
        paddingRight:20,
        paddingBottom:20
    }

});

const SignOutTab = () => {

    let history = useHistory();
    const [signOut] = useSignOut();

    const onSubmit = async () => {
        console.log('YRITTÄÄKÖ TÄNNE');

        try {
            const { data } = await signOut();

            console.log('SignOutTab', data);
            //Palataan signOutin jälkeen sigIn sivulle
            history.push("/signIn");

        } catch (e) {
            console.log('DATAAA Errorista');
            console.log(e);
        }
    };


    return (
        <Pressable
            style={styles.wrapperCustom}
            onPress={() => onSubmit()}>
            <Text style={styles.text}>SignOut</Text>
        </Pressable>

    );
};

export default SignOutTab;