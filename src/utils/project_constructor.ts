import ApuCreator from "./apus_constructor";

class CideinProject {
  project_general_info: ProjectGeneralInfo;
  apus: APU[];
  local_apus: APU[];
  local_materials: CIDEINMaterials[];
  local_equipment: CIDEINEquipment[];
  local_workHand: CIDEINWorkhand[];
  local_transportation: CIDEINTransportation[];
  project_activities_initial_state!: ProjecActivitiesInitialState[];
  project_activities: ProjecActivities[];
  budget_prices: BudgetPrices;
  project_config: CIDEINProjectConfig;
  newIva!: number;
  newAdmin!: number;
  newUnforeseen!: number;
  newUtility!: number;
  activityId!: string;
  newValue!: number;
  subActivity!: SubActivities;
  subActivities!: SubActivities;
  newTitle!: string;
  newDescription!: string;
  apuId!: string;
  apuInfo!: APU;
  subActivityId!: string;
  user_id: string;

  constructor(
    apus: APU[],
    local_apus: APU[],
    local_materials: CIDEINMaterials[],
    local_equipment: CIDEINEquipment[],
    local_transportation: CIDEINTransportation[],
    local_workHand: CIDEINWorkhand[],
    project_activities_initial_state: ProjecActivitiesInitialState[],
    budget_prices: BudgetPrices,
    project_config: CIDEINProjectConfig,
    project_general_info: ProjectGeneralInfo,
    user_id: string
  ) {
    this.project_general_info = project_general_info;
    this.apus = apus;
    this.local_apus = local_apus;
    this.local_materials = local_materials;
    this.local_equipment = local_equipment;
    this.local_transportation = local_transportation;
    this.local_workHand = local_workHand;
    this.project_activities = this.projectActivitiesBuilder(project_activities_initial_state);
    this.budget_prices = budget_prices;
    this.project_config = project_config;
    this.project_activities_initial_state = project_activities_initial_state;
    this.user_id = user_id;
  }

  get state(): CIDEINProject {
    this.updateProject();
    return {
      apus: this.apus,
      project_activities: this.project_activities,
      budget_prices: this.budget_prices,
      project_config: this.project_config,
      project_general_info: this.project_general_info,
      local_apus: this.local_apus,
    };
  }

  get toApi() {
    this.updateProject();
    let toApiJson = {
      project_general_info: { ...this.project_general_info, total_cost: this.budget_prices.total_cost, date: new Date() },
      project_config: this.project_config,
      apus: this.apus,
      local_apus: this.local_apus,
      project_activities: this.projectActivityToApi(this.project_activities),
      user_id: this.user_id,
    };
    return JSON.parse(JSON.stringify(toApiJson));
  }

    // Estos metodos son los necesarios para construir el proyecto una vez se ha cargado la informacion desde la base de datos
  projectActivitiesBuilder(activitiesData: ProjecActivitiesInitialState[]): ProjecActivities[] {
    const builtActivities = activitiesData.map((activity) => {
      let subActivities = this.projectSubActivitiesBuilder(activity.subActivities);
      return {
        activity_id: activity.activity_id,
        activity_name: activity.activity_name,
        subtotal_activity: this.calculateActivitySubtotal(subActivities),
        subActivities: subActivities,
      };
    });

    return builtActivities;
  }

  projectActivityToApi(activities: ProjecActivities[]): ProjecActivitiesInitialState[] {
    return activities.map((activity) => {
      return {
        activity_id: activity.activity_id,
        activity_name: activity.activity_name,
        subActivities: activity.subActivities.map((subActivity) => {
          return {
            amount: subActivity.amount,
            subActivity_id: subActivity.subActivity_id,
            flag: subActivity.flag,
            subActivity_apu: {
              apu_id: subActivity.subActivity_apu.apu_id,
              _id: subActivity.subActivity_apu._id,
            },
          };
        }),
      };
    });
  }



  //MODULO ACTIVIDADES
  calculateActivitySubtotal(subActivities: SubActivities[]): number {
    let subtotal = 0;
    for (let i = 0; i < subActivities.length; i++) {
      const currentSubActivity = subActivities[i];
      subtotal += currentSubActivity.subActivity_total;
    }
    return subtotal;
  }

