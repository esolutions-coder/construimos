import { gql } from "@apollo/client";
export const GET_APUS = gql `
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
export const GET_APU_BY_USERINPUT = gql `query Apus($userInput: String!) {
  apuByString(userInput: $userInput) {
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
}`;
