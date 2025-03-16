
export const InputLabel = ({
  value='',
  className = '',
  children='',
  ...props
}) => {

  return (
    <label
      {...props}
      className={'text-lg font-semibold ' + className}
    >
      {value ? value : children}
    </label>
  )
}
