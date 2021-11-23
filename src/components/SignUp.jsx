import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import { CREATE_NEW_USER_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useSignIn from '../hooks/useSignIn';


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
    passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1)
        .max(30)
        .required('Username is required'),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .min(5)
        .max(50)
        .oneOf([yup.ref('password'), null])
        .required('Password confirmation required'),
});

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={signInStyles.container}>
            <FormikTextInput name="username" placeholder="Username" style={[signInStyles.loginText, signInStyles.loginTab]} />
            <FormikTextInput name="password" placeholder="Password" style={[signInStyles.loginText, signInStyles.loginTab]} />
            <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" style={[signInStyles.loginText, signInStyles.loginTab]} />
            <Pressable onPress={onSubmit}>
                <Text style={
                    [signInStyles.signInTab,
                    signInStyles.text
                    ]}>Sign Up</Text>
            </Pressable>
        </View>
    );
};



const SignUp = () => {
    //console.log('KUTSUUKO onSubmitia SignUp');

    const [createNewUser] = useMutation(CREATE_NEW_USER_MUTATION);
    let history = useHistory();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        //ks. kenttiin täytettävät tiedot "__tests__/components/RepositoryList.js"
        const { username, password } = values;
        try {
            //variaabeleihin "username" ja "password" ja kentät nimettävä samalla tavalla kuin "graphql":ssä
            const { data, loading } = await createNewUser({ variables: { user: { username, password } } });
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
            console.log('SignUp.jsx data', data);
            //Loggaudutaan sisään, kun uusi käyttäjä luotu
            const { error } = await signIn({ username, password });

            console.log('Error', error);
            //Kun uusi käyttäjä luotu, ohjataa repsoitory listaan
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
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};
export default SignUp;