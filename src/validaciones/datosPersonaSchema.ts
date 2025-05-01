import { z } from "zod";
//definimos los tipos que vamos a usar


//definimos el tipo de los datos


//definimos el mappeo de los datos


//array definido con los tipos de identificaciones exportamos para usar en otros archivos


//definimos el esquema de validacion de los datos del usuario
export const userSchema = z.object({
  tipo_identificacion: z
  .string()
  .min(1, { message: "Seleccione un tipo de identificación" }),
  numero_identificacion: z.string().min(1, { message: "Campo vacio" }),
  estado_civil: z
    .string()
    .min(1, { message: "Seleccione un estado civil" }),
  primer_nombre: z.string().min(1, { message: "Campo vacio" }),
  segundo_nombre: z.string().min(1, { message: "Campo vacio" }),
  primer_apellido: z.string().min(1, { message: "Campo vacio" }),
  segundo_apellido: z.string().min(1, { message: "Campo vacio" }),
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
});
