import { gql } from "@apollo/client"

export const GET_EQUIPMENT_BY_CODE = gql`query EquipmentByCode($code: ID!) {
    equipmentByCode(code: $code) {
      equipment_name
      equipment_unitary_price
      equipment_provider
      equipment_code
      equipment_unit
      equipment_rud
    }
  }`