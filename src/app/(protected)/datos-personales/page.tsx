"use client";
import { userSchema } from "@/validaciones/datosPersonaSchema";
import { DatosPersonales } from "@/app/datosPersona/DatosPersonales";
import { InformacionContacto } from "@/app/datosPersona/InformacionContacto";
import { Formulario } from "@/app/componentes/formulario";
import { Rut } from "@/app/datosPersona/Rut";
import { ToastContainer } from "react-toastify";
import { EpsFormulario } from "@/app/datosPersona/Eps";



const InformacionPersona = () => {

  return (
    <>
      <ToastContainer />
      <div className="flex w-full flex-col gap-y-8 lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative">
        <DatosPersonales/>
        <InformacionContacto/>
        <EpsFormulario/>

{/* 
        <Rut/> */}
        
      </div>
    </>
  );
};
export default InformacionPersona;