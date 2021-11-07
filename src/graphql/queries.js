import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges{
            node{
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

