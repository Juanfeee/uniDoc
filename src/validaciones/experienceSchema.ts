import {z} from 'zod';

const tipo_experiencia = [
  "Investigacion",
  "docencia_universitaria",
  "docencia_no_universitaria",
  "profesional",
  "direccion_academica"
] as const;

export type TipoExperiencia = (typeof tipo_experiencia)[number];

export const mappeoTipoExperiencia: { [key in TipoExperiencia]: string } = {
  Investigacion: "Investigacion",
  docencia_universitaria: "Docencia universitaria",
  docencia_no_universitaria: "Docencia no universitaria",
  profesional: "Profesional",
  direccion_academica: "Direccion academica"
};

export const experienciaSchema = z.object({
  tipo_experiencia: z.enum(tipo_experiencia,{message:"Tipo de experiencia no valido"}),
  Institucion: z.string().min(1, {message:"Campo vacio"}),
  cargo: z.string().min(1, {message:"Campo vacio"}),
  trabajo_actual: z.enum(["si", "no"],{message:"Campo vacio"}),
  intensidad_semanal: z.string().min(1, {message:"Campo vacio"}),
  fecha_inicio:z.string({invalid_type_error:"Esa no es una fecha"}).refine((val) => !isNaN(Date.parse(val)),{message:"Formato de fecha incorrecto"}),
  fecha_fin:z.string({invalid_type_error:"Esa no es una fecha"}).refine((val) => !isNaN(Date.parse(val)),{message:"Formato de fecha incorrecto"}),
});
