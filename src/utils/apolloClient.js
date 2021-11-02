import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
const httpLink = createHttpLink({
    // Replace the IP address part with your own IP address!
    //IP-address on ".env" filessä ja "app.config.js" antaa
    //sen käyttöön dotnev:n avulla
    uri: Constants.manifest.extra.env,
});

const createApolloClient = () => {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;