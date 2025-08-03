import { gql } from "@apollo/client";

export const GET_TRANSPORTATION_BY_CODE = gql`query ApuByCode($code: ID!) {
    transportationByCode(code: $code) {
      transportation_name
      transportation_unitary_price
      transportation_provider
      transportation_code
      transportation_unit
      transportation_rud
      transportation_category
    }
  }`