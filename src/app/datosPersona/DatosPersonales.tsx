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
  pais: string;
  departamento?: string;
  genero: string;
  estado_civil: string;
  libreta_militar?: string;
  distrito_militar?: string;
  categoria_libreta_militar?: string;
  acordeonAbierto?: boolean;
};

export const DatosPersonales = ({ setValue, register, errors, watch }: Props) => {

  //estado de los datos del usuario
  const [datosUsuario, setDatosUsuario] = useState<Inputs | null>(null);


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
      console.log("Datos del usuario:", data);
      setDatosUsuario(data);
      //mapear los datos del usuario a los campos del formulario
      setValue("primer_nombre", data.primer_nombre);
      setValue("segundo_nombre", data.segundo_nombre);
      setValue("primer_apellido", data.primer_apellido);
      setValue("segundo_apellido", data.segundo_apellido);
      setValue("fecha_nacimiento", data.fecha_nacimiento);
      setValue("genero", data.genero);
      setValue("estado_civil", data.estado_civil);
    });
  }, [setValue]);


  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 px-8">
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
