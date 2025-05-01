import { z } from "zod";


export const registerSchema = z
  .object({

    numero_identificacion: z.string().min(1, { message: "Campo vacio" }),
    primer_nombre: z.string().min(1, { message: "Campo vacio" }),
    segundo_nombre: z.string().min(1, { message: "Campo vacio" }),
    primer_apellido: z.string().min(1, { message: "Campo vacio" }),
    segundo_apellido: z.string().min(1, { message: "Campo vacio" }),
    email: z.string().email({ message: "Correo no valido" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
      password_confirmation: z
      .string()
      .min(1, { message: "La confirmación de contraseña es requerida" }),

    fecha_nacimiento: z
      .string({
        invalid_type_error: "Esa no es una fecha",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Formato de fecha incorrecto",
      }),
    genero: z.enum(["Masculino", "Femenino", "Otro"], {
      errorMap: () => ({ message: "Seleccione un genero" }),
    }),
    tipo_identificacion: z
    .string()
    .min(1, { message: "Seleccione un tipo de identificación" }),

  estado_civil: z
    .string()
    .min(1, { message: "Seleccione un estado civil" }),
  }).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"] 
  });

