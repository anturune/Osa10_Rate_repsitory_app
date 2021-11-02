//import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {

  const { data, error, loading } = useQuery(GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
      // Other options
    });

  console.log('TULEEKO UseRepositoriesiin', data);

  /* 
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  console.log('TULEEKO UseRepositoriesiin', repositories);
  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    //IP:n löytää kun käynnistää sovelluksen "rate-repository-app" ja kopioi QR koodin yläpuolelta IP:n
    const response = await fetch('http://192.168.100.14:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);
  */

  return { data, error, loading };

  //return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;