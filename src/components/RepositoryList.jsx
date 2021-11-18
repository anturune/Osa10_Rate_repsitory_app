//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RenderItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
//import { GET_REPOSITORIES } from '../graphql/queries';
//import { useQuery } from '@apollo/client';
import { useDebounce } from 'use-debounce';


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
//En saanut toimimaan "Menu":a...asensin "Pickerin"
//"npm install @react-native-picker/picker --save"
const OredrRepositories = ({ setFilterCriteria }) => {

    //console.log('OredrRepositories', setFilterCriteria);

    //HUOM! Muutetaan Json muotoon value sekä parseroidaan vielä "onValueChange":ssa
    return (
        <View style={{ backgroundColor: 'white', padding: 20, borderWidth: 2, borderColor: 'black', borderRadius: 5, margin:20 }}>
            <Picker
                selectedValue={setFilterCriteria}
                onValueChange={(itemValue, itemIndex) =>
                    setFilterCriteria(JSON.parse(itemValue))
                }>
                <Picker.Item label="Order repos..."
                    value={JSON.stringify({
                        orderDirection: "DESC",
                        orderBy: "CREATED_AT"
                    })}
                    title="Item 1"
                    style={{ color: 'grey' }} />

                <Picker.Item label="Latest repos" value={JSON.stringify({
                    orderDirection: "DESC",
                    orderBy: "CREATED_AT"
                })} title="Item 2" />

                <Picker.Item label="Highest rated" value={JSON.stringify({
                    orderDirection: "DESC",
                    orderBy: "RATING_AVERAGE"
                })} title="Item 3" />

                <Picker.Item label="Lowest rated"
                    value={JSON.stringify({
                        orderDirection: "ASC",
                        orderBy: "RATING_AVERAGE"
                    })}
                    title="Item 4" />
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

//En saanut tällä toimimaan
//antaa erroria "is not a function"
const FilteringFieldUsingUseEffectHook = ({ setFilterCriteria }) => {

    //"npm i use-debounce --save" https://www.npmjs.com/package/use-debounce
    //"npm install react-native-paper", jotta saadaa SearchBar toimimaan
    //console.log('FILTERINGFIELD', setFilterCriteria);
    //Filteröintikentän ylläpito state
    const [searchQuery, setSearchQuery] = useState('');
    //Statea muutetaan vasta kun kirjoittamisen lopettamisesta kulunut 500ms
    //"filterCriteria" syötetään sitten graphQl hakuun
    const [filterCriteria] = useDebounce(searchQuery, 500);
    //setFilterCriteria(filterCriteria);
    const onChangeSearch = query => setSearchQuery(query);


    useEffect(() => {
        let filterCriteriaJson = JSON.stringify({
            searchKeyword: filterCriteria
        });
        let parseJson = JSON.parse(filterCriteriaJson);
        console.log('Tuleeko setfiltercriteriaan', filterCriteriaJson, parseJson);
        //setFilterCriteria(parseJson);
    }, [filterCriteria]);

    return (
        <View style={{ padding: 20 }}>
            <Searchbar
                placeholder="Filter by useEffect.."
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        </View>
    );
};

//Filteröintikentän komponentti, vaatii suurennuslasin painalluksen
const FilteringField = ({ setFilterCriteria }) => {

    //"npm i use-debounce --save" https://www.npmjs.com/package/use-debounce
    //"npm install react-native-paper", jotta saadaa SearchBar toimimaan
    //console.log('FILTERINGFIELD', setFilterCriteria);
    //Filteröintikentän ylläpito state
    const [searchQuery, setSearchQuery] = useState('');
    //Statea muutetaan vasta kun kirjoittamisen lopettamisesta kulunut 500ms
    //"filterCriteria" syötetään sitten graphQl hakuun
    const [filterCriteria] = useDebounce(searchQuery, 500);
    //setFilterCriteria(filterCriteria);

    const onChangeSearch = query => setSearchQuery(query);
    //Kun suurennuslasi-ikonia painetaan, niin ajetaan haku
    //Muutetaan JSON muotoon hakukriteeri, jotta saadaan oikeanmuotoinen
    //data "useRepositories" -hook toimii
    const setFilterCriteriaForGraphQl = () => {
        const filterCriteriaJson = JSON.stringify({
            searchKeyword: filterCriteria
        });

        console.log('Tuleeko setfiltercriteriaan', filterCriteriaJson);
        setFilterCriteria(JSON.parse(filterCriteriaJson));
    };
    //console.log('Filter criteria', filterCriteria);

    return (
        <View style={{ padding: 20 }}>
            <Searchbar
                placeholder="Type and push ocular icon"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={setFilterCriteriaForGraphQl}
            />
        </View>
    );
};
//Turning the component rendering the FlatList component into 
//a class component and defining the header's render function as a class property like this:
//Muuten ei saa järkevästi useampaa "Header" -componenttia (FlatList:n props ListHeaderComponent)
export class RepositoryListContainer extends React.Component {
    //console.log('TULEEKO REPOSITORYLISTCONTAINERIIN', setFilterCriteria);
    renderHeader = () => {
        // this.props contains the component's props
        const props = this.props;
        //otetaan propseista "setFilterCriteria" talteen
        const { setFilterCriteria } = props;
        return (
            <View style={{ backgroundColor: 'darkgrey' }}>
                <FilteringField setFilterCriteria={setFilterCriteria} />
                <OredrRepositories setFilterCriteria={setFilterCriteria} />
                <FilteringFieldUsingUseEffectHook setFilterCriteria={setFilterCriteria} />
            </View>
        );
    };

    render() {
        //map metodi siirrettävä tänne, jotta saadaan toimimaan
        //Otetaan propseista "repositories" talteen
        const { repositories } = this.props;
        const repositoryNodes = repositories
            ? repositories.edges.map((edge) => edge.node)
            : [];
        return (
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={RenderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={this.renderHeader}

            />

        );
    }
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading, setFilterCriteria } = useRepositories();

    if (loading) {
        console.log('TULEEKO LOADINGIIN', loading);
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

    console.log('REPOLIST', setFilterCriteria);

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