  projectSubActivitiesBuilder(subActivitiesData: SubActivitiesInitialState[]): SubActivities[] {
    return subActivitiesData.map((subActivity) => ({
      amount: subActivity.amount,
      subActivity_id: subActivity.subActivity_id,
      flag: subActivity.flag,
      subActivity_apu: ApuCreator.CalculateApuCost(this.searchApuFromId(subActivity.subActivity_apu.apu_id, subActivity.flag)!),
      subActivity_total: 0, //ApuCreator.CalculateApuCost(this.searchApuFromId(subActivity.subActivity_apu.apu_id, subActivity.flag)!).apu_price,
    }));
  }

  searchApuFromId(id: string, db: string) {
    let foundApu: APU | undefined;
    if (db === "construimos_db") {
      foundApu = this.apus.find((apu) => apu.apu_id === id);
    } else if (db === "local_db") {
      foundApu = this.local_apus.find((apu) => apu.apu_id === id);
    }
    return foundApu;
  }

  minimizeProjectActivities(activities: ProjecActivities[]) {
    const minimizedActivities = activities.map((activity) => {
      return {
        activity_id: activity.activity_id,
        activity_name: activity.activity_name,
        subActivities: activity.subActivities.map((subActivity) => ({
          amount: subActivity.amount,
          subActivity_id: subActivity.subActivity_id,
          subActivity_apu: {
            apu_id: subActivity.subActivity_apu.apu_id,
            flag: subActivity.flag,
          },
        })),
        subtotal_activity: activity.subtotal_activity,
      };
    });

    return minimizedActivities;
  }

  minimizeApus(apus: APU[]) {
    const minimizedApus = apus.map((apu) => {
      return {
        apu_name: apu.apu_name,
        apu_unit: apu.apu_unit,
        apu_description: apu.apu_description,
        apu_materials: apu.apu_materials.map((material) => ({
          material_id: material._id,
          material_amount: material.material_amount,
        })),
        apu_equipment: apu.apu_equipment.map((equipment) => ({
          equipment_id: equipment._id,
          equipment_amount: equipment.equipment_amount,
        })),
        apu_transportation: apu.apu_transportation.map((transportation) => ({
          transportation_id: transportation._id,
          transportation_amount: transportation.transportation_amount,
        })),
        apu_workHand: apu.apu_workHand.map((workHand) => ({
          workHand_id: workHand._id,
          workHand_amount: workHand.workHand_amount,
        })),
      };
    });

    return minimizedApus;
  }

  updateProject() {
    //Calcular subtotal de las actividades
    const activities = this.project_activities;
    let total_activity;
    let directCosts = 0;
    for (let i = 0; i < activities.length; i++) {
      total_activity = 0;
      const currentActivity = activities[i];
      const subActivity = currentActivity.subActivities;
      for (let j = 0; j < subActivity.length; j++) {
        const currentSubActivity = subActivity[j];
        //Calculo del valor total de la sub actividad seleccionada
        currentSubActivity.subActivity_total = currentSubActivity.amount * currentSubActivity.subActivity_apu.apu_price;
        //El total de la actividad es el resultado de la multiplicación de la cantidad por el valor unitario
        total_activity += currentSubActivity.subActivity_total;
      }
      currentActivity.subtotal_activity = total_activity;
      /**COSTOS DIRECTOS
       * Los costos directos son el resultado de la suma de todos los subtotales de las actividades
       */
      directCosts += currentActivity.subtotal_activity;
    }

    //Asignar la variable direcCosts a budget_prices > direct_costs
    this.budget_prices.direct_costs = directCosts;
    /**COSTOS DE ADMINISTRACION
     * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
     */
    this.budget_prices.admin = directCosts * this.project_config.admin;
    /**COSTOS POR IMPREVISTOS
     * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
     */
    this.budget_prices.unforeseen = directCosts * this.project_config.unforeseen;
    /**UTILIDAD
     * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
     */
    this.budget_prices.utility = directCosts * this.project_config.utility;
    /**IVA
     * Es un porcentaje calculado sobre el valor de la utilidad
     */
    this.budget_prices.IVA = this.budget_prices.utility * this.project_config.iva;

    /**VALOR TOTAL
     * Es la suma de los costos por administracion, imprevistos, utilidad, iva y costos directos
     */
    this.budget_prices.total_cost =
      this.budget_prices.admin + this.budget_prices.unforeseen + this.budget_prices.IVA + this.budget_prices.utility + directCosts;
  }

