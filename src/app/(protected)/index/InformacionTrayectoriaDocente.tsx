import { LabelText } from "../../componentes/formularios/LabelText"
import { Puntaje } from "../../componentes/formularios/puntaje"
import { Texto } from "../../componentes/formularios/Texto"
import FormacionEducativa from "./formacionEducativa/page"
import FormacionExperiencia from "./formacionExperiencia/page"
import FormacionIdioma from "./formacionIdioma/page"
import FormacionProduccion from "./formacionProduccion/page"

type Props = {}

const InformacionTrayectoriaDocente = (props: Props) => {
  return (
    <>
      <div className="flex flex-col w-full rounded-md lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] m-auto relative" >
        <div className="w-full flex flex-col bg-white md:py-12 px-8 rounded-xl gap-8" >

          <h2 className="font-bold text-2xl text-center" > Formación docente </h2>
          < div className="grid md:grid-cols-2 flex-col gap-x-8 lg:gap-x-24 gap-y-8 items-center justify-center" >
              <FormacionEducativa />
              < FormacionExperiencia />
            < FormacionProduccion />
            <div className="" > </div>

            < FormacionIdioma />
          </div>
          </div>
        </div>
      </>
      )
}
      export default InformacionTrayectoriaDocente