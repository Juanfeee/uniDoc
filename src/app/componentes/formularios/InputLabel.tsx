type Props = {
  value?: string;
  className?: string;
  children?: React.ReactNode;
  htmlFor: string;
}
export const InputLabel = ({className=" ",value,children,...props}:Props) => {

  return (
    <label
      {...props}
      className={`${className} text-lg font-medium `}
    >
      {value ? value : children}
    </label>
  )
}
