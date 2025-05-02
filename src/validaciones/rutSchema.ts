import { z } from "zod";

//definimos el esquema de validacion de los datos
export const rutSchema = z.object({
  nombre_rut: z.string().min(1, { message: "Campo vacío" }),
  razon_social: z.string().min(1, { message: "Campo vacío" }),
  tipo_persona: z.string().min(1, { message: "Debe seleccionar una opción" }),
  codigo_ciiu: z.string().min(1, { message: "Debe seleccionar una opción" }),
  Responsabilidades_tributarias: z.string().min(1, { message: "Campo vacío" })
});
