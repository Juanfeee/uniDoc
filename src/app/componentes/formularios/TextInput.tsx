
// Input de texto

type Props={
  type: string;
  className?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
}

const TextInput = ({type="text", className="", ...props}) => {




  return (
    <input
    {...props}
    type= {type}
    className={`${className} rounded-md border-2 bg-[#F7FAFC]  border-[#D1DBE8] px-1 py-2 h-11`}

    >


    </input>
  )
}

export default TextInput
