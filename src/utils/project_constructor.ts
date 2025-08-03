class CideinProject {
    project_general_info: ProjectGeneralInfo
    materials: CIDEINMaterials[]
    equipment: CIDEINEquipment[]
    workHand: CIDEINWorkhand[]
    apus: APU[]
    project_activities: ProjecActivities[]
    budget_prices: BudgetPrices
    project_config: CIDEINProjectConfig
    newIva!: number
    newAdmin!: number
    newUnforeseen!: number
    newUtility!: number
    project: { materials: CIDEINMaterials[]; equipment: CIDEINEquipment[]; workHand: CIDEINWorkhand[]; apus: APU[]; project_activities: ProjecActivities[]; budget_prices: BudgetPrices; project_config: CIDEINProjectConfig, project_general_info: ProjectGeneralInfo }
    activityId!: string
    newValue!: number
    subActivity!: SubActivities
    subActivities!: SubActivities
    newTitle!: string
    newDescription!: string
    apuId!: string
    apuInfo!: APU
    subActivityId!: string

    constructor(materials: CIDEINMaterials[], equipment: CIDEINEquipment[], workHand: CIDEINWorkhand[], apus: APU[], project_activities: ProjecActivities[], budget_prices: BudgetPrices, project_config: CIDEINProjectConfig, project_general_info: ProjectGeneralInfo) {
        this.project_general_info = project_general_info
        this.materials = materials
        this.equipment = equipment
        this.workHand = workHand
        this.apus = apus
        this.project_activities = project_activities
        this.budget_prices = budget_prices
        this.project_config = project_config

        this.project = {
            materials: this.materials,
            equipment: this.equipment,
            workHand: this.workHand,
            apus: this.apus,
            project_activities: this.project_activities,
            budget_prices: this.budget_prices,
            project_config: this.project_config,
            project_general_info: this.project_general_info
        }
    }

    get title() {
        return this.project.project_general_info.name
    }

    set title(newName: string) {
        this.project.project_general_info.name = newName
    }

    get description() {
        return this.project.project_general_info.name
    }

    set description(newDescription: string) {
        this.project.project_general_info.name = newDescription
    }

    get fullProject() {
        return {
            materials: this.materials,
            equipment: this.equipment,
            workHand: this.workHand,
            apus: this.apus,
            project_activities: this.project_activities,
            budget_prices: this.budget_prices,
            project_config: this.project_config,
            project_general_info: this.project_general_info
        }
    }

    realUpdate() {
        const fullProject = {
            materials: this.materials,
            equipment: this.equipment,
            workHand: this.workHand,
            apus: this.apus,
            project_activities: this.project_activities,
            budget_prices: this.budget_prices,
            project_config: this.project_config,
            project_general_info: this.project_general_info
        }

        return fullProject
    }

    updateProject() {
        //Calcular subtotal de las actividades
        const activities = this.project.project_activities;
        let total_activity;
        let directCosts = 0;
        for (let i = 0; i < activities.length; i++) {
            total_activity = 0;
            const currentActivity = activities[i]
            const subActivity = currentActivity.subActivities
            for (let j = 0; j < subActivity.length; j++) {
                const currentSubActivity = subActivity[j]
                //Calculo del valor total de la sub actividad seleccionada
                currentSubActivity.subActivity_total = currentSubActivity.amount * currentSubActivity.subActivity_apu.apu_price
                //El total de la actividad es el resultado de la multiplicación de la cantidad por el valor unitario
                total_activity += currentSubActivity.subActivity_total
            }
            currentActivity.subtotal_activity = total_activity;
            /**COSTOS DIRECTOS
             * Los costos directos son el resultado de la suma de todos los subtotales de las actividades
             */
            directCosts += currentActivity.subtotal_activity
        }

        //Asignar la variable direcCosts a budget_prices > direct_costs
        this.project.budget_prices.direct_costs = directCosts;
        /**COSTOS DE ADMINISTRACION
         * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
         */
        this.project.budget_prices.admin = directCosts * this.project.project_config.ADMIN
        /**COSTOS POR IMPREVISTOS
         * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
         */
        this.project.budget_prices.unforeseen = directCosts * this.project.project_config.UNFORESEEN
        /**UTILIDAD
        * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
        */
        this.project.budget_prices.utility = directCosts * this.project.project_config.UTILITY
        /**IVA
       * Es un porcentaje calculado sobre el valor de la utilidad
       */
        this.project.budget_prices.IVA = this.project.budget_prices.utility * this.project.project_config.IVA

        /**VALOR TOTAL
         * Es la suma de los costos por administracion, imprevistos, utilidad, iva y costos directos
         */
        this.project.budget_prices.total_cost = this.project.budget_prices.admin + this.project.budget_prices.unforeseen + this.project.budget_prices.IVA + this.project.budget_prices.utility + directCosts

        return JSON.parse(JSON.stringify(this.project))
    }

    calculateBudget() {
        //Calcular subtotal de las actividades
        const activities = this.project.project_activities;
        let total_activity;
        let directCosts = 0;
        for (let i = 0; i < activities.length; i++) {
            total_activity = 0;
            const currentActivity = activities[i]
            const subActivity = currentActivity.subActivities
            for (let j = 0; j < subActivity.length; j++) {
                const currentSubActivity = subActivity[j]
                //Calculo del valor total de la sub actividad seleccionada
                currentSubActivity.subActivity_total = currentSubActivity.amount * currentSubActivity.subActivity_apu.apu_price
                //El total de la actividad es el resultado de la multiplicación de la cantidad por el valor unitario
                total_activity += currentSubActivity.subActivity_total
            }
            currentActivity.subtotal_activity = total_activity;
            /**COSTOS DIRECTOS
             * Los costos directos son el resultado de la suma de todos los subtotales de las actividades
             */
            directCosts += currentActivity.subtotal_activity
        }

        //Asignar la variable direcCosts a budget_prices > direct_costs
        this.project.budget_prices.direct_costs = directCosts;
        /**COSTOS DE ADMINISTRACION
         * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
         */
        this.project.budget_prices.admin = directCosts * this.project.project_config.ADMIN
        /**COSTOS POR IMPREVISTOS
         * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
         */
        this.project.budget_prices.unforeseen = directCosts * this.project.project_config.UNFORESEEN
        /**UTILIDAD
        * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
        */
        this.project.budget_prices.utility = directCosts * this.project.project_config.UTILITY
        /**IVA
       * Es un porcentaje calculado sobre el valor de la utilidad
       */
        this.project.budget_prices.IVA = this.project.budget_prices.utility * this.project.project_config.IVA

        /**VALOR TOTAL
         * Es la suma de los costos por administracion, imprevistos, utilidad, iva y costos directos
         */
        this.project.budget_prices.total_cost = this.project.budget_prices.admin + this.project.budget_prices.unforeseen + this.project.budget_prices.IVA + this.project.budget_prices.utility + directCosts
    }

    updateIva(newIva: number) {
        this.project_config.IVA = newIva;
        this.calculateBudget()
    }

    updateAdmin(newAdmin: number) {
        this.project_config.ADMIN = newAdmin;
        this.calculateBudget()
    }

    updateUnforeseen(newUnforeseen: number) {
        this.project_config.UNFORESEEN = newUnforeseen;
        this.calculateBudget()
    }

    updateUtility(newUtility: number) {
        this.project_config.UTILITY = newUtility;
        this.calculateBudget()
    }

    updateSubActivityAmount(activityId: string, subActivityId: string, newValue: number) {
        this.activityId = activityId;
        this.newValue = newValue;
        const activityIndex = this.project.project_activities.findIndex(activityId => activityId.activity_id === this.activityId)

        const selectedActivity = this.project.project_activities[activityIndex]
        const subActivityIndex = selectedActivity.subActivities.findIndex(subActivity => subActivity.subActivity_id === subActivityId)

        this.project.project_activities[activityIndex].subActivities[subActivityIndex].amount = this.newValue
    }

    updateSubActivityPrice(activityId: string, subActivityId: string, newValue: number) {
        this.activityId = activityId;
        this.newValue = newValue;
        const activityIndex = this.project.project_activities.findIndex(activityId => activityId.activity_id === this.activityId)

        const selectedActivity = this.project.project_activities[activityIndex]
        const subActivityIndex = selectedActivity.subActivities.findIndex(subActivity => subActivity.subActivity_id === subActivityId)

        this.project.project_activities[activityIndex].subActivities[subActivityIndex].subActivity_apu.apu_price = this.newValue
    }

    subActivityCalculator(subActivities: SubActivities): number {
        this.subActivities = subActivities
        const materials = this.subActivities.subActivity_apu.apu_materials;
        const materials_cost = materials.reduce((prev, curr) => prev + curr.material_partial_value, 0)

        const equipment = this.subActivities.subActivity_apu.apu_equipment;
        const equipment_cost = equipment.reduce((prev, curr) => prev + curr.equipment_partial_value, 0)

        const workHand = this.subActivities.subActivity_apu.apu_workHand;
        const workHand_cost = workHand.reduce((prev, curr) => prev + curr.workHand_partial_value, 0)

        const transportation = this.subActivities.subActivity_apu.apu_transportation;
        const transportation_cost = transportation.reduce((prev, curr) => prev + curr.transportation_partial_value, 0)

        const subApu = this.subActivities.subActivity_apu.apu_apu;
        const subApu_cost = subApu.reduce((prev, curr) => prev + curr.apu_partial_value, 0)

        const total_cost = materials_cost + equipment_cost + workHand_cost + transportation_cost + subApu_cost

        return parseFloat(total_cost.toFixed(3))
    }

    addSubActivity(activityId: string, subActivity: SubActivities) {
        this.subActivity = subActivity;
        if (this.project_activities.length !== 0) {
            const activityIndex = this.project.project_activities.findIndex(activity => activity.activity_id === activityId)

            this.subActivity.subActivity_apu.apu_price = this.subActivityCalculator(this.subActivity);

            this.project.project_activities[activityIndex].subActivities = [...this.project.project_activities[activityIndex].subActivities, this.subActivity]

            return subActivity
        }

    }

    addActivity(activityInfo: ProjecActivities) {
        this.project.project_activities.push(activityInfo);
    }

    deleteActivity(activityId: string) {
        this.activityId = activityId;
        const currentActivityIndex = this.project.project_activities.findIndex(activity => activity.activity_id === activityId)

        const removedActivityInfo = this.project.project_activities.splice(currentActivityIndex, 1)

        return removedActivityInfo
    }

    activitiesList() {
        let activitiesList: [{ name: string, id: string }] = [{ name: "", id: "" }];

        for (let i = 0; i < this.project.project_activities.length; i++) {
            const currentActivity = this.project.project_activities[i]
            const currentActivityInfo = {
                name: currentActivity.activity_name,
                id: currentActivity.activity_id
            }
            activitiesList.push(currentActivityInfo)
        }

        activitiesList.shift();

        return activitiesList
    }

    changeActivityName(activityId: string, newActivityName: string): void {
        const currentActivity = this.project.project_activities.find(activity => activity.activity_id === activityId)
        if (currentActivity) {
            currentActivity.activity_name = newActivityName
        }
    }

    //Recalcula El precio final del APU proveniende de la base de datos con base en sus componentes
    APUCalculator(apuInfo: APU): APU {
        this.apuInfo = JSON.parse(JSON.stringify(apuInfo))
        const materials = this.apuInfo.apu_materials
        const equipment = this.apuInfo.apu_equipment
        const workHand = this.apuInfo.apu_workHand
        const subApu = this.apuInfo.apu_apu
        const transportation = this.apuInfo.apu_transportation
        let subTotal: number = 0;

        //Analize apu data --> Materials
        for (let i = 0; i < materials?.length; i++) {
            const currentMaterial = materials[i]
            const analizedPartialValue = (currentMaterial.material_amount * currentMaterial.material_unitary_price) * (1 + currentMaterial.material_rud)
            currentMaterial.material_partial_value = analizedPartialValue;

            subTotal += analizedPartialValue
        }

        //Analize apu data --> Equipment
        for (let i = 0; i < equipment?.length; i++) {
            const currentEquipment = equipment[i]
            const analizedPartialValue = (currentEquipment.equipment_amount * currentEquipment.equipment_unitary_price) * (1 + currentEquipment.equipment_rud)

            currentEquipment.equipment_partial_value = analizedPartialValue;
            subTotal += analizedPartialValue
        }

        //Analize apu data --> WorkHand
        for (let i = 0; i < workHand?.length; i++) {
            const currentWorkHand = workHand[i]
            const analizedPartialValue = (currentWorkHand.workHand_amount * currentWorkHand.workHand_unitary_price) * (1 + currentWorkHand.workHand_rud)

            currentWorkHand.workHand_partial_value = analizedPartialValue;
            subTotal += analizedPartialValue
        }

        //Analize apu data --> subApu
        for (let i = 0; i < subApu?.length; i++) {
            const currentApu = subApu[i]
            const analizedPartialValue = (currentApu.apu_amount * currentApu.apu_price) * (1 + currentApu.apu_rud)

            currentApu.apu_partial_value = analizedPartialValue;
            subTotal += analizedPartialValue
        }

        //Analize apu data --> Transportation
        for (let i = 0; i < transportation?.length; i++) {
            const currentTransport = transportation[i]
            const analizedPartialValue = (currentTransport.transportation_amount * currentTransport.transportation_unitary_price) * (1 + currentTransport.transportation_rud)

            currentTransport.transportation_partial_value = analizedPartialValue;
            subTotal += analizedPartialValue
        }

        this.apuInfo.apu_price = subTotal

        return (this.apuInfo)
    }

    deleteSubActivity(activityId: string, subActivityId: string) {
        this.activityId = activityId;
        this.subActivityId = subActivityId;

        const activityIndex = this.project.project_activities.findIndex(activity => activity.activity_id === this.activityId);

        const subActivityIndex = this.project.project_activities[activityIndex].subActivities.findIndex(subActivity => subActivity.subActivity_id === this.subActivityId);

        const removedSubActivity = this.project.project_activities[activityIndex].subActivities.splice(subActivityIndex, 1)

        return removedSubActivity
    }
}


export default CideinProject