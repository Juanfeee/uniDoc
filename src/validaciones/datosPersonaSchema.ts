import { z } from "zod";
//definimos los tipos que vamos a usar

const departamentos = ["amazonas", "antioquia", "arauca", "cauca"] as const;
const ciudadesCauca = [
  "popayan",
  "santander_de_quilichao",
  "guapi",
  "timbio",
] as const;
const estadoCivil = ["soltero", "casado", "divorciado", "viudo"] as const;

//definimos el tipo de los datos

export type Departamento = (typeof departamentos)[number];
export type CiudadCauca = (typeof ciudadesCauca)[number];
export type EstadoCivil = (typeof estadoCivil)[number];

//definimos el mappeo de los datos
export const mappeoEstadoCivil: { [key in EstadoCivil]: string } = {
  soltero: "Soltero",
  casado: "Casado",
  divorciado: "Divorciado",
  viudo: "Viudo",
};
export const mappeoCiudadCauca: { [key in CiudadCauca]: string } = {
  popayan: "Popayán",
  santander_de_quilichao: "Santander de Quilichao",
  guapi: "Guapi",
  timbio: "Timbio",
};

export const mappeoDepartamento: { [key in Departamento]: string } = {
  amazonas: "Amazonas",
  antioquia: "Antioquia",
  arauca: "Arauca",
  cauca: "Cauca",
};

export const mappeoPais: { [key in Pais]: string } = {
  colombia: "Colombia",
  venezuela: "Venezuela",
  ecuador: "Ecuador",
  peru: "Peru",
  brasil: "Brasil",
  argentina: "Argentina",
  chile: "Chile",
  uruguay: "Uruguay",
  paraguay: "Paraguay",
  bolivia: "Bolivia",
  guyana: "Guyana",
  surinam: "Surinam",
  guyana_francesa: "Guyana Francesa",
};

//array definido con los tipos de identificaciones exportamos para usar en otros archivos


//definimos el esquema de validacion de los datos del usuario
export const userSchema = z.object({


  primer_nombre: z.string().min(1, { message: "Campo vacio" }),

  segundo_nombre: z.string().min(1, { message: "Campo vacio" }),
  primer_apellido: z.string().min(1, { message: "Campo vacio" }),
  segundo_apellido: z.string().min(1, { message: "Campo vacio" }),
  libreta_militar: z.string().optional(),
  distrito_militar: z.string().optional(),

  fecha_nacimiento: z
    .string({
      invalid_type_error: "Esa no es una fecha",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),

  genero: z.enum(["Masculino", "Femenino", "Otro"], {
    errorMap: () => ({ message: "El genero no es valido" }),
  }),
  categoria_libreta_militar: z
    .enum(["primera_clase", "segunda_clase"])
    .optional()
    .or(z.literal("")),

});
