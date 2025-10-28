import { gql } from "@apollo/client";

export const ALL_MATERIALS = gql`
  query GetMaterials {
    materials {
      material_name
      material_unitary_price
      material_provider
      material_code
      material_unit
      material_rud
    }
  }
`;

export const ADD_NEW_MATERIALS = gql`
  mutation AddMaterials($materialsData: [NewMaterial]!) {
    addMaterials(materialsData: $materialsData) {
      code
      message
      success
      materials
    }
  }
`;

export const GET_MATERIAL_BY_ID = gql`
  query Material($materialId: ID!) {
    material(materialId: $materialId) {
      material_name
      material_unitary_price
      material_provider
      material_code
      material_unit
      material_rud
      material_category
      _id
    }
  }
`;

export const GET_PROJECTS_BY_USER_ID = gql`
  query GetProjectByUserId($userId: ID!) {
    getProjectByUserId(userId: $userId) {
      project_general_info {
        name
        description
        total_cost
        date
      }
      _id
    }
  }
`;

export const GET_MATERIAL_BY_CODE = gql`
  query MaterialByCode($materialCode: ID!) {
    materialByCode(materialCode: $materialCode) {
      _id
      material_name
      material_unitary_price
      material_provider
      material_code
      material_unit
      material_rud
      material_category
    }
  }
`;

export const UPDATE_MATERIAL = gql`
  mutation EditMaterial($materialData: NewMaterial!, $editMaterialId: ID!) {
    editMaterial(materialData: $materialData, id: $editMaterialId) {
      code
      success
      message
      material {
        material_name
      }
    }
  }
`;
