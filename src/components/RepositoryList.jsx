//import * as React from 'react';
import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RenderItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: 'lightgrey'
    },
    wrapperCustom: {
        borderRadius: 0,
        //padding: 20,
        backgroundColor: 'lightgrey'
    },
    text: {
        fontSize: 25,
        color: 'black',
        paddingTop: 40,
        paddingRight: 20,
        paddingBottom: 20,
        textAlign: 'center'
    }

});



//"Menu" -komponentin asennus "npm install react-native-paper"
const OredrRepositories = ({ setFilterCriteria }) => {

    //console.log('OredrRepositories', setFilterCriteria);

    //HUOM! Muutetaan Json muotoon value sekä parseroidaan vielä "onValueChange":ssa
    return (
        <View style={{ backgroundColor: 'lavender', padding: 20 }}>
            <Picker
                selectedValue={setFilterCriteria}
                onValueChange={(itemValue, itemIndex) =>
                    setFilterCriteria(JSON.parse(itemValue))
                }>

                <Picker.Item label="Select an item..."
                    title="Item 2"
                    style={{ color: 'grey' }} />

                <Picker.Item label="Latest repos" value={JSON.stringify({
                    orderDirection: "DESC",
                    orderBy: "CREATED_AT"
                })} title="Item 1" />

                <Picker.Item label="Highest rated" value={JSON.stringify({
                    orderDirection: "DESC",
                    orderBy: "RATING_AVERAGE"
                })} title="Item 1" />

                <Picker.Item label="Lowest rated"
                    value={JSON.stringify({
                        orderDirection: "ASC",
                        orderBy: "RATING_AVERAGE"
                    })}
                    title="Item 3" />
            </Picker>
        </View>);

    /*
    // Repository's information implemented in the previous exercise
    console.log('OredrRepositories', repository);
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <Provider>
            <View
                style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    zIndex: 99,
                    backgroundColor: 'grey'

                }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}>
                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
            </View>
        </Provider>
    );
    */
};


export const RepositoryListContainer = ({ repositories, setFilterCriteria }) => {
    //console.log('TULEEKO REPOSITORYLISTCONTAINERIIN', setFilterCriteria);
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (

        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={RenderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => <OredrRepositories setFilterCriteria={setFilterCriteria} />}
        />

    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {


    const { repositories, loading, setFilterCriteria } = useRepositories();

    if (loading) {
        console.log('TULEEKO LOADINGIIN',loading);
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
    
    console.log('REPOLIST', loading);

    // Get the nodes from the edges array
    //Viedään "setFilterCriteria" ns. functiona eteenpäin, ensin propseina
    //"RepositoryListContainer":lle ja sitten vielä "OredrRepositories":lle, jossa
    //varsinainen state muutokset annetaan ja hook:ssa muutetaan
    return <RepositoryListContainer
        setFilterCriteria={setFilterCriteria}
        repositories={repositories}
        contentStyle={{ zIndex: 0 }} />;
};


export default RepositoryList;
