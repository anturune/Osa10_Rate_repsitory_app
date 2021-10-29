import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

//Kuvaa varten styleä
const mainPageStyles = StyleSheet.create({
    container: {
        //alignItems: 'stretch',
        backgroundColor: 'white',

    },

});


//Muunnetaan "kiloiksi" yli 1000 arvot
const YksikonMuunnos = ({ value }) => {
    let kiloValue = 0;
    if (value >= 1000) {
        kiloValue = value / 1000;
        return (<Text fontWeight="bold" fontSize="primary">{kiloValue.toFixed(1)}k</Text>);
    }
    return <Text fontWeight="bold" fontSize="primary">{value}</Text>;
};

//Headerin tyylit
const repositoryHeaderStyles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
        flexGrow: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    avatarrContainer: {
        flexGrow: 0,
        paddingRight: 15,
        marginLeft: 20
    },
    infoContainer: {
        flexGrow: 1,
        //Wrappaa tekstin, jos menee näytön ulkopuolelle
        flexShrink: 1
    },
    languageTagContainer: {
        flexGrow: 1,
        paddingTop: 10
    },
    languageTag: {
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#0366d6',
        //Saadaan tekstin ympärillä olevan boxin koko
        //sovitettua tekstin määrän mukaiseksi
        alignSelf: "flex-start",
        width: "auto",
    },
    whiteTextForLanguageTag: {
        fontSize: 16,
        color: 'white'
    },
});

//Headerin renderöintiin komponentti
const RepositoryHeader = ({ item }) => {
    return (
        <View style={repositoryHeaderStyles.container}>
            <View style={repositoryHeaderStyles.avatarrContainer}>
                <Image
                    style={repositoryHeaderStyles.avatar}
                    source={{ uri: `${item.ownerAvatarUrl}` }}>
                </Image>
            </View>
            <View style={repositoryHeaderStyles.infoContainer}>
                <Text fontWeight="bold" fontSize="subheading"> {item.fullName}</Text>
                <Text >{item.description}</Text>
                <View style={repositoryHeaderStyles.languageTagContainer}>
                    <Text style={[
                        repositoryHeaderStyles.languageTag,
                        repositoryHeaderStyles.whiteTextForLanguageTag]}> {item.language}</Text>
                </View>
            </View>

        </View>
    );
};

//Statistiikan tyylit
const repositoryBodyStyles = StyleSheet.create({
    container: {
        paddingTop: 10,
        //Latoo kaikki itemit rinnakkain
        flexDirection: 'row',
        flexGrow: 1,
        //marginLeft: 20,
    },
    statisticsContainer: {
        //Latoo kaikki itemit päällekäin
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',

    },
    infoContainer: {
        flexGrow: 1,
    },
});

//Statistiikan renderöintiin komponentti
const RepositoryBody = ({ item }) => {
    return (
        <View style={repositoryBodyStyles.container}>
            <View style={repositoryBodyStyles.statisticsContainer} >
                <YksikonMuunnos value={item.stargazersCount}>  </YksikonMuunnos>
                <Text color='textSecondary' fontSize="body">Stars</Text>
            </View>
            <View style={repositoryBodyStyles.statisticsContainer} >
                <YksikonMuunnos value={item.forksCount}>  </YksikonMuunnos>
                <Text color='textSecondary' fontSize="body">Forks</Text>
            </View>
            <View style={repositoryBodyStyles.statisticsContainer} >
                <YksikonMuunnos value={item.reviewCount}>  </YksikonMuunnos>
                <Text color='textSecondary' fontSize="body">Reviewers</Text>
            </View>
            <View style={repositoryBodyStyles.statisticsContainer} >
                <YksikonMuunnos value={item.ratingAverage}>  </YksikonMuunnos>
                <Text color='textSecondary' fontSize="body">Rating</Text>
            </View>
        </View>
    );
};


const RenderItem = ({ item }) => (
    //console.log('ITEM', item.fullName);
    <View >
        <RepositoryHeader item={item}></RepositoryHeader>
        <RepositoryBody item={item}></RepositoryBody>
    </View >
);

export default RenderItem;