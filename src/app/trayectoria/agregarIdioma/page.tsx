"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



// Esquema de validación
import { InputLabel } from "@/app/componentes/formularios/InputLabel";
import TextInput from "@/app/componentes/formularios/TextInput";
import { LabelRadio } from "@/app/componentes/formularios/LabelRadio";
import { ButtonPrimary } from "@/app/componentes/formularios/ButtonPrimary";
import InputErros from "@/app/componentes/formularios/InputErros";
import { languageSchema } from "@/validaciones/languageSchema";

type Inputs = {
  idioma: string;
  institucion: string;
  fecha_certificacion: string;
  nivel_idioma: string;
  fecha_certificado: string;
}


const AgregarIdioma = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(languageSchema),
  });

  console.log("Formulario", watch());
  const onSubmit: SubmitHandler<Inputs> = () => {
    alert("Formulario enviado");
  };
  return (
    <>
      <form className='flex flex-col gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px m-auto relative'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col sm:grid grid-cols-3 gap-x-8 bg-white gap-y-6 py-12 px-8 rounded-xl'>
          <h3 className="font-bold text-3xl col-span-full">Agregar idioma</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4'>
            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='idioma' value='Idioma' />
              <TextInput
                id='idioma'
                placeholder='Idioma'
                {...register('idioma')}
              />
              <InputErros errors={errors} name="idioma" />
            </div>
            <div className='flex flex-col w-full'>
              <InputLabel htmlFor='institucion' value='Institucion' />
              <TextInput
                id='institucion'
                placeholder='institucion'
                {...register('institucion')}
              />
              <InputErros errors={errors} name="institucion" />
            </div>
          </div>

            <div className='grid lg:grid-cols-2 w-full col-span-3 gap-4' >
              <div className="col-span-1 ">
                <InputLabel htmlFor='' value='Nivel de idioma - formato internacional' />
                <div className="flex flex-wrap px-4 sm:justify-star items-center gap-x-6 lg:gap-x-8 rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] sm:h-11">
                  <div className="flex items-center gap-x-1">
                    <LabelRadio htmlFor="A1" value='A1' />
                    <TextInput
                      type="radio"
                      id="A1"
                      value="A1"
                      {...register('nivel_idioma')}
                    />
                  </div>
                  <div className="flex items-center gap-x-1">
                    <LabelRadio htmlFor="A2" value='A2' />
                    <TextInput
                      type="radio"
                      id="A2"
                      value="A2"
                      {...register('nivel_idioma')}
                    />
                  </div>
                  <div className="flex items-center gap-x-1">
                    <LabelRadio htmlFor="B1" value='B1' />
                    <TextInput
                      type="radio"
                      id="B1"
                      value="B1"
                      {...register('nivel_idioma')}
                    />
                  </div>
                  <div className="flex items-center gap-x-1">
                    <LabelRadio htmlFor="B2" value='B2' />
                    <TextInput
                      type="radio"
                      id="B2"
                      value="B2"
                      {...register('nivel_idioma')}
                    />
                  </div>
                  <div className="flex items-center gap-x-1">
                    <LabelRadio htmlFor="C1" value='C1' />
                    <TextInput
                      type="radio"
                      id="C1"
                      value="C1"
                      {...register('nivel_idioma')}
                    />
                  </div>
                  <div className="flex items-center gap-x-1">
                    <LabelRadio htmlFor="C2" value='C2' />
                    <TextInput
                      type="radio"
                      id="C2"
                      value="C2"
                      {...register('nivel_idioma')}
                    />
                  </div>
                </div>
                <InputErros errors={errors} name="nivel_idioma" />
              </div>
              <div className='flex flex-col'>
                <InputLabel htmlFor='fecha_certificado' value='Fecha de certificado' />
                <TextInput
                  type='date'
                  id='fecha_certificado'
                  {...register('fecha_certificado')}
                />
                <InputErros errors={errors} name="fecha_certificado" />
              </div>
            

          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 col-span-full gap-4'>

          </div>
          <div className='flex justify-center col-span-full'>
            <ButtonPrimary value='Agregar estudio' />
          </div>
        </div>
      </form>
    </>
  );
};
export default AgregarIdioma;