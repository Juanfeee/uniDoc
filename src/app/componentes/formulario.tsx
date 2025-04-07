"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonPrimary } from "./formularios/ButtonPrimary";
import { Inputs } from "@/types/inputs";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormularioProps = {
  Componente: React.ComponentType<any>;
  Schema: any;
  Texto: string;
  Ruta: string;
};

export const Formulario = ({ Componente, Schema, Texto, Ruta }: FormularioProps) => {
  const router = useRouter();
  const componenteNombre = Componente.name;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [acordeonAbierto, setAcordeonAbierto] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(Schema) });

  const toggleAcordeon = () => setAcordeonAbierto(!acordeonAbierto);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/${Ruta}`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      console.log("Respuesta del servidor:", response.data);
      setSubmitSuccess(true);

      // Si el backend devuelve un nuevo token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

    } catch (error) {
      console.error("Error al enviar formulario:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setSubmitError("Sesión expirada. Redirigiendo al login...");
          localStorage.removeItem("token");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          setSubmitError(error.response?.data?.message || "Error al actualizar datos");
        }
      } else {
        setSubmitError("Error desconocido");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-md">
      <div
        className={`acordeon-titulo flex justify-between items-center p-6 cursor-pointer ${acordeonAbierto ? 'active' : ''}`}
        onClick={toggleAcordeon}
      >
        <h3 className="font-bold text-3xl">{Texto}</h3>
        <span className="acordeon-icono text-3xl">
          {acordeonAbierto ? '−' : '+'}
        </span>
      </div>

      <div className={`acordeon-contenido ${acordeonAbierto ? 'block' : 'hidden'}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {Componente && (
            <Componente
              watch={watch}
              setValue={setValue}
              register={register}
              errors={errors}
            />
          )}

          {/* Mensajes de estado */}
          {submitError && (
            <div className="mx-4 mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="mx-4 mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Datos guardados correctamente
            </div>
          )}

          <div className="bg-white p-5 flex justify-center">
            <ButtonPrimary
              type="submit"
              value={isSubmitting ? "Enviando..." : "Guardar"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};