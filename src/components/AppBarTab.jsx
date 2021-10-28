import React from 'react';
import { Pressable, StyleSheet, Alert, Text, View } from 'react-native';
import theme from '../theme';
//import AppBar from '.AppBar';
import Constants from 'expo-constants';



const styles = StyleSheet.create({

    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 20,
    },
    text: {
        fontSize: 30,
        color: 'white'
    },
    buttonColor: {
        color: theme.colors.backgroundColor
    }

});

//Napin toiminnallisuus
const AppBarTab = () => {
    return (
        <View styel={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'red'
                            : styles.buttonColor.color
                    },

                    styles.wrapperCustom
                ]}
                onPress={() => Alert.alert('Button Pressed!')}>
                <Text style={styles.text}>Repoja</Text>
            </Pressable>
        </View>
    );
};

export default AppBarTab;