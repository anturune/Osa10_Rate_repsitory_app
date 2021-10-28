import React from 'react';
import { View, StyleSheet } from 'react-native';
//import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        //paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: "space-around",
        flexWrap: "wrap"
    },

    text: {
        fontSize: 30,
        color: 'white'
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    }

});

const AppBar = () => {
    return (
        <View style={styles.container}>
            
        </View>
    );

};

export default AppBar;