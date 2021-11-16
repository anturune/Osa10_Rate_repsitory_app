import React from 'react';
import { Pressable, StyleSheet, Text, } from 'react-native';
import { useHistory } from "react-router-native";
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
        //console.log('YRITTÄÄKÖ TÄNNE');

        try {
            const { data } = await signOut();

            //console.log('SignOutTab', data);
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