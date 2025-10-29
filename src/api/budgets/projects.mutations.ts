import { gql } from "@apollo/client";

export const SAVE_PROJECT_BUDGET = /* GraphQL */ gql`
  mutation AddProject($projectData: ProjectInput!) {
    addProject(projectData: $projectData) {
      code
      message
      success
      project {
        _id
      }
    }
  }
`;

export const DELETE_PROJECT_BUDGET = gql`
  mutation DeleteProjectById($projectId: ID!) {
    deleteProjectById(projectId: $projectId) {
      code
      message
      success
    }
  }
`;
