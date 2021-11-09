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

/*
//Muunnetaan "kiloiksi" yli 1000 arvot
const YksikonMuunnos = ({ value }) => {
    //console.log('yksikönmuunnos',value);
    let kiloValue = 0;
    if (value >= 1000) {
        kiloValue = value / 1000;
        return (<Text testId="ratingAverageTest" fontWeight="bold" fontSize="primary">{kiloValue.toFixed(1)}k</Text>);
    }
    return <Text testId="ratingAverageTokaTest" fontWeight="bold" fontSize="primary">{value}</Text>;
};
*/

//Muunnetaan "kiloiksi" yli 1000 arvot
const yksikonMuunnos = (value) => {
    //console.log('yksikönmuunnos', value);
    let kiloValue = 0;
    if (value >= 1000) {
        kiloValue = value / 1000;
        //console.log('KILOVAlue', kiloValue);
        return kiloValue.toFixed(1) + 'k';
    }
    return value;
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
    //console.log('REPOSITORY HEADER', item);
    return (
        <View style={repositoryHeaderStyles.container}>
            <View style={repositoryHeaderStyles.avatarrContainer}>
                <Image
                    style={repositoryHeaderStyles.avatar}
                    source={{ uri: `${item.ownerAvatarUrl}` }}>
                </Image>
            </View>
            <View style={repositoryHeaderStyles.infoContainer}>
                <Text testID="fullNameTest" fontWeight="bold" fontSize="subheading"> {item.fullName}</Text>
                <Text testID="descriptionTest">{item.description}</Text>
                <View style={repositoryHeaderStyles.languageTagContainer}>
                    <Text testID="languageTagTest" style={[
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
    //console.log('ITEM', item);
    return (
        <View style={repositoryBodyStyles.container}>
            <View style={repositoryBodyStyles.statisticsContainer} >
                <Text testID="starsTestValue" fontWeight="bold" fontSize="primary">  {yksikonMuunnos(item.stargazersCount)} </Text>
                <Text testID="starsTest" color='textSecondary' fontSize="body">Stars</Text>
            </View>
            <View style={repositoryBodyStyles.statisticsContainer} >
                <Text testID="forksCountValueTest" fontWeight="bold" fontSize="primary">  {yksikonMuunnos(item.forksCount)} </Text>
                <Text testID="forksCountTest" color='textSecondary' fontSize="body">Forks</Text>
            </View>
            <View style={repositoryBodyStyles.statisticsContainer} >
                <Text testID="reviewersTestValue" fontWeight="bold" fontSize="primary"> {yksikonMuunnos(item.reviewCount)} </Text>
                <Text testID="reviewersTest" color='textSecondary' fontSize="body">Reviewers</Text>
            </View>
            <View style={repositoryBodyStyles.statisticsContainer} >
                <Text testID="ratingTestValue" fontWeight="bold" fontSize="primary"> {yksikonMuunnos(item.ratingAverage)} </Text>
                <Text testID="ratingTest" color='textSecondary' fontSize="body">Rating</Text>
            </View>
        </View>
    );
};


const RenderItem = ({ item }) => (
    //console.log('ITEM');
    <View >
        <RepositoryHeader item={item} key={item.id}></RepositoryHeader>
        <RepositoryBody item={item} key={item.fullName}></RepositoryBody>
    </View >
);

export default RenderItem;