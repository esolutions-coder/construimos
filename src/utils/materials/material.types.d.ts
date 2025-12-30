type CreateMaterial = {
name: string;
unit: string;
rud: number;
price: number;
code: string;
category: string;
provider: string;
}

type MaterialfromQuery = {
  name: string;
  description: string;
  unit: string;
  rud: number;
  price: number;
  code: string;
  category: string;
  provider: string;
  image: string;
  gallery: string[];
  tech_sheet: TechSheet[];
  votes: number[];
};

type TechSheet = {
  prop: string;
  value: string;
  pinturaacaba: string;
};

type CurrentMaterialFromQuery = {
  _id: string;
  material_name: string;
  material_unit: string;
  material_rud: number;
  material_unitary_price: number;
  material_code: string;
  material_category: string;
  material_provider: string;
};
