"use client";

import { useState } from "react";

export const Carga = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="min-h-screen mt-15 p-6 flex justify-center items-start">
      <div className="relative bg-white p-8 rounded-md shadow-md lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] flex flex-col items-center">
        {/* Botón de cierre en la esquina superior derecha */}
        <button className="absolute top-4 right-4 text-xl font-bold" onClick={() => setVisible(false)}>
          ✖
        </button>

        {/* Texto centrado y más abajo */}
        <h3 className="font-bold text-3xl text-center mt-20">¡Has realizado la carga con éxito!</h3>
        
        {/* Mensaje adicional */}
        <p className="text-gray-600 text-md text-justify mt-20 max-w-[80%]">
          Tu documento está en revisión por la Secretaría Académica. Durante este proceso, en la parte superior de tu perfil aparecerá su estado, que puede ser uno de los siguientes:
        </p>
        <ul className="text-gray-600 text-md mt-4 list-disc list-inside px-4 max-w-[80%] text-justify">
          <li><strong>Aprobada:</strong> Tu documento ha sido validado y aceptado.</li>
          <li><strong>Pendiente:</strong> Se encuentra en proceso de evaluación.</li>
          <li><strong>Rechazada:</strong> Se requieren correcciones o información adicional.</li>
        </ul>

        {/* Imágenes en la parte inferior */}
        <div className="flex justify-center items-center gap-6 mt-20">
          <img src="/imagenes/aprobado.png"  className="w-16 h-16" />
          <img src="/imagenes/pendiente.png"  className="w-16 h-16" />
          <img src="/imagenes/rechazado.png"  className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
};