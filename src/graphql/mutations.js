import { gql } from '@apollo/client';


export const SIGN_IN_MUTATION = gql`
mutation{
    authorize(credentials:
      {username:"kalle",
      password:"password"}){
      accessToken
    }
  }
`;