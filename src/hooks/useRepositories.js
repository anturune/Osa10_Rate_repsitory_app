//import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';


const useRepositories = () => {


  //Initial state
  const [filterCriteria, setFilterCriteria] = useState({
    orderDirection: "DESC",
    orderBy: "CREATED_AT",
    searchKeyword: ""
  });

  //"pilkotaan" filterCrietria -state osiin
  const { orderDirection, orderBy, searchKeyword } = filterCriteria;

  //console.log('Mita tulee hookiin', orderDirection, orderBy, searchKeyword);

  //GraphQL haun ajo
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_REPOSITORIES,
    {
      //Ks. cache policy "utils/apolloClient.js", aktivoi toinen custom cache
      //kun kokeilet "reviewes":ien lataamisoptiota...ks. "SingleRepositoryView.jsx" ja
      //katso "fetch" -kohta. Toimiakseen vaatii custom cachen, joka ei taas toimi tässä
      fetchPolicy: 'cache',
      variables: { orderDirection: orderDirection, orderBy: orderBy, searchKeyword: searchKeyword }
    });

  return {
    repositories: data?.repositories,
    setFilterCriteria,
    loading,

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
