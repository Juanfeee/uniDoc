import {z} from 'zod'
const estadoCivil = ["soltero", "casado", "divorciado", "viudo"] as const;
const tipo_identificaciones = ["cedula_ciudadania", "cedula_extranjera", "numero_identificacion", "pasaporte"] as const;

export type EstadoCivil = typeof estadoCivil[number];
export type TipoIdentificacion = typeof tipo_identificaciones[number];

export const registerSchema = z.object({
  
  primer_nombre: z.string().min(1, { message: "Campo vacio" }),
  segundo_nombre: z.string().min(1, { message: "Campo vacio" }),
  primer_apellido: z.string().min(1, { message: "Campo vacio" }),
  segundo_apellido: z.string().min(1, { message: "Campo vacio" }),
  email: z.string().email({ message: "Correo no valido" }),
  numero_identificacion: z.string().min(1, "Campo requerido"),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirm_password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  fecha_nacimiento: z
  .string({
    invalid_type_error: "Esa no es una fecha",
  })
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Formato de fecha incorrecto",
  }),
  genero: z.enum(["masculino", "femenino", "otro"],{
    errorMap: () => ({ message: "El genero no es valido" })
  }),

  tipo_identificacion: z.enum(tipo_identificaciones,{
    errorMap: () => ({ message: "El tipo de identificación no es valido" })
  }),

  estado_civil: z.enum(estadoCivil,{
    errorMap: () => ({ message: "El estado civil no es valido" })
  })

}).refine(data => data.password === data.confirm_password, {
  message: "Las contraseñas no coinciden",
  path: ["confirm_password"]
})