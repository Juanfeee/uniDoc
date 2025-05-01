type Props = {
  className?: string;
  register?: any;
  id: string;
  options?: { value: string | number; label: string }[];
}

export const SelectForm = ({ id, className, register, options = [] }: Props) => {
  return (
    <div className="flex flex-col">
      <select
        defaultValue=""
        {...register}
        id={id}
        className={`${className} 
          h-11 w-full rounded-lg border-[1.8px] border-blue-600 
          bg-slate-100/40 p-3 text-sm text-slate-950/90
          placeholder-slate-950/60 outline-none
          focus:border-blue-700 focus:ring-1 focus:ring-blue-700
          transition duration-300 ease-in-out`}
      >
        <option value="" disabled>Seleccione una opción</option>
        {options.length > 0 ? (
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))
        ) : (
          <option value="" disabled>No hay opciones disponibles</option>
        )}
      </select>
    </div>
  );
}
