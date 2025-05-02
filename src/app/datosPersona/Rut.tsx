"use client";
import { InputLabel } from "../componentes/formularios/InputLabel";
import { SelectForm } from "../componentes/formularios/SelectForm";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import TextInput from "../componentes/formularios/TextInput";
import InputErrors from "../componentes/formularios/InputErrors";
import { Inputs } from "@/types/inputs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

type Props = {
  watch: UseFormWatch<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  className?: string;
};

export type Inputs = {
  nombre_rut: string;
  razon_social: string;
  tipo_persona: string;
  codigo_ciiu: string;
  Responsabilidades_tributarias: string;
};

export const Rut = ({ setValue, register, errors, watch }: Props) => {
  const [tipoPersonaOptions, setTipoPersonaOptions] = useState<{ value: string, label: string }[]>([]);
  const [codigoCiiuOptions, setCodigoCiiuOptions] = useState<{ value: string, label: string }[]>([]);

  // Cargar opciones de constantes desde la API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Obtener tipos de persona
        const responseTipoPersona = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/constantes/tipo-persona`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const tiposPersona = responseTipoPersona.data.tipo_persona;
        const opcionesTipoPersona = tiposPersona.map((tipo: string) => ({
          value: tipo,
          label: tipo,
        }));
        setTipoPersonaOptions(opcionesTipoPersona);

        // Obtener códigos CIIU
        const responseCodigoCiiu = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/constantes/codigo-ciiu`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const codigosCiiu = responseCodigoCiiu.data.codigo_ciiu;
        const opcionesCodigoCiiu = codigosCiiu.map((codigo: string) => ({
          value: codigo,
          label: codigo,
        }));
        setCodigoCiiuOptions(opcionesCodigoCiiu);

      } catch (error) {
        console.error("Error al cargar las opciones", error);
      }
    };

    fetchOptions();
  }, []);

  // Cargar datos existentes del RUT (si aplica)
  useEffect(() => {
    const fetchRutData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rut/datos`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const rutData = response.data;
        setValue("nombre_rut", rutData.nombre_rut);
        setValue("razon_social", rutData.razon_social);
        setValue("tipo_persona", rutData.tipo_persona);
        setValue("codigo_ciiu", rutData.codigo_ciiu);
        setValue("Responsabilidades_tributarias", rutData.Responsabilidades_tributarias);

      } catch (error) {
        console.error("Error al cargar datos del RUT", error);
      }
    };

    fetchRutData();
  }, [setValue]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 px-8">
      {/* Nombre RUT */}
      <div>
        <InputLabel htmlFor="nombre_rut" value="Nombre RUT" />
        <TextInput
          className="w-full"
          id="nombre_rut"
          type="text"
          placeholder="Nombre RUT..."
          {...register("nombre_rut")}
        />
        <InputErrors errors={errors} name="nombre_rut" />
      </div>

      {/* Razón social */}
      <div>
        <InputLabel htmlFor="razon_social" value="Razón social" />
        <TextInput
          className="w-full"
          id="razon_social"
          type="text"
          placeholder="Razón social..."
          {...register("razon_social")}
        />
        <InputErrors errors={errors} name="razon_social" />
      </div>

      {/* Tipo persona */}
      <div>
        <InputLabel htmlFor="tipo_persona" value="Tipo persona" />
        <SelectForm
          id="tipo_persona"
          register={register("tipo_persona")}
          options={[
            { value: "", label: "Seleccione una opción" },
            ...tipoPersonaOptions
          ]}
        />
        <InputErrors errors={errors} name="tipo_persona" />
      </div>

      {/* Código CIIU */}
      <div>
        <InputLabel htmlFor="codigo_ciiu" value="Código CIIU" />
        <SelectForm
          id="codigo_ciiu"
          register={register("codigo_ciiu")}
          options={[
            { value: "", label: "Seleccione una opción" },
            ...codigoCiiuOptions
          ]}
        />
        <InputErrors errors={errors} name="codigo_ciiu" />
      </div>

      {/* Responsabilidades tributarias */}
      <div className="sm:col-span-2">
        <InputLabel htmlFor="Responsabilidades_tributarias" value="Responsabilidades tributarias" />
        <TextInput
          className="w-full"
          id="Responsabilidades_tributarias"
          type="text"
          placeholder="Responsabilidades tributarias..."
          {...register("Responsabilidades_tributarias")}
        />
        <InputErrors errors={errors} name="Responsabilidades_tributarias" />
      </div>
    </div>
  );
};