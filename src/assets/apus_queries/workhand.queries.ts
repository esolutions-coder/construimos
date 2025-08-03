import { gql } from "@apollo/client";


export const WORKHAND_BY_CODE = gql`query WorkhandByCode($code: ID!) {
    workhandByCode(code: $code) {
      workHand_name
      workHand_unitary_price
      workHand_provider
      workHand_code
      workHand_unit
      workHand_rud
    }
  }`