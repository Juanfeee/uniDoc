"use client";
import React, { use, useEffect, useState } from "react";
import { InputLabel } from "../../../componentes/formularios/InputLabel";
import TextInput from "../../../componentes/formularios/TextInput";
import { SelectForm } from "../../../componentes/formularios/SelectForm";
import InputErros from "../../../componentes/formularios/InputErrors";
import { SubmitHandler, useForm } from "react-hook-form";
import { LabelRadio } from "../../../componentes/formularios/LabelRadio";
import { ButtonPrimary } from "../../../componentes/formularios/ButtonPrimary";
import { experienciaSchema } from "@/validaciones/experienceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdjuntarArchivo } from "@/app/componentes/formularios/AdjuntarArchivo";

type Props = {};
type Inputs = {
  tipo_experiencia: string;
  institucion: string;
  trabajo_actual: string;
  cargo: string;
  intensidad_semanal: string;
  experiencia_radio: string;
  fecha_inicio: string;
  fecha_fin: string;
};
const AgregarExperiencia = () => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(experienciaSchema),
    defaultValues: {
      experiencia_radio: "no",
      trabajo_actual: "no",
    },
  });
  console.log("Formulario", watch());
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log("Formulario enviado");
    //mensaje de exito
    alert("Formulario enviado");
  };

  const experiencia_radio = watch("experiencia_radio");
  const tipo_estudio = watch("tipo_experiencia");
  const trabajo_actual = watch("trabajo_actual");

  const [labelText, setLabelText] = useState("Fecha de fin");

  useEffect(() => {
    if (trabajo_actual === "si") {
      setLabelText("Fecha de expedición de la certificación");
    } else {
      setLabelText("Fecha de fin");
    }
  }, [trabajo_actual]);

  useEffect(() => {
    if (
      tipo_estudio === "docencia_universitaria" ||
      tipo_estudio === "docencia_no_universitaria"
    ) {
      setValue("cargo", "Docente");
    } else {
      setValue("cargo", "");
    }
  }, [tipo_estudio, setValue]);

  useEffect(() => {
    if (experiencia_radio === "si") {
      setValue("institucion", "Universidad Autonoma de Colombia");
    } else {
      setValue("institucion", "");
    }
  }, [experiencia_radio, setValue]);

  return (
    <form
      className="flex flex-col gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:grid grid-cols-3 gap-x-8 bg-white gap-y-6 py-12 px-8 rounded-xl">
        <h3 className="font-bold text-3xl col-span-full">
          Agregar experiencia
        </h3>
        <div className="flex flex-col sm:grid md:grid-cols-2 sm:col-span-full gap-4">
          <div className="flex flex-col w-full">
            <InputLabel
              htmlFor="tipo_experiencia"
              value="Tipo de experiencia"
            />
            <SelectForm
              id="tipo_experiencia"
              register={register("tipo_experiencia")}
            />
            <InputErros errors={errors} name="tipo_experiencia" />
          </div>

          <div className="flex flex-col  w-full">
            <InputLabel
              htmlFor="si"
              value="Experiencia en universidad autonoma"
            />
            <div className="flex flex-wrap justify-start px-2 sm:justify-star items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] sm:h-11">
              <div className="flex items-center gap-x-1">
                <LabelRadio htmlFor="si_experiencia" value="Si" />
                <TextInput
                  type="radio"
                  id="si_experiencia"
                  value="si"
                  {...register("experiencia_radio")}
                />
              </div>
              <div className="flex items-center gap-x-1">
                <LabelRadio htmlFor="no_experiencia" value="No" />
                <TextInput
                  type="radio"
                  id="no_experiencia"
                  value="no"
                  {...register("experiencia_radio")}
                />
              </div>
            </div>
            <InputErros errors={errors} name="experiencia_radio" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4">
          <div className="flex flex-col w-full">
            <InputLabel htmlFor="institucion" value="Institución" />
            <TextInput
              id="institucion"
              placeholder="Institución"
              {...register("institucion")}
            />
            <InputErros errors={errors} name="institucion" />
          </div>
          <div className="flex flex-col w-full">
            <InputLabel htmlFor="cargo" value="Cargo" />
            <TextInput id="cargo" placeholder="cargo" {...register("cargo")} />
            <InputErros errors={errors} name="cargo" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4">
          <div className="flex flex-col w-full">
            <InputLabel htmlFor="" value="¿Es su trabajo actual?" />
            <div className="flex flex-wrap justify-start px-4 sm:justify-star items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] sm:h-11">
              <div className="flex items-center gap-x-1">
                <LabelRadio htmlFor="si_trabajo_actual" value="Si" />
                <TextInput
                  type="radio"
                  id="si_trabajo_actual"
                  value="si"
                  {...register("trabajo_actual")}
                />
              </div>
              <div className="flex items-center gap-x-1">
                <LabelRadio htmlFor="no_trabajo_actual" value="No" />
                <TextInput
                  type="radio"
                  id="no_trabajo_actual"
                  value="no"
                  {...register("trabajo_actual")}
                />
              </div>
            </div>
            <InputErros errors={errors} name="trabajo_actual" />
          </div>
          <div className="flex flex-col w-full">
            <InputLabel
              htmlFor="intensidad_semanal"
              value="Intensidad semanal(horas)"
            />
            <TextInput
              type="number"
              id="intensidad_semanal"
              placeholder="Intensidad semanal"
              {...register("intensidad_semanal")}
            />
            <InputErros errors={errors} name="intensidad_semanal" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4">
          <div className="flex flex-col">
            <InputLabel htmlFor="fecha_inicio" value="Fecha de inicio" />
            <TextInput
              type="date"
              id="fecha_inicio"
              {...register("fecha_inicio")}
            />
            <InputErros errors={errors} name="fecha_inicio" />
          </div>
          <div className="flex flex-col">
            <InputLabel htmlFor="fecha_fin" value={labelText} />
            <TextInput type="date" id="fecha_fin" {...register("fecha_fin")} />
            <InputErros errors={errors} name="fecha_fin" />
          </div>
        </div>
        <AdjuntarArchivo
          id="adjuntar_archivo"
          value="Adjuntar archivo de experiencia"
        />
        <div className="flex justify-center col-span-full">
          <ButtonPrimary value="Agregar experiencia" />
        </div>
      </div>
    </form>
  );
};
export default AgregarExperiencia;
