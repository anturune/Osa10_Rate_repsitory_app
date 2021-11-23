import React from 'react';
import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { useHistory } from "react-router-native";




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
        flexGrow: 1
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
        width: "auto"
    },
    whiteTextForLanguageTag: {
        fontSize: 16,
        color: 'white'
    },
    linkToRepoTag: {
        borderRadius: 5,
        backgroundColor: '#0366d6',
        //Saadaan tekstin ympärillä olevan boxin koko
        //sovitettua tekstin määrän mukaiseksi
        //alignSelf: "stretch",
        width: "auto",
        textAlign: "center",
        paddingVertical: 15

    }
});

//Headerin renderöintiin komponentti
const RepositoryHeader = ({ item }) => {
    let history = useHistory();

    //const { itemId } = useParams();
    //console.log('REPOSITORY HEADER', item.id);

    const goToSingleView = (id) => {
        //console.log('renderSomething', id);
        history.push(`/singleRepsoitory/${id}`);
    };
    return (
        <View style={repositoryHeaderStyles.container}>
            <View style={repositoryHeaderStyles.avatarrContainer}>
                <Pressable onPress={() => goToSingleView(item.id)} >
                    <Image
                        style={repositoryHeaderStyles.avatar}
                        source={{ uri: `${item.ownerAvatarUrl}` }}>
                    </Image>
                </Pressable>
            </View>
            <View style={repositoryHeaderStyles.infoContainer}>
                <Text testID="fullNameTest" fontWeight="bold" fontSize="subheading"> {item.fullName}</Text>
                <Text testID="descriptionTest">{item.description}</Text>
                <View style={repositoryHeaderStyles.languageTagContainer}>
                    <Text testID="languageTagTest" style={[
                        repositoryHeaderStyles.languageTag,
                        repositoryHeaderStyles.whiteTextForLanguageTag,
                    ]}> {item.language}</Text>
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

    },
    statisticsContainer: {
        //Latoo kaikki itemit päällekäin
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        zIndex: 1

    },
    infoContainer: {
        flexGrow: 1,
    },
    linkToGitHupContainer: {
        alignItems: 'stretch',
        flexDirection: 'column',
        padding: 20,
        flexGrow: 0,

    }
});

//Statistiikan renderöintiin komponentti
const RepositoryBody = ({ item, linkToRepo }) => {
    //console.log('ITEM', item);
    //console.log('RepositoryBody', linkToRepo);
    return (
        <View >
            <View style={[repositoryBodyStyles.container]}>
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
            {/* ehdollinen renderöinti, kun katsotaan yksittäistä repositorya*/}
            {linkToRepo && (
                <View style={repositoryBodyStyles.linkToGitHupContainer}>
                    <Pressable onPress={() => Linking.openURL(item.url)} >
                        <Text style={[
                            repositoryHeaderStyles.linkToRepoTag,
                            repositoryHeaderStyles.whiteTextForLanguageTag]}>Go To Github Site</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );

};
/*
Tällä compolla myös toimii eli ajetaan funktio painalluksen jälkeen:
<Pressable onPress={() => gitHubSite(item.url)} >
const gitHubSite = (url) => {
    Linking.openURL(url);
};
*/


const RenderItem = ({ item, linkToRepo }) => (
    //console.log('ITEM');

    <View >
        <RepositoryHeader item={item} key={item.id}></RepositoryHeader>
        <RepositoryBody item={item} key={item.fullName} linkToRepo={linkToRepo}></RepositoryBody>
    </View >
);

export default RenderItem;