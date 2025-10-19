
  
  export default class ATSSubTask {
    subTask: ATSSubTaskFromQuery;
  
    constructor(subTask: ATSSubTaskFromQuery) {
      this.subTask = subTask;
    }
  
    get stateCopy() {
      return JSON.parse(JSON.stringify(this.subTask)) as ATSSubTaskFromQuery;
    }

    updateSection(section: Sections, index: number, newValue: boolean){
        this.subTask.riskIdentification[section][index].isActive = !newValue
    }
    
    deleteElement(section: SubTaskSection, index: number){
      this.subTask[section].splice(index, 1)
    }

    subTaskToApi(){
      delete this.subTask._id
      return this.subTask
    }
  }
  