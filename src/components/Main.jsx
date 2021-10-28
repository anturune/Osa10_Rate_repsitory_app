//import React, { useState } from 'react';
import React from 'react';
//import Constants from 'expo-constants';
//import { View, LogBox } from 'react-native';
import { View } from 'react-native';
//import { Pressable, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
//import theme from '../theme';
//import AppBar from './AppBar';
import AppBarTab from './AppBarTab';
//import AppBar from './AppBar';

//Tällä saadaan pois herja "Remote debugger is in a background tab which may cause jne..."
//Herjaa näkyy myös command promptissa
//Vaatii "import { View, LogBox } from 'react-native';"
//LogBox.ignoreLogs(['Remote debugger']);



const Main = () => {
    return (
        <View>
            <AppBarTab></AppBarTab>
            <RepositoryList></RepositoryList>
        </View>

    );
};
/*
    return (
        <View >

            
            <Pressable 
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'red' : 'black'
                    },

                    styles.wrapperCustom
                ]}
                onPress={() => Alert.alert('Button Pressed!')}>
                <Text style={styles.text}>Repositories</Text>
            </Pressable>

            <View>
                <RepositoryList></RepositoryList>
            </View>
        </View>
    );
};
*/
export default Main;