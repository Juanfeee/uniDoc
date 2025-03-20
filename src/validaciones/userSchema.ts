import {z} from 'zod'
//definimos los tipos que vamos a usar
const tipo_identificaciones = ["cedula_ciudadania", "cedula_extranjera", "numero_identificacion", "pasaporte"] as const;
const pais= ["colombia", "venezuela", "ecuador", "peru", "brasil", "argentina", "chile", "uruguay", "paraguay", "bolivia", "guyana", "surinam", "guyana_francesa"] as const;
const departamentos = ["amazonas", "antioquia", "arauca", "cauca"] as const;
const ciudadesCauca = ["popayan", "santander_de_quilichao", "guapi", "timbio"] as const;
const estadoCivil = ["soltero", "casado", "divorciado", "viudo"] as const;

//definimos el tipo de los datos
export type TipoIdentificacion = typeof tipo_identificaciones[number];
export type Pais = typeof pais[number];
export type Departamento = typeof departamentos[number];
export type CiudadCauca = typeof ciudadesCauca[number];
export type EstadoCivil = typeof estadoCivil[number];


//definimos el mappeo de los datos
export const mappeoEstadoCivil:{[key in EstadoCivil]: string} = {
  soltero: "Soltero",
  casado: "Casado",
  divorciado: "Divorciado",
  viudo: "Viudo"
};
export const mappeoCiudadCauca: {[key in CiudadCauca]: string} = {
  popayan: "Popayán",
  santander_de_quilichao: "Santander de Quilichao",
  guapi: "Guapi",
  timbio: "Timbio"
};

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
  libreta_militar: z.string().optional(),
  distrito_militar: z.string().optional(),  
  direccion: z.string().min(1, { message: "Campo vacio" }),
  barrio: z.string().min(1, { message: "Campo vacio" }),
  celular: z.string().min(1, { message: "Campo vacio" }),
  email: z.string().email({ message: "Correo no valido" }),
  fecha_nacimiento: z.string().min(1, { message: "Seleccione su fecha de nacimiento" }),
  
  genero: z.enum(["masculino", "femenino", "otro"],{
    errorMap: () => ({ message: "El genero no es valido" })
  }),
  categoria_libreta_militar: z.enum(["primera_clase", "segunda_clase"]).optional().or(z.literal("")),

  pais_residencia: z.enum(pais ,{
    errorMap: () => ({ message: "El pais no es valido" })
  }),

  pais: z.enum(pais,{
    errorMap: () => ({ message: "El pais no es valido" })
  }),


  tipo_identificacion: z.enum(tipo_identificaciones,{
    errorMap: () => ({ message: "El tipo de identificación no es valido" })
  }),

  estado_civil: z.enum(estadoCivil,{
    errorMap: () => ({ message: "El estado civil no es valido" })
  })


})