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
      className={`text-lg font-medium ${className}`}
    >
      {value ? value : children}
    </label>
  )
}
