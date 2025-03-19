"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Componentes personalizados
import { InputLabel } from "../componentes/formularios/InputLabel";
import { LabelRadio } from "../componentes/formularios/LabelRadio";
import PrimaryButton from "../componentes/formularios/PrimaryButton";
import TextInput from "../componentes/formularios/TextInput";

// Esquema de validación
import { userSchema } from "@/validaciones/userSchema";

export const Idioma = () => {
  const [archivo, setArchivo] = useState<File | null>(null);

  const manejarArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setArchivo(event.target.files[0]);
    }
  };

  const abrirSelectorArchivos = () => {
    document.getElementById("inputCertificado")?.click();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  return (
    <div className="min-h-screen">
      {/* Navbar fijo */}
      <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center fixed w-full top-0 z-50">
        <div className="flex items-center gap-2 ml-40">
          <img src="/imagenes/logo.png" alt="Logo" className="h-6" />
          <span className="text-lg font-semibold">UniDoc</span>
        </div>

        <div className="hidden md:flex gap-6 text-gray-700 ml-150">
          <a href="#" className="hover:text-blue-600">Inicio</a>
          <a href="#" className="hover:text-blue-600">Datos personales</a>
          <a href="#" className="hover:text-blue-600">Normativas</a>
        </div>

        <div className="flex items-center gap-6 mr-45">
          <button className="bg-gray-100 p-2 rounded-full">
            {/* Ícono de notificación aquí si es necesario */}
          </button>
          <img 
            src="/imagenes/usuario.png" 
            alt="Usuario" 
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </nav>

      {/* Sección del formulario con espacio debajo del navbar */}
      <div className="mt-24 p-6">
        <div className="bg-white p-6 rounded-md shadow-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto">
          <h3 className="font-bold text-3xl mb-8 ml-6">Agregar idioma</h3>


          <form
            onSubmit={handleSubmit(() => {
              console.log("Formulario enviado");
            })}
            className="flex flex-col gap-y-6 sm:grid grid-cols-2 sm:gap-y-10 sm:gap-x-4"
          >
            <div className="grid col-span-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 w-full">
              <div>
                <InputLabel htmlFor="idioma" value="Idioma:" />
                <TextInput
                  className="w-full"
                  id="idioma"
                  type="text"
                  placeholder="Ejemplo: Inglés, Francés..."
                  {...register("idioma")}
                />
              </div>

              <div>
                <InputLabel htmlFor="institucion" value="Institución:" />
                <TextInput
                  className="w-full sm:w-96 md:w-[700px]"
                  id="institucion"
                  type="text"
                  placeholder="Ejemplo: Instituto Nacional..."
                  {...register("institucion")}
                />
              </div>
            </div>

            <div className="grid gap-y-4 sm:grid-cols-2 lg:grid-cols-3 col-span-full sm:gap-x-8">
              <div className="flex flex-col sm:col-span-full lg:col-span-1">
                <InputLabel htmlFor="fecha_certificado" value="Fecha del certificado:" />
                <TextInput
                  id="fecha_certificado"
                  type="date"
                  {...register("fecha_certificado")}
                />
              </div>
            </div>

            <div className="sm:col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 w-full items-center justify-center gap-y-4">
              <div className="lg:col-span-2">
                <InputLabel>Nivel de idioma - formato internacional</InputLabel>
                <div className="flex flex-wrap justify-start px-2 sm:justify-center items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC] border-[#D1DBE8] p-4">
                  {["A1", "A2", "B1", "B2", "C1", "C2"].map((nivel) => (
                    <div key={nivel} className="flex items-center gap-x-1">
                      <LabelRadio htmlFor={nivel}>{nivel}</LabelRadio>
                      <TextInput type="radio" id={nivel} value={nivel} {...register("nivel")} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-full flex flex-col items-center gap-6 mt-6">
              <div className="border-2 border-dashed border-gray-400 p-6 rounded-md w-full max-w-3xl flex flex-col items-center">
                <LabelRadio htmlFor="certificado" className="text-lg font-bold">
                  CERTIFICADO DE IDIOMAS
                </LabelRadio>

                <input
                  id="inputCertificado"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={manejarArchivo}
                />

                <button
                  onClick={abrirSelectorArchivos}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-md mt-4 hover:bg-gray-300 transition"
                >
                  Subir certificado
                </button>

                {archivo && (
                  <p className="mt-2 text-sm text-gray-600">
                    Archivo seleccionado: <strong>{archivo.name}</strong>
                  </p>
                )}
              </div>

              <PrimaryButton className="px-10 py-3 rounded-full shadow-md mt-6">
                Guardar
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
