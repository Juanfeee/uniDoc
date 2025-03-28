"use client";
import React from 'react'
import TextInput from '../../componentes/formularios/TextInput'
import InputErrors from '../../componentes/formularios/InputErrors'
import { InputLabel } from '../../componentes/formularios/InputLabel'
import { LabelRadio } from '../../componentes/formularios/LabelRadio'
import { SelectForm } from '../../componentes/formularios/SelectForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { registerSchema } from '@/validaciones/registerSchema'
import { ButtonPrimary } from '../../componentes/formularios/ButtonPrimary';
import { zodResolver } from '@hookform/resolvers/zod';


type Props = {}
type Inputs = {
  email: string
  password: string
  primer_nombre: string
  segundo_nombre: string
  primer_apellido: string
  segundo_apellido: string
  fecha_nacimiento: string
  genero: string
  tipo_identificacion: string
  identificacion: string
  numero_identificacion: string
  estado_civil: string
  confirm_password: string
}
const Registro = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(registerSchema)} );

  console.log(errors)
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log("Formulario enviado", watch());
    //mensaje de exito
    alert("Formulario enviado");
  };
  return (
    <>
      <form className='className="flex flex-col gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative'
        onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col bg-white gap-y-6 py-12 px-8 rounded-xl">
          <h3 className="font-bold text-3xl">Registro</h3>
          <div
            className="grid sm:grid grid-cols-2 sm:gap-x-4 gap-y-6"
          >
            <div className="grid col-span-full sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
              <div className="col-span-full xl:col-span-1">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  className="w-full"
                  id="email"
                  type="text"
                  placeholder="Email..."
                  {...register("email")}
                />
                <InputErrors errors={errors} name="email" />
              </div>

              <div className="">
                <InputLabel htmlFor="password" value="Contraseña" />
                <TextInput
                  className="w-full"
                  id="password"
                  type="password"
                  placeholder="Contraseña..."
                  {...register("password")}
                />
                <InputErrors errors={errors} name="password" />
              </div>
              <div className="">
                <InputLabel htmlFor="confirm_password" value="Confirmar contraseña" />
                <TextInput
                  className="w-full"
                  id="confirm_password"
                  type="password"
                  placeholder="Confirmar contraseña..."
                  {...register("confirm_password")}
                />
                <InputErrors errors={errors} name="confirm_password" />
              </div>
            </div>
            <div className='grid col-span-full gridcols-2 sm:grid-cols-2 gap-x-8 gap-y-4'>
              <div className="flex flex-col">
                <InputLabel
                  htmlFor="tipo_identificacion"
                  value="Tipo de identificacion"
                />

                <SelectForm
                  id="tipo_identificacion"
                  register={register("tipo_identificacion")}
                />
                <InputErrors errors={errors} name="tipo_identificacion" />
              </div>
              <div className="flex flex-col">
                <InputLabel htmlFor="numero_identificacion" value="Identificacion" />
                <TextInput
                  id="numero_identificacion"
                  type="text"
                  placeholder="Identificación..."
                  {...register("numero_identificacion")}
                />
                <InputErrors errors={errors} name="numero_identificacion" />
              </div>
            </div>
            <div className="grid col-span-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
              <div className="">
                <InputLabel htmlFor="primer_nombre" value="Primer nombre" />
                <TextInput
                  className="w-full"
                  id="primer_nombre"
                  type="text"
                  placeholder="Primer nombre..."
                  {...register("primer_nombre")}
                />
                <InputErrors errors={errors} name="primer_nombre" />
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
                <InputErrors errors={errors} name="segundo_nombre" />
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
                <InputErrors errors={errors} name="primer_apellido" />
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
                <InputErrors errors={errors} name="segundo_apellido" />
              </div>
            </div>
            <div className='grid col-span-full lg:grid-cols-2 gap-x-8 gap-y-4'>
              <div className="">
                <InputLabel htmlFor="estado_civil" value="Estado civil" />
                <SelectForm
                  id="estado_civil"
                  register={register("estado_civil")}
                />
                <InputErrors errors={errors} name="estado_civil" />
              </div>
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
                <InputErrors errors={errors} name="fecha_nacimiento" />
              </div>
              <div className="flex flex-col gap-x-8 ">
                <div>
                  <InputLabel htmlFor="masculino" value="Genero"></InputLabel>
                  <div className="flex flex-wrap w-full rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] md:h-11 gap-x-8 px-2 sm:justify-evenly">
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
                        className=""
                        type="radio"
                        id="otro"
                        value="otro"
                        {...register("genero")}
                      />
                    </div>
                  </div>
                  <InputErrors errors={errors} name="genero" />
                </div>
              </div>
            </div>
          </div>
          <ButtonPrimary
            type='submit'
            value='Registrarse'
          />
        </div>
      </form>
    </>
  )
}
export default Registro