import React from 'react'
import { FilasPersona } from './FilasPersona'

export function ListPersonas({ handleOpen, datos, eliminarPerson }) {
  return (
    <table className="w-full text-left">
      <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
        <tr>
          <th className="px-6 py-4">Nombre</th>
          <th className="px-6 py-4">Correo</th>
          <th className="px-6 py-4">Teléfono</th>
          <th className="px-6 py-4">Especialidad</th>
          <th className="px-6 py-4">Eliminar</th>
          <th className="px-6 py-4">Editar</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {datos.map((dato, i) => (
          <FilasPersona key={i} datos={dato} handleOpen={handleOpen} eliminarPerson={eliminarPerson} />
        ))}
      </tbody>
    </table>
  )
}