"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validaciones/datosPersonaSchema";
import { Inputs } from "@/types/inputs";
import { DatosPersonales } from "@/app/datosPersona/DatosPersonales";
import { InformacionContacto } from "@/app/datosPersona/InformacionContacto";

import { Formulario } from "@/app/componentes/formulario";
import { informacionPersonaSchema } from "@/validaciones/informacionPersonaSchema";
import { Eps } from "@/app/datosPersona/Eps";
import { epsSchema } from "@/validaciones/epsSchema";
import { Rut } from "@/app/datosPersona/Rut";



const InformacionPersona = () => {

  return (
    <>
      <div className="flex w-full flex-col gap-y-8 lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative">
        <Formulario
          Componente={DatosPersonales}
          Ruta="actualizar-usuario"
          Texto="Agregar datos personales"
          Schema={userSchema} />
        <Formulario Componente={InformacionContacto}
          Schema={informacionPersonaSchema}
          Texto="Agregar informacion de contacto"
        />
        <Formulario Componente={Eps}
          Texto="Agregar eps"
          Schema={epsSchema} />
        <Formulario Componente={Rut}
          Texto="Agregar rut"
          Schema={informacionPersonaSchema} />
      </div>
    </>
  );
};
export default InformacionPersona;