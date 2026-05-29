import React from 'react'
import { Trash, Pencil } from 'lucide-react'

export function FilasPersona({ handleOpen, datos, eliminarPerson }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-6 py-4 font-semibold text-slate-700">{datos.nombre}</td>
      <td className="px-6 py-4 text-slate-500 text-sm">{datos.correo}</td>
      <td className="px-6 py-4">
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">
          {datos.telefono}
        </span>
      </td>
      <td className="px-6 py-4 text-slate-500 text-sm">{datos.especialidad}</td>
      <td className="px-6 py-4">
        <button type="button" onClick={() => eliminarPerson(datos._id)}
          className="bg-blue-500 rounded-2xl text-red-500 hover:bg-gray-400">
          <Trash size={20} />
        </button>
      </td>
      <td className="px-6 py-4">
        <button type="button" onClick={handleOpen}
          className="bg-blue-500 rounded-2xl text-red-500 hover:bg-gray-400">
          <Pencil size={20} />
        </button>
      </td>
    </tr>
  )
}