  calculateBudget() {
    //Calcular subtotal de las actividades
    const activities = this.project_activities;
    let total_activity;
    let directCosts = 0;
    for (let i = 0; i < activities.length; i++) {
      total_activity = 0;
      const currentActivity = activities[i];
      const subActivity = currentActivity.subActivities;
      for (let j = 0; j < subActivity.length; j++) {
        const currentSubActivity = subActivity[j];
        //Calculo del valor total de la sub actividad seleccionada
        currentSubActivity.subActivity_total = currentSubActivity.amount * currentSubActivity.subActivity_apu.apu_price;
        //El total de la actividad es el resultado de la multiplicación de la cantidad por el valor unitario
        total_activity += currentSubActivity.subActivity_total;
      }
      currentActivity.subtotal_activity = total_activity;
      /**COSTOS DIRECTOS
       * Los costos directos son el resultado de la suma de todos los subtotales de las actividades
       */
      directCosts += currentActivity.subtotal_activity;
    }
    // The calculateBudget and updateProject methods are nearly identical.
    // The only difference is that calculateBudget does not call updateProject at the beginning.
    // You can refactor the code to avoid duplication if needed.
    //Asignar la variable direcCosts a budget_prices > direct_costs
    this.budget_prices.direct_costs = directCosts;
    /**COSTOS DE ADMINISTRACION
     * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
     */
    this.budget_prices.admin = directCosts * this.project_config.admin;
    /**COSTOS POR IMPREVISTOS
     * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
     */
    this.budget_prices.unforeseen = directCosts * this.project_config.unforeseen;
    /**UTILIDAD
     * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
     */
    this.budget_prices.utility = directCosts * this.project_config.utility;
    /**IVA
     * Es un porcentaje calculado sobre el valor de la utilidad
     */
    this.budget_prices.IVA = this.budget_prices.utility * this.project_config.iva;

    /**VALOR TOTAL
     * Es la suma de los costos por administracion, imprevistos, utilidad, iva y costos directos
     */
    this.budget_prices.total_cost =
      this.budget_prices.admin + this.budget_prices.unforeseen + this.budget_prices.IVA + this.budget_prices.utility + directCosts;
  }

  updateIva(newIva: number) {
    this.project_config.iva = newIva;
    this.calculateBudget();
  }

  updateAdmin(newAdmin: number) {
    this.project_config.admin = newAdmin;
    this.calculateBudget();
  }

  updateUnforeseen(newUnforeseen: number) {
    this.project_config.unforeseen = newUnforeseen;
    this.calculateBudget();
  }

  updateUtility(newUtility: number) {
    this.project_config.utility = newUtility;
    this.calculateBudget();
  }

  updateSubActivityAmount(activityId: string, subActivityId: string, newValue: number) {
    this.activityId = activityId;
    this.newValue = newValue;
    const activityIndex = this.project_activities.findIndex((activityId) => activityId.activity_id === this.activityId);

    const selectedActivity = this.project_activities[activityIndex];
    const subActivityIndex = selectedActivity.subActivities.findIndex((subActivity) => subActivity.subActivity_id === subActivityId);

    this.project_activities[activityIndex].subActivities[subActivityIndex].amount = this.newValue;
  }

