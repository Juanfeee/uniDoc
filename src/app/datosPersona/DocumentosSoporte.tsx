"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdjuntarArchivo } from "../componentes/formularios/AdjuntarArchivo";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validaciones/datosPersonaSchema";
import { Archivo } from "next/font/google";
import InputErros from "../componentes/formularios/InputErrors";

type Props = {};
type Inputs = {
  archivo: FileList;
};
export const DocumentosSoporte = (props: Props) => {
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
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(data.archivo[0]);

  return (
    <>
      <div className="flex flex-col gap-y-4 bg-white p-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px m-auto relative py-8 px-8">
        <h3 className="font-bold text-3xl">DocumentosSoporte</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AdjuntarArchivo id="archivo" {...register("archivo")} />
          <InputErros errors={errors} name="archivo" />

          <button className="bg-amber-300" type="submit">
            Enviar
          </button>
        </form>
        <div className="flex flex-col col-span-full">
          {JSON.stringify(watch(), null, 2)}
        </div>
      </div>
    </>
  );
};
