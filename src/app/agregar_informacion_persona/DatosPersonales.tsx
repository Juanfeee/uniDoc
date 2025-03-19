"use client";
import { InputLabel } from "../componentes/formularios/InputLabel";
import { LabelRadio } from "../componentes/formularios/LabelRadio";
import PrimaryButton from "../componentes/formularios/PrimaryButton";
import { SelectForm } from "../componentes/formularios/SelectForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../componentes/formularios/TextInput";
import { userSchema } from "@/validaciones/userSchema";
import InputErros from "../componentes/formularios/InputErros";

export const DatosPersonales = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  return (
    <>
      <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src='/imagenes/logo.png' alt="Logo" className="h-6" />
          <span className="text-lg font-semibold">UniDoc</span>
        </div>

        {/* Menú */}
        <div className="hidden md:flex gap-6 text-gray-700">
          <a href="#" className="hover:text-blue-600">Inicio</a>
          <a href="#" className="hover:text-blue-600">Datos personales</a>
          <a href="#" className="hover:text-blue-600">Normativas</a>
        </div>

        {/* Iconos de notificación y usuario */}
        <div className="flex items-center gap-4">
          <button className="bg-gray-100 p-2 rounded-full"></button>
          <img
            src="imagenes/usuario.png"
            alt="Usuario"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </nav>

      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto relative">
        <div>
            <h1 className="text-4xl font-semibold">Hoja de vida</h1>
        </div>
        <div>
            <h1 className="text-xl font-semibold">Datos personales</h1>
        </div>
        {/* Información Personal */}
        <div className="flex items-center gap-4 border-b pb-4">

          <div className="w-24 h-24 bg-gray-300 rounded-full" />

          <div>
            <h3 className="text-xl font-semibold">Aurora Morales</h3>
            <p className="text-gray-600">Identificación: 123456789</p>
          </div>
        </div>

        {/* Estado de Validación */}
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h4 className="text-lg font-semibold text-gray-700">Estado de Validación Académica: <span className="text-green-600">Aprobado</span></h4>
          <p className="text-gray-600">Puntaje: <span className="font-bold text-blue-600">00</span></p>
        </div>

        {/* Información Adicional */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 bg-gray-50 p-4 rounded-md">
          <div>
            <p className="text-sm font-semibold">Correo Electrónico</p>
            <p className="text-gray-600">auroramoraes@uniautonoma.edu.co</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Ubicación</p>
            <p className="text-gray-600">Popayán, Cauca</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Facultades</p>
            <p className="text-gray-600">Facultad de Ingeniería, Facultad de Ciencias Ambientales y Desarrollo Sostenible</p>
          </div>
        </div>

        {/* Formación Docente */}
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <h4 className="text-lg font-semibold text-gray-700">Formación Docente</h4>
          <div className="mt-2 p-4 border-dashed border-2 rounded-md text-center">
            <p className="text-gray-600">Experiencia</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Añadir experiencia</button>
          </div>
          <div className="mt-4 p-4 border-dashed border-2 rounded-md text-center">
            <p className="text-gray-600">Formación Educativa</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Añadir Formación educativa</button>
          </div>
          <div className="mt-4 p-4 border-dashed border-2 rounded-md text-center">
            <p className="text-gray-600">Formación Educativa</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Añadir Formación educativa</button>
          </div>
          <div className="mt-4 p-4 border-dashed border-2 rounded-md text-center">
            <p className="text-gray-600">Formación Educativa</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Añadir Formación educativa</button>
          </div>
        </div>
      </div>
    </>
  );
};
