import React from 'react';
import RenderItem from './RepositoryItem';
//import useSingleRepository from '../hooks/useSingleRepository';
import { useParams } from 'react-router-native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPO } from '../graphql/queries';

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

    }
});

//Muotoillaan päivämäärä
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
const ReviewItem = ({ review }) => {
    // Single review item
    //console.log('MITÄ TULEE REVIEW ITEM COMPONENTTIIN', review);
    return <View style={repositoryReviewStyles.container}>
        <View>
            <Text style={repositoryReviewStyles.ratingCircleStyle}>{review.rating}</Text>
        </View>
        <View style={repositoryReviewStyles.bodyTextContainer}>
            <Text style={repositoryReviewStyles.revivewerName}>{review.user.username}</Text>
            <Text style={repositoryReviewStyles.revivewDate}>{formatDate(review.createdAt)}</Text>
            <Text style={repositoryReviewStyles.ratingText}>{review.text}</Text>
        </View>
    </View>
        ;

};
//Määritellään yksittäisen FlatList renderöinnin tyyli Viewille
const ItemSeparator = () => <View style={repositoryReviewStyles.separator} />;

const RepositoryInfo = ({ repository }) => {
    // Repository's information implemented in the previous exercise
    //console.log('REPOID',repository.id);
    return <RenderItem item={repository} linkToRepo='true' />;
};




const SingleRepositorio = () => {
    //En saanut hookia toimimaan niin siksi graphQL haku suoraan tästä komponentista
    const { id } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_REPO, {
        fetchPolicy: "cache-and-network",
        variables: { id },
    });

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

    //Mapataan revjyyt taulukkoon <FlatList> -varten
    const reviews = data.repository.reviews
        ? data.repository.reviews.edges.map((edge) => edge.node)
        : [];

    console.log('Data', data.repository.reviews.edges);
    //console.log('Reviews', reviews);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
            ItemSeparatorComponent={ItemSeparator}
        // ...
        />
    );
};

export default SingleRepositorio;


/*
const SingleRepositorio = () => {
    //console.log('TULEEKO SingleRepositorioViewiin');

    //const { data } = useSingleRepository();

    //En saanut hookia toimimaan niin siksi graphQL haku suoraan tästä komponentista
    const { id } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_REPO, {
        fetchPolicy: "cache-and-network",
        variables: { id },
    });

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

    console.log('Data', data.repository);

    return <RenderItem item={data.repository} linkToRepo='true'/>;

};
export default SingleRepositorio;
*/



