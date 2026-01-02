// src/context/MyContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import CideinProject from "../../../utils/project_constructor";
import Project from "../../../assets/info_json/project_info.json";
import ApuMock from "../../../assets/info_json/layout_apu.json";
import ApuCreator from "../../../utils/apus_constructor";

// Define la forma de tu contexto
interface BudgetContextType {
  currentProject: CideinProject
  currentApu: ApuCreator
}

// Crea el contexto con undefined inicial
const MyContext = createContext<BudgetContextType | undefined>(undefined);


const currentProject = new CideinProject(
  Project.apus,
  Project.local_apus,
  Project.local_materials,
  Project.local_equipment,
  Project.local_transportation,
  Project.local_workHand,
  Project.project_activities,
  Project.budget_prices,
  Project.project_config,
  Project.project_general_info,
  Project.user_id
);

const currentApu = new ApuCreator(
  ApuMock._id,
  ApuMock.apu_name,
  ApuMock.apu_unit,
  ApuMock.apu_price,
  ApuMock.apu_materials,
  ApuMock.apu_equipment,
  ApuMock.apu_description,
  ApuMock.apu_workHand,
  ApuMock.apu_transportation,
  ApuMock.apu_apu,
  ApuMock.apu_chaper
);

// Proveedor del contexto
export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MyContext.Provider value={{ currentProject, currentApu }}>
      {children}
    </MyContext.Provider>
  );
};

// Hook para usar el contexto más fácilmente
export const useBudgetContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useBudgetContext debe usarse dentro de BudgetProvider");
  return context;
};
