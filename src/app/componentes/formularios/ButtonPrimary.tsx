import React from 'react'

type Props = {
  value: string
  type?: "submit" | "button" | "reset"
  className?: string
}

export const ButtonPrimary = ({className, value, type = "submit" }: Props) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-2xl ${className}`}
      type= { type }
    > { value } </button>
  )
}