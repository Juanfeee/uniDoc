"use client"
import React, { useEffect, useState } from 'react'
import { InputLabel } from '../componentes/formularios/InputLabel'
import { SelectForm } from '../componentes/formularios/SelectForm'
import InputErros from '../componentes/formularios/InputErrors'
import TextInput from '../componentes/formularios/TextInput'

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
  tipo_afiliacion: string;
  nombre_eps: string;
  estado_afiliacion: string;
  fecha_afiliacion_efectiva: string;
  fecha_finalizacion_afiliacion: string;
  tipo_afiliado: string;
  numero_afiliado: string;
}

export const Eps = ({ watch, setValue, handleSubmit, onSubmit, register, errors }: Props) => {
  const [acordeonAbierto, setAcordeonAbierto] = useState(false)

  const toggleAcordeon = () => {
    setAcordeonAbierto(!acordeonAbierto)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 col-span-full gap-y-6 px-8">
      {/* Tipo de afiliación */}
      <div className="flex flex-col">
        <InputLabel htmlFor="tipo_afiliacion" value="Tipo de afiliación" />
        <SelectForm id="tipo_afiliacion" register={register("tipo_afiliacion")} />
        <InputErros errors={errors} name="tipo_afiliacion" />
      </div>

      {/* Nombre de la EPS */}
      <div className="flex flex-col">
        <InputLabel htmlFor="nombre_eps" value="Nombre de la EPS" />
        <TextInput
          id="nombre_eps"
          type="text"
          placeholder="Nombre de la EPS..."
          {...register("nombre_eps")}
        />
        <InputErros errors={errors} name="nombre_eps" />
      </div>

      {/* Estado de afiliación */}
      <div className="flex flex-col">
        <InputLabel htmlFor="estado_afiliacion" value="Estado de afiliación" />
        <SelectForm
          id="estado_afiliacion"
          register={register("estado_afiliacion")}
        />
        <InputErros errors={errors} name="estado_afiliacion" />
      </div>

      {/* Fecha de afiliación efectiva */}
      <div className="flex flex-col">
        <InputLabel
          htmlFor="fecha_afiliacion_efectiva"
          value="Fecha de afiliación efectiva"
        />
        <TextInput
          id="fecha_afiliacion_efectiva"
          type="date"
          {...register("fecha_afiliacion_efectiva")}
        />
        <InputErros errors={errors} name="fecha_afiliacion_efectiva" />
      </div>

      {/* Fecha de finalización de afiliación */}
      <div className="flex flex-col">
        <InputLabel
          htmlFor="fecha_finalizacion_afiliacion"
          value="Fecha de finalización de afiliación"
        />
        <TextInput
          id="fecha_finalizacion_afiliacion"
          type="date"
          {...register("fecha_finalizacion_afiliacion")}
        />
        <InputErros errors={errors} name="fecha_finalizacion_afiliacion" />
      </div>

      {/* Tipo de afiliado */}
      <div className="flex flex-col">
        <InputLabel htmlFor="tipo_afiliado" value="Tipo de afiliado" />
        <SelectForm id="tipo_afiliado" register={register("tipo_afiliado")} />
        <InputErros errors={errors} name="tipo_afiliado" />
      </div>

      {/* Número de afiliado */}
      <div className="flex flex-col">
        <InputLabel htmlFor="numero_afiliado" value="Número de afiliado" />
        <TextInput
          id="numero_afiliado"
          type="text"
          placeholder="Número de afiliado..."
          {...register("numero_afiliado")}
        />
        <InputErros errors={errors} name="numero_afiliado" />
      </div>
    </div>


  )
}
