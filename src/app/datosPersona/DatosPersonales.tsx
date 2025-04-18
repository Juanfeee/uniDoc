"use client";
import { InputLabel } from "../componentes/formularios/InputLabel";
import { LabelRadio } from "../componentes/formularios/LabelRadio";
import { SelectForm } from "../componentes/formularios/SelectForm";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import TextInput from "../componentes/formularios/TextInput";
import InputErros from "../componentes/formularios/InputErrors";
import { Inputs } from "@/types/inputs";
import { useEffect, useState } from "react";

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

export const DatosPersonales = ({ watch, setValue, handleSubmit, onSubmit, register, errors }: Props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/obtener-usuario-autenticado`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const { user } = await response.json();

        // Mapeo de campos con transformación de datos
        const fieldMappings = [
          { source: 'primer_nombre', target: 'primer_nombre' },
          { source: 'segundo_nombre', target: 'segundo_nombre' },
          { source: 'primer_apellido', target: 'primer_apellido' },
          { source: 'segundo_apellido', target: 'segundo_apellido' },
          { source: 'fecha_nacimiento', target: 'fecha_nacimiento' },
          { source: 'genero', target: 'genero'},
          
        ];

        fieldMappings.forEach(({ source, target }) => {
          if (user[source] !== undefined && user[source] !== null) {
            const value = user[source];
            setValue(target as keyof Inputs, value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true
            });
          }
        });

      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(err instanceof Error ? err.message : "Error desconocido al cargar datos");
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatosUsuario();
  }, [setValue]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="ml-2">Cargando datos personales...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 py-6 px-8">
      <div className="grid col-span-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 w-full">
        <div className="">
          <InputLabel htmlFor="primer_nombre" value="Primer nombre" />
          <TextInput
            className="w-full"
            id="primer_nombre"
            type="text"
            placeholder="Primer nombre..."
            {...register("primer_nombre")}
          />
          <InputErros errors={errors} name="primer_nombre" />
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
          <InputErros errors={errors} name="segundo_nombre" />
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
          <InputErros errors={errors} name="primer_apellido" />
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
          <InputErros errors={errors} name="segundo_apellido" />
        </div>
      </div>
      <div className="grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-8">
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
          <InputErros errors={errors} name="fecha_nacimiento" />
        </div>
        {/* <div>
          <InputLabel htmlFor="pais" value="País" />
          <SelectForm id="pais" register={register("pais")} />
          <InputErros errors={errors} name="pais" />
        </div>
        <div>
          <InputLabel htmlFor="departamento" value="Departamento" />
          <SelectForm
            id="departamento"
            register={register("departamento")}
          />
          <InputErros errors={errors} name="departamento" />
        </div> */}
        {/* <div>
          <InputLabel htmlFor="ciudad" value="Ciudad" />
          <SelectForm id="ciudad" register={register("ciudad")} />
          <InputErros errors={errors} name="ciudad" />
        </div> */}
      </div>

      <div className="sm:col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 w-full items-center justify-center gap-y-4">
        <div className="col-span-2">
          <InputLabel htmlFor="Masculino" value="Género"></InputLabel>
          <div className="flex flex-wrap justify-start px-2 sm:justify-star items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] sm:h-11">
            <div className="flex items-center gap-x-1">
              <LabelRadio htmlFor="Masculino">Masculino</LabelRadio>
              <TextInput
                type="radio"
                id="Masculino"
                value="Masculino"
                {...register("genero")}
              />
            </div>
            <div className="flex items-center gap-x-1">
              <LabelRadio htmlFor="Femenino">Femenino</LabelRadio>
              <TextInput
                type="radio"
                id="Femenino"
                value="Femenino"
                {...register("genero")}
              />
            </div>
            <div className="flex items-center gap-x-1">
              <LabelRadio htmlFor="Otro">Otro</LabelRadio>
              <TextInput
                className=""
                type="radio"
                id="Otro"
                value="Otro"
                {...register("genero")}
              />
            </div>
          </div>
          <InputErros errors={errors} name="genero" />
        </div>
        <div className="col-span-2">
          <InputLabel htmlFor="estado_civil" value="Estado civil" />
          <SelectForm
            id="estado_civil"
            register={register("estado_civil")}
          />
          <InputErros errors={errors} name="estado_civil" />
        </div>
      </div>
      {/* {watch("genero") === "masculino" && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 col-span-full gap-x-8 gap-y-4">
            <div className="col-span-full lg:col-span-2 xl:col-span-1">
              <InputLabel
                htmlFor=""
                value="Categoria libreta militar"
              ></InputLabel>
              <div className="flex flex-wrap justify-around px-2 rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] sm:h-11">
                <div className="flex items-center gap-x-1">
                  <LabelRadio
                    htmlFor="primera_clase"
                    value="Primera clase"
                  ></LabelRadio>
                  <TextInput
                    type="radio"
                    id="primera_clase"
                    value="primera_clase"
                    {...register("categoria_libreta_militar")}
                  />
                </div>
                <div className="flex items-center gap-x-1">
                  <LabelRadio
                    htmlFor="segunda_clase"
                    value="Segunda clase"
                  ></LabelRadio>
                  <TextInput
                    type="radio"
                    id="segunda_clase"
                    value="segunda_clase"
                    {...register("categoria_libreta_militar")}
                  />
                </div>
              </div>
              <InputErros
                errors={errors}
                name="categoria_libreta_militar"
              />
            </div>
            <div className="flex flex-col ">
              <InputLabel
                htmlFor="libreta_militar"
                value="Numero libreta militar"
              />
              <TextInput
                id="libreta_militar"
                type="number"
                {...register("libreta_militar")}
              />
              <InputErros errors={errors} name="libreta_militar" />
            </div>
            <div className="flex flex-col col-span-1">
              <InputLabel
                htmlFor="distrito_militar"
                value="Numero distrito militar"
              />
              <TextInput
                id="distrito_militar"
                type="number"
                {...register("distrito_militar")}
              />
              <InputErros errors={errors} name="distrito_militar" />
            </div>
          </div>
        </>
      )} */}
    </div >
  );
};
