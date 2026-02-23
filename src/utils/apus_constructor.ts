class ApuCreator {
  apu_name: string;
  apu_unit: string;
  apu_price: number;
  apu_materials: CIDEINMaterials[];
  apu_equipment: CIDEINEquipment[];
  apu_description: string;
  apu_workHand: CIDEINWorkhand[];
  apu_apu: CIDEINAPU[];
  apu_chapter: string;
  apu_transportation: CIDEINTransportation[];
  apu_id: string;
  _id: string;

  constructor(
    _id: string,
    apu_name: string,
    apu_unit: string,
    apu_price: number,
    apu_materials: CIDEINMaterials[],
    apu_equipment: CIDEINEquipment[],
    apu_description: string,
    apu_workHand: CIDEINWorkhand[],
    apu_transportation: CIDEINTransportation[],
    apu_apu: CIDEINAPU[],
    apu_chapter: string
  ) {
    this._id = _id;
    this.apu_name = apu_name;
    this.apu_unit = apu_unit;
    this.apu_price = apu_price;
    this.apu_materials = apu_materials;
    this.apu_equipment = apu_equipment;
    this.apu_description = apu_description;
    this.apu_workHand = apu_workHand;
    this.apu_apu = apu_apu;
    this.apu_chapter = apu_chapter;
    this.apu_transportation = apu_transportation;
    this.apu_id = ""
  }

  get state() {
    return JSON.parse(
      JSON.stringify({
        _id: this._id,
        apu_id: this.apu_id,
        apu_name: this.apu_name,
        apu_unit: this.apu_unit,
        apu_price: this.apu_price,
        apu_materials: this.apu_materials,
        apu_equipment: this.apu_equipment,
        apu_description: this.apu_description,
        apu_workHand: this.apu_workHand,
        apu_apu: this.apu_apu,
        apu_chapter: this.apu_chapter,
        apu_transportation: this.apu_transportation,
      })
    );
  }

  updateApuName(newName: string) {
    this.apu_name = newName;
  }

  updateApuUnit(newUnit: string) {
    this.apu_unit = newUnit;
  }

  updateApuDescription(newDesc: string) {
    this.apu_description = newDesc;
  }

  updateApuAmount(newAmount: number, itemInfo: string) {
    //ItemInfo structure = (mat, eqp, mdo)*code
    const itemSplitInfo = itemInfo.split("*");

    if (itemSplitInfo[0] === "MAT") {
      const materialIndex = this.apu_materials.findIndex((material) => material.material_code === itemSplitInfo[1]);

      this.apu_materials[materialIndex].material_amount = newAmount;
    }

    if (itemSplitInfo[0] === "TPT") {
      const materialIndex = this.apu_transportation.findIndex((transportation) => transportation.transportation_code === itemSplitInfo[1]);

      this.apu_transportation[materialIndex].transportation_amount = newAmount;
    }

    if (itemSplitInfo[0] === "EQP") {
      const equipmentIndex = this.apu_equipment.findIndex((equipment) => equipment.equipment_code === itemSplitInfo[1]);

      this.apu_equipment[equipmentIndex].equipment_amount = newAmount;
    }

    if (itemSplitInfo[0] === "MDO") {
      const equipmentIndex = this.apu_workHand.findIndex((workHand) => workHand.workHand_code === itemSplitInfo[1]);

      this.apu_workHand[equipmentIndex].workHand_amount = newAmount;
    }

    if (itemSplitInfo[0] === "APU") {
      const apuIndex = this.apu_apu.findIndex((apu) => apu.apu_id === itemSplitInfo[1]);

      this.apu_apu[apuIndex].apu_amount = newAmount;
    }

    this.calculateApuCost();
  }

  updateApuRud(newRud: number, itemInfo: string) {
    //ItemInfo structure = (mat, eqp, mdo)*code
    const itemSplitInfo = itemInfo.split("*");

    if (itemSplitInfo[0] === "APU") {
      const apuIndex = this.apu_apu.findIndex((apu) => apu.apu_id === itemSplitInfo[1]);

      this.apu_apu[apuIndex].apu_rud = newRud;
    }

    this.calculateApuCost();
  }

  updateApuChapter(newChapter: string) {
    this.apu_chapter = newChapter;
  }

  addMaterial(material: CIDEINMaterials) {
    this.apu_materials.push(JSON.parse(JSON.stringify({ ...material, material_partial_value: 0, material_amount: 0 })));
  }

  addEquipment(equipment: CIDEINEquipment) {
    this.apu_equipment.push(JSON.parse(JSON.stringify({ ...equipment, equipment_partial_value: 0, equipment_amount: 0 })));
  }

  addWorkHand(workkHand: CIDEINWorkhand) {
    this.apu_workHand.push(JSON.parse(JSON.stringify({ ...workkHand, workHand_partial_value: 0, workHand_amount: 0 })));
  }

  addTransportation(transportation: CIDEINTransportation) {
    this.apu_transportation.push(JSON.parse(JSON.stringify({ ...transportation, transportation_partial_value: 0, transportation_amount: 0 })));
  }

  addApu(apu: CIDEINAPU) {
    this.apu_apu.push(JSON.parse(JSON.stringify({ ...apu, apu_amount: 0, apu_rud: 0, apu_partial_value: 0 })));
  }

    public calculateApuCost() {
    let materialCost = 0;
    let equipmentCost = 0;
    let workHandCost = 0;
    let apuCost = 0;
    for (let i = 0; i < this.apu_materials.length; i++) {
      const currentMaterial = this.apu_materials[i];
      const partialValue = currentMaterial.material_amount * currentMaterial.material_unitary_price * (1 + currentMaterial.material_rud);

      materialCost += partialValue;

      currentMaterial.material_partial_value = partialValue;
    }

    for (let i = 0; i < this.apu_equipment.length; i++) {
      const currentEquipment = this.apu_equipment[i];
      const partialValue = currentEquipment.equipment_amount * currentEquipment.equipment_unitary_price * (1 + currentEquipment.equipment_rud);

      equipmentCost += partialValue;

      currentEquipment.equipment_partial_value = partialValue;
    }

    for (let i = 0; i < this.apu_workHand.length; i++) {
      const currentWorkHand = this.apu_workHand[i];
      const partialValue = currentWorkHand.workHand_amount * currentWorkHand.workHand_unitary_price * (1 + currentWorkHand.workHand_rud);

      currentWorkHand.workHand_partial_value = partialValue;

      workHandCost += partialValue;
    }

    for (let i = 0; i < this.apu_apu.length; i++) {
      const currentApu = this.apu_apu[i];
      const partialValue = currentApu.apu_price * currentApu.apu_amount * (1 + currentApu.apu_rud);

      currentApu.apu_partial_value = partialValue;

      apuCost += partialValue;
    }

    for (let i = 0; i < this.apu_transportation.length; i++) {
      const currentTransportation = this.apu_transportation[i];
      const partialValue =
        currentTransportation.transportation_unitary_price *
        currentTransportation.transportation_amount *
        (1 + currentTransportation.transportation_rud);

      currentTransportation.transportation_partial_value = partialValue;

      apuCost += partialValue;
    }

    this.apu_price = workHandCost + materialCost + equipmentCost + apuCost;
  }

  deleteItem(itemType: string, itemId: string) {
    if (itemType === "APU") {
      const itemIndex = this.apu_apu.findIndex((apu) => apu.apu_id === itemId);
      return this.apu_apu.splice(itemIndex, 1);
    }
    if (itemType === "MAT") {
      const itemIndex = this.apu_materials.findIndex((material) => material.material_code === itemId);
      return this.apu_materials.splice(itemIndex, 1);
    }
    if (itemType === "EQP") {
      const itemIndex = this.apu_equipment.findIndex((equipment) => equipment.equipment_code === itemId);
      return this.apu_equipment.splice(itemIndex, 1);
    }
    if (itemType === "MDO") {
      const itemIndex = this.apu_workHand.findIndex((workHand) => workHand.workHand_code === itemId);
      return this.apu_workHand.splice(itemIndex, 1);
    }
    if (itemType === "TPT") {
      const itemIndex = this.apu_transportation.findIndex((transportation) => transportation.transportation_code === itemId);
      return this.apu_transportation.splice(itemIndex, 1);
    }
  }

  serializeApu() {
    const rawApu = {
      apuData: {
        apu_name: this.apu_name,
        apu_unit: this.apu_unit,
        apu_price: this.apu_price,
        apu_chapter: this.apu_chapter,
        apu_materials: this.serializedMaterials(),
        apu_equipment: this.serializedEquipment(),
        apu_workHand: this.serializedWorkHand(),
        apu_description: this.apu_description,
        apu_transportation: this.serializedTransportation(),
        apu_apu: this.parseApu(),
      },
    };
    return rawApu;
  }

  serializedEquipment() {
    const serializedEqp = [];
    for (let i = 0; i < this.apu_equipment.length; i++) {
      let currentEquipment = this.apu_equipment[i];
      serializedEqp.push({ equipment_id: currentEquipment.equipment_code, equipment_amount: currentEquipment.equipment_amount });
    }
    return serializedEqp;
  }

  serializedTransportation() {
    const serializedTransp = [];
    for (let i = 0; i < this.apu_transportation.length; i++) {
      let currentTransportation = this.apu_transportation[i];
      serializedTransp.push({
        transportation_id: currentTransportation.transportation_code,
        transportation_amount: currentTransportation.transportation_amount,
      });
    }
    return serializedTransp;
  }

  serializedMaterials() {
    const serializedMat = [];
    for (let i = 0; i < this.apu_materials.length; i++) {
      let currentMaterial = this.apu_materials[i];
      serializedMat.push({ material_id: currentMaterial.material_code, material_amount: currentMaterial.material_amount });
    }
    return serializedMat;
  }

  serializedWorkHand() {
    const serializedMdo = [];
    for (let i = 0; i < this.apu_workHand.length; i++) {
      let currentWorkHand = this.apu_workHand[i];
      serializedMdo.push({ workHand_id: currentWorkHand.workHand_code, workHand_amount: currentWorkHand.workHand_amount });
    }
    return serializedMdo;
  }

  //Extrae la informacion generica del APU, es decir apu_id, apu_amount, apu_rud
  parseApu() {
    const parsedApus = [];
    for (let i = 0; i < this.apu_apu.length; i++) {
      let currentApu = this.apu_apu[i];
      parsedApus.push({ apu_id: currentApu.apu_id, apu_amount: currentApu.apu_amount, apu_rud: currentApu.apu_rud });
    }
    return parsedApus;
  }

  updateApu() {
    const newApu = {
      _id: this._id,
      apu_name: this.apu_name,
      apu_unit: this.apu_unit,
      apu_price: this.apu_price,
      apu_materials: this.apu_materials,
      apu_equipment: this.apu_equipment,
      apu_workHand: this.apu_workHand,
      apu_description: this.apu_description,
      apu_apu: this.apu_apu,
      apu_chapter: this.apu_chapter,
      apu_transportation: this.apu_transportation,
    };
    return newApu;
  }

  static CalculateApuCost(apu: APU) {
    let materialCost = 0;
    let equipmentCost = 0;
    let workHandCost = 0;
    let apuCost = 0;
    for (let i = 0; i < apu.apu_materials.length; i++) {
      const currentMaterial = apu.apu_materials[i];
      const partialValue = currentMaterial.material_amount * currentMaterial.material_unitary_price * (1 + currentMaterial.material_rud);

      materialCost += partialValue;

      currentMaterial.material_partial_value = partialValue;
    }

    for (let i = 0; i < apu.apu_equipment.length; i++) {
      const currentEquipment = apu.apu_equipment[i];
      const partialValue = currentEquipment.equipment_amount * currentEquipment.equipment_unitary_price * (1 + currentEquipment.equipment_rud);

      equipmentCost += partialValue;

      currentEquipment.equipment_partial_value = partialValue;
    }

    for (let i = 0; i < apu.apu_workHand.length; i++) {
      const currentWorkHand = apu.apu_workHand[i];
      const partialValue = currentWorkHand.workHand_amount * currentWorkHand.workHand_unitary_price * (1 + currentWorkHand.workHand_rud);

      currentWorkHand.workHand_partial_value = partialValue;

      workHandCost += partialValue;
    }

    for (let i = 0; i < apu.apu_apu.length; i++) {
      const currentApu = apu.apu_apu[i];
      const partialValue = currentApu.apu_price * currentApu.apu_amount * (1 + currentApu.apu_rud);

      currentApu.apu_partial_value = partialValue;

      apuCost += partialValue;
    }

    for (let i = 0; i < apu.apu_transportation.length; i++) {
      const currentTransportation = apu.apu_transportation[i];
      const partialValue =
        currentTransportation.transportation_unitary_price *
        currentTransportation.transportation_amount *
        (1 + currentTransportation.transportation_rud);

      currentTransportation.transportation_partial_value = partialValue;

      apuCost += partialValue;
    }

    let apu_price = workHandCost + materialCost + equipmentCost + apuCost;

    return {
      _id: apu._id,
      apu_id: apu.apu_id,
      apu_name: apu.apu_name,
      apu_unit: apu.apu_unit,
      apu_price: apu_price,
      apu_materials: apu.apu_materials,
      apu_equipment: apu.apu_equipment,
      apu_workHand: apu.apu_workHand,
      apu_description: apu.apu_description,
      apu_apu: apu.apu_apu,
      apu_transportation: apu.apu_transportation,
      apu_chapter: apu.apu_chapter,
    };
  }

  deleteApuInfo() {
    const newApu = {
      _id: "",
      apu_name: "",
      apu_unit: "",
      apu_price: 0,
      apu_materials: [],
      apu_equipment: [],
      apu_workHand: [],
      apu_description: "",
      apu_apu: [],
      apu_chapter: "",
      apu_transportation: [],
    };
    return newApu;
  }
}

export default ApuCreator;
