
import { gql } from '@apollo/client';


//username: "kalle", password:"password"

//Kirjautumiseen mutaatio
export const SIGN_IN_MUTATION = gql`
mutation authorize($credentials: AuthorizeInput!){
    authorize(
      credentials: $credentials
    ){
      accessToken
            
    }
  }
`;

//Rviewin lisääminen repositoriolle
export const CREATE_REVIEW_MUTATION = gql`
mutation createReview($review:CreateReviewInput!){
  createReview (review:$review){
    id,
    user{
      id,
      username}
  		rating,
    	createdAt,
    	text,
    	repositoryId
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