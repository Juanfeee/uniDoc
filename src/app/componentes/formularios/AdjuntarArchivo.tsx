"use client";
import { useState } from "react";

type Props = {
  id: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
};

export const AdjuntarArchivo = ({ id, className = "", onChange, ...props }: Props) => {

  

  return (
    <label
      htmlFor={id}
      className="cursor-pointer font-semibold text-xl w-full flex flex-col border-dashed border-2 border-gray-300 rounded-md p-4 gap-y-5 items-center justify-center hover:bg-gray-100 transition"
    >
      <input
        id={id}
        type="file"
        className="hidden"
        {...props}
      />
    </label>
  );
};
