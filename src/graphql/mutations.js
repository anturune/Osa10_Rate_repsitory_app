
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

//Rviewin lisääminen repositoriolle
export const CREATE_NEW_USER_MUTATION = gql`
mutation createUser($user:CreateUserInput!){
  createUser (user:$user){
    id
    username
    reviews{
      totalCount
      edges{
        cursor
        node{
          id
          repository{
            fullName}
          repositoryId
        }
      }
      pageInfo{
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
        }
      
      }
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