import { gql } from "@apollo/client";

export const GET_APUS = gql`
  query FullApusList {
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
        material_amount
        material_unit
        material_rud
      }
      apu_equipment {
        equipment_name
        equipment_unitary_price
        equipment_provider
        equipment_code
        equipment_amount
        equipment_unit
        equipment_rud
      }
      apu_workHand {
        workHand_name
        workHand_unitary_price
        workHand_provider
        workHand_code
        workHand_amount
        workHand_unit
        workHand_rud
      }
      apu_description
    }
  }
`;

export const GET_APU_BY_USERINPUT = gql`query Apu($userInput: String!) {
  apuByString(userInput: $userInput) {
    _id
    apu_name
    apu_id
    apu_unit
    apu_price
    apu_description
  }
}
`

export const GET_FULL_APU_BY_ID = gql`query Apu($apuId: ID!) {
  apu(id: $apuId) {
    apu_materials {
      material_unit
      material_code
      material_provider
      material_unitary_price
      material_name
      material_rud
      material_amount
    }
    apu_equipment {
      equipment_name
      equipment_unitary_price
      equipment_provider
      equipment_code
      equipment_unit
      equipment_amount
      equipment_rud
    }
    apu_workHand {
      workHand_name
      workHand_unitary_price
      workHand_provider
      workHand_code
      workHand_unit
      workHand_amount
      workHand_rud
    }
    apu_transportation {
      transportation_name
      transportation_unitary_price
      transportation_provider
      transportation_code
      transportation_unit
      transportation_amount
      transportation_rud
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
    apu_price
    apu_unit
    apu_id
    apu_name
    _id
  }
}
`

export const GET_MATERIAL_BY_USERINPUT = gql`query SearchMaterials($userInput: String!) {
  materialByString(userInput: $userInput) {
    material_name
    material_unitary_price
    material_provider
    material_code
    material_unit
    material_rud
  }
}`

export const GET_EQUIPMENT_BY_USERINPUT = gql`query SearchEquipment($userInput: String!) {
  equipmentByString(userInput: $userInput) {
    equipment_name
    equipment_unitary_price
    equipment_provider
    equipment_code
    equipment_unit
    equipment_rud
  }
}
`

export const GET_WORKHAND_BY_USERINPUT = gql`query searchWorkhand($userInput: String!) {
  workHandByString(userInput: $userInput) {
    workHand_name
    workHand_unitary_price
    workHand_provider
    workHand_code
    workHand_unit
    workHand_rud
  }
}`

export const GET_TRANSPORTATION_BY_USERINPUT = gql`query searchTransportation($userInput: String!) {
  transportationByString(userInput: $userInput) {
    transportation_name
    transportation_unitary_price
    transportation_provider
    transportation_code
    transportation_unit
    transportation_rud
    transportation_category
  }
}
`

export const ADD_NEW_APU = gql`mutation Mutation($apuData: ApuInput!) {
  addApu(apuData: $apuData) {
    code
    success
    message
    apu {
      apu_description
      apu_name
      apu_price
      apu_unit
    }
  }
  
}`