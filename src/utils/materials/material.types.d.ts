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
