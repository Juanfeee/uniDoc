"use client";
import React, { useEffect, useState } from 'react';
import { InputLabel } from '@/app/componentes/formularios/InputLabel';
import { SelectForm } from '@/app/componentes/formularios/SelectForm';
import { LabelRadio } from '@/app/componentes/formularios/LabelRadio';
import TextInput from '@/app/componentes/formularios/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { languageSchema } from '@/validaciones/languageSchema';
import InputErros from '@/app/componentes/formularios/InputErrors';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ButtonPrimary } from '@/app/componentes/formularios/ButtonPrimary';
import Link from 'next/link';
import { ButtonRegresar } from '@/app/componentes/formularios/ButtonRegresar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

type Inputs = {
  idioma: string;
  institucion_idioma: string;
  nivel: string;
  fecha_certificado: string;
  archivo: FileList;
};

const AgregarIdioma = () => {

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(languageSchema)
  });

  console.log("Formulario", watch());

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const formValues = {
      idioma: watch('idioma'),
      institucion_idioma: watch('institucion_idioma'),
      nivel: watch('nivel'),
      fecha_certificado: watch('fecha_certificado'),
      archivo: watch('archivo')
    };

    const formData = new FormData();
    formData.append('idioma', formValues.idioma);
    formData.append('institucion_idioma', formValues.institucion_idioma);
    formData.append('nivel', formValues.nivel);
    formData.append('fecha_certificado', formValues.fecha_certificado);
    formData.append('archivo', formValues.archivo[0]);

    const token = Cookies.get("token");
    if (!token) {
      toast.error("No hay token de autenticación");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/aspirante/crear-idioma`;

    try {
      await toast.promise(
        axios.post(url, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000
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
        onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col sm:grid grid-cols-3 gap-x-8 bg-white gap-y-6 py-12 px-8 rounded-xl'>
          <div className='flex gap-x-4 col-span-full'>
            <Link href={"/index"}>
              <ButtonRegresar />
            </Link>
            <h3 className="font-bold text-3xl col-span-full">Agregar idioma</h3>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4'>
            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='idioma' value="Idioma" />
              <TextInput
                id='idioma'
                placeholder="Ingrese el idioma"
                {...register('idioma')}
              />
              <InputErros errors={errors} name="idioma" />
            </div>

            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='institucion' value="Institución" />
              <TextInput
                id='institucion_idioma'
                placeholder="Nombre de la institución"
                {...register('institucion_idioma')}
              />
              <InputErros errors={errors} name="institucion" />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4'>
            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='nivel_idioma' value="Nivel de idioma" />
              <SelectForm
                id='nivel'
                register={register('nivel')}
                url='niveles-idioma'
                data_url='nivel_idioma'
              />
              <InputErros errors={errors} name="nivel_idioma" />
            </div>

            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='fecha_certificado' value="Fecha de certificado" />
              <TextInput
                type='date'
                id='fecha_certificado'
                {...register('fecha_certificado')}
              />
              <InputErros errors={errors} name="fecha_certificado" />
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
      </form>
    </>
  );
};

export default AgregarIdioma;