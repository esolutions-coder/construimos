interface Card {
    icon: string;
    title: string;
    description: string;
    theme: string;
}

type CIDEINMaterials = {
    _id: string,
    material_name: string,
    material_unitary_price: number,
    material_provider: string,
    material_code: string,
    material_amount: number,
    material_unit: string,
    material_rud: number,
    material_partial_value: number
    material_category: string
}

type ProjectGeneralInfo = {
    name: string,
    description: string
}

type CIDEINEquipment = {
    _id: string,
    equipment_name: string,
    equipment_unitary_price: number,
    equipment_provider: string,
    equipment_code: string,
    equipment_unit: string,
    equipment_amount: number,
    equipment_rud: number,
    equipment_partial_value: number
}

type CIDEINWorkhand = {
    _id: string,
    workHand_name: string,
    workHand_unitary_price: number,
    workHand_provider: string,
    workHand_code: string,
    workHand_unit: string,
    workHand_amount: number,
    workHand_rud: number,
    workHand_partial_value: number
}

type CIDEINTransportation = {
    _id: string,
    transportation_name: string,
    transportation_unitary_price: number,
    transportation_provider: string,
    transportation_code: string,
    transportation_unit: string,
    transportation_amount: number,
    transportation_rud: number,
    transportation_partial_value: number
}



type SubActivities = {
    subActivity_apu: APU,
    amount: number,
    subActivity_total: number
    subActivity_id: string
    flag: string
}

type ProjecActivities = {
    activity_id: string,
    activity_name: string,
    subActivities: SubActivities[]
    subtotal_activity: number
}

type BudgetPrices = {
    IVA: number,
    admin: number,
    unforeseen: number,
    direct_costs: number,
    total_cost: number,
    utility: number
}


interface APU {
    _id: string,
    apu_name: string
    apu_id: string
    apu_unit: string
    apu_price: number
    apu_materials: CIDEINMaterials[]
    apu_equipment: CIDEINEquipment[]
    apu_workHand: CIDEINWorkhand[]
    apu_apu: CIDEINAPU[]
    apu_transportation: CIDEINTransportation[]
    apu_description: string
}

interface APUNoId extends Omit<APU, "apu_id"> {
    apu_chapter: string;
}

interface CIDEINAPU extends Omit<APU, "apu_materials" | "apu_equipment" | "apu_workHand"> {
    apu_rud: number
    apu_amount: number
    apu_partial_value: number
}


type CIDEINProjectConfig = {
    IVA: number,
    ADMIN: number,
    UNFORESEEN: number,
    UTILITY: number
}

interface CIDEINProject {
    project_general_info: ProjectGeneralInfo
    materials: CIDEINMaterials[],
    equipment: CIDEINEquipment[],
    workHand: CIDEINWorkhand[],
    apus: APU[],
    project_activities: ProjecActivities[]
    budget_prices: BudgetPrices,
    project_config: CIDEINProjectConfig
}

type SmallCard = Omit<Card, "description">

type SearchedApusState = {
    apus: APU[];
    db: "construimos_db" | "local_db";
  }