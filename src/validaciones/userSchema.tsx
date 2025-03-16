import {z} from 'zod'

const tipo_identificaciones = ["cedula_ciudadania", "cedula_extranjera", "numero_identificacion", "pasaporte"] as const;

export const userSchema = z.object({
  identificacion: z.string().min(6, {message:"La identificación debe tener al menos 6 caracteres"}),
  
  primer_nombre: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  segundo_nombre: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  primer_apellido: z.string().min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  segundo_apellido: z.string().min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  tipo_identificacion: z.enum(tipo_identificaciones,{
    errorMap: () => ({ message: "El tipo de identificación no es valido" })
  })

})