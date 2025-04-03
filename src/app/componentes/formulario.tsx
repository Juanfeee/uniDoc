import { userSchema } from "@/validaciones/datosPersonaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonPrimary } from "./formularios/ButtonPrimary";
import { Inputs } from "@/types/inputs";
import { useState } from "react";


export const Formulario = ({ Componente, Schema, Texto }) => {

  const componenteNombre: string = Componente.name;
  const {
    // useForm es un hook de react-hook-form que se encarga de manejar el estado del formulario
    // register es una funcion que se encarga de registrar los inputs del formulario
    // handleSubmit es una funcion que se encarga de manejar el evento de submit del formulario
    // formState es un objeto que contiene el estado del formulario
    // errors es un objeto que contiene los errores de validacion del formulario
    // watch es una funcion que se encarga de observar los cambios de un campo
    // zod es una libreria que se encarga de validar los campos del formulario
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(Schema) });
  //El submithandler es una funcion que se encarga de manejar el submit del formulario
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log("Formulario enviado del componente", componenteNombre);
    //mensaje de exito
    alert("Formulario enviado");
  };
  console.log("Errores ", errors);
  console.log("Formulario", watch());
  const [acordeonAbierto, setAcordeonAbierto] = useState(false);

  const toggleAcordeon = () => {
    setAcordeonAbierto(!acordeonAbierto)
  }
  return (
    <>
      <form className="bg-white w-full rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`acordeon-titulo flex justify-between items-center p-6 cursor-pointer ${acordeonAbierto ? 'active' : ''}`}
          onClick={toggleAcordeon}
        >
          <h3 className="font-bold text-3xl">{Texto}</h3>
          <span className="acordeon-icono text-3xl">
            {acordeonAbierto ? '−' : '+'}
          </span>
        </div>
        <div className="acordeon">
          <div className={`acordeon-contenido ${acordeonAbierto ? 'block' : 'hidden'}`}>
            {Componente && (
              <Componente
                watch={watch}
                setValue={setValue}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                acordeonAbierto={acordeonAbierto}
              />
            )}
            <div className="bg-white p-5 items-center justify-center rounded-xl flex" >
              <ButtonPrimary
                type="submit"
                value="Guardar"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
