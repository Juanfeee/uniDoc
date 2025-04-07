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
  pais_residencia: string,
  departamento_residencia: string,
  ciudad_residencia: string,
  direccion: string,
  barrio: string,
  telefono?: string,
  celular: string,
  celular_alternativo?: string,
  email_alternativo?: string,
  tipo_identificacion: string,
  identificacion: string,
}

export const InformacionContacto = ({ watch, setValue, handleSubmit, onSubmit, register, errors }: Props) => {

  //enviar los datos al servidor


  return (
    <div className="flex flex-col gap-y-6 py-6 px-8">
      <div className="flex flex-col gap-y-4 sm:grid grid-cols-2 sm:gap-y-10 sm:gap-x-4">
        <div className="flex flex-col">
          <InputLabel
            htmlFor="tipo_identificacion"
            value="Tipo de identificación"
          />
          <SelectForm
            id="tipo_identificacion"
            register={register("tipo_identificacion")}
          />
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="identificacion" value="Identificación" />
          <TextInput
            id="identificacion"
            type="number"
            {...register("identificacion")}
            placeholder="Identificación..."
          />
        </div>
        <div className="grid col-span-2 sm:grid-cols-2 gap-x-8 gap-y-4 w-full">
          <div className="">
            <InputLabel htmlFor="direccion" value="Dirección de residencia" />
            <TextInput
              className="w-full"
              id="direccion"
              type="text"
              placeholder="Direccion de residencia..."
              {...register("direccion")}
            />
            <InputErros errors={errors} name="direccion" />
          </div>

          <div className="">
            <InputLabel htmlFor="barrio" value="Barrio" />
            <TextInput
              className="w-full"
              id="barrio"
              type="text"
              placeholder="Barrio..."
              {...register("barrio")}
            />
            <InputErros errors={errors} name="barrio" />
          </div>
        </div>
        <div className="grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-8">
          <div>
            <InputLabel htmlFor="pais_residencia" value="País" />
            <SelectForm id="pais_residencia" register={register("pais_residencia")} />
            <InputErros errors={errors} name="pais_residencia" />
          </div>
          <div>
            <InputLabel htmlFor="departamento_residencia" value="Departamento" />
            <SelectForm id="departamento_residencia" register={register("departamento_residencia")} />
            <InputErros errors={errors} name="departamento_residencia" />
          </div>
          <div>
            <InputLabel htmlFor="ciudad_residencia" value="Ciudad" />
            <SelectForm id="ciudad_residencia" register={register("ciudad_residencia")} />
            <InputErros errors={errors} name="ciudad_residencia" />
          </div>
        </div>
        <div className='grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-8'>
          <div>
            <InputLabel htmlFor="telefono" value="Teléfono" />
            <TextInput
              className="w-full"
              id="telefono"
              type="number"
              placeholder="Telefono..."
              {...register("telefono")}
            />
            <InputErros errors={errors} name="telefono" />
          </div>
          <div>
            <InputLabel htmlFor="celular" value="Celular" />
            <TextInput
              className="w-full"
              id="celular"
              type="number"
              placeholder="Celular..."
              {...register("celular")}
            />
            <InputErros errors={errors} name="celular" />
          </div>
          <div>
            <InputLabel htmlFor="celular_alternativo" value="Celular alternativo" />
            <TextInput
              className="w-full"
              id="celular_alternativo"
              type="number"
              placeholder="Celular alternativo..."
              {...register("celular_alternativo")}
            />
            <InputErros errors={errors} name="celular_alternativo" />
          </div>
          <div>
            <InputLabel htmlFor="email_alternativo" value="Email alternativo" />
            <TextInput
              className="w-full"
              id="email_alternativo"
              type="email"
              placeholder="Email alternativo..."
              {...register("email_alternativo")}
            />
            <InputErros errors={errors} name="email_alternativo" />
          </div>
        </div>
      </div>
    </div>
  )
}
