"use client";
import React, { use, useEffect } from 'react'
import { InputLabel } from '../../componentes/formularios/InputLabel'
import { SelectForm } from '../../componentes/formularios/SelectForm'
import { LabelRadio } from '../../componentes/formularios/LabelRadio'
import TextInput from '../../componentes/formularios/TextInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { studySchema } from '@/validaciones/studySchema'
import InputErros from '../../componentes/formularios/InputErros';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ButtonPrimary } from '../../componentes/formularios/ButtonPrimary';

type Props = {}
type Inputs = {
  tipo_estudio: string;
  institucion: string;
  graduado: string;
  fecha_grado: string;
  titulo: string;
  titulo_convalidado: string;
  fecha_convalidacion?: string;
  resolucion_convalidacion?: string;
  pais: string;
  departamento?: string;
  ciudad?: string;
  fecha_inicio: string;
  fecha_fin: string;
}



const AgregarEstudio = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Inputs>({ resolver: zodResolver(studySchema) });
  console.log("Formulario", watch());

  const convalido = watch('titulo_convalidado');
  useEffect(() => {
    if (convalido === 'no') {
      setValue('fecha_convalidacion', '');
      setValue('resolucion_convalidacion', '');
    }
  }, [convalido, setValue]);
  
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log("Formulario enviado");
    //mensaje de exito
    alert("Formulario enviado");
  };
  return (
    <>
      <form className='flex flex-col gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px m-auto relative'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col sm:grid grid-cols-3 gap-x-8 bg-white gap-y-6 py-12 px-8 rounded-xl'>
          <h3 className="font-bold text-3xl col-span-full">Agregar estudio</h3>
          <div className='flex flex-col sm:grid sm:grid-cols-3 sm:col-span-full gap-4'>
            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='tipo_estudio' value='Tipo de estudio' />
              <SelectForm
                id='tipo_estudio'
                register={register('tipo_estudio')}
              />
              <InputErros errors={errors} name="tipo_estudio" />
            </div>

            <div className='flex flex-col  w-full' >
              <InputLabel htmlFor='si' value='Graduado' />
              <div className="flex flex-wrap justify-start px-2 sm:justify-star items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] sm:h-11">
                <div className="flex items-center gap-x-1">
                  <LabelRadio htmlFor="si_graduado" value='Si' />
                  <TextInput
                    type="radio"
                    id="si_graduado"
                    value="si"
                    {...register('graduado')}
                  />
                </div>
                <div className="flex items-center gap-x-1">
                  <LabelRadio htmlFor="no_graduado" value='No' />
                  <TextInput
                    type="radio"
                    id="no_graduado"
                    value="no"
                    {...register('graduado')}
                  />
                </div>
              </div>
              <InputErros errors={errors} name="graduado" />
            </div>
            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='fecha_grado' value='Fecha de grado' />
              <TextInput
                id='fecha_grado'
                type='date'
                {...register('fecha_grado')} />
              <InputErros errors={errors} name="fecha_grado" />
            </div>
          </div>


          <div className='grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4'>
            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='institucion' value='Institución' />
              <TextInput
                id='institucion'
                placeholder='Institución'
                {...register('institucion')}
              />
              <InputErros errors={errors} name="institucion" />
            </div>
            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='titulo' value='Título' />
              <TextInput
                id='titulo'
                placeholder='Título'
                {...register('titulo')}
              />
              <InputErros errors={errors} name="titulo" />
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 col-span-full gap-4'>
            <div className='flex flex-col w-full' >
              <InputLabel htmlFor='' value='Convalido' />

              <div className="flex flex-wrap justify-start px-4 sm:justify-star items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] sm:h-11">
                <div className="flex items-center gap-x-1">
                  <LabelRadio htmlFor="si_convalido" value='Si' />
                  <TextInput
                    type="radio"
                    id="si_convalido"
                    value="si"
                    {...register('titulo_convalidado')}
                  />
                </div>
                <div className="flex items-center gap-x-1">
                  <LabelRadio htmlFor="no_convalido" value='No' />
                  <TextInput
                    type="radio"
                    id="no_convalido"
                    value="no"
                    {...register('titulo_convalidado')}
                  />
                </div>
              </div>
              <InputErros errors={errors} name="titulo_convalidado" />
            </div>
            {watch('titulo_convalidado') === 'si' && (
              <>
                <div className='flex flex-col w-full'>
                  <InputLabel htmlFor='fecha_convalidacion' value='Fecha de convalidación' />
                  <TextInput
                    id='fecha_convalidacion'
                    type='date'
                    {...register('fecha_convalidacion')}
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <InputLabel htmlFor='resolucion_convalidacion' value='Resolución de convalidación' />
                  <TextInput
                    id='resolucion_convalidacion'
                    placeholder='Resolución de convalidación'
                    {...register('resolucion_convalidacion')}
                  />
                </div>
              </>
            )}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 col-span-full gap-4'>
            <div className='flex flex-col'>
              <InputLabel htmlFor='pais' value='País' />
              <SelectForm id='pais' register={register('pais')} />
              <InputErros errors={errors} name="pais" />
            </div>
            <div className='flex flex-col'>
              <InputLabel htmlFor='departamento' value='Departamento' />
              <SelectForm id='departamento' register={register('departamento')} />

            </div>
            <div className='flex flex-col'>
              <InputLabel htmlFor='ciudad' value='Ciudad' />
              <SelectForm id='ciudad' register={register('ciudad')} />


            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4'>
            <div className='flex flex-col'>
              <InputLabel htmlFor='fecha_inicio' value='Fecha de inicio' />
              <TextInput
                type='date'
                id='fecha_inicio'
                {...register('fecha_inicio')}
              />
              <InputErros errors={errors} name="fecha_inicio" />
            </div>
            <div className='flex flex-col'>
              <InputLabel htmlFor='fecha_fin' value='Fecha de fin' />
              <TextInput
                type='date'
                id='fecha_fin'
                {...register('fecha_fin')}
              />
              <InputErros errors={errors} name="fecha_fin" />
            </div>
          </div>
          <div className='flex justify-center col-span-full'>
            <ButtonPrimary value='Agregar estudio' />
          </div>
        </div>
      </form>
    </>
  )
}
export default AgregarEstudio