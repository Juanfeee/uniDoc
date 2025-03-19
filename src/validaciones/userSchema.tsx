import {z} from 'zod'

const tipo_identificaciones = ["cedula_ciudadania", "cedula_extranjera", "numero_identificacion", "pasaporte"] as const;

export const userSchema = z.object({
  identificacion: z.string().min(6, {message:"La identificación debe tener al menos 6 caracteres"}),
  
  idioma: z.string().min(2, "El idioma es obligatorio"), // Agregar idioma
  institucion: z.string().min(2, "La institución es obligatorio"),
  fecha_certificado: z.string().min(2, "El certificado es obligatorio"),
  nivel: z.string().min(2, "El nivel es obligatorio"),

})