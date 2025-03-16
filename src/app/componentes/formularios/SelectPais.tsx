import { InputLabel } from "./InputLabel";

type Props = {
  className?: string;
};

export const SelectPais = ({ className = "" }: Props) => {
  return (
    <>
      <div className="flex flex-col">
        <InputLabel htmlFor="pais" value="Pais de nacimiento" />
        <select id="pais" className={`${className} rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] px-1 py-2 h-11`} defaultValue="no">
          <option value="" >Eliga una opción...</option>
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
        </select>
      </div>
    </>
  );
};
