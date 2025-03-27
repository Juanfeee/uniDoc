import Link from "next/link"
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'


type Props = {}

const FormacionEducativa = () => {
  return (
    <>
      <div className="flex flex-col gap-4 h-full max-w-[400px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-bold text-xl">Formación educativa</h4>
          <div className="flex gap-1">
            <Link href={'/agregar/estudio'}>
              <PlusIcon className="size-10 p-2 stroke-2" />
            </Link>
            <Link href={'/editar/estudio'}>
              <PencilSquareIcon className="size-10 p-2 stroke-2" />
            </Link>
          </div>
        </div>
        <div>
          <ul>
            <li className="flex flex-col sm:flex-row gap-6">
              <AcademicCapIcon className="size-12 p-2 rounded-lg bg-[#F0F2F5] text-[#121417]" />
              <div className="text-[#637887]">
                <p className="font-semibold text-[#121417]">Posgrado</p>
                <p>Ingeniería en desarrollo de software</p>
                <p>Coorporación autonoma del cauca sadasd</p>
                <p>02/03/24</p>
              </div>
            </li>
            
          </ul>
        </div>
      </div>
    </>
  )
}
export default FormacionEducativa