export type Dot = {
    x: string;
    y: string;
    title: string;
    checks: string[];
    id: string,
    isActive: boolean
  };

export type MachineTypes = {
    title: string,
    dots: Dot[]
    type: string
}

export default class Machine {
    info: MachineTypes;
  
    constructor(machine: MachineTypes) {
      this.info = machine;
    }
  
    get stateCopy() {
      return JSON.parse(JSON.stringify(this.info)) as MachineTypes;
    }
  
    addDots(dotInfo: Dot){
      this.info.dots.push(dotInfo);
    }

    addItemToDot(dotId: string, dotItem: string){
      let dotIndex = this.selectDot(dotId)
      dotIndex.checks.push(dotItem);
    }

    dotTitle(dotId: string, dotTitle: string){
      let dotIndex = this.info.dots.findIndex(dot=>dot.id === dotId);
      this.info.dots[dotIndex].title = dotTitle;
    }

    selectDot(dotId: string){
      this.setToFalse()
      let dotIndex = this.info.dots.findIndex(dot=>dot.id === dotId);
      let dotInfo = this.info.dots[dotIndex];
      if(dotInfo){
        dotInfo.isActive = true;
      }
      return (dotInfo)
    }

    setToFalse(){
      this.info.dots.forEach(dot=>dot.isActive = false)
    }

    deleteDot(dotId: string){
      this.setToFalse()
      let dotIndex = this.info.dots.findIndex(dot=>dot.id === dotId);
      this.info.dots.splice(dotIndex, 1)
    }
  }
  