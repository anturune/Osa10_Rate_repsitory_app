import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loginTab: {
        borderRadius: 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        //Punainen väri
        borderColor: '#d73a4a',
        borderWidth: 1,
    },
    loginText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'left'
    }
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [style];
    //console.log('Error message TextInput');
    //Jos virheellinen sisältö login fieldeille, renderöidään puniset reunat
    if (error) {
        return <NativeTextInput style={[styles.loginText, styles.loginTab]} {...props} />;
    }
    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;