import React from 'react';
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

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
        .number()
        .required('Username is required'),
    password: yup
        .number()
        .required('Password is required'),
});
/*
const getBodyMassIndex = (mass, height) => {
    return Math.round(mass / Math.pow(height, 2));
};
*/
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
    const onSubmit = (values) => {
        console.log('KUTSUUKO onSubmitia', values);
    };
    /*
  const onSubmit = values => {
      const username = parseFloat(values.username);
      const password = parseFloat(values.password);

      if (!isNaN(username) && !isNaN(password) && password !== 0) {
          console.log(`Your body mass index is: ${getBodyMassIndex(username, password)}`);
      }
  };
*/
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