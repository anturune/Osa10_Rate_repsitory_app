
import { gql } from '@apollo/client';


//usernam: "kalle", password:"password"

export const SIGN_IN_MUTATION = gql`
mutation authorize($credentials: AuthorizeInput!){
    authorize(
      credentials: $credentials
    ){
      accessToken
            
    }
  }
`;


/*
export const SIGN_IN_MUTATION = gql`
mutation mutate($username: String!, $password: String!){
    authorize(
        credentials:
            {username:$username,
            password:$password}
            ){
            accessToken
    }
  }
`;
*/