"use client";
import React, { use, useEffect, useState } from 'react'
import { InputLabel } from '../../../componentes/formularios/InputLabel'
import { SelectForm } from '../../../componentes/formularios/SelectForm'
import { LabelRadio } from '../../../componentes/formularios/LabelRadio'
import TextInput from '../../../componentes/formularios/TextInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { studySchema } from '@/validaciones/studySchema'
import InputErros from '../../../componentes/formularios/InputErrors';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ButtonPrimary } from '../../../componentes/formularios/ButtonPrimary';
import { AdjuntarArchivo } from '@/app/componentes/formularios/AdjuntarArchivo';
import Link from 'next/link';
import { ButtonRegresar } from '@/app/componentes/formularios/ButtonRegresar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

type Inputs = {
  tipo_estudio: string;
  graduado: string;
  institucion: string;
  fecha_graduacion: string;
  titulo_convalidado: string;
  fecha_convalidacion: string;
  resolucion_convalidacion?: string;
  posible_fecha_convalidacion?: string;
  titulo_estudio: string;
  fecha_inicio: string;
  fecha_fin: string;
  archivo: FileList;
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

  useEffect(() => {
    if (watch('graduado') === 'Si') {
      setValue('posible_fecha_convalidacion', '');
    } else if (watch('graduado') === 'No') {
      setValue('fecha_graduacion', '');
    }
  }, [watch('graduado'), setValue]);

  useEffect(() => {
    if (watch('titulo_convalidado') === 'Si') {
      setValue('resolucion_convalidacion', '');
    } else if (watch('titulo_convalidado') === 'No') {
      setValue('fecha_convalidacion', '');
    }
  }, [watch('titulo_convalidado'), setValue]);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const formValues = {
      tipo_estudio: watch('tipo_estudio'),
      graduado: watch('graduado'),
      institucion: watch('institucion'),
      fecha_graduacion: watch('fecha_graduacion'),
      titulo_convalidado: watch('titulo_convalidado'),
      fecha_convalidacion: watch('fecha_convalidacion'),
      resolucion_convalidacion: watch('resolucion_convalidacion'),
      posible_fecha_convalidacion: watch('posible_fecha_convalidacion'),
      titulo_estudio: watch('titulo_estudio'),
      fecha_inicio: watch('fecha_inicio'),
      fecha_fin: watch('fecha_fin'),
      archivo: watch('archivo')
    };
    //crear formdata para enviar a la API

    const formData = new FormData();
    formData.append('tipo_estudio', formValues.tipo_estudio);
    formData.append('graduado', formValues.graduado);
    formData.append('institucion', formValues.institucion);
    formData.append('fecha_graduacion', formValues.fecha_graduacion);
    formData.append('titulo_convalidado', formValues.titulo_convalidado);
    formData.append('fecha_convalidacion', formValues.fecha_convalidacion);
    formData.append('resolucion_convalidacion', formValues.resolucion_convalidacion ?? '');
    formData.append('posible_fecha_convalidacion', formValues.posible_fecha_convalidacion ?? '');
    formData.append('titulo_estudio', formValues.titulo_estudio);
    formData.append('fecha_inicio', formValues.fecha_inicio);
    formData.append('fecha_fin', formValues.fecha_fin);
    formData.append('archivo', formValues.archivo[0]);


    const token = Cookies.get("token");
    if (!token) {
      toast.error("No hay token de autenticación");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/aspirante/crear-estudio`;

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

  }

  return (
    <>
      <form className='flex flex-col gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative'
        onSubmit={handleSubmit(onSubmit)} >
        <div className='flex flex-col sm:grid grid-cols-3 gap-x-8 bg-white gap-y-6 py-12 px-8 rounded-xl' >
          <div className='flex gap-x-4 col-span-full'>
            <Link href={"/index"}>
              <ButtonRegresar />
            </Link>
            < h3 className="font-bold text-3xl col-span-full" > Agregar estudio </h3>
          </div>
          < div className='flex flex-col sm:grid sm:grid-cols-3 sm:col-span-full gap-4' >
            <div className='flex flex-col w-full' >
              <InputLabel htmlFor='tipo_estudio' value='Tipo de estudio' />
              <SelectForm
                id='tipo_estudio'
                register={register('tipo_estudio')}
                url='tipos-estudio'
                data_url='tipo_estudio'
              />
              <InputErros errors={errors} name="tipo_estudio" />
            </div>

            < div className='flex flex-col w-full' >
              <InputLabel htmlFor='graduado' value='Graduado' />
              <div className="flex flex-row flex-wrap gap-4 rounded-lg border-[1.8px] border-blue-600 bg-slate-100/40 p-4">
                <LabelRadio
                  htmlFor="graduado-si"
                  value="Si"
                  inputProps={register("graduado")}
                  label="Si"
                />
                <LabelRadio
                  htmlFor="graduado-no"
                  value="No"
                  inputProps={register("graduado")}
                  label="No"
                />
              </div>
              <InputErros errors={errors} name="graduado" />
            </div>
            {watch('graduado') === 'Si' && (
              <>
                < div className='flex flex-col w-full' >
                  <InputLabel htmlFor='fecha_grado' value='Fecha de grado' />
                  <TextInput
                    id='fecha_grado'
                    type='date'
                    {...register('fecha_graduacion')} />
                  < InputErros errors={errors} name="fecha_grado" />
                </div>
              </>
            )
            } {watch('graduado') === 'No' && (
              <>
                < div className='flex flex-col w-full' >
                  <InputLabel htmlFor='posible_fecha_convalidacion' value='Posible fecha de convalidación' />
                  <TextInput
                    id='posible_fecha_convalidacion'
                    type='date'
                    {...register('posible_fecha_convalidacion')} />
                  < InputErros errors={errors} name="posible_fecha_convalidacion" />
                </div>
              </>
            )}

          </div>


          < div className='grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4' >
            <div className='flex flex-col w-full' >
              <InputLabel htmlFor='institucion' value='Institución' />
              <TextInput
                id='institucion'
                placeholder='Institución'
                {...register('institucion')}
              />
              < InputErros errors={errors} name="institucion" />
            </div>
            < div className='flex flex-col w-full' >
              <InputLabel htmlFor='titulo' value='Título' />
              <TextInput
                id='titulo'
                placeholder='Título'
                {...register('titulo_estudio')}
              />
              < InputErros errors={errors} name="titulo_estudio" />
            </div>
          </div>
          < div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 col-span-full gap-4' >
            <div className='flex flex-col w-full' >
              < div className="" >
                <InputLabel htmlFor="convalido" value="Convalido" />

                <div className="flex flex-row flex-wrap gap-4 rounded-lg border-[1.8px] border-blue-600 bg-slate-100/40 p-4">
                  <LabelRadio
                    htmlFor="convalido-si"
                    value="Si"
                    inputProps={register("titulo_convalidado")}
                    label="Si"
                  />
                  <LabelRadio
                    htmlFor="convalido-no"
                    value="No"
                    inputProps={register("titulo_convalidado")}
                    label="No"
                  />
                </div>
                <InputErros errors={errors} name="titulo_convalidado" />
              </div>
              {
                watch('titulo_convalidado') === 'Si' && (
                  <>
                    <div className='flex flex-col w-full' >
                      <InputLabel htmlFor='fecha_convalidacion' value='Fecha de convalidación' />
                      <TextInput
                        id='fecha_convalidacion'
                        type='date'
                        {...register('fecha_convalidacion')}
                      />
                    </div>
                    < div className='flex flex-col w-full' >
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
            < div className='grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4' >
              <div className='flex flex-col' >
                <InputLabel htmlFor='fecha_inicio' value='Fecha de inicio' />
                <TextInput
                  type='date'
                  id='fecha_inicio'
                  {...register('fecha_inicio')}
                />
                < InputErros errors={errors} name="fecha_inicio" />
              </div>
              < div className='flex flex-col' >
                <InputLabel htmlFor='fecha_fin' value='Fecha de fin' />
                <TextInput
                  type='date'
                  id='fecha_fin'
                  {...register('fecha_fin')}
                />
                < InputErros errors={errors} name="fecha_fin" />
              </div>
            </div>
            <div>
              <InputLabel htmlFor="archivo" value="Archivo" />
              <input type="file" id="archivo" {...register("archivo")} accept=".pdf, .jpg, .png" className="w-full h-11 rounded-lg border-[1.8px] border-blue-600 bg-slate-100/40 p-3 text-sm text-slate-950/90 placeholder-slate-950/60 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition duration-300 ease-in-out" />
              <InputErros errors={errors} name="archivo" />
            </div>
            <div className='flex justify-center col-span-full' >
              <ButtonPrimary value='Agregar estudio' />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default AgregarEstudio