import { SIGN_IN_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_IN_USER } from '../graphql/queries';

/*Ks. seuraavat filet kuinka storagen käyttö contextissa mahdollistetaan
    12.1) ks. App.js
    12.2) ks. src/utils/apolloClient.js
    12.3) ks. src/contexts/AuthStorageContext.js
    12.4) ks. src/hooks/useAuthStorage.js
    12.5) ks. src/hooks/useSignIn.js
    */

const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const { data, loading } = useQuery(GET_LOGGED_IN_USER);

    const signOut = async () => {

        console.log('KUTSUUKO signOutia');

        //console.log('SIGNIN COMPONENT', username, 'JA', password);
        try {

            await authStorage.removeAccessToken();
            apolloClient.resetStore();
            //const { data } = await authStorage.getAccessToken();
            //const { data } = await query();
            console.log('AUTHSTORGAE getAccessToken', data);
            //history.push("/");
            return { data };

        } catch (e) {
            console.log('DATAAA Errorista');
            console.log(e);
        }
    };
    return [signOut];
};


export default useSignOut;


/*
const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(SIGN_IN_MUTATION);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        //console.log('hooks/signIn', username, password);
        //console.log('hooks/signIn', result);
        const { data } = await mutate({ variables: { credentials: { username, password } } });
        //console.log('DATA', data.authorize.accessToken);
        //const setTokenToStorage = new AuthStorage('auth');
        await authStorage.setAccessToken(data.authorize.accessToken);
        //resetoidaan ApolloClientin cachet
        apolloClient.resetStore();
        //console.log('ONKO LOCAL STORAGESSA TOKENI', await setTokenToStorage.getAccessToken());

        return { data };

    };
    //console.log('hooks/signIn/result', result);
    return [signIn, result];
};

export default useSignIn;
*/