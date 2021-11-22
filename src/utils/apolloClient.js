import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  //IP-address on ".env" filessä ja "app.config.js" antaa
  //sen käyttöön dotnev:n avulla
  uri: Constants.manifest.extra.env,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    //Aktivoi tämä cache, jos haluat filteröinnin toimivan
    //"RepositoryList":lle ei ole tehty "infinite scrollingia", jota
    //varten custom cache tehty
    cache: new InMemoryCache(),
    //cache,
  });
};

/*
const createApolloClient = () => {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });
};
*/
export default createApolloClient;