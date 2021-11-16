import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges{
            node{
              id
            fullName
            description
            language
            forksCount
            stargazersCount
            ratingAverage
            reviewCount
            ownerAvatarUrl}
          }
          totalCount
        }
    }
`;


export const GET_LOGGED_IN_USER = gql`
query {authorizedUser
  {
      id
      username
    }
}
`;

export const GET_SINGLE_REPO = gql`
query repository($id:ID!){
  repository(id:$id) 
     {
       id
       fullName
       url
       description
       language
       forksCount
       stargazersCount
       ratingAverage
       reviewCount
       ownerAvatarUrl
       reviews{
        edges{
          node{
            id
            text
            rating
            createdAt
            user{
              id
            	username}
          }
      }
   }
 }
}
 `;


/*
export const GET_SINGLE_REPO = gql`
query repository($id:ID!){
  repository(id:$id) 
     {
       id
       fullName
       url
       description
       language
       forksCount
       stargazersCount
       ratingAverage
       reviewCount
       ownerAvatarUrl
   }
 }
 `;
 */