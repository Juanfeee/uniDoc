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
    <>
      <div className="flex flex-col gap-y-6 py-6 px-8">
        <div className="flex flex-col gap-y-4 sm:grid grid-cols-2 sm:gap-y-10 sm:gap-x-4">
          <div className="grid col-span-2 sm:grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div className="">
              <InputLabel htmlFor="nombre_rut" value="Nombre RUT" />
              <TextInput
                className="w-full"
                id="nombre_rut"
                type="text"
                placeholder="Nombre RUT..."
                {...register("nombre_rut")}
              />
              <InputErros errors={errors} name="nombre_rut" />
            </div>

            <div className="">
              <InputLabel htmlFor="razon_social" value="Razón social" />
              <TextInput
                className="w-full"
                id="razon_social"
                type="text"
                placeholder="Razón social..."
                {...register("razon_social")}
              />
              <InputErros errors={errors} name="razon_social" />
            </div>
          </div>

          <div className='grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-8'>
            <div className="flex flex-col">
              <InputLabel
                htmlFor="tipo_persona"
                value="Tipo persona"
              />
              <SelectForm
                id="tipo_persona"
                register={register("tipo_persona")}
              />
            </div>

            <div className="flex flex-col">
              <InputLabel
                htmlFor="codigo_ciiu"
                value="Codigo CIIU"
              />
              <SelectForm
                id="codigo_ciiu"
                register={register("codigo_ciiu")}
              />
            </div>

            <div>
              <InputLabel htmlFor="Responsabilidades_tributarias" value="Responsabilidades tributarias" />
              <TextInput
                className="w-full"
                id="Responsabilidades_tributarias"
                type="text"
                placeholder="Responsabilidades tributarias..."
                {...register("Responsabilidades_tributarias")}
              />
              <InputErros errors={errors} name="Responsabilidades_tributarias" />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}