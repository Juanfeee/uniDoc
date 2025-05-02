"use client"
import React, { useEffect, useState } from 'react'
import { InputLabel } from '../componentes/formularios/InputLabel'
import { SelectForm } from '../componentes/formularios/SelectForm'
import InputErros from '../componentes/formularios/InputErrors'
import TextInput from '../componentes/formularios/TextInput'
import axios from 'axios';
import { FieldErrors, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

type Props = {
  watch: UseFormWatch<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

// type inputs es un objeto que contiene los campos del formulario esto es para que typescript pueda inferir el tipo de dato de cada campo
export type Inputs = {
  nombre_eps: string;
  tipo_afiliacion: string;
  estado_afiliacion: string;
  fecha_afiliacion_efectiva: string;
  fecha_finalizacion_afiliacion: string;
  tipo_afiliado: string;
  numero_afiliado: string;
  archivo: FileList | null;
}


//await axios.post(url,formData){
//   headers: {
//     "Content-Type": "application/json",}
//}

//formData
export const Eps = ({ watch, setValue, handleSubmit, onSubmit, register, errors }: Props) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/aspirantes/crear-eps"

  const formData = {
    nombre_eps: watch("nombre_eps"),
    tipo_afiliacion: watch("tipo_afiliacion"),
    estado_afiliacion: watch("estado_afiliacion"),
    fecha_afiliacion_efectiva: watch("fecha_afiliacion_efectiva"),
    fecha_finalizacion_afiliacion: watch("fecha_finalizacion_afiliacion"),
    tipo_afiliado: watch("tipo_afiliado"),
    numero_afiliado: watch("numero_afiliado")
  }

  const onSubmitHandler = async (data: FormData) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Datos enviados correctamente");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al enviar los datos");
    }
  };



  const [acordeonAbierto, setAcordeonAbierto] = useState(false)

  const toggleAcordeon = () => {
    setAcordeonAbierto(!acordeonAbierto)
  }

  return (
    <div className="grid flex-col gap-y-4 md:grid-cols-2 sm:gap-y-10 sm:gap-x-4 gap-y-6 py-6 px-8">
      <div className="grid col-span-full md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
        <div className="flex flex-col">
          <InputLabel
            htmlFor="tipo_afiliacion"
            value="Tipo de afiliación"
          />
          <SelectForm
            id="tipo_afiliacion"
            register={register("tipo_afiliacion")}
          />
        </div>
        <div className="">
          <InputLabel htmlFor="nombre_eps" value="Nombre de la eps" />
          <TextInput
            className="w-full"
            id="nombre_eps"
            type="text"
            placeholder="Nombre de la eps..."
            {...register("nombre_eps")}
          />
          <InputErros errors={errors} name="nombre_eps" />
        </div>
        <div className="flex flex-col">
          <InputLabel
            htmlFor="estado_afiliacion"
            value="Estado de afiliación"
          />
          <SelectForm
            id="estado_afiliacion"
            register={register("tipo_afiliacion")}
          />
        </div>
      </div>
      <div className='grid col-span-full md:grid-cols-2 gap-x-8 gap-y-4 w-full'>
        <div>
          <InputLabel
            htmlFor="fecha_afiliacion_efectiva"
            value="Fecha de afiliación efectiva"
          />
          <TextInput
            className="w-full"
            id="fecha_afiliacion_efectiva"
            type="date"
            {...register("fecha_afiliacion_efectiva")}
          />
          <InputErros errors={errors} name="fecha_afiliacion_efectiva" />
        </div>
        <div>
          <InputLabel
            htmlFor="fecha_finalizacion_afiliacion"
            value="Fecha de finalización de afiliación"
          />
          <TextInput
            className="w-full"
            id="fecha_finalizacion_afiliacion"
            type="date"
            {...register("fecha_finalizacion_afiliacion")}
          />
          <InputErros errors={errors} name="fecha_finalizacion_afiliacion" />
        </div>
      </div>
      <div className='grid col-span-full sm:grid-cols-2 gap-x-8 gap-y-4 w-full'>
        <div className="flex flex-col">
          <InputLabel htmlFor="tipo_afiliado" value="Tipo de afiliado" />
          <SelectForm
            id="tipo_afiliado"
            register={register("tipo_afiliado")}
          />
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="numero_afiliado" value="Número de afiliado" />
          <TextInput
            className="w-full"
            id="numero_afiliado"
            type="text"
            placeholder="Número de afiliado..."
            {...register("numero_afiliado")}
          />
          <InputErros errors={errors} name="numero_afiliado" />
        </div>
      </div>
    </div>

  )
}
