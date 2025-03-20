import { LabelText } from "./componentes/formularios/LabelText"
import { Puntaje } from "./componentes/formularios/puntaje"
import { Texto } from "./componentes/formularios/Texto"

type Props = {}

const InformacionTrayectoriaDocente = (props: Props) => {
  return (
    <>
      <div className="flex flex-col w-full rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative">
        <div className="w-full flex flex-col bg-white py-12 px-8 rounded-xl gap-7">

          <h2 className="font-bold text-xl text-center">Formacion docente</h2>
          <div className="p-4 border-dashed border-2 rounded-md text-center">
            <p className="text-gray-600">Formación Educativa</p>
            <button className="py-2 bg-gray-200 rounded-md hover:bg-gray-300">Añadir Formación educativa</button>
          </div>
          <div className="p-4 border-dashed border-2 rounded-md text-center">
            <p className="text-gray-600">Formación Educativa</p>
            <button className="py-2 bg-gray-200 rounded-md hover:bg-gray-300">Añadir Formación educativa</button>
          </div>
          <div className="p-4 border-dashed border-2 rounded-md text-center">
            <p className="text-gray-600">Formación Educativa</p>
            <button className="py-2 bg-gray-200 rounded-md hover:bg-gray-300">Añadir Formación educativa</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default InformacionTrayectoriaDocente