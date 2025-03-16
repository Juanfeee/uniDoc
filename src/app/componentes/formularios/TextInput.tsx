
// Input de texto
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
