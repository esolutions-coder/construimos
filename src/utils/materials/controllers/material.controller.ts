export default class Materiales {
  materiales: CurrentMaterialFromQuery[];
  material: CurrentMaterialFromQuery;

  constructor(materiales: CurrentMaterialFromQuery[]) {
    this.materiales = materiales;
    this.material = materiales[0];
  }

  getState() {
    return JSON.parse(JSON.stringify(this.material)) as CurrentMaterialFromQuery;
  }

}
