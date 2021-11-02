import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges{
            node{
              name}
          }
          pageInfo{
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          totalCount
        }
    }
`;


