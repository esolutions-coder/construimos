export type MaterialsByProviderId = {
  _id: string;
  material_category: string;
  material_code: string;
  material_name: string;
  material_provider: string;
  material_rud: number;
  material_unit: string;
  material_unitary_price: number;
  stock: number;
};

export type WorkhandByProviderId = {
  _id: string;
  stock: number;
  workHand_code: string;
  workHand_name: string;
  workHand_provider: string;
  workHand_rud: number;
  workHand_unit: string;
  workHand_unitary_price: number;
};

export type TransportationByProviderId = {
  _id: string;
  stock: number;
  transportation_category: string;
  transportation_code: string;
  transportation_name: string;
  transportation_provider: string;
  transportation_rud: number;
  transportation_unit: string;
  transportation_unitary_price: number;
};
