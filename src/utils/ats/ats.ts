

export default class ATS {
  ats: ATSFromQuery;

  constructor(ats: ATSFromQuery) {
    this.ats = ats;
  }

  get stateCopy() {
    return JSON.parse(JSON.stringify(this.ats)) as ATSFromQuery;
  }

  updateSection(section: Sections, index: number, newValue: boolean){
    this.ats.specificTask.riskIdentification[section][index].isActive = !newValue
}

  //   get toApi():ATSToAPI {

  //   }
}
