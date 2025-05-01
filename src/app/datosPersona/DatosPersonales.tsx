"use client";
import { InputLabel } from "../componentes/formularios/InputLabel";
import { LabelRadio } from "../componentes/formularios/LabelRadio";
import { SelectForm } from "../componentes/formularios/SelectForm";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import TextInput from "../componentes/formularios/TextInput";
import InputErrors from "../componentes/formularios/InputErrors";
import { Inputs } from "@/types/inputs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { set } from "zod";

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
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: string;
  genero: string;
  estado_civil: string;
  acordeonAbierto?: boolean;
};

export const DatosPersonales = ({ setValue, register, errors, watch }: Props) => {

  //estado de los datos del usuario
  const [datosUsuario, setDatosUsuario] = useState<Inputs | null>(null);
  const [tiposIdentificacion, setTiposIdentificacion] = useState<{ value: string, label: string }[]>([]);
  const [estadosCivil, setEstadosCivil] = useState<{ value: string, label: string }[]>([]);


  // Traer las opciones de identificación y estado civil desde la API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Obtener tipos de identificación
        const responseTipoIdentificacion = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/constantes/tipos-documento`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const tipos = responseTipoIdentificacion.data.tipos_documento;
        const opcionesTipoIdentificacion = tipos.map((tipo: string) => ({
          value: tipo,
          label: tipo,
        }));
        setTiposIdentificacion(opcionesTipoIdentificacion);

        // Obtener estados civiles
        const responseEstadoCivil = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/constantes/estado-civil`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const estados = responseEstadoCivil.data.estado_civil;
        const opcionesEstadoCivil = estados.map((estado: string) => ({
          value: estado,
          label: estado,
        }));
        setEstadosCivil(opcionesEstadoCivil);
      } catch (error) {
        console.error("Error al cargar las opciones", error);
      }
    };

    fetchOptions();
  }, []);

  //Traer los datos del usuario al cargar el componente
  useEffect(() => {

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/obtener-usuario-autenticado`, {

      //header especificar el token de la coockie
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      //mostrar los datos en consola
    }).then((response) => {
      const data = response.data.user;
      setDatosUsuario(data);
      //mapear los datos del usuario a los campos del formulario
      setValue("tipo_identificacion", data.tipo_identificacion);
      setValue("numero_identificacion", data.numero_identificacion);
      setValue("primer_nombre", data.primer_nombre);
      setValue("segundo_nombre", data.segundo_nombre);
      setValue("primer_apellido", data.primer_apellido);
      setValue("segundo_apellido", data.segundo_apellido);
      setValue("fecha_nacimiento", data.fecha_nacimiento);
      setValue("genero", data.genero);
      setValue("estado_civil", data.estado_civil);
      console.log("Datos del usuario:", data);

    });
  }, [setValue]);
  console.log("Datos a enviar:", watch());


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 px-8">
      {/* Identificación */}
      <div>
        <InputLabel htmlFor="tipo_identificacion" value="Tipo de identificación" />
        <SelectForm
          id="tipo_identificacion"
          register={register("tipo_identificacion")}
          options={tiposIdentificacion}
        />
        <InputErrors errors={errors} name="tipo_identificacion" />
      </div>
      <div>
        <InputLabel htmlFor="numero_identificacion" value="Número de identificación" />
        <TextInput
          className="w-full"
          id="numero_identificacion"
          type="text"
          placeholder="Número de identificación..."
          {...register("numero_identificacion")}
        />
        <InputErrors errors={errors} name="numero_identificacion" />
      </div>
      {/* Nombres */}
      <div>
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

      <div>
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

      <div>
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

      <div>
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

      {/* Fecha y Estado civil */}
      <div>
        <InputLabel htmlFor="fecha_nacimiento" value="Fecha de nacimiento" />
        <TextInput
          className="w-full"
          id="fecha_nacimiento"
          type="date"
          {...register("fecha_nacimiento")}
        />
        <InputErrors errors={errors} name="fecha_nacimiento" />
      </div>

      <div>
        <InputLabel htmlFor="estado_civil" value="Estado civil" />
        <SelectForm
          id="estado_civil"
          register={register("estado_civil")}
          options={estadosCivil}
        />
        <InputErrors errors={errors} name="estado_civil" />
      </div>

      {/* Género */}
      <div className="col-span-full">
        <InputLabel htmlFor="genero" value="Género" />
        <div className="flex flex-wrap gap-4 rounded-lg border-[1.8px] border-blue-600 bg-slate-100/40 p-4">
          <LabelRadio
            htmlFor="masculino"
            value="Masculino"
            inputProps={register("genero")}
            label="Masculino"
          />
          <LabelRadio
            htmlFor="femenino"
            value="Femenino"
            inputProps={register("genero")}
            label="Femenino"
          />
          <LabelRadio
            htmlFor="otro"
            value="Otro"
            inputProps={register("genero")}
            label="Otro"
          />
        </div>
        <InputErrors errors={errors} name="genero" />
      </div>
    </div>

  );
};
