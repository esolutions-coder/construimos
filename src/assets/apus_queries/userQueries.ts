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
`;
export const GET_USER_BY_ROLE = gql`
  query GetUserByRole($role: String) {
    getUserByRole(role: $role) {
      username
      email
      nit
      location
      role
      creationDate
      image
    }
  }
`;
