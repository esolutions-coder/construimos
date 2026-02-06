import { gql } from "@apollo/client";

export const GET_MATERIALS_BY_PROVIDER_ID = gql`
  query MaterialsByProviderId($providerId: ID!) {
    materialsByProviderId(providerId: $providerId) {
      _id
      material_category
      stock
      material_code
      material_name
      material_provider
      material_rud
      material_unit
      material_unitary_price
    }
  }
`;

export const WORKHAND_BY_PROVIDER_ID = gql`
  query WorkhandByProviderId($providerId: ID!) {
    workhandByProviderId(providerId: $providerId) {
      _id
      stock
      workHand_code
      workHand_name
      workHand_provider
      workHand_rud
      workHand_unit
      workHand_unitary_price
    }
  }
`;

export const GET_TRANSPORTATION_BY_PROVIDER_ID = gql`
  query TransportationByProviderId($providerId: ID!) {
    transportationByProviderId(providerId: $providerId) {
      _id
      stock
      transportation_category
      transportation_code
      transportation_name
      transportation_provider
      transportation_rud
      transportation_unit
      transportation_unitary_price
    }
  }
`;

export const GET_EQUIPMENT_BY_PROVIDER_ID = gql`
  query EquipmentByProviderId($providerId: ID!) {
    equipmentByProviderId(providerId: $providerId) {
      _id
      equipment_code
      equipment_name
      equipment_provider
      equipment_rud
      equipment_unit
      equipment_unitary_price
      stock
    }
  }
`;
