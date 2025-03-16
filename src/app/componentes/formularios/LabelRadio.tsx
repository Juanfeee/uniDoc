type Props = {
  value?: string;
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
};

export const LabelRadio = ({ value = '', htmlFor = '', className = '', children, ...props }: Props) => {
  return (
    <label htmlFor={htmlFor} className={`text-base rounded-md   ${className}`} {...props}>
      {value || children}
    </label>
  );
};
