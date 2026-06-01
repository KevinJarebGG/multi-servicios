import { useState, useEffect, useContext } from "react"
import { CheckCircle, Clock, Activity, Trash } from "lucide-react"
import ApiDatos from "../../services/ApiDatos"
import { AuthContext } from "../../context/AuthContext"
import Swal from "sweetalert2"

export function Historial() {
  const [servicios, setServicios] = useState([])
  const [trabajadores, setTrabajadores] = useState([])

  // Leemos el rol para saber qué mostrar
  const rol = localStorage.getItem("rol")
  const { usuario } = useContext(AuthContext)

  const obtenerServicios = async () => {
    const respuesta = await ApiDatos.getServicios()
    setServicios(respuesta.data)
    console.log(respuesta.data)
  }

const obtenerTrabajadores = async () => {
  const respuesta = await ApiDatos.getDatos()
  // Solo personas con rol "tecnico", excluyendo al admin logueado
  const soloTecnicos = respuesta.data.filter(
    (p) => p.rol === "tecnico" && p._id !== usuario?.id
  )
  setTrabajadores(soloTecnicos)
}

  useEffect(() => {
    obtenerServicios()
    obtenerTrabajadores()
  }, [])

  const getEstado = (estado) => {
    if (estado === "Finalizado") return { icon: <CheckCircle size={16} />, clase: "bg-emerald-100 text-emerald-700" }
    if (estado === "En proceso") return { icon: <Activity size={16} />, clase: "bg-amber-100 text-amber-700" }
    return { icon: <Clock size={16} />, clase: "bg-blue-100 text-blue-700" }
  }

  // TÉCNICO: cambiar estado
  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await ApiDatos.updateServicio(id, { estado: nuevoEstado })
      obtenerServicios()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Estado cambiado a ${nuevoEstado}`,
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se pudo cambiar el estado",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  // TÉCNICO: asignar trabajador
  const asignarTrabajador = async (id, trabajador) => {
    try {
      await ApiDatos.updateServicio(id, { trabajador })
      obtenerServicios()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Trabajador asignado",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se pudo asignar el trabajador",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  // CLIENTE: cancelar solicitud
  const eliminarServicio = (id) => {
    Swal.fire({
      title: "¿Estás seguro de cancelar esta solicitud?",
      text: "Se eliminará de la base de datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiDatos.deleteServicio(id)
          obtenerServicios()
          Swal.fire({
            title: "¡Cancelada!",
            text: "La solicitud ha sido eliminada.",
            icon: "success"
          })
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la solicitud.",
            icon: "error"
          })
        }
      }
    })
  }

  // CLIENTE: calificar servicio
  const calificarServicio = async (id, calificacion) => {
    try {
      await ApiDatos.updateServicio(id, { calificacion })
      obtenerServicios()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Calificaste con ${calificacion}`,
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se pudo guardar la calificación",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Historial de Servicios</h1>
        <p className="text-slate-500 text-sm">
          {rol === "tecnico" ? "Gestiona los servicios solicitados." : "Consulta y califica tus servicios."}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Servicios</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Dirección</th>
                <th className="px-6 py-4">Descripción</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estado</th>
                {/* El técnico ve trabajador y cambiar estado, el cliente ve calificar y cancelar */}
                {rol === "tecnico" ? (
                  <>
                    <th className="px-6 py-4">Trabajador</th>
                    <th className="px-6 py-4">Cambiar estado</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4">Calificar</th>
                    <th className="px-6 py-4">Cancelar</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {servicios.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-6 text-center text-slate-400 text-sm">
                    No hay servicios registrados
                  </td>
                </tr>
              ) : (
                servicios.map((item, i) => {
                  const { icon, clase } = getEstado(item.estado)
                  return (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">{item.servicios.join(", ")}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.categoria}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.direccion}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.descripcion}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.fecha}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-[10px] font-bold ${clase}`}>
                          {icon} {item.estado.toUpperCase()}
                        </span>
                      </td>

                      {/* TÉCNICO: trabajador + cambiar estado */}
                      {rol === "tecnico" ? (
                        <>
                          <td className="px-6 py-4">
                            <select
                              value={item.trabajador || ""}
                              onChange={(e) => asignarTrabajador(item._id, e.target.value)}
                              className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                              <option value="">Sin asignar</option>
                              {trabajadores.map((t) => (
                                <option key={t._id} value={t.nombre}>
                                  {t.nombre} ({t.especialidad})
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={item.estado}
                              onChange={(e) => cambiarEstado(item._id, e.target.value)}
                              className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="En proceso">En proceso</option>
                              <option value="Finalizado">Finalizado</option>
                            </select>
                          </td>
                        </>
                      ) : (
                        <>
                          {/* CLIENTE: calificar (solo si está finalizado) */}
                          <td className="px-6 py-4">
                            {item.estado === "Finalizado" ? (
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <button
                                    key={num}
                                    onClick={() => calificarServicio(item._id, num)}
                                    className={`w-7 h-7 rounded-lg text-xs font-bold transition
                                      ${item.calificacion === num
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-slate-600 hover:bg-blue-100"
                                      }`}
                                  >
                                    {num}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-300 text-xs">Disponible al finalizar</span>
                            )}
                          </td>

                          {/* CLIENTE: cancelar */}
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              onClick={() => eliminarServicio(item._id)}
                              className="bg-red-50 text-red-600 rounded-xl p-2 hover:bg-red-100 transition"
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}