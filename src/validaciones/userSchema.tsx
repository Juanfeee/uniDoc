import {z} from 'zod'

const tipo_identificaciones = ["cedula_ciudadania", "cedula_extranjera", "numero_identificacion", "pasaporte"] as const;

const pais= ["colombia", "venezuela", "ecuador", "peru", "brasil", "argentina", "chile", "uruguay", "paraguay", "bolivia", "guyana", "surinam", "guyana_francesa"] as const;

const departamentos = ["amazonas", "antioquia", "arauca", "cauca"] as const;

const ciudadesCauca = ["popayan", "santander_de_quilichao", "guapi", "timbio"] as const;

export type Pais = typeof pais[number];
export type Departamento = typeof departamentos[number];
export type CiudadCauca = typeof ciudadesCauca[number];

export const mappeoCiudadCauca: {[key in CiudadCauca]: string} = {
  popayan: "Popayán",
  santander_de_quilichao: "Santander de Quilichao",
  guapi: "Guapi",
  timbio: "Timbio"
};
export type mappeoDepartamento = {[key in Departamento]: string};

export const mappeoDepartamento: {[key in Departamento]: string}  = { 
  amazonas: "Amazonas",
  antioquia: "Antioquia",
  arauca: "Arauca",
  cauca: "Cauca"
};


export const mappeoPais:{[key in Pais]: string} = {
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
export type TipoIdentificacion = typeof tipo_identificaciones[number];

export const mappeoTipoIdentificacion:{[key in TipoIdentificacion]: string} = {
  cedula_ciudadania: "Cédula de ciudadanía",
  cedula_extranjera: "Cédula de extranjería",
  numero_identificacion: "Número de identificación",
  pasaporte: "Pasaporte",
};

//definimos el esquema de validacion de los datos del usuario
export const userSchema = z.object({
  identificacion: z.string().min(6, {message:"La identificación debe tener al menos 6 caracteres"}),
  
  primer_nombre: z.string().min(1, { message: "Campo vacio" }),
  segundo_nombre: z.string().min(1, { message: "Campo vacio" }),
  primer_apellido: z.string().min(1, { message: "Campo vacio" }),
  segundo_apellido: z.string().min(1, { message: "Campo vacio" }),
  fecha_nacimiento: z.string().min(1, { message: "Seleccione su fecha de nacimiento" }),
  
  genero: z.enum(["masculino", "femenino", "otro"],{
    errorMap: () => ({ message: "El genero no es valido" })
  }),

  pais: z.enum(pais,{
    errorMap: () => ({ message: "El pais no es valido" })
  }),
  departamento: z.enum(departamentos,{
    errorMap: () => ({ message: "El departamento no es valido" })
  }).optional(),
  
  ciudad: z.enum(ciudadesCauca,{
    errorMap: () => ({ message: "La ciudad no es valida" })
  }).optional(),

  tipo_identificacion: z.enum(tipo_identificaciones,{
    errorMap: () => ({ message: "El tipo de identificación no es valido" })
  })


})