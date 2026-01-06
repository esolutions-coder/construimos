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
