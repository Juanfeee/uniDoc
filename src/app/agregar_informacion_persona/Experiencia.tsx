"use client";
import { InputLabel } from "../componentes/formularios/InputLabel";
import { LabelRadio } from "../componentes/formularios/LabelRadio";
import PrimaryButton from "../componentes/formularios/PrimaryButton";


import { SelectEstadoCivil } from "../componentes/formularios/SelectEstadoCivil";
import { SelectExperiencia } from "../componentes/formularios/SelectExperiencia";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "../componentes/formularios/TextInput";
import { userSchema } from "@/validaciones/userSchema";

type Props = {};


export const Experiencia = () => {
  const {
    //register es una funcion que se encarga de registrar los inputs se usa 
    //handleSubmit es una funcion que se encarga de manejar el submit del formulario
    //watch es una funcion que se encarga de observar los cambios de los inputs
    //formState es un objeto que contiene los errores del formulario de userSchema
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  return (
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]  m-auto relative">
      <h3 className="font-bold text-3xl">Agregar experiencia</h3>
      <form
        onSubmit={handleSubmit(() => {
          console.log("hola");
        })}
        className="flex flex-col gap-y-4 sm:grid grid-cols-2 sm:gap-y-10 sm:gap-x-4"
      >
        <SelectExperiencia register={register("tipo_experiencia")} />
      
        <div className="flex flex-col">
          <InputLabel htmlFor="Institución" value="Institución:* " />
          <TextInput
            id="Institución"
            {...register("Institución")}
            placeholder="Institución..."
          />
        </div>

        {/* Experiencia en Autónoma del Cauca */}
    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 w-full items-center justify-center gap-y-4">
          <div className=" lg:col-span-2 ">
            <InputLabel>¿Experiencia obtenida en la Autónoma del Cauca?</InputLabel>
            <div className="flex w-full justify-between p-3 rounded-md border-2 bg-[#F7FAFC] border-[#D1DBE8]">
              <div className="flex items-center gap-x-1">
                <LabelRadio htmlFor="Si">Si</LabelRadio>
                <TextInput
                  type="radio"
                  id="Si"
                  value="Si"
                  {...register("exp_autonoma")}
                />
              </div>
              <div className="flex items-center gap-x-1">
                <LabelRadio htmlFor="No">No</LabelRadio>
                <TextInput
                  type="radio"
                  id="No"
                  value="No"
                  {...register("exp_autonoma")}
                />
              </div>
            </div>
          </div>
         
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 w-full items-center justify-center gap-y-4">
          <div className=" lg:col-span-2 ">
            <InputLabel>¿Es su trabajo Actual?</InputLabel>
            <div className="flex w-full justify-between p-3 rounded-md border-2 bg-[#F7FAFC] border-[#D1DBE8]">
              <div className="flex items-center gap-x-1">
                <LabelRadio htmlFor="Si">Si</LabelRadio>
                <TextInput
                  type="radio"
                  id="Si"
                  value="Si"
                  {...register("actual_t")}
                />
              </div>
              <div className="flex items-center gap-x-1">
                <LabelRadio htmlFor="No">No</LabelRadio>
                <TextInput
                  type="radio"
                  id="No"
                  value="No"
                  {...register("actual_t")}
                />
              </div>
            </div>
          </div>
         
        </div>
        
      <div className="grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-12">
        <div className="flex flex-col flex-1">
            <InputLabel
              htmlFor="Cargo"
              value="Cargo:* "
            />
            <TextInput
              id="Cargo"
              {...register("Cargo")}
              placeholder="Cargo"
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <InputLabel htmlFor="Intensidad" value="Intensidad:* " />
              <TextInput
                id="Intensidad"
                type="number"
                {...register("Institución")}
                placeholder="Intensidad (Horas Semanales)"
            />
          </div>
        </div>

      

        <div className = "grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-8">
          <div className="flex flex-col sm:col-span-full lg:col-span-1">
            <InputLabel
              htmlFor ="fecha_inicio"
              value ="Fecha de Inicio: "
            />
            <TextInput
              id="fecha_inicio"
              type="date"
              {...register("fecha_inicio")}
            />
          </div>
        </div>

        <div className = "grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-8">
          <div className="flex flex-col sm:col-span-full lg:col-span-1">
            <InputLabel
              htmlFor ="fecha_finalizacion"
              value ="Fecha de finalizacion: "
            />
            <TextInput
              id="fecha_finalizacion"
              type="date"
              {...register("fecha_finalizacion")}
            />
          </div>
        </div>


      <div className="flex flex-col ">
        <div className="mt-2 p-4 border-dashed border-2 rounded-md text-center">
            <p className="text-black-600 font-blond">Certificacion de experiencia</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Añadir experiencia</button>
        </div>

        
        <button className="bg-cyan-400 text-white hover:bg-cyan-300 px-4 py-2 w-auto"  type="submit">
          Guardar
        </button>
      </div>
        
        

      </form>
      <div className="flex flex-col">{JSON.stringify(watch(), null, 2)}</div>
    </div>
  );
};
