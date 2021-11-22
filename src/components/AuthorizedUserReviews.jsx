import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { GET_AUTHORIZED_USER_REPOS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

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
    return <View style={repositoryReviewStyles.container}>
        <View>
            <Text style={repositoryReviewStyles.ratingCircleStyle}>{review.rating}</Text>
        </View>
        <View style={repositoryReviewStyles.bodyTextContainer}>
            <Text style={repositoryReviewStyles.revivewerName}>{review.repository.fullName}</Text>
            <Text style={repositoryReviewStyles.revivewDate}>{formatDate(review.createdAt)}</Text>
            <Text style={repositoryReviewStyles.ratingText}>{review.text}</Text>
        </View>

    </View>
        ;


};

//Määritellään yksittäisen FlatList renderöinnin tyyli Viewille
const ItemSeparator = () => <View style={repositoryReviewStyles.separator} />;

const AuthorizedUserReviews = () => {

    const { loading, data, fetchMore } = useQuery(GET_AUTHORIZED_USER_REPOS, {
        fetchPolicy: "cache",
        //Ladataan haluttu määrä rviewejä--> määritys "first:"-argumenttiin ja alla määritelty, 
        //että kun puolet näkyy, niin ladataan yksi lisää yhden ladatun lisäksi
        variables: { includeReviews: true },
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

    //console.log('DATA', data.authorizedUser.reviews.edges);

    const { reviews } = data.authorizedUser;

    const authReviews = reviews
        ? reviews.edges.map((edge) => edge.node)
        : [];


    //console.log('Reviews', authReviews, 'Montako:', authReviews.length);

    const handleEmpty = () => {
        return (

            <Text style={{ color: 'black', fontSize: 25, textAlign: 'center' }}> You have not reviewed yet!</Text>

        );
    };

    return (
        <FlatList
            data={authReviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            //Jos käyttäjä ei ole arvostellut yhtään niin renderöi
            //"handleEmpty"-funktiossa kerrotun tekstin
            ListEmptyComponent={handleEmpty}
        //ListHeaderComponent={this.renderHeader}
        >
        </FlatList>
    );
};


export default AuthorizedUserReviews;