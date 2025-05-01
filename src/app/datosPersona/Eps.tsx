"use client"
import React, { useEffect, useState } from 'react'
import { InputLabel } from '../componentes/formularios/InputLabel'
import { SelectForm } from '../componentes/formularios/SelectForm'
import InputErros from '../componentes/formularios/InputErrors'
import TextInput from '../componentes/formularios/TextInput'
import Cookies from "js-cookie"
import { FieldErrors, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import axios from 'axios'

type Props = {
  watch: UseFormWatch<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

export type Inputs = {
  tipo_afiliacion: string;
  nombre_eps: string;
  estado_afiliacion: string;
  fecha_afiliacion_efectiva: string;
  fecha_finalizacion_afiliacion: string;
  tipo_afiliado: string;
  numero_afiliado: string;
  archivo: FileList;
}

export const Eps = ({ watch, setValue, handleSubmit, onSubmit, register, errors }: Props) => {
  const [acordeonAbierto, setAcordeonAbierto] = useState(false)
  const [tiposAfiliacion, setTiposAfiliacion] = useState<{ value: string, label: string }[]>([])
  
  const [loading, setLoading] = useState(true) // Agregado el estado de carga
  const [error, setError] = useState<string | null>(null) // Agregado el estado de error

  // Traer las opciones de afiliación desde la API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Obtener tipos de afiliación
        const responseTipoAfiliacion = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/constantes/tipo-afiliacion`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const tipos = responseTipoAfiliacion.data.tipo_afiliacion_eps;
        const opcionesTipoAfiliacion = tipos.map((tipo: string) => ({
          value: tipo,
          label: tipo,
        }));
        setTiposAfiliacion(opcionesTipoAfiliacion);
        setLoading(false); // Una vez que los datos se hayan cargado
      } catch (error) {
        setError('Hubo un error al cargar las opciones de afiliación');
        setLoading(false);
        console.error(error);
      }
    };

    fetchOptions();
  }, [])

  const toggleAcordeon = () => {
    setAcordeonAbierto(!acordeonAbierto)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 col-span-full gap-y-6 px-8">
      {/* Mostrar estado de carga o error */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {/* Tipo de afiliación */}
          <div className="flex flex-col">
            <InputLabel htmlFor="tipo_afiliacion" value="Tipo de afiliación" />
            <SelectForm id="tipo_afiliacion" register={register("tipo_afiliacion")} options={tiposAfiliacion} />
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
            <SelectForm id="estado_afiliacion" register={register("estado_afiliacion")} />
            <InputErros errors={errors} name="estado_afiliacion" />
          </div>

          {/* Fecha de afiliación efectiva */}
          <div className="flex flex-col">
            <InputLabel htmlFor="fecha_afiliacion_efectiva" value="Fecha de afiliación efectiva" />
            <TextInput
              id="fecha_afiliacion_efectiva"
              type="date"
              {...register("fecha_afiliacion_efectiva")}
            />
            <InputErros errors={errors} name="fecha_afiliacion_efectiva" />
          </div>

          {/* Fecha de finalización de afiliación */}
          <div className="flex flex-col">
            <InputLabel htmlFor="fecha_finalizacion_afiliacion" value="Fecha de finalización de afiliación" />
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

          {/* Archivo */}
          <div className="flex flex-col">
            <InputLabel htmlFor="archivo" value="Archivo" />
            <TextInput
              id="archivo"
              type="file"
              {...register("archivo")}
            />
            <InputErros errors={errors} name="archivo" />
          </div>
        </>
      )}
    </div>
  )
}
