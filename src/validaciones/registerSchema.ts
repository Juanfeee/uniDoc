import { z } from "zod";
const estadoCivil = ["Soltero", "Casado", "Divorciado", "Viudo"] as const;
const tipo_identificaciones = [
  "CEDULA_DE_EXTRANJERIA",
  "NUMERO_UNICO_IDENTIFICACION_PERSONAL",
  "PASAPORTE",
  "REGISTRO_CIVIL",
  "Cédula de ciudadanía",
  "NUMERO_POR_SECRETARIA_DE_EDUCACION",
  "SERVICIO_NACIONAL_DE_PRUEBAS",
  "TARJETA_DE_IDENTIDAD",
  "TARJETA_PROFESIONAL",
] as const;

export type EstadoCivil = (typeof estadoCivil)[number];
export type TipoIdentificacion = (typeof tipo_identificaciones)[number];


export const mappeoEstadoCivil: { [key in EstadoCivil]: string } = {
  Soltero: "Soltero",
  Casado: "Casado",
  Divorciado: "Divorciado",
  Viudo: "Viudo",
};
export const mappeoTipoIdentificacion: { [key in TipoIdentificacion]: string } =
  {
    "Cédula de ciudadanía": "Cédula de ciudadanía",
    CEDULA_DE_EXTRANJERIA: "Cédula de extranjería",
    NUMERO_UNICO_IDENTIFICACION_PERSONAL: "Número unico de identificación personal",
    PASAPORTE: "Pasaporte",
    REGISTRO_CIVIL: "Registro civil",
    NUMERO_POR_SECRETARIA_DE_EDUCACION: "Número por secretaría de educación",
    SERVICIO_NACIONAL_DE_PRUEBAS: "Servicio nacional de pruebas",
    TARJETA_DE_IDENTIDAD: "Tarjeta de identidad",
    TARJETA_PROFESIONAL: "Tarjeta profesional",
  };

export const registerSchema = z
  .object({
    primer_nombre: z.string().min(1, { message: "Campo vacio" }),
    segundo_nombre: z.string().min(1, { message: "Campo vacio" }),
    primer_apellido: z.string().min(1, { message: "Campo vacio" }),
    segundo_apellido: z.string().min(1, { message: "Campo vacio" }),
    email: z.string().email({ message: "Correo no valido" }),
    numero_identificacion: z.string().min(1, "Campo requerido"),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirm_password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    fecha_nacimiento: z
      .string({
        invalid_type_error: "Esa no es una fecha",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Formato de fecha incorrecto",
      }),
    tipo_identificacion: z.enum(tipo_identificaciones, {
      errorMap: () => ({ message: "El tipo de identificación no es valido" }),
    }),

    estado_civil: z.enum(estadoCivil, {
      errorMap: () => ({ message: "El estado civil no es valido" }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });
