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
  nombre_rut: string,
  razon_social: string,
  tipo_persona: string,
  codigo_ciiu: string,
  Responsabilidades_tributarias: string,
}

export const Rut = ({ watch, setValue, handleSubmit, onSubmit, register, errors }: Props) => {
  const [acordeonAbierto, setAcordeonAbierto] = useState(false)

  const toggleAcordeon = () => {
    setAcordeonAbierto(!acordeonAbierto)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 col-span-full px-8">
      {/* Nombre RUT */}
      <div className="flex flex-col">
        <InputLabel htmlFor="nombre_rut" value="Nombre RUT" />
        <TextInput
          id="nombre_rut"
          type="text"
          placeholder="Nombre RUT..."
          {...register("nombre_rut")}
        />
        <InputErros errors={errors} name="nombre_rut" />
      </div>

      {/* Razón social */}
      <div className="flex flex-col">
        <InputLabel htmlFor="razon_social" value="Razón social" />
        <TextInput
          id="razon_social"
          type="text"
          placeholder="Razón social..."
          {...register("razon_social")}
        />
        <InputErros errors={errors} name="razon_social" />
      </div>

      {/* Tipo persona */}
      <div className="flex flex-col">
        <InputLabel htmlFor="tipo_persona" value="Tipo persona" />
        <SelectForm id="tipo_persona" register={register("tipo_persona")} />
        <InputErros errors={errors} name="tipo_persona" />
      </div>

      {/* Código CIIU */}
      <div className="flex flex-col">
        <InputLabel htmlFor="codigo_ciiu" value="Código CIIU" />
        <SelectForm id="codigo_ciiu" register={register("codigo_ciiu")} />
        <InputErros errors={errors} name="codigo_ciiu" />
      </div>

      {/* Responsabilidades tributarias */}
      <div className="flex flex-col">
        <InputLabel
          htmlFor="Responsabilidades_tributarias"
          value="Responsabilidades tributarias"
        />
        <TextInput
          id="Responsabilidades_tributarias"
          type="text"
          placeholder="Responsabilidades tributarias..."
          {...register("Responsabilidades_tributarias")}
        />
        <InputErros errors={errors} name="Responsabilidades_tributarias" />
      </div>
    </div>



  )
}