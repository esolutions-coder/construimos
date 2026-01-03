export default class Constructors {
  constructorss: ConstructorFromQuery[];

  constructor(constructors: ConstructorFromQuery[]) {
    this.constructorss = constructors;
  }

  getState() {
    return JSON.parse(
      JSON.stringify(this.constructorss)
    ) as ConstructorFromQuery;
  }
}
