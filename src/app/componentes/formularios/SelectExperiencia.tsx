import { InputLabel } from "./InputLabel";

type Props = {
  className?: string;
  register?: any;
}

export const SelectExperiencia = ({ className = "", register }: Props) => {
  return (
    <>
      <div className="flex flex-col">
      <InputLabel htmlFor="tipo_experiencia" value="Tipo de experiencia" />
        <select 
        defaultValue=""
        {...register }
        id="tipo_experiencia" className={`${className} rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] px-1 py-2 h-11`}>
          <option value="" >Eliga una opción...</option>
          <option value="Investigación">Investigación</option>
          <option value="Docencia_universitaria">Docencia universitaria</option>
          <option value="Docencia_no_universitaria">Docencia no universitaria </option>
          <option value="Profesional">Profesional</option>
          <option value="Direccion_Academica">Direccion Academica</option>
          <option value="Docencia Autónoma">Docencia Aut</option>
        </select>
      </div>
    </>
  )
}