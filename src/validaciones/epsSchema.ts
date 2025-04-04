import { z } from "zod";

export const epsSchema = z.object({
  nombre_eps: z.string().min(1, { message: "Campo vacio" }),
  fecha_afiliacion_efectiva: z
    .string({
      invalid_type_error: "Esa no es una fecha",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),
    numero_afiliado: z.string().min(1, { message: "Campo vacio" }),
    fecha_finalizacion_afiliacion: z
    .string({
      invalid_type_error: "Esa no es una fecha",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),
    
    
});
