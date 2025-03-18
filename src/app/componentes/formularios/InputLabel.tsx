type Props = {
  value?: string;
  className?: string;
  children?: React.ReactNode;
  htmlFor: string;
}
export const InputLabel = ({value, className="" ,children,...props}:Props) => {

  return (
    <label
      {...props}
      className={'text-lg font-semibold' + className}
    >
      {value ? value : children}
    </label>
  )
}
