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
  query GetUsersByRole($role: String) {
    getUsersByRole(role: $role) {
      creationDate
      description
      email
      image
      location
      xp {
        description
        duration
        title
      }
      username
      role
      postalCode
      nit
      _id
    }
  }
`;
