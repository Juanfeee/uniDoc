"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validaciones/userSchema";
import { Inputs } from "@/types/inputs";
import { DatosPersonales } from "./DatosPersonales";
import { InformacionContacto } from "./InformacionContacto";
import { ButtonPrimary } from "../componentes/formularios/ButtonPrimary";
import { AdjuntarArchivo } from "../componentes/formularios/AdjuntarArchivo";

type Props = {};

const InformacionPersona = () => {
  const {
    // useForm es un hook de react-hook-form que se encarga de manejar el estado del formulario
    // register es una funcion que se encarga de registrar los inputs del formulario
    // handleSubmit es una funcion que se encarga de manejar el evento de submit del formulario
    // formState es un objeto que contiene el estado del formulario
    // errors es un objeto que contiene los errores de validacion del formulario
    // watch es una funcion que se encarga de observar los cambios de un campo
    // zod es una libreria que se encarga de validar los campos del formulario
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(userSchema) });
  //El submithandler es una funcion que se encarga de manejar el submit del formulario
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log("Formulario enviado");
    //mensaje de exito
    alert("Formulario enviado");
  };
  console.log("Errores ", errors);
  console.log("Formulario", watch());
  return (
    <>
      <form className="flex flex-col gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative" onSubmit={handleSubmit(onSubmit)}>
        <DatosPersonales
          watch={watch}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
        <InformacionContacto
          watch={watch}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
        <div className="flex flex-col bg-white p-5  justify-center rounded-xl gap-y-4">
        <h3 className="font-bold text-3xl col-span-full">
          Documento de soporte
        </h3>
        <p className="w-3/4 border-l-8 rounded-lg border-blue-500 p-2">
        Tenga presente que …
        El documento de identificación es obligatorio, no se registrará la información del oferente si no se adjunta este archivo. Sólo se permiten archivos en formato PDF. El tamaño máximo permitido para cada archivo es de 2Mb
        </p>
        <AdjuntarArchivo
          id="adjuntar_archivo"
          value="Adjuntar archivo de identificación"
          />
          </div>
        <div className="bg-white p-5 flex items-center justify-center rounded-xl" >
          <ButtonPrimary
            type="submit"
            className="absolute bottom-4 right-4"
            value="Guardar"
          />
        </div>
      </form>
      {/* <DocumentosSoporte /> */}
    </>
  );
};
export default InformacionPersona;