  updateSubActivityPrice(activityId: string, subActivityId: string, newValue: number) {
    this.activityId = activityId;
    this.newValue = newValue;
    const activityIndex = this.project_activities.findIndex((activityId) => activityId.activity_id === this.activityId);

    const selectedActivity = this.project_activities[activityIndex];
    const subActivityIndex = selectedActivity.subActivities.findIndex((subActivity) => subActivity.subActivity_id === subActivityId);

    this.project_activities[activityIndex].subActivities[subActivityIndex].subActivity_apu.apu_price = this.newValue;
  }

  subActivityCalculator(subActivities: SubActivities): number {
    this.subActivities = subActivities;
    const materials = this.subActivities.subActivity_apu.apu_materials;
    const materials_cost = materials.reduce((prev, curr) => prev + curr.material_partial_value, 0);

    const equipment = this.subActivities.subActivity_apu.apu_equipment;
    const equipment_cost = equipment.reduce((prev, curr) => prev + curr.equipment_partial_value, 0);

    const workHand = this.subActivities.subActivity_apu.apu_workHand;
    const workHand_cost = workHand.reduce((prev, curr) => prev + curr.workHand_partial_value, 0);

    const transportation = this.subActivities.subActivity_apu.apu_transportation;
    const transportation_cost = transportation.reduce((prev, curr) => prev + curr.transportation_partial_value, 0);

    const subApu = this.subActivities.subActivity_apu.apu_apu;
    const subApu_cost = subApu.reduce((prev, curr) => prev + curr.apu_partial_value, 0);

    const total_cost = materials_cost + equipment_cost + workHand_cost + transportation_cost + subApu_cost;

    return parseFloat(total_cost.toFixed(3));
  }

  addSubActivity(activityId: string, subActivity: SubActivities) {
    this.subActivity = subActivity;
    if (this.project_activities.length !== 0) {
      const activityIndex = this.project_activities.findIndex((activity) => activity.activity_id === activityId);

      this.subActivity.subActivity_apu.apu_price = this.subActivityCalculator(this.subActivity);

      this.project_activities[activityIndex].subActivities = [...this.project_activities[activityIndex].subActivities, this.subActivity];

      return subActivity;
    }
  }

  addActivity(activityInfo: ProjecActivities) {
    this.project_activities.push(activityInfo);
  }

  deleteActivity(activityId: string) {
    this.activityId = activityId;
    const currentActivityIndex = this.project_activities.findIndex((activity) => activity.activity_id === activityId);

    const removedActivityInfo = this.project_activities.splice(currentActivityIndex, 1);

    return removedActivityInfo;
  }

  activitiesList() {
    let activitiesList: [{ activity_name: string; activity_id: string }] = [{ activity_name: "", activity_id: "" }];

    for (let i = 0; i < this.project_activities.length; i++) {
      const currentActivity = this.project_activities[i];
      const currentActivityInfo = {
        activity_name: currentActivity.activity_name,
        activity_id: currentActivity.activity_id,
      };
      activitiesList.push(currentActivityInfo);
    }

    activitiesList.shift();

    return activitiesList;
  }

  changeActivityName(activityId: string, newActivityName: string): void {
    const currentActivity = this.project_activities.find((activity) => activity.activity_id === activityId);
    if (currentActivity) {
      currentActivity.activity_name = newActivityName;
    }
  }

