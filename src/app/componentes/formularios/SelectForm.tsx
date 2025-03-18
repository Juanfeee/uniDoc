
import { mappeoTipoEstudio } from "@/validaciones/studySchema";
import { mappeoCiudadCauca, mappeoDepartamento, mappeoEstadoCivil, mappeoPais, mappeoTipoIdentificacion } from "@/validaciones/userSchema";
type Props = {
  className?: string;
  register?: any;
  id: string;

}

export const SelectForm = ({ id,className, register }: Props) => {

  //mappeo de opciones
  const optionsMap = {
    tipo_identificacion: mappeoTipoIdentificacion,
    pais: mappeoPais,
    departamento: mappeoDepartamento,
    ciudad: mappeoCiudadCauca,
    estado_civil: mappeoEstadoCivil,
    tipo_estudio: mappeoTipoEstudio,
  };

  //mapeamos las opciones dependiendo del id
  const options = Object.entries(optionsMap[id as keyof typeof optionsMap] || {}).map(([key, value]) => (
    <option key={key} value={key}>{value}</option>
  ));

  return (
    <>
      <div className="flex flex-col">
        <select 
        defaultValue=""
        {...register}
        key={id} 
        id={id}
        className={`${className} rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] px-1 py-2 h-11`}>
          <option key={id} value="" disabled>Seleccione una opcion</option>
          //mostramos las opciones
          {options}
        </select>
      </div>
    </>
  )
}