"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { ButtonRegresar } from "@/app/componentes/formularios/ButtonRegresar";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import axios from 'axios';

type Inputs = {
  tipo_experiencia: string;
  institucion_experiencia: string;
  trabajo_actual: string;
  cargo: string;
  intensidad_horaria: string;
  experiencia_radio: string;
  fecha_inicio: string;
  fecha_finalizacion: string;
  archivo: FileList;
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

  const experiencia_radio = watch("experiencia_radio");
  const tipo_experiencia = watch("tipo_experiencia");
  const trabajo_actual = watch("trabajo_actual");

  const [labelText, setLabelText] = useState("Fecha de finalización");

  useEffect(() => {
    if (trabajo_actual === "Si") {
      setLabelText("Fecha de expedición de la certificación");
    } else {
      setLabelText("Fecha de finalización");
    }
  }, [trabajo_actual]);

  useEffect(() => {
    if (
      tipo_experiencia === "docencia_universitaria" ||
      tipo_experiencia === "docencia_no_universitaria"
    ) {
      setValue("cargo", "Docente");
    } else {
      setValue("cargo", "");
    }
  }, [tipo_experiencia, setValue]);

  useEffect(() => {
    if (experiencia_radio === "Si") {
      setValue("institucion_experiencia", "Universidad Autonoma de Colombia");
    } else {
      setValue("institucion_experiencia", "");
    }
  }, [experiencia_radio, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const formValues = {
      tipo_experiencia: watch('tipo_experiencia'),
      institucion_experiencia: watch('institucion_experiencia'),
      trabajo_actual: watch('trabajo_actual'),
      cargo: watch('cargo'),
      intensidad_horaria: watch('intensidad_horaria'),
      experiencia_radio: watch('experiencia_radio'),
      fecha_inicio: watch('fecha_inicio'),
      fecha_finalizacion: watch('fecha_finalizacion'),
      archivo: watch('archivo')
    };

    const formData = new FormData();
    formData.append('tipo_experiencia', formValues.tipo_experiencia);
    formData.append('institucion_experiencia', formValues.institucion_experiencia);
    formData.append('trabajo_actual', formValues.trabajo_actual);
    formData.append('cargo', formValues.cargo);
    formData.append('intensidad_horaria', formValues.intensidad_horaria);
    formData.append('experiencia_radio', formValues.experiencia_radio);
    formData.append('fecha_inicio', formValues.fecha_inicio);
    formData.append('fecha_finalizacion', formValues.fecha_finalizacion);
    
    if (formValues.archivo && formValues.archivo[0]) {
      formData.append('archivo', formValues.archivo[0]);
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("No hay token de autenticación");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/aspirante/crear-experiencia`;

    try {
      await toast.promise(
        axios.post(url, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 20000
        }),
        {
          pending: "Enviando datos...",
          success: "Datos guardados correctamente",
          error: "Error al guardar los datos"
        }
      );
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      // Cambiamos la pagina a la de estudios
      window.location.href = "/index";
    }
    console.log("Datos enviados:", formValues);
  };
  

  return (
    <form
      className="flex flex-col gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:grid grid-cols-3 gap-x-8 bg-white gap-y-6 py-12 px-8 rounded-xl">
        <div className='flex gap-x-4 col-span-full'>
          <Link href={"/index"}>
            <ButtonRegresar />
          </Link>
          <h3 className="font-bold text-3xl col-span-full">
            Agregar experiencia
          </h3>
        </div>
        
        <div className="flex flex-col sm:grid md:grid-cols-2 sm:col-span-full gap-4">
          <div className="flex flex-col w-full">
            <InputLabel htmlFor="tipo_experiencia" value="Tipo de experiencia" />
            <SelectForm
              id="tipo_experiencia"
              register={register("tipo_experiencia")}
              url='tipos-experiencia'
              data_url='tipo_experiencia'
            />
            <InputErros errors={errors} name="tipo_experiencia" />
          </div>

          <div className="flex flex-col w-full">
            <InputLabel htmlFor="si" value="Experiencia en universidad autonoma" />
            <div className="flex flex-wrap justify-start px-2 sm:justify-star items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC] border-[#D1DBE8] sm:h-11">
              <label className="flex items-center gap-x-1 cursor-pointer">
                <TextInput
                  type="radio"
                  id="si_experiencia"
                  value="Si"
                  {...register("experiencia_radio")}
                />
                <span>Si</span>
              </label>
              <label className="flex items-center gap-x-1 cursor-pointer">
                <TextInput
                  type="radio"
                  id="no_experiencia"
                  value="No"
                  {...register("experiencia_radio")}
                />
                <span>No</span>
              </label>
            </div>
            <InputErros errors={errors} name="experiencia_radio" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4">
          <div className="flex flex-col w-full">
            <InputLabel htmlFor="institucion_experiencia" value="Institución" />
            <TextInput
              id="institucion_experiencia"
              placeholder="Institución"
              {...register("institucion_experiencia")}
            />
            <InputErros errors={errors} name="institucion_experiencia" />
          </div>
          <div className="flex flex-col w-full">
            <InputLabel htmlFor="cargo" value="Cargo" />
            <TextInput id="cargo" placeholder="Cargo" {...register("cargo")} />
            <InputErros errors={errors} name="cargo" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4">
          <div className="flex flex-col w-full">
            <InputLabel htmlFor="" value="¿Es su trabajo actual?" />
            <div className="flex flex-wrap justify-start px-4 sm:justify-star items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC] border-[#D1DBE8] sm:h-11">
              <label className="flex items-center gap-x-1 cursor-pointer">
                <TextInput
                  type="radio"
                  id="si_trabajo_actual"
                  value="Si"
                  {...register("trabajo_actual")}
                />
                <span>Si</span>
              </label>
              <label className="flex items-center gap-x-1 cursor-pointer">
                <TextInput
                  type="radio"
                  id="no_trabajo_actual"
                  value="No"
                  {...register("trabajo_actual")}
                />
                <span>No</span>
              </label>
            </div>
            <InputErros errors={errors} name="trabajo_actual" />
          </div>
          <div className="flex flex-col w-full">
            <InputLabel
              htmlFor="intensidad_horaria"
              value="Intensidad horaria (Horas)"
            />
            <TextInput
              type="number"
              id="intensidad_horaria"
              placeholder="Intensidad horaria"
              {...register("intensidad_horaria")}
            />
            <InputErros errors={errors} name="intensidad_horaria" />
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
            <InputLabel htmlFor="fecha_finalizacion" value={labelText} />
            <TextInput
              type="date"
              id="fecha_finalizacion"
              {...register("fecha_finalizacion")}
            />
            <InputErros errors={errors} name="fecha_finalizacion" />
          </div>
        </div>

        <div>
            <InputLabel htmlFor="archivo" value="Archivo" />
            <input type="file" id="archivo" {...register("archivo")} accept=".pdf, .jpg, .png" className="w-full h-11 rounded-lg border-[1.8px] border-blue-600 bg-slate-100/40 p-3 text-sm text-slate-950/90 placeholder-slate-950/60 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition duration-300 ease-in-out" />
            <InputErros errors={errors} name="archivo" />
          </div>
        
        <div className="flex justify-center col-span-full">
          <ButtonPrimary type="submit" value="Agregar experiencia" />
        </div>
      </div>
    </form>
  );
};

export default AgregarExperiencia;
