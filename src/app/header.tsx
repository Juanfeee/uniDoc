"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type Props = {}

const Header = () => {

  const pathname = usePathname()

  return (
    <header className='flex bg-white text-lg font-medium h-16'>
      <div className='flex w-[500px] md:w-[800px]  xl:w-[1000px] 2xl:w-[1200px] m-auto relative items-center justify-between size-full'>
        <div className='flex items-center gap-4'>
          <img src="https://brilla.com.co/documents/83088/0/CORPORACION+UNIVERSITARIA+AUTONOMA+DEL+CAUCA.png/1f5d0453-bee9-f6ae-4d78-3f5c8759c0db?t=1669067233102" alt=""
            className='w-12' />
          <h1 className='font-bold'>UniDoc</h1>
        </div>
        <nav className="flex h-full" >
          <ul className='flex items-center justify-center gap-8 text-sm'>
            <li className='h-full flex items-center justify-center' >
              <Link
                className={`flex items-center justify-center hover:border-b-2 ${pathname === "/" ? "border-b-2" : ""
                  }`}
                href="/"
              >
                Inicio
              </Link>
            </li>
            <li className='h-full flex items-center justify-center' >
              <Link
                className={`flex items-center justify-center hover:border-b-2 ${pathname === "/datosPersona" ? "border-b-2" : ""
                  }`}
                href="/datosPersona"
              >
                Datos personales
              </Link>
            </li>
            <li className='h-full flex items-center justify-center'>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="flex items-center hover:border-b-2">
                    Trayectoria
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        href="/trayectoria/agregarEstudio"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Agregar estudio academico
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="/trayectoria/agregarExperiencia"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Agregar experiencia laboral

                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="/trayectoria/agregarProduccion"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Agregar produccion academica
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="/trayectoria/agregarIdioma"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Agregar idioma
                      </Link>
                    </MenuItem>

                  </div>
                </MenuItems>
              </Menu>
            </li>
            <li>
              <Link
                className={`flex items-center justify-center hover:border-b-2 ${pathname === "/documentosSoporte" ? "border-b-2" : ""
                  }`}
                href="/perfil"
              >
                <img src="https://img.freepik.com/fotos-premium/retrato-hombre-negocios-expresion-cara-seria-fondo-estudio-espacio-copia-bengala-persona-corporativa-enfoque-pensamiento-duda-mirada-facial-dilema-o-concentracion_590464-84924.jpg" alt=""
                  className='size-12 rounded-full object-cover' />
              </Link>
            </li>
          </ul>

        </nav>
      </div>
    </header>
  )
}
export default Header