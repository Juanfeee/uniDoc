type Props = {
  errors: { [key: string]: { message?: string } };
  name: string;
};

const InputErros = ({ errors, name }: Props) => {
  return (
    <>
      {errors[name]?.message && (
        <p className="text-red-600 text-sm">{errors[name]?.message}</p>
      )}
    </>
  );
};

export default InputErros;
