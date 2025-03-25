"use client";
import Link from "next/link"
import { ButtonPrimary } from "../../componentes/formularios/ButtonPrimary"
import { ButtonSecondary } from "../../componentes/formularios/ButtonSecondary"
import { InputLabel } from "../../componentes/formularios/InputLabel"
import { LabelText } from "../../componentes/formularios/LabelText"
import TextInput from "../../componentes/formularios/TextInput"
import { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/validaciones/loginSchema"
import InputErrors from "../../componentes/formularios/InputErrors";

type Props = {}
type Inputs = {
  email: string
  password: string
}



const Login = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>( {resolver: zodResolver(loginSchema)});


  console.log("formulario",watch());
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log("Formulario enviado");
    //mensaje de exito
    alert("Formulario enviado");
  }

  return (
    <>
      <div className="grid grid-cols-2 bg-white gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative h-[90vh] ">
        <div className="bg-[#266AAE] text-white items-center justify-center md:flex flex-col rounded-md hidden">
        </div>
        <div className="col-span-full md:col-span-1">
          <form className="flex w-full h-full flex-col gap-y-4 py-12 px-8 items-center justify-center"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full">
              <InputLabel htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="text"
                placeholder="Email..."
                {...register('email')} />
              <InputErrors errors={errors} name="email" />
            </div>
            <div className="flex flex-col w-full">
              <InputLabel htmlFor="password" value="Contrasena" />
              <TextInput
                id="password"
                type="password"
                placeholder="Contrasena..." 
                {...register('password')} />
              <InputErrors errors={errors} name="password" />
                
            </div>
            <div className="flex flex-col gap-y-5 w-full items-center">
              <ButtonPrimary
                className="w-full"
                value="Iniciar Sesion"
                type="submit" />
              <div className="w-full h-[2px] rounded-full bg bg-blue-500"></div>
              <div className="flex flex-col items-center gap-y-2">
                <p>¿Eres nuevo? Registrate aqui</p>
                <Link href="/register">
                  <ButtonSecondary
                    className="w-fit"
                    value="Registrarse"
                    />
                </Link>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login