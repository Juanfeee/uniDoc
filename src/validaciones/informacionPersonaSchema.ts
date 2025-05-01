import { z } from "zod";
//definimos los tipos que vamos a usar

//definimos el esquema de validacion de los datos
export const informacionPersonaSchema = z.object({
  identificacion: z
    .string()
    .min(6, { message: "La identificación debe tener al menos 6 caracteres" }),
  direccion: z.string().min(1, { message: "Campo vacio" }),
  barrio: z.string().min(1, { message: "Campo vacio" }),
  celular: z.string().min(1, { message: "Campo vacio" }),
  email: z.string().email({ message: "Correo no valido" }),
});
