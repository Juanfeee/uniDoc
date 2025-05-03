import {z} from 'zod';

const tipo_experiencia = [
  "investigacion",
  "docencia_universitaria",
  "docencia_no_universitaria",
  "profesional",
  "direccion_academica"
] as const;

export type TipoExperiencia = (typeof tipo_experiencia)[number];

export const mappeoTipoExperiencia: { [key in TipoExperiencia]: string } = {
  investigacion: "Investigacion",
  docencia_universitaria: "Docencia universitaria",
  docencia_no_universitaria: "Docencia no universitaria",
  profesional: "Profesional",
  direccion_academica: "Direccion academica"
};

export const experienciaSchema = z.object({
  tipo_experiencia: z.string().min(1, { message: "Seleccione un tipo de experiencia" }),
  institucion_experiencia: z.string().min(1, { message: "Campo vacío" }),
  cargo: z.string().min(1, { message: "Campo vacío" }),
  trabajo_actual: z.enum(["Si", "No"], {
    errorMap: () => ({ message: "Seleccione una opción" })
  }),
  intensidad_horaria: z.string().min(1, { message: "Campo vacío" }),
  experiencia_radio: z.enum(["Si", "No"], {
    errorMap: () => ({ message: "Seleccione una opción" })
  }),
  fecha_inicio: z
    .string({
      invalid_type_error: "Esa no es una fecha válida",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),
  fecha_finalizacion: z
    .string({
      invalid_type_error: "Esa no es una fecha válida",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha incorrecto",
    }),
  archivo: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: "Debes subir un archivo",
    })
    .refine(
      (fileList) =>
        fileList instanceof FileList && fileList[0].size <= 2 * 1024 * 1024,
      {
        message: "Archivo demasiado grande (máx 2MB)",
      }
    )
    .refine(
      (fileList) =>
        fileList instanceof FileList &&
        ["application/pdf"].includes(fileList[0].type),
      {
        message: "Formato de archivo inválido (solo PDF permitido)",
      }
    ),
});