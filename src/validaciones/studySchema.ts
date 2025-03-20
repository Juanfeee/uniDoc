import { z } from "zod";

//definimos los tipos que vamos a usar
const tipo_estudio = [
  "curso_capacitacion",
  "pregrado",
  "pregrado_medicina_musica",
  "especializacion",
  "especializacion_medicina_odontologia",
  "maestria",
  "doctorado",
  "posdoctorado",
  "tecnico",
  "tecnologo",
] as const;

export type TipoEstudio = (typeof tipo_estudio)[number];

export const mappeoTipoEstudio: { [key in TipoEstudio]: string } = {
  curso_capacitacion: "Curso de capacitacion",
  pregrado: "Pregrado",
  pregrado_medicina_musica: "Pregrado en medicina o musica",
  especializacion: "Especializacion",
  especializacion_medicina_odontologia: "Especializacion en medicina o odontologia",
  maestria: "Maestria",
  doctorado: "Doctorado",
  posdoctorado: "Posdoctorado",
  tecnico: "Tecnico",
  tecnologo: "Tecnologo",
};

//validacion de los datos
export const studySchema = z.object({
  titulo: z.string().min(1, { message: "Campo vacio" }),
  institucion: z.string().min(1, { message: "Campo vacio" }),

  pais: z.string().min(1, { message: "Campo vacio" }),

  fecha_grado: z
    .string({
      invalid_type_error: "Esa no es una fecha",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),

  fecha_inicio: z
    .string({
      invalid_type_error: "Esa no es una fecha",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),
  fecha_fin: z
    .string({
      invalid_type_error: "Esa no es una fecha",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),

  graduado: z.enum(["si", "no"], {
    errorMap: () => ({ message: "Seleccione una opcion" }),
  }),
  titulo_convalidado: z.enum(["si", "no"], {
    errorMap: () => ({ message: "Seleccione una opcion" }),
  }),

  tipo_estudio: z.enum(tipo_estudio, {
    errorMap: () => ({ message: "Seleccione una opcion" }),
  }),
});
