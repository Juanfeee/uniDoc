import { z } from "zod";

export const registerSchema = z.object({
  pais: z.string().nonempty("El país es obligatorio"),
  departamento: z.string().nonempty("El departamento es obligatorio"),
  municipio: z.string().nonempty("El municipio es obligatorio"),
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  password_confirmation: z.string().min(6, "La confirmación de contraseña es obligatoria"),
  primer_nombre: z.string().nonempty("El primer nombre es obligatorio"),
  segundo_nombre: z.string().optional(),
  primer_apellido: z.string().nonempty("El primer apellido es obligatorio"),
  segundo_apellido: z.string().optional(),
  fecha_nacimiento: z.string().nonempty("La fecha de nacimiento es obligatoria"),
  genero: z.enum(["Masculino", "Femenino", "Otro"]),
  estado_civil: z.string().nonempty("El estado civil es obligatorio"),
  municipio_id: z.number().optional(),
  tipo_identificacion: z.string().nonempty("El tipo de identificación es obligatorio"),
  numero_identificacion: z.string().nonempty("El número de identificación es obligatorio"),
});