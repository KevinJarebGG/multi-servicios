import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaHammer, FaBolt, FaFaucet, FaTree, FaChevronDown } from "react-icons/fa"
import ApiDatos from "../../services/ApiDatos"
import Swal from "sweetalert2"

export function Home() {
  const navigate = useNavigate()
  const [servicioSeleccionado, setServicioSeleccionado] = useState([])
  const [descripcion, setDescripcion] = useState("")
  const [direccion, setDireccion] = useState("")
  const [categoria, setCategoria] = useState("")
  const [fecha, setFecha] = useState("")
  const [openDropdown, setOpenDropdown] = useState(null)

  const servicios = [
    { id: "albañil", label: "Albañil", icon: <FaHammer size={18} /> },
    { id: "electricista", label: "Electricista", icon: <FaBolt size={18} /> },
    { id: "plomero", label: "Plomero", icon: <FaFaucet size={18} /> },
    { id: "carpintero", label: "Carpintero", icon: <FaTree size={18} /> },
  ]

  const categorias = ["Reparación", "Instalación", "Mantenimiento", "Emergencia"]

  const toggleServicio = (id) => {
    setServicioSeleccionado((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const progreso = () => {
    let total = 5
    let completos = 0
    if (servicioSeleccionado.length > 0) completos++
    if (categoria) completos++
    if (descripcion) completos++
    if (direccion) completos++
    if (fecha) completos++
    return (completos / total) * 100
}

  const handleSubmit = async () => {
    if (servicioSeleccionado.length === 0) {
      return Swal.fire({ position: "top-end", icon: "error", title: "Selecciona al menos un servicio", showConfirmButton: false, timer: 1500 })
    }
    if (!categoria) {
      return Swal.fire({ position: "top-end", icon: "error", title: "Selecciona una categoría", showConfirmButton: false, timer: 1500 })
    }
    if (!descripcion) {
      return Swal.fire({ position: "top-end", icon: "error", title: "Escribe una descripción", showConfirmButton: false, timer: 1500 })
    }
    if (!direccion) {
      return Swal.fire({ position: "top-end", icon: "error", title: "Escribe una dirección", showConfirmButton: false, timer: 1500 })
    }
    if (!fecha) {
      return Swal.fire({ position: "top-end", icon: "error", title: "Selecciona una fecha y hora", showConfirmButton: false, timer: 1500 })
    }

    try {
      const data = {
        servicios: servicioSeleccionado,
        categoria,
        descripcion,
        direccion,
        fecha,
      }
      await ApiDatos.postServicio(data)
      Swal.fire({ position: "top-end", icon: "success", title: "Solicitud enviada correctamente", showConfirmButton: false, timer: 1500 })
      setServicioSeleccionado([])
      setCategoria("")
      setDescripcion("")
      setDireccion("")
      setFecha("")
      navigate("/historial")
    } catch (error) {
      Swal.fire({ position: "top-end", icon: "error", title: "Error al enviar la solicitud", showConfirmButton: false, timer: 1500 })
    }
  }
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <div className="p-8 space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Solicitar Servicio</h1>
        <p className="text-slate-500 text-sm">Selecciona las opciones que necesitas.</p>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progreso()}%` }}
        />
      </div>

      {/* Selección de servicios */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-slate-700">¿Qué tipo de servicio necesitas?</h2>
        <p className="text-slate-400 text-sm">Puedes elegir más de uno.</p>

        <div className="relative">
          <button
            onClick={() => toggleDropdown("servicios")}
            className="w-full flex items-center justify-between p-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all font-medium text-slate-600"
          >
            <span>{servicioSeleccionado.length === 0 ? "Elegir" : servicioSeleccionado.join(", ")}</span>
            <FaChevronDown className={`transition-transform duration-300 ${openDropdown === "servicios" ? "rotate-180" : ""}`} />
          </button>

          {openDropdown === "servicios" && (
            <div className="absolute z-10 w-full bg-white border border-gray-100 rounded-xl shadow-lg mt-1 overflow-hidden">
              {servicios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleServicio(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all text-left
                    ${servicioSeleccionado.includes(s.id) ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600"}`}
                >
                  {s.icon} {s.label}
                  {servicioSeleccionado.includes(s.id) && (
                    <span className="ml-auto text-blue-500 text-xs font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {servicioSeleccionado.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {servicioSeleccionado.map((s) => (
              <span key={s} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                {s}
                <button onClick={() => toggleServicio(s)} className="ml-1 hover:text-red-500">✕</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Categoría */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-slate-700">Categoría</h2>
        <p className="text-slate-400 text-sm">¿De qué tipo es el trabajo?</p>

        <div className="relative">
          <button
            onClick={() => toggleDropdown("categoria")}
            className="w-full flex items-center justify-between p-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all font-medium text-slate-600"
          >
            <span>{categoria || "Elegir"}</span>
            <FaChevronDown className={`transition-transform duration-300 ${openDropdown === "categoria" ? "rotate-180" : ""}`} />
          </button>

          {openDropdown === "categoria" && (
            <div className="absolute z-10 w-full bg-white border border-gray-100 rounded-xl shadow-lg mt-1 overflow-hidden">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategoria(cat); setOpenDropdown(null) }}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-all
                    ${categoria === cat ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600"}`}
                >
                  {cat}
                </button>
              ))}
              <div className="px-4 py-3 text-slate-300 text-sm border-t border-gray-50">...</div>
              <div className="px-4 py-3 text-slate-300 text-sm">...</div>
            </div>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-slate-700">Descripción</h2>
        <p className="text-slate-400 text-sm">Describe brevemente el problema.</p>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej: Se rompió una tubería en la cocina..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        />
      </div>

      {/* Dirección */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-slate-700">Dirección</h2>
        <p className="text-slate-400 text-sm">¿Dónde se realizará el servicio?</p>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Calle, número, colonia..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

     {/* Fecha y hora */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-slate-700">Fecha y hora</h2>
        <p className="text-slate-400 text-sm">¿Cuándo necesitas el servicio?</p>
        <input
          type="datetime-local"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Botón enviar */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Enviar Solicitud
      </button>
    </div>
  )
}