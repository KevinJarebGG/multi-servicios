import { useNavigate } from "react-router-dom"
import { FaUser, FaUserCog } from "react-icons/fa"

export function SelectRol() {
  const navigate = useNavigate()

  const elegirRol = (rol, ruta) => {
    localStorage.setItem("rol", rol)
    navigate(ruta)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold text-slate-800">Bienvenido usuario</h1>

      <div className="flex gap-10">
        {/* Cliente */}
        <button
          onClick={() => elegirRol("cliente", "/home")}
          className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="w-24 h-24 rounded-2xl border-2 border-slate-800 flex items-center justify-center">
            <FaUser size={52} />
          </div>
          <span className="text-xl font-semibold text-slate-700">Cliente</span>
        </button>

        {/* Técnico */}
        <button
          onClick={() => elegirRol("tecnico", "/dashboard")}
          className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="w-24 h-24 rounded-2xl border-2 border-slate-800 flex items-center justify-center">
            <FaUserCog size={52} />
          </div>
          <span className="text-xl font-semibold text-slate-700">Técnico</span>
        </button>
      </div>

      <p className="text-lg text-slate-500">¿Cómo deseas ingresar?</p>
    </div>
  )
}