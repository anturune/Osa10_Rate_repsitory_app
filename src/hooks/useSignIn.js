
import { SIGN_IN_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';



const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN_MUTATION);

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        //console.log('hooks/signIn', username, password);
        //console.log('hooks/signIn', result);
        return await mutate({ variables: { credentials: { username, password } } });
        
    };
    //console.log('hooks/signIn/result', result);
    return [signIn, result];
};

export default useSignIn;