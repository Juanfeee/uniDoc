"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validaciones/userSchema";
import { Inputs } from "@/types/inputs";
import { DatosPersonales } from "./DatosPersonales";
import { InformacionContacto } from "./InformacionContacto";

type Props = {};

export const InformacionPersona = () => {
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
      <form className="flex flex-col gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px m-auto relative" onSubmit={handleSubmit(onSubmit)}>
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

        <button className="bg-amber-300" type="submit">
          Enviar
        </button>
      </form>
      {/* <DocumentosSoporte /> */}
    </>
  );
};
