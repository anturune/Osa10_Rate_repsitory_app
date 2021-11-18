//import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';


const useRepositories = () => {


  //Initial state
  const [filterCriteria, setFilterCriteria] = useState({
    orderDirection: "DESC",
    orderBy: "CREATED_AT"
  });

  const { orderDirection, orderBy } = filterCriteria;

  const { data, error, loading } = useQuery(GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
      variables: { orderDirection: orderDirection, orderBy: orderBy }
      // Other options
    });

  //console.log('TULEEKO UseRepositoriesiin', data);
  //console.log('TULEEKO UseRepositoriesiinError', error);
  //console.log('TULEEKO UseRepositoriesiinLoading', loading);

  if (loading) {
    return loading;
  }

  if (error) {
    return error;
  }

  //console.log('DATA HOOKISSA', data.repositories);

  return {
    repositories: data.repositories,
    setFilterCriteria,
    loading
  };

  //return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;

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
