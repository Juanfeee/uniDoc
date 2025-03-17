"use client";
import { InputLabel } from "../componentes/formularios/InputLabel";
import { LabelRadio } from "../componentes/formularios/LabelRadio";
import PrimaryButton from "../componentes/formularios/PrimaryButton";

import { SelectForm } from "../componentes/formularios/SelectForm";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "../componentes/formularios/TextInput";
import { userSchema } from "@/validaciones/userSchema";
import InputErros from "../componentes/formularios/InputErros";

type Props = {};

type Inputs = {
  tipo_identificacion: string;
  identificacion: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: string;
  pais: string;
  departamento?: string;
  ciudad: string;
  genero: string;
};
export const DatosPersonales = () => {
  const {
    //register es una funcion que se encarga de registrar los inputs se usa
    //handleSubmit es una funcion que se encarga de manejar el submit del formulario
    //watch es una funcion que se encarga de observar los cambios de los inputs
    //formState es un objeto que contiene los errores del formulario de userSchema
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(userSchema) });

  return (
    <>
      <div className="flex flex-col gap-y-4 bg-white p-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]  m-auto relative">
        <h3 className="font-bold text-3xl">Agregar datos personales</h3>
        <form
          onSubmit={handleSubmit(() => { })}
          className="flex flex-col gap-y-4 sm:grid grid-cols-2 sm:gap-y-10 sm:gap-x-4"
        >
          <div className="flex flex-col">
            <InputLabel
              htmlFor="tipo_identificacion"
              value="Tipo de identificacion"
            />

            <SelectForm
              id="tipo_identificacion"
              register={register("tipo_identificacion")}
            />
            <InputErros errors={errors} name="tipo_identificacion" />
          </div>
          <div className="flex flex-col">
            <InputLabel htmlFor="identificacion" value="Identificacion" />
            <TextInput
              id="identificacion"
              type="number"
              {...register("identificacion")}
              placeholder="Identificación..."
            />
            <InputErros errors={errors} name="identificacion" />
          </div>
          <div className="grid col-span-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 w-full">
            <div className="">
              <InputLabel htmlFor="primer_nombre" value="Primer nombre" />
              <TextInput
                className="w-full"
                id="primer_nombre"
                type="text"
                placeholder="Primer nombre..."
                {...register("primer_nombre")}
              />
              <InputErros errors={errors} name="primer_nombre" />
            </div>

            <div className="">
              <InputLabel htmlFor="segundo_nombre" value="Segundo nombre" />
              <TextInput
                className="w-full"
                id="segundo_nombre"
                type="text"
                placeholder="Segundo nombre..."
                {...register("segundo_nombre")}
              />
              <InputErros errors={errors} name="segundo_nombre" />
            </div>

            <div className="">
              <InputLabel htmlFor="primer_apellido" value="Primer apellido" />
              <TextInput
                className="w-full"
                id="primer_apellido"
                type="text"
                placeholder="Primer apellido..."
                {...register("primer_apellido")}
              />
              <InputErros errors={errors} name="primer_apellido" />
            </div>

            <div className="">
              <InputLabel htmlFor="segundo_apellido" value="Segundo apellido" />
              <TextInput
                className="w-full"
                id="segundo_apellido"
                type="text"
                placeholder="Segundo apellido..."
                {...register("segundo_apellido")}
              />
              <InputErros errors={errors} name="segundo_apellido" />
            </div>
          </div>
          <div className="grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-8">
            <div className="flex flex-col sm:col-span-full lg:col-span-1">
              <InputLabel
                htmlFor="fecha_nacimiento"
                value="Fecha de nacimiento"
              />
              <TextInput
                id="fecha_nacimiento"
                type="date"
                {...register("fecha_nacimiento")}
              />
              <InputErros errors={errors} name="fecha_nacimiento" />
            </div>
            <div>
              <InputLabel htmlFor="pais" value="Pais" />
              <SelectForm
                id="pais"
                register={register("pais")}
              />
              <InputErros errors={errors} name="pais" />
            </div>
            <div>
              <InputLabel htmlFor="departamento" value="Departamento" />
              <SelectForm
                id="departamento"
                register={register("departamento")}
              />
              <InputErros errors={errors} name="departamento" />
            </div>
            <div>
              <InputLabel htmlFor="ciudad" value="Ciudad" />
              <SelectForm
                id="ciudad"
                register={register("ciudad")}
              />
              <InputErros errors={errors} name="ciudad" />
            </div>
          </div>

          <div className="sm:col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 w-full items-center justify-center gap-y-4">
            <div className=" lg:col-span-2 ">
              <InputLabel>Genero</InputLabel>
              <div className="flex flex-wrap justify-start px-2 sm:justify-center items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] ">
                <div className="flex items-center gap-x-1">
                  <LabelRadio htmlFor="masculino">Masculino</LabelRadio>
                  <TextInput
                    type="radio"
                    id="masculino"
                    value="masculino"
                    {...register("genero")}
                  />
                </div>
                <div className="flex items-center gap-x-1">
                  <LabelRadio htmlFor="femenino">Femenino</LabelRadio>
                  <TextInput
                    type="radio"
                    id="femenino"
                    value="femenino"
                    {...register("genero")}

                  />
                </div>
                <div className="flex items-center gap-x-1">
                  <LabelRadio htmlFor="otro">Otro</LabelRadio>
                  <TextInput
                    type="radio"
                    id="otro"
                    value="otro"
                    {...register("genero")}
                  />
                </div>
              </div>
              <InputErros errors={errors} name="genero" />

            </div>
            {/* <div className="flex flex-col col-span-1">
              <InputLabel htmlFor="otro_genero" value="¿Cual?" />
              <TextInput
                id="otro_genero"
                type="text"
                placeholder="Escriba su genero..."
                
              />
            </div> */}
            <div className="flex flex-col">
            </div>
          </div>
          <div className="flex flex-col">
            {JSON.stringify(watch(), null, 2)}
          </div>
          <button className="bg-amber-300" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};
