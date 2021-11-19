import { gql } from '@apollo/client';

/*
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
*/
export const GET_REPOSITORIES = gql`
query repositories($orderDirection:OrderDirection,$orderBy:AllRepositoriesOrderBy,$searchKeyword: String){
  repositories (orderDirection:$orderDirection,orderBy:$orderBy, searchKeyword:$searchKeyword){
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
query repository($id:ID!,$first:Int, $after:String){
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
       reviews(first:$first, after:$after){
        edges{
          cursor
          node{
            id
            text
            rating
            createdAt
            repositoryId
            user{
              id
            	username}
          }
      }
        pageInfo{
           endCursor
           startCursor
           hasNextPage}
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
*/

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