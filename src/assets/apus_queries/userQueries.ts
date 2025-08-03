import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation Mutation($userData: UserInput!) {
  addNewUser(userData: $userData) {
    code
    message
    success
    user {
      username
      email
      creationDate
    }
  }
}
`