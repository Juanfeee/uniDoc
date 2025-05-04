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
import Cookies from 'js-cookie';
import { error } from "console";

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

    const loginPromise = axios.post(url, data, {

      //Cabeceras de la peticion
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido
        'Accept': 'application/json' // Aceptar respuesta en formato JSON
      },
      timeout: 10000 // 10 segundos timeout
    })

    // Manejo de la respuesta
    toast.promise(
      loginPromise, {
      pending: "Iniciando sesión...",
      success: {
        render({ data }) {
          const { token } = data.data;

          Cookies.set('token', token, {
            expires: 1, // 1 día de expiración
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
          });
          // Redirige después de un pequeño delay
          setTimeout(() => {
            router.push("/datos-personales");
          }, 500);

          return "¡Bienvenido!";
        },
        autoClose: 500,
      },
      error: {
        render({ data }) {
          const error = data;
          if (axios.isAxiosError(error)) {
            if (error.code === "ECONNABORTED") {
              return "Tiempo de espera agotado. Intente nuevamente";
            } else if (error.response) {
              switch (error.response.status) {
                case 401:
                  return "Credenciales incorrectas";
                case 500:
                  return "Error en el servidor";
                default:
                  return error.response.data?.message || "Error al iniciar sesión";
              }
            } else if (error.request) {
              return "No se recibió respuesta del servidor";
            }
          }
          return "Error al iniciar sesión";
        },
        autoClose: 2000,

      }
    }
    );

    // try {
    //   const response = await axios.post(url, data, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     },
    //     timeout: 10000 // 10 segundos timeout
    //   });

    //   const { token, user } = response.data;

    //   // Guardar el token y en una cookie
    //   Cookies.set('token', token, {
    //     expires: 1, // 1 día de expiración
    //     secure: process.env.NODE_ENV === 'production', // Solo enviar la cookie a través de HTTPS en producción
    //     sameSite: 'Strict', // Evitar el envío de la cookie en solicitudes de terceros
    //     path: '/', // Asegurarse de que la cookie esté disponible en todo el dominio
    //   });

    //   toast.success("¡Bienvenido! Redirigiendo...", {
    //     autoClose: 1000,
    //     position: "top-right",
    //     onClose: () => router.push("/datos-personales")
    //   });
    // } catch (error: unknown) {
    //   let errorMessage = "Error al iniciar sesión";

    //   if (axios.isAxiosError(error)) {
    //     if (error.code === 'ECONNABORTED') {
    //       errorMessage = "Tiempo de espera agotado. Intente nuevamente";
    //     } else if (error.response) {
    //       switch (error.response.status) {
    //         case 401:
    //           errorMessage = "Credenciales incorrectas";
    //           break;
    //         case 500:
    //           errorMessage = "Error en el servidor";
    //           break;
    //         default:
    //           errorMessage = error.response.data?.message || errorMessage;
    //       }
    //     } else if (error.request) {
    //       errorMessage = "No se recibió respuesta del servidor";
    //     }
    //   }

    //   toast.error(errorMessage, {
    //     autoClose: 2000,
    //     position: "top-right",
    //   });
    // }
  }

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex bg-white flex-col gap-4 px-8 py-4 w-[500px] min-h-[550px] shadow-lg justify-center relative rounded-3xl animacion-entrada" >
          <div className='flex flex-col gap-2 w-full' >
            < h3 className="font-bold text-2xl" > Iniciar sesión </h3>
            <h3>¡Hola! <span className='text-blue-500 font-bold'>Ingresa</span> con tu correo y contraseña</h3>
          </div>
          <div className="">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="text"
              placeholder="Email..."
              {...register('email')} />
            <InputErrors errors={errors} name="email" />
          </div>
          <div className="">
            <InputLabel htmlFor="password" value="Contraseña" />
            <TextInput
              id="password"
              type="password"
              placeholder="Contraseña..."
              {...register('password')} />
            <InputErrors errors={errors} name="password" />

          </div>
          <div className="">
            <ButtonPrimary
              className="w-full"
              value="Iniciar Sesión"
              type="submit"
            />
          </div>
          <p className="text-base text-gray-500 text-center">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-blue-500 hover:text-blue-600">
              Regístrate aquí
            </Link>
          </p>
          <div className='absolute size-full right-0 rotate-5 rounded-3xl -z-10  bg-blue-500'></div>
        </div >
      </form >

    </>
  )
}

export default Login