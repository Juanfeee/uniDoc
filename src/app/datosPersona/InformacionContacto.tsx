"use client"
import React, { useEffect, useState } from 'react'
import { InputLabel } from '../componentes/formularios/InputLabel'
import { SelectForm } from '../componentes/formularios/SelectForm'
import InputErros from '../componentes/formularios/InputErrors'
import TextInput from '../componentes/formularios/TextInput'
import Cookies from 'js-cookie'
import { FieldErrors, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { datosPersonaSchema } from '@/validaciones/informacionPersonaSchema'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ButtonPrimary } from '../componentes/formularios/ButtonPrimary'



// type inputs es un objeto que contiene los campos del formulario esto es para que typescript pueda inferir el tipo de dato de cada campo
export type Inputs = {
  municipio_id: number,
  categoria_libreta_militar: string,
  numero_libreta_militar: string,
  numero_distrito_militar: string,
  direccion_residencia: string,
  barrio: string,
  telefono_movil: string,
  celular_alternativo: string,
  correo_alternativo: string,
  archivo: FileList
}

export const InformacionContacto = () => {



  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(datosPersonaSchema),
    defaultValues: {
    },
  });

  //Traer los datos del usuario al cargar la pagina
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("No hay token de autenticación");
        return;
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/aspirante/obtener-informacion-contacto`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 20000
        });
        const data = response.data.informacion_contacto;
        setValue("categoria_libreta_militar", data.categoria_libreta_militar);
        setValue("numero_libreta_militar", data.numero_libreta_militar);
        setValue("numero_distrito_militar", data.numero_distrito_militar);
        setValue("direccion_residencia", data.direccion_residencia);
        setValue("barrio", data.barrio);
        setValue("telefono_movil", data.telefono_movil);
        setValue("celular_alternativo", data.celular_alternativo);
        setValue("correo_alternativo", data.correo_alternativo);
      } catch (error) {
        console.error(error)
      }
    };
    fetchUserData()
  }
  , []);


  // enviar data a la API
  const onSubmit: SubmitHandler<Inputs> = async () => {
    const formValues = {
      municipio_id: 1,
      categoria_libreta_militar: watch("categoria_libreta_militar"),
      numero_libreta_militar: watch("numero_libreta_militar"),
      numero_distrito_militar: watch("numero_distrito_militar"),
      direccion_residencia: watch("direccion_residencia"),
      barrio: watch("barrio"),
      telefono_movil: watch("telefono_movil"),
      celular_alternativo: watch("celular_alternativo"),
      correo_alternativo: watch("correo_alternativo"),
      archivo: watch("archivo"),
    };
  
    // Crear formData solo si se envía un archivo
    const formData = new FormData();
    formData.append("municipio_id", formValues.municipio_id.toString());
    formData.append("categoria_libreta_militar", formValues.categoria_libreta_militar);
    formData.append("numero_libreta_militar", formValues.numero_libreta_militar);
    formData.append("numero_distrito_militar", formValues.numero_distrito_militar);
    formData.append("direccion_residencia", formValues.direccion_residencia);
    formData.append("barrio", formValues.barrio);
    formData.append("telefono_movil", formValues.telefono_movil);
    formData.append("celular_alternativo", formValues.celular_alternativo);
    formData.append("correo_alternativo", formValues.correo_alternativo);
  
    // Solo agregar el archivo si existe
    if (formValues.archivo && formValues.archivo.length > 0) {
      formData.append("archivo", formValues.archivo[0]);
    }
  
    const token = Cookies.get("token");
    if (!token) {
      toast.error("No hay token de autenticación");
      return;
    }
  
    const url = `${process.env.NEXT_PUBLIC_API_URL}/aspirante/crear-informacion-contacto`;
  
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
      console.error(error);
    }
  };
  

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Informacion de contacto</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <InputLabel htmlFor="categoria_libreta_militar" value="Categoria libreta militar" />
          <SelectForm 
            id="categoria_libreta_militar" 
            register={register("categoria_libreta_militar")}
            url='categoria-libreta-militar'
            data_url='tipo_libreta_militar'
            />
          <InputErros errors={errors} name="categoria_libreta_militar" />
        </div>
        <div>
          <InputLabel htmlFor="numero_libreta_militar" value="Número libreta militar" />
          <TextInput
            className="w-full"
            id="numero_libreta_militar"
            type="text"
            placeholder="Número libreta militar..."
            {...register("numero_libreta_militar")}
          />
          <InputErros errors={errors} name="numero_libreta_militar" />
        </div>
        <div>
          <InputLabel htmlFor="numero_distrito_militar" value="Número distrito militar" />
          <TextInput
            className="w-full"
            id="numero_distrito_militar"
            type="text"
            placeholder="Número distrito militar..."
            {...register("numero_distrito_militar")}
          />
          <InputErros errors={errors} name="numero_distrito_militar" />
        </div>
        <div className="">
          <InputLabel htmlFor="direccion" value="Dirección de residencia" />
          <TextInput
            className="w-full"
            id="direccion"
            type="text"
            placeholder="Direccion de residencia..."
            {...register("direccion_residencia")}
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
        <div>
          <InputLabel htmlFor="telefono_movil" value="Teléfono" />
          <TextInput
            className="w-full"
            id="telefono_movil"
            type="number"
            placeholder="Telefono..."
            {...register("telefono_movil")}
          />
          <InputErros errors={errors} name="telefono_movil" />
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
          <InputLabel htmlFor="correo_alternativo" value="Email alternativo" />
          <TextInput
            className="w-full"
            id="correo_alternativo"
            type="email"
            placeholder="Correo alternativo..."
            {...register("correo_alternativo")}
          />
          <InputErros errors={errors} name="correo_alternativo" />
        </div>
        <div>
          <InputLabel htmlFor="archivo" value="Archivo" />
          <input type="file" id="archivo" {...register("archivo")} accept=".pdf, .jpg, .png" className="w-full h-11 rounded-lg border-[1.8px] border-blue-600 bg-slate-100/40 p-3 text-sm text-slate-950/90 placeholder-slate-950/60 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition duration-300 ease-in-out" />
          <InputErros errors={errors} name="archivo" />
        </div>
        <div className="col-span-full text-center">
          <ButtonPrimary type="submit" value="Guardar" />
        </div>
      </form>
    </div>

  )
}
