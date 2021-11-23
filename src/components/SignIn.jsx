import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";


//Statistiikan tyylit
const signInStyles = StyleSheet.create({
    container: {
        //Latoo kaikki itemit päällekäin
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',

    },
    infoContainer: {
        flexGrow: 1,
    },
    signInTab: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#0366d6',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderColor: 'black'
    },
    loginTab: {
        borderRadius: 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    loginText: {
        fontSize: 30,
        color: 'black',
        textAlign: 'left'
    }

});
const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={signInStyles.container}>
            <FormikTextInput name="username" placeholder="Username" style={[signInStyles.loginText, signInStyles.loginTab]} />
            <FormikTextInput name="password" placeholder="Password" style={[signInStyles.loginText, signInStyles.loginTab]} />
            <Pressable onPress={onSubmit}>
                <Text style={
                    [signInStyles.signInTab,
                    signInStyles.text
                    ]}>Sign in</Text>
            </Pressable>
        </View>
    );
};



const SignIn = () => {
    let history = useHistory();
    //const onSubmit = (values) => {
    //console.log('KUTSUUKO onSubmitia');

    const [signIn] = useSignIn();

    //console.log('KUTSUUKO onSubmitia');

    const onSubmit = async (values) => {

        //console.log('KUTSUUKO onSubmitia', values);
        const { username, password } = values;
        //console.log('SIGNIN COMPONENT', username, 'JA', password);
        try {
            //console.log('tuleeko tryihin DATAAA');
            const { data } = await signIn({ username, password });
            console.log('DATAAA', data.authorize.accessToken);
            history.push("/");

        } catch (e) {
            console.log('DATAAA Errorista');
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};
export default SignIn;