import {z} from 'zod'

const tipo_experiencia = ["Investigación", "Docencia_universitaria", "Docencia_no_universitaria", "Profesional","Direccion_Academica"] as const;

export const userSchema = z.object({
  Institución: z.string().min(6, {message:"Campo vacio"}),
  Cargo: z.string().min(3, { message: "Campo vacio" }),
  Intensidad: z.string().min(3, { message: "Campo vacio" }),
  Profesional: z.string().min(3, { message: "Campo vacio" }),
  Direccion_Academica: z.string().min(3, { message: "Campo vacio" }),
  tipo_experiencia: z.enum(tipo_experiencia,{
    errorMap: () => ({ message: "El tipo de identificación no es valido" })
  }),
  fecha_inicio: z.string().min(1,{message : "Selecciona la fecha de inicio"}),
  fecha_finalizacion : z.string().min(1,{message : "Selecciona la fecha de inicio"}),
  exp_autonoma : z.enum(["Si","No"],{errorMap : () => ({message: "Opcion no valida"})}),
  actual_t : z.enum(["Si","No"],{errorMap : () => ({message: "Opcion no valida"})})

})