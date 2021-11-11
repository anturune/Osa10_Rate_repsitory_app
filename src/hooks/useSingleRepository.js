import { GET_SINGLE_REPO } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { View, Text } from 'react-native';



const useSingleRepository = () => {
    const { id } = useParams();

    console.log('ID', id);

   
    const { loading, data } = useQuery(GET_SINGLE_REPO, {
        fetchPolicy: "cache-and-network",
        variables: { id },
    });

    console.log('TULEEKO UseRepositoriesiin', data);
    //console.log('TULEEKO UseRepositoriesiinError', error);
    console.log('TULEEKO UseRepositoriesiinLoading', loading);

    if (loading) {
        return loading;
    }

    
    console.log('Data', data);
    return data;

    //return { repositories, loading, refetch: fetchRepositories };
};




export default useSingleRepository;