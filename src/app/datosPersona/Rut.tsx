"use client";
import { InputLabel } from "../componentes/formularios/InputLabel";
import { SelectForm } from "../componentes/formularios/SelectForm";
import { useForm, SubmitHandler } from 'react-hook-form'
import TextInput from "../componentes/formularios/TextInput";
import InputErrors from "../componentes/formularios/InputErrors";
import { Inputs } from "@/types/inputs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { ButtonPrimary } from "../componentes/formularios/ButtonPrimary";
import { zodResolver } from "@hookform/resolvers/zod";
import { rutSchema } from "@/validaciones/rutSchema";

export type Inputs = {
  numero_rut: string;
  razon_social: string;
  tipo_persona: string;
  codigo_ciiu: string;
  responsabilidades_tributarias: string;
  archivo: FileList;
};

export const Rut = () => {
  const [tipoPersonaOptions, setTipoPersonaOptions] = useState<{ value: string, label: string }[]>([]);
  const [codigoCiiuOptions, setCodigoCiiuOptions] = useState<{ value: string, label: string }[]>([]);

   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    } = useForm<Inputs>({
      resolver: zodResolver(rutSchema),
      defaultValues: {
      },
    });

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

  //Traer los datos del usuario al cargar el componente
    useEffect(() => {
      const url2 = `${process.env.NEXT_PUBLIC_API_URL}/aspirante/obtener-rut`;
      axios.get(url2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
        .then((response) => {
          const data = response.data.rut;
          setValue("numero_rut", data.numero_rut);
          setValue("razon_social", data.razon_social);
          setValue("tipo_persona", data.tipo_persona);
          setValue("codigo_ciiu", data.codigo_ciiu);
          console.log("Datos del usuario:", data);
          setValue("responsabilidades_tributarias", data.responsabilidades_tributarias);
        })
        .catch((error) => {
          console.error("Error al cargar los datos del usuario:", error);
        });
    }, [setValue]);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const formValues = {
      numero_rut: watch("numero_rut"),
      razon_social: watch("razon_social"),
      tipo_persona: watch("tipo_persona"),
      codigo_ciiu: watch("codigo_ciiu"),
      responsabilidades_tributarias: watch("responsabilidades_tributarias"),
      archivo: watch("archivo")
    };
    

    const formData = new FormData();
    formData.append('numero_rut', formValues.numero_rut);
    formData.append('razon_social', formValues.razon_social);
    formData.append('tipo_persona', formValues.tipo_persona);
    formData.append('codigo_ciiu', formValues.codigo_ciiu);
    formData.append('responsabilidades_tributarias', formValues.responsabilidades_tributarias);
    formData.append('archivo', formValues.archivo[0]); // Solo se envía el primer archivo

    const token = Cookies.get("token");
    if (!token) {
      toast.error("No hay token de autenticación");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/aspirante/crear-rut`;

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
    }
    console.log("Datos enviados:", formValues); 
  }

  return (
  
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Formulario RUT</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      <div>
        <InputLabel htmlFor="numero_rut" value="Nombre RUT" />
        <TextInput
          className="w-full"
          id="numero_rut"
          type="text"
          placeholder="Nombre RUT..."
          {...register("numero_rut")}
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
        <InputLabel htmlFor="responsabilidades_tributarias" value="Responsabilidades tributarias" />
        <TextInput
          className="w-full"
          id="responsabilidades_tributarias"
          type="text"
          placeholder="Responsabilidades tributarias..."
          {...register("responsabilidades_tributarias")}
        />
        <InputErrors errors={errors} name="responsabilidades_tributarias" />
      </div>

       {/* Archivo */}
        <div>
          <InputLabel htmlFor="archivo" value="Archivo" />
          <input type="file" id="archivo" {...register("archivo")} accept=".pdf, .jpg, .png" className="w-full h-11 rounded-lg border-[1.8px] border-blue-600 bg-slate-100/40 p-3 text-sm text-slate-950/90 placeholder-slate-950/60 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition duration-300 ease-in-out" />
          <InputErrors errors={errors} name="archivo" />
        </div>

        <div className="col-span-full text-center">
          <ButtonPrimary type="submit" value="Guardar" />
        </div>

      </form>
    </div>

  );
};
