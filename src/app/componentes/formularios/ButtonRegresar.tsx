import React from 'react'
import ArrowLeft from '@heroicons/react/24/outline/ArrowLeftIcon'

type Props = {

  className?: string
}

export const ButtonRegresar = ({className }: Props) => {
  return (
    <p
      className={` hover:bg-gray-300  rounded-full bg-gray-200 size-10 ${className}`}
    > <ArrowLeft className="p-2 stroke-3" /> </p>
  )
}