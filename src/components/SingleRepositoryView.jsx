import React from 'react';
import RenderItem from './RepositoryItem';
//import useSingleRepository from '../hooks/useSingleRepository';
import { useParams } from 'react-router-native';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPO } from '../graphql/queries';

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

