type Props = {
  value?: string;
  className?: string;
  children?: React.ReactNode;
  htmlFor: string;
}
export const LabelRadio = ({value, className="" ,children,...props}:Props) => {

  return (
    <label
      {...props}
      className={'' + className}
    >
      {value ? value : children}
    </label>
  )
}
