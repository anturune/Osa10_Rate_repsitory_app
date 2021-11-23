import React from 'react';
import { FlatList, View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { GET_LOGGED_IN_USER } from '../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useHistory } from "react-router-native";


//SIngle viewin tyylit
const repositoryReviewStyles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: 'lightgray',

    },
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        //Latoo kaikki itemit rinnakkain
        flexDirection: 'row',
        flexGrow: 1,
        marginLeft: 20,

    },
    bodyTextContainer: {
        flexDirection: 'column',
        paddingLeft: 20,
        flex: 1,
    },
    ratingText: {
        fontSize: 16,
        flex: 1,
        marginRight: 10,
        fontWeight: '600',
        color: 'black'

    },

    ratingCircleStyle: {
        borderColor: '#0366d6',
        color: '#0366d6',
        borderWidth: 3,
        width: 65,
        height: 65,
        borderRadius: 65 / 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        fontWeight: '700',
    },
    revivewerName: {
        fontSize: 25,
        flex: 1,
        marginRight: 10,
        fontWeight: '700',
        color: 'black',
        paddingBottom: 10

    },
    revivewDate: {
        fontSize: 25,
        flex: 1,
        marginRight: 10,
        fontWeight: '500',
        color: 'grey',
        paddingBottom: 10

    },
    deleteButton: {
        borderRadius: 5,
        color: 'white',
        backgroundColor: 'red',
        padding: 15
    },
    viewRepoButton: {
        borderRadius: 5,
        color: 'white',
        backgroundColor: 'blue',
        padding: 15
    },
});

const formatDate = (dateStringFromDb) => {

    //const date = '2021-11-02T10:10:33.466Z';
    //Leikataan pois 10 pcs merkkimäärän yli menevät merkit
    const newDate = dateStringFromDb.substr(0, 10);
    //Splitataan arrayhun, kriteerinä "-"
    const strSplitDate = String(newDate).split('-');
    /*
        console.log('SubstrDate', newDate);
        console.log('strSplitDate', strSplitDate);
        console.log('Formatted date', strSplitDate[2] + '.' + strSplitDate[1] + '.' + strSplitDate[0]);
        */

    return strSplitDate[2] + '.' + strSplitDate[1] + '.' + strSplitDate[0];
};
//Reviewin renderöintiin
//HUOM! Refetch -funktio tuodaan propsina
const ReviewItem = ({ review, refetch }) => {
    const [deleteReview] = useMutation(DELETE_REVIEW);
    let history = useHistory();

    //"Ok"/"Cancel" -alertin toimintoon
    //jos painaa "ok", niin silloin menee "handleDelete" funktiolle
    //joka hoitaa deletoinnin ja datan refreshauksen
    const deleteAlert = (id) =>
        Alert.alert(
            "Delete review",
            "Are you sure you want delete...",
            [
                {
                    text: "Cancel",
                    //onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => handleDelete(id) }
            ]
        );

    //Oman reviewin deletointiin
    const handleDelete = async (id) => {
        const { loading, data } = await deleteReview({ variables: { id } });
        console.log('DATA', data, 'Loading', loading);

        if (loading) {
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
        //Ajetaan reftech, joka tuotu Flat listin propsilla tälle koponentille/funktiolle
        //rfetch ajaa haun uudelleen, kun deletointi suoritettu
        refetch();
        history.push("/myReviews");

    };

    //Funktio yksittäiselle repositoriolle ohjaamiseen
    const goToSingleRepo = (id) => {
        history.push(`/singleRepsoitory/${id}`);
    };

    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={repositoryReviewStyles.container}>
                <View>
                    <Text style={repositoryReviewStyles.ratingCircleStyle}>{review.rating}</Text>
                </View>
                <View style={repositoryReviewStyles.bodyTextContainer}>
                    <Text style={repositoryReviewStyles.revivewerName}>{review.repository.fullName}</Text>
                    <Text style={repositoryReviewStyles.revivewDate}>{formatDate(review.createdAt)}</Text>
                    <Text style={repositoryReviewStyles.ratingText}>{review.text}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ padding: 15 }}>
                    <Pressable onPress={() => goToSingleRepo(review.repositoryId)}>
                        <Text style={repositoryReviewStyles.viewRepoButton}>View repository</Text>
                    </Pressable>
                </View>
                <View style={{ padding: 15 }}>
                    <Pressable onPress={() => deleteAlert(review.id)}>
                        <Text style={repositoryReviewStyles.deleteButton}>Delete review</Text>
                    </Pressable>
                </View>
            </View>

        </View>);
};


//Määritellään yksittäisen FlatList renderöinnin tyyli Viewille
const ItemSeparator = () => <View style={repositoryReviewStyles.separator} />;

const AuthorizedUserReviews = () => {

    const { loading, data, refetch } = useQuery(GET_LOGGED_IN_USER, {
        fetchPolicy: 'cache',
        variables: { includeReviews: true },
    });

    if (loading) {
        console.log('LOADING?', loading);
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

    //console.log('DATA', data.authorizedUser.reviews.edges);

    const { reviews } = data.authorizedUser;

    const authReviews = reviews
        ? reviews.edges.map((edge) => edge.node)
        : [];


    //console.log('Reviews', authReviews, 'Montako:', authReviews.length);

    //Tyhjän listan käsittelyyn funktio
    //HUOM! "refetch()" -ajetaan ihan aluksi
    const handleEmpty = () => {
        //Ensin ajetaan uudelleen haku, koska kun uusi review on luotu, niin se
        //ei näy ennen listalla, ellei hakua tehdä uusiksi. Jos sittenkään ei löydy
        //rviewejä, niin palautetaaan teksti "You have not reviewed yet!"
        refetch();
        return (
            <Text style={{ color: 'black', fontSize: 25, textAlign: 'center' }}> You have not reviewed yet!</Text>
        );
    };

    return (
        <FlatList
            data={authReviews}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            //Jos käyttäjä ei ole arvostellut yhtään niin renderöi
            //"handleEmpty"-funktiossa kerrotun tekstin
            ListEmptyComponent={handleEmpty}
        >
        </FlatList>
    );
};


export default AuthorizedUserReviews;