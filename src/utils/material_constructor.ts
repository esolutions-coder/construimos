class MaterialCreator {
    materials: CIDEINMaterials[];

    constructor(materialList: CIDEINMaterials[]) {
        this.materials = materialList;
    }

    deleteRepeated() {
        for (let i = 0; i < this.materials.length; i++) {
            const currentMaterial = this.materials[i]
            if (this.checkRepeatedCode(currentMaterial.material_code)) {
                this.materials.splice(i, 1)
            }
            else {
                console.log("sin repetir")
            }
        }
    }

    parseNumbers() {
        for (let i = 0; i < this.materials.length; i++) {
            const currentMaterial = this.materials[i]
            currentMaterial.material_rud = parseFloat(currentMaterial.material_rud.toString())
            currentMaterial.material_unitary_price = parseFloat(currentMaterial.material_unitary_price.toString())
        }
    }

    updateMaterials() {
        // this.deleteRepeated()
        this.parseNumbers()
        return JSON.parse(JSON.stringify(this.materials))
    }

    deleteMaterials(materialCode: string) {
        const matchCode = (currentMaterial: string, incomingCode: string) => {

            if (currentMaterial === incomingCode) {
                return true
            }
            return false
        }
        const materialIndex = this.materials.findIndex(material => matchCode(material.material_code, materialCode))

        return this.materials.splice(materialIndex, 1)
    }

    checkRepeatedCode(codeToChek: string) {
        return this.materials.some(material => material.material_code === codeToChek)
    }
}

export default MaterialCreator