import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RenderItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: 'lightgrey',
    },
    wrapperCustom: {
        borderRadius: 0,
        //padding: 20,
        backgroundColor: 'lightgrey'
    },
    text: {
        fontSize: 25,
        color: 'white',
        paddingTop: 40,
        paddingRight: 20,
        paddingBottom: 20,
        textAlign:'center'
    }

});
/*
const repositories = [
    {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    },
    {
        id: 'rails.rails',
        fullName: 'rails/rails',
        description: 'Ruby on Rails',
        language: 'Ruby',
        forksCount: 18349,
        stargazersCount: 45377,
        ratingAverage: 100,
        reviewCount: 2,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
    },
    {
        id: 'django.django',
        fullName: 'django/django',
        description: 'The Web framework for perfectionists with deadlines.',
        language: 'Python',
        forksCount: 21015,
        stargazersCount: 48496,
        ratingAverage: 73,
        reviewCount: 5,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
    },
    {
        id: 'reduxjs.redux',
        fullName: 'reduxjs/redux',
        description: 'Predictable state container for JavaScript apps',
        language: 'TypeScript',
        forksCount: 13902,
        stargazersCount: 52869,
        ratingAverage: 0,
        reviewCount: 0,
        ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
    },
];
*/



const OredrRepositories = ({ repository }) => {
    // Repository's information implemented in the previous exercise
    console.log('OredrRepositories', repository);
    return <View style={styles.wrapperCustom}><Text style={styles.text}>Jothain</Text></View>;
};


export const RepositoryListContainer = ({ repositories }) => {
    //console.log('TULEEKO REPOSITORYLISTCONTAINERIIN');
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (

        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={RenderItem}
            ListHeaderComponent={() => <OredrRepositories repository='moro' />}
            keyExtractor={(item, index) => index.toString()}
        />

    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories } = useRepositories();
    // Get the nodes from the edges array
    return <RepositoryListContainer repositories={repositories} />;
};


export default RepositoryList;
