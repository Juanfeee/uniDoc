import { z } from "zod";

export const languageSchema = z.object({
  idioma: z.string().min(1, { message: "Campo vacio" }),
  nivel_idioma: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"], {
    message: "Nivel no valido",
  }),
  institucion: z.string().min(1, { message: "Campo vacio" }),
  titulo_convalidado: z.string().min(1, { message: "Campo vacio" }),
  fecha_certificado: z
    .string({
      invalid_type_error: "Esa no es una fecha",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),
});