  //Recalcula El precio final del APU proveniende de la base de datos con base en sus componentes
  APUCalculator(apuInfo: APU): APU {
    this.apuInfo = JSON.parse(JSON.stringify(apuInfo));
    const materials = this.apuInfo.apu_materials;
    const equipment = this.apuInfo.apu_equipment;
    const workHand = this.apuInfo.apu_workHand;
    const subApu = this.apuInfo.apu_apu;
    const transportation = this.apuInfo.apu_transportation;
    let subTotal: number = 0;

    //Analize apu data --> Materials
    for (let i = 0; i < materials?.length; i++) {
      const currentMaterial = materials[i];
      const analizedPartialValue = currentMaterial.material_amount * currentMaterial.material_unitary_price * (1 + currentMaterial.material_rud);
      currentMaterial.material_partial_value = analizedPartialValue;

      subTotal += analizedPartialValue;
    }

    //Analize apu data --> Equipment
    for (let i = 0; i < equipment?.length; i++) {
      const currentEquipment = equipment[i];
      const analizedPartialValue =
        currentEquipment.equipment_amount * currentEquipment.equipment_unitary_price * (1 + currentEquipment.equipment_rud);

      currentEquipment.equipment_partial_value = analizedPartialValue;
      subTotal += analizedPartialValue;
    }

    //Analize apu data --> WorkHand
    for (let i = 0; i < workHand?.length; i++) {
      const currentWorkHand = workHand[i];
      const analizedPartialValue = currentWorkHand.workHand_amount * currentWorkHand.workHand_unitary_price * (1 + currentWorkHand.workHand_rud);

      currentWorkHand.workHand_partial_value = analizedPartialValue;
      subTotal += analizedPartialValue;
    }

    //Analize apu data --> subApu
    for (let i = 0; i < subApu?.length; i++) {
      const currentApu = subApu[i];
      const analizedPartialValue = currentApu.apu_amount * currentApu.apu_price * (1 + currentApu.apu_rud);

      currentApu.apu_partial_value = analizedPartialValue;
      subTotal += analizedPartialValue;
    }

    //Analize apu data --> Transportation
    for (let i = 0; i < transportation?.length; i++) {
      const currentTransport = transportation[i];
      const analizedPartialValue =
        currentTransport.transportation_amount * currentTransport.transportation_unitary_price * (1 + currentTransport.transportation_rud);

      currentTransport.transportation_partial_value = analizedPartialValue;
      subTotal += analizedPartialValue;
    }

    this.apuInfo.apu_price = subTotal;

    return this.apuInfo;
  }

  deleteSubActivity(activityId: string, subActivityId: string) {
    this.activityId = activityId;
    this.subActivityId = subActivityId;

    const activityIndex = this.project_activities.findIndex((activity) => activity.activity_id === this.activityId);

    const subActivityIndex = this.project_activities[activityIndex].subActivities.findIndex(
      (subActivity) => subActivity.subActivity_id === this.subActivityId
    );

    const removedSubActivity = this.project_activities[activityIndex].subActivities.splice(subActivityIndex, 1);

    return removedSubActivity;
  }

  filterApusByUserInput(userInput: string): APU[] {
    const filteredApus = this.local_apus.filter((apu) => apu.apu_name.toLowerCase().includes(userInput.toLowerCase()));
    return filteredApus;
  }

  filterApuById(apuId: string): APU | undefined {
    const filteredApu = this.local_apus.find((apu) => apu._id === apuId);
    return filteredApu;
  }

  addMaterial(data: CIDEINMaterials){
    this.local_materials.push(data);
  }
  addEquipment(data: CIDEINEquipment){
    this.local_equipment.push(data);
  }
  addTransportation(data: CIDEINTransportation){
    this.local_transportation.push(data);
  }
  addWorkhand(data: CIDEINWorkhand){
    this.local_workHand.push(data);
  }

  searchLocalMaterialsByString(string: string){
    //search in this.local_materials by string filtering material_name
    return this.local_materials.filter((material) => 
      material.material_name.toLowerCase().includes(string.toLowerCase())
    );
  }

  searchLocalEquipmentByString(string: string){
    //search in this.local_equipment by string filtering material_name
    return this.local_equipment.filter((equipment) => 
      equipment.equipment_name.toLowerCase().includes(string.toLowerCase())
    );
  }

  searchLocalWorkhandByString(string: string){
    //search in this.local_workHand by string filtering material_name
    return this.local_workHand.filter((workHand) => 
      workHand.workHand_name.toLowerCase().includes(string.toLowerCase())
    );
  }

  searchLocalTransportationByString(string: string){
    //search in this.local_transportation by string filtering material_name
    return this.local_transportation.filter((transportation) => 
      transportation.transportation_name.toLowerCase().includes(string.toLowerCase())
    );
  }

  searchLocalApuByString(string: string){
    //search in this.local_apus by string filtering material_name
    return this.local_apus.filter((apu) => 
      apu.apu_name.toLowerCase().includes(string.toLowerCase())
    );
  }
}

export default CideinProject;
