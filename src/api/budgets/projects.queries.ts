import { gql } from "@apollo/client";

export const GET_PROJECT_BY_ID = gql`query GetProjectById($projectId: String!) {
  getProjectById(projectId: $projectId) {
    _id
    project_general_info {
      name
      description
    }
    apus {
      _id
      apu_name
      apu_id
      apu_unit
      apu_price
      apu_materials {
        material_name
        material_unitary_price
        material_provider
        material_code
        material_unit
        material_rud
        material_amount
        _id
      }
      apu_transportation {
        transportation_name
        transportation_unitary_price
        transportation_provider
        transportation_code
        transportation_unit
        transportation_rud
        transportation_amount
        _id
        
      }
      apu_equipment {
        equipment_name
        equipment_unitary_price
        equipment_provider
        equipment_code
        equipment_unit
        equipment_amount
        equipment_rud
        _id
      }
      apu_workHand {
        workHand_name
        workHand_unitary_price
        workHand_provider
        workHand_code
        workHand_unit
        workHand_amount
        workHand_rud
        _id
      }
      apu_apu {
        _id
        apu_name
        apu_id
        apu_unit
        apu_price
        apu_description
        apu_amount
        apu_rud
      }
      apu_description
      apu_chapter
    }
    local_apus {
      apu_name
      apu_id
      apu_unit
      apu_price
      apu_description
      apu_chapter
      apu_equipment {
        equipment_name
        equipment_unitary_price
        equipment_provider
        equipment_code
        equipment_unit
        equipment_amount
        equipment_rud
        _id
        equipment_category
        equipment_partial_value
      }
      apu_materials {
        material_name
        material_unitary_price
        material_provider
        material_code
        material_unit
        material_rud
        material_amount
        _id
        material_category
        material_partial_value
      }
      apu_transportation {
        transportation_name
        transportation_unitary_price
        transportation_provider
        transportation_code
        transportation_unit
        transportation_rud
        transportation_amount
        _id
        transportation_category
        transportation_partial_value
      }
      apu_workHand {
        workHand_name
        workHand_unitary_price
        workHand_provider
        workHand_code
        workHand_unit
        workHand_amount
        workHand_rud
        _id
        workHand_category
        workHand_partial_value
      }
      apu_apu {
        _id
        apu_name
        apu_id
        apu_unit
        apu_price
        apu_description
        apu_amount
        apu_rud
      }
    }
    project_activities {
      activity_id
      activity_name
      subActivities {
        subActivity_apu {
          apu_id
          _id
        }
        amount
        subActivity_id
        flag
      }
    }
    project_config {
      iva
      utility
      unforeseen
      admin
    }
  }
}`

export const EDIT_PROJECT_BY_ID = gql`mutation EditProjectById($projectId: ID!, $projectData: ProjectInput!) {
  editProjectById(projectId: $projectId, projectData: $projectData) {
    code
    message
    success
    project {
      _id
    }
  }
}`