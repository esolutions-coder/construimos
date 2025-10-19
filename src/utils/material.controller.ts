export default class Materiales {
  materiales: MaterialfromQuery[];
  material: MaterialfromQuery;

  constructor(materiales: MaterialfromQuery[]) {
    this.materiales = materiales;
    this.material = materiales[0];
  }

  getState() {
    return JSON.parse(JSON.stringify(this.material)) as MaterialfromQuery;
  }
}
