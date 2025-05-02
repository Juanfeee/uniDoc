"use client";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { ButtonPrimary } from "../../componentes/formularios/ButtonPrimary"
import { ButtonSecondary } from "../../componentes/formularios/ButtonSecondary"
import { InputLabel } from "../../componentes/formularios/InputLabel"
import TextInput from "../../componentes/formularios/TextInput"
import { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/validaciones/loginSchema"
import InputErrors from "../../componentes/formularios/InputErrors";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
type Inputs = {
  email: string
  password: string
}



const Login = () => {


  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL + "/auth/iniciar-sesion";


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });


  const onSubmit: SubmitHandler<Inputs> = async (data) => {


    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 segundos timeout
      });

      const { token, user } = response.data;

      // Guardar el token y el usuario en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("¡Bienvenido! Redirigiendo...", {
        autoClose: 1000,
        position: "top-center",
        onClose: () => router.push("/datos-personales")
      });
    } catch (error: unknown) {
      let errorMessage = "Error al iniciar sesión";

      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          errorMessage = "Tiempo de espera agotado. Intente nuevamente";
        } else if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage = "Credenciales incorrectas";
              break;
            case 500:
              errorMessage = "Error en el servidor";
              break;
            default:
              errorMessage = error.response.data?.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = "No se recibió respuesta del servidor";
        }
      }

      toast.error(errorMessage, {
        autoClose: 2000,
        position: "top-center"
      });
    }
  };



  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-2 bg-white gap-y-4 rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative h-[90vh]">
        <div className="bg-[#266AAE] text-white items-center justify-center md:flex flex-col rounded-md hidden">
        </div>
        <div className="col-span-full md:col-span-1">
          <form className="flex w-full h-full flex-col gap-y-4 py-12 px-8 items-center justify-center"
            onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-semibold text-3xl ">Iniciar sesión</h3>
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
              <InputLabel htmlFor="password" value="Contraseña" />
              <TextInput
                id="password"
                type="password"
                placeholder="Contraseña..."
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
                <p>¿Eres nuevo? Regístrate aquí</p>
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