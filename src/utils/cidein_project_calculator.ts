function calculateTotals(project: CIDEINProject) {
    //Calcular subtotal de las actividades
    const activities = project.project_activities;
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
    project.budget_prices.direct_costs = directCosts;
    /**COSTOS DE ADMINISTRACION
     * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
     */
    project.budget_prices.admin = directCosts * project.project_config.admin
    /**COSTOS POR IMPREVISTOS
     * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
     */
    project.budget_prices.unforeseen = directCosts * project.project_config.unforeseen
    /**UTILIDAD
    * Son un porcentaje de los costos directos, debe ser asignado por el usuario en las configuraciones del proyecto
    */
    project.budget_prices.utility = directCosts * project.project_config.utility
    /**IVA
   * Es un porcentaje calculado sobre el valor de la utilidad
   */
    project.budget_prices.IVA = project.budget_prices.utility * project.project_config.iva

    /**VALOR TOTAL
     * Es la suma de los costos por administracion, imprevistos, utilidad, iva y costos directos
     */
    project.budget_prices.total_cost = project.budget_prices.admin + project.budget_prices.unforeseen + project.budget_prices.IVA + project.budget_prices.utility + directCosts

    return project
}

export { calculateTotals }