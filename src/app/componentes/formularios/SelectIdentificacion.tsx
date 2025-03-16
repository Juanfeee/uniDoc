import { InputLabel } from "./InputLabel";

type Props = {
  className?: string;
  register?: any;
}

export const SelectIdentificacion = ({ className = "", register }: Props) => {
  return (
    <>
      <div className="flex flex-col">
      <InputLabel htmlFor="tipo_identificacion" value="Tipo de identificacion" />
        <select 
        defaultValue=""
        {...register}
        id="tipo_identificacion" className={`${className} rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] px-1 py-2 h-11`}>
          <option value="" >Eliga una opción...</option>
          <option value="cedula_ciudadania">Cedula de ciudadania</option>
          <option value="cedula_extranjera">Cedula de extranjeria</option>
          <option value="numero_identificacion">Numero identificacion personal</option>
          <option value="pasaporte">Pasaporte</option>
        </select>
      </div>
    </>
  )